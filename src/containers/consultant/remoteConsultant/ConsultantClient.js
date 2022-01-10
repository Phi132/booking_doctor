import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConsultantClient.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import * as actions from '../../../store/actions';
import * as service from '../../../services'
import { languages } from '../../../utils/constant';
import HeaderHome from '../../homepage/HeaderHome';
import ReactHtmlParser from 'react-html-parser';
import ConsultantInfo from '../consultantDetail/ConsultantInfo';
import Appointment from '../../doctor/schedules/Appointment';
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../../doctor/schedules/Loading';

import { withRouter } from 'react-router';

import { SocketContext } from '../../../SocketContext';
import { io } from "socket.io-client";
import Peer from 'simple-peer';


const socket = io(process.env.REACT_APP_BACKEND_URL);

class ConsultantClient extends Component {

    _isMounted = false;

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.heightRef = React.createRef();
        this.myVideo = React.createRef();
        this.urFriendVideo = React.createRef();
        this.connectionRef = React.createRef();
        this.scrollText = React.createRef();
        this.state = {
            consultantId: this.props.match.params.id,

            isSeeMore: false,
            heightTopContent: 200,

            isLoading: false,

            dataSpecialtyById: {},
            specialtyId: 0,

            doctorIds: [],

            patientInfoUser: {},

            userByIdConsultant: [],

            isLoading: false,
            // call consultant
            stream: '',
            mySocketId: '',
            isConsultant: false,
            onlineUser: [],
            call: {},
            consultantIdOnline: [],
            nameCaller: '',
            nameFrom: '',
            callAccpeted: false,
            callEnded: false,
            isOpenCamera: false,
            isOpenMicro: false,
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        let { isLoggedInPatient, patientInfo } = this.props;

        if (!sessionStorage.getItem('cd-link')) {
            sessionStorage.setItem('cd-link', ``);
        }

        if (!isLoggedInPatient) {
            this.props.history.push(`/login-patient-user`);
        }
        // else {

        // console.log("test location window", window.location.href);

        let id = this.state.consultantId;
        this.props.fetchConsultantLimit(id);

        let response = await service.consultantByID(id);
        if (response.data &&
            response.data.response &&
            response.data.response.err === 0) {
            this.setState({
                dataSpecialtyById: response.data.response.data,
                specialtyId: response.data.response.data.id
            })
        }
        let doctorIdBySpecialty = await service.doctorIdBySpecialtyID(id);
        if (doctorIdBySpecialty.data && doctorIdBySpecialty.data.response && doctorIdBySpecialty.data.response.err === 0) {
            this.setState({
                doctorIds: doctorIdBySpecialty.data.response.data
            })
        }
        // open camera

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(currentStream => {

                this.setState({
                    isOpenCamera: true,
                    stream: currentStream
                });
                this.myVideo.current.srcObject = currentStream;
            })
            .catch(e => {
                console.log("loi khi mo camera", e);
            })


        // socket io
        socket.on('MY_SOCKET_ID', async id => {
            console.log("my socket id in server", id);
            await this.setState({
                mySocketId: id
            })
        })

        socket.emit("TU_VAN_VIEN", this.state.userByIdConsultant);

        if (this.props.patientInfo) {
            console.log("hoat dong co thg patientInfo", this.props.patientInfo);
            socket.emit("NGUOI_DUNG_VAO_CALL", this.props.patientInfo);

        } else {
            console.log("chua co thg patientInfo", this.props.patientInfo, this.state.mySocketId);
        }
        socket.on('TU_VAN_VIEN_ONLINE', async (listOnlineConsultant) => {
            console.log("danh sach id tu van vien online", listOnlineConsultant);
            await this.setState({
                consultantIdOnline: listOnlineConsultant,
                isConsultant: true,
            });
        });

        socket.on("DANH_SACH_ONLINE", async listOnl => {
            console.log("user online", listOnl);
            await this.setState({
                onlineUser: listOnl
            })
        });

        socket.on("callUser", ({ from, name: callerName, signal }) => {
            this.setState({
                call: {
                    isRecievedCall: true,
                    from,
                    name: callerName,
                    signal,
                }
            });
        });


    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userByIdConsultant !== this.props.userByIdConsultant) {
            this.setState({
                userByIdConsultant: this.props.userByIdConsultant,

            })
        }
        if (prevState.callAccpeted !== this.state.callAccpeted) {
            //scroll into view
            if (this.scrollText && this.scrollText.current) {
                this.scrollText.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }

        }
    }



    seeMore = () => {

        this.setState({
            isSeeMore: !this.state.isSeeMore,
            heightTopContent: this.heightRef.current.clientHeight
        })
    }

    storeCkeditor = (e) => {

    }

    isLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        })

    }

    // funtion socket

    functionProvider = () => {
        //alert("funciton provider")
    }

    callUserStart = (id) => {

        const { mySocketId, nameCaller, stream } = this.state

        const peer = new Peer({ initiator: true, trickle: false, stream: stream });
        peer.on("signal", (data) => {
            if (this.props.patientInfo.firstName)
                socket.emit("calluser", { userToCall: id, signalData: data, from: mySocketId, name: this.props.patientInfo.firstName });
        });
        // open stream
        peer.on('stream', (currentStream) => {
            this.urFriendVideo.current.srcObject = currentStream;
        });
        socket.on("callaccepted", (signal) => {
            this.setState({
                callAccpeted: true
            })
            peer.signal(signal);
        });
        socket.on("CALL_NAME_FROM", name => {
            this.setState({
                nameFrom: name
            });
        })
        this.connectionRef.current = peer;
    }

    answerUser = () => {
        const { stream, call } = this.state
        this.setState({
            callAccpeted: true
        });


        const peer = new Peer({ initiator: false, trickle: false, stream: stream });
        peer.on("signal", (data) => {
            if (this.props.patientInfo.firstName) {
                socket.emit("answercall", { signal: data, to: call.from, callFrom: this.props.patientInfo.firstName });

            }
        });
        // open camera

        peer.on("stream", (currentStream) => {
            this.urFriendVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);
        this.connectionRef.current = peer;
    }

    leaveCall = () => {
        this.setState({
            callEnded: false
        })
        this.connectionRef.current.destroy();
        window.location.reload();
    }

    OnOffCamera = () => {

        this.setState({
            isOpenCamera: !this.state.isOpenCamera
        }, () => {
            if (this.state.isOpenCamera) {
                navigator.mediaDevices.getUserMedia({ audio: this.state.isOpenMicro, video: true })
                    .then(currentStream => {
                        this.setState({
                            stream: currentStream
                        });
                        this.urFriendVideo.current.srcObject = currentStream;
                    })
                    .catch(e => {
                        console.log("loi khi mo camera", e);
                    })
            } else {
                navigator.mediaDevices.getUserMedia({ audio: this.state.isOpenMicro, video: false })
                    .then(currentStream => {
                        this.setState({
                            stream: currentStream
                        });
                        this.urFriendVideo.current.srcObject = currentStream;
                    })
                    .catch(e => {
                        console.log("loi khi mo camera false", e);
                    })
            }
        })
    }

    OnOffMicro = () => {
        this.setState({
            isOpenMicro: !this.state.isOpenMicro
        }, () => {
            if (this.state.isOpenMicro) {
                navigator.mediaDevices.getUserMedia({ audio: true, video: this.state.isOpenCamera })
                    .then(currentStream => {
                        this.setState({
                            stream: currentStream
                        });
                        this.urFriendVideo.current.srcObject = currentStream;
                    })
                    .catch(e => {
                        console.log("loi khi mo camera", e);
                    })
            } else {
                navigator.mediaDevices.getUserMedia({ audio: false, video: this.state.isOpenCamera })
                    .then(currentStream => {
                        this.setState({
                            stream: currentStream
                        });
                        this.urFriendVideo.current.srcObject = currentStream;
                    })
                    .catch(e => {
                        console.log("loi khi mo camera false", e);
                    })
            }
        })
    }

    render() {
        // const { testImport } = this.context;
        // this.props.patientInfo.firstName

        var { isSeeMore, heightTopContent, dataSpecialtyById,
            userByIdConsultant, consultantIdOnline, isConsultant, stream,
            callAccpeted, callEnded, call, nameFrom,
            isOpenCamera, isOpenMicro } = this.state;
        let imageSpecialtyURL = '';
        if (dataSpecialtyById && dataSpecialtyById.image) {
            imageSpecialtyURL = Buffer.from(dataSpecialtyById.image, 'base64').toString('binary');
        }

        return (
            <SocketContext.Provider value={{
                testFunction: this.functionProvider
            }} >
                <React.Fragment>
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner={<Loading />}

                    >
                        <HeaderHome />
                        {/* describe specialty */}
                        <div className="description-top" style={{ backgroundImage: `url('${imageSpecialtyURL}')` }}>
                            <div className="overlay">
                                <div className="container" >
                                    <div className="content-top">
                                        <div className="main-content-top"
                                            ref={this.heightRef}
                                            style={isSeeMore ? { animation: "openSeeMore .5s linear" } :
                                                { animation: "closeSeeMore .5s linear", height: '200px' }}

                                        >
                                            {
                                                dataSpecialtyById && dataSpecialtyById.contentHTMLconsultants && (
                                                    ReactHtmlParser(dataSpecialtyById.contentHTMLconsultants)
                                                )
                                            }
                                        </div>

                                        <div className="see-more">
                                            <span
                                                onClick={() => this.seeMore()}
                                            >
                                                {isSeeMore ? <FormattedMessage id="see-more.hidden" /> :
                                                    <FormattedMessage id="see-more.open" />}


                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        {/*  */}

                        <div className="main-container">
                            <div className="container">
                                <div className="select-location">
                                    <select className="selected">
                                        <option value="A">Toàn Quốc</option>
                                        <option value="B">Ha Noi</option>
                                        <option value="C">TP Ho Chi Minh</option>
                                    </select>
                                </div>
                                {
                                    userByIdConsultant && userByIdConsultant.length > 0 &&
                                    userByIdConsultant.map((value, index) => {

                                        return (
                                            <div className="infomation-doctor" key={index}>
                                                <div className="infomation-doctor-right">
                                                    <ConsultantInfo
                                                        doctorId={value.doctorId}
                                                        storeCkeditor={this.storeCkeditor}
                                                    />
                                                </div>
                                                <div className="infomation-doctor-left">
                                                    {
                                                        consultantIdOnline && consultantIdOnline.length > 0 &&
                                                        consultantIdOnline.map((e, index) => {

                                                            if (e.idConsultant === value.doctorId) {
                                                                return (

                                                                    <button className='call-consultant'
                                                                        // data-socketId={e.socketId}
                                                                        key={index}
                                                                        onClick={() => this.callUserStart(e.socketId)}
                                                                    >
                                                                        Gọi Điện
                                                                    </button>



                                                                )
                                                            }

                                                        })
                                                    }
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <button
                                onClick={this.OnOffCamera}
                                className='call-consultant'>
                                {
                                    isOpenCamera ? 'Tắt Camera' : 'Mở Camera'
                                }
                            </button>
                            {
                                call.isRecievedCall && !callEnded && (
                                    <div className='anwsering-btn'>
                                        <h1>
                                            {call.name} is calling
                                        </h1>
                                        <button
                                            onClick={this.answerUser}
                                            className='call-consultant'>Trả Lời</button>
                                    </div>
                                )
                            }
                        </div>
                        {/*  video call */}
                        <div className='call-remote-consultant'>
                            {/* my video */}
                            <div className="camera-video" style={isOpenCamera ?
                                { animation: "openCameraVideo .4s linear" } :
                                { animation: "closeCameraVideo .2s linear", opacity: 0 }}>
                                {stream && isOpenCamera && (
                                    <div className='frame-video'>

                                        <video className='video-call' ref={this.myVideo} autoPlay controls muted></video>

                                    </div>

                                )}
                            </div>

                            {/* your firend video */}
                            <div className='your-friend-call-video'
                                style={callAccpeted && !callEnded ?
                                    { animation: "openCameraVideo .4s linear" } :
                                    { animation: "closeCameraVideo .2s linear" }}
                            >
                                {callAccpeted && !callEnded ?
                                    (
                                        <div className='your-friend-calling'>
                                            <div className="your-friend-name">
                                                Đang Gọi : {call.name ? call.name : nameFrom}

                                            </div>
                                            {isOpenCamera ? (
                                                <video className='video-call' ref={this.urFriendVideo} autoPlay controls
                                                    muted={isOpenMicro ? true : false}
                                                ></video>
                                            ) :
                                                (<div className='video-call' >
                                                    <h1>
                                                        đã tắt camera

                                                    </h1>
                                                </div>)
                                            }

                                            <div>
                                                <div className='nav-controll-call-video'>
                                                    <ul className='controll-call-list'>
                                                        <li className='control-call-item-1' onClick={this.OnOffCamera}>
                                                            {
                                                                isOpenCamera ? <i className="fas fa-video"></i> :
                                                                    <i className="fas fa-video-slash" ></i>
                                                            }
                                                        </li>
                                                        <li className='control-call-item-2' onClick={this.OnOffMicro}>
                                                            {
                                                                isOpenMicro ? <i className="fas fa-microphone"></i> :
                                                                    <i className="fas fa-microphone-slash"></i>
                                                            }

                                                        </li>
                                                        <li className='control-call-item-3' onClick={this.leaveCall}>
                                                            <i className="fas fa-phone"></i>
                                                        </li>
                                                        <li className='control-call-item-4'>
                                                            <i className="fas fa-plus-square"></i>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                    ) :

                                    (
                                        <div className='your-friend-calling'>
                                            <div className="your-friend-name">
                                                Mời bạn chọn nhân viên tư vấn

                                            </div>
                                            <div className='video-call'>

                                            </div>

                                        </div>
                                    )}
                            </div>

                            {callAccpeted && !callEnded ?
                                (
                                    <div className='chat-box-area'>
                                        <div className='title-chat-box'>
                                            <span>
                                                Chat
                                            </span>
                                        </div>
                                        <div className='chat-content' >
                                            <div className='orther-text' >
                                                <div className='orther-mess-avt'>

                                                </div>
                                                <div className='orther-mess-content'>
                                                    Buddy you have to do three JS one. For .obj
                                                    formata and other formats. That is awesome i
                                                    saw gucci website that is realy awesome
                                                </div>

                                            </div>
                                            <div className='my-text'>
                                                <div className='my-text-container'>
                                                    <div className='my-mess-content'>
                                                        wow, i want to learn java for html like onclick
                                                        and effects... plz someone suggest how to
                                                    </div>

                                                    < div className='my-mess-avt'>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='my-text'>
                                                <div className='my-text-container'>
                                                    <div className='my-mess-content'>
                                                        wow, i want to learn java for html like onclick
                                                        and effects... plz someone suggest how to
                                                    </div>

                                                    < div className='my-mess-avt'>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='orther-text'>
                                                <div className='orther-mess-avt'>

                                                </div>
                                                <div className='orther-mess-content'>
                                                    Buddy you have to do three JS one. For .obj
                                                    formata and other formats. That is awesome i
                                                    saw gucci website that is realy awesome
                                                </div>

                                            </div>
                                            <span className='end-mess-content' ref={this.scrollText}>

                                            </span>
                                        </div>
                                        <div className='type-chat'>
                                            <div className='input-mess-content'>
                                                <input type='text' placeholder='type message' />
                                                <div className='icon-send-mess'>
                                                    <i className="fas fa-paper-plane"></i>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                ) :
                                (
                                    ''
                                )}


                        </div>
                        <div className="space-footer">

                        </div>
                    </LoadingOverlay>
                </React.Fragment >
            </ SocketContext.Provider >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedInPatient: state.patient.isLoggedInPatient,
        patientInfo: state.patient.patientInfo,
        dataDoctor: state.doctor.doctorInfo,
        userByIdConsultant: state.admin.userByIdConsultant,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        getMedicalSpecialty: (id) => dispatch(actions.doctorInfo(id)),
        fetchConsultantLimit: (consultantId) => dispatch(actions.fetchConsultantLimit(consultantId)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConsultantClient));

