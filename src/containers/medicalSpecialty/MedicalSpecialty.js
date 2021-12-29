import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import * as service from '../../services'
import { languages } from '../../utils/constant';
import HeaderHome from '../homepage/HeaderHome';
import ReactHtmlParser from 'react-html-parser';
import DoctorInfo from '../doctor/doctorDetail/DoctorInfo';
import Appointment from '../doctor/schedules/Appointment';
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../doctor/schedules/Loading';



class MedicalSpecialty extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.heightRef = React.createRef();
        this.state = {
            idSpecialty: this.props.match.params.id,

            isSeeMore: false,
            heightTopContent: 200,

            isLoading: false,

            dataSpecialtyById: {},
            specialtyId: 0,

            doctorIds: [],

            isLoading: false,
        }
    }
    async componentDidMount() {
        let id = this.state.idSpecialty
        let response = await service.specialtyByID(id);
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

    render() {
        // var { language, dataDoctor } = this.props;
        var { isSeeMore, heightTopContent, dataSpecialtyById, doctorIds } = this.state;
        let imageSpecialtyURL = '';
        if (dataSpecialtyById && dataSpecialtyById.image) {
            imageSpecialtyURL = Buffer.from(dataSpecialtyById.image, 'base64').toString('binary');
        }

        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner={<Loading />}

                >
                    <HeaderHome />
                    {/* describe specialty */}
                    <div className="description-top" style={{ backgroundImage: `url('${imageSpecialtyURL}')` }}>
                        <div className="overlay">
                            <div className="container">
                                <div className="content-top">
                                    <div className="main-content-top"
                                        ref={this.heightRef}
                                        style={isSeeMore ? { animation: "openSeeMore .5s linear" } :
                                            { animation: "closeSeeMore .5s linear", height: '200px' }}

                                    >
                                        {
                                            dataSpecialtyById && dataSpecialtyById.contentHTMLspecialties && (
                                                ReactHtmlParser(dataSpecialtyById.contentHTMLspecialties)
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
                                doctorIds && doctorIds.length > 0 &&
                                doctorIds.map((value, index) => {
                                    return (
                                        <div className="infomation-doctor" key={index}>
                                            <div className="infomation-doctor-right">
                                                <DoctorInfo
                                                    idDocotrAppointment={value.doctorId}
                                                    storeCkeditor={this.storeCkeditor}
                                                />
                                            </div>
                                            <div className="infomation-doctor-left">
                                                <Appointment
                                                    idDoctor={+value.doctorId}
                                                    isLoading={this.isLoading}
                                                />
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                    <div className="space-footer">

                    </div>
                </LoadingOverlay>
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataDoctor: state.doctor.doctorInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        getMedicalSpecialty: (id) => dispatch(actions.doctorInfo(id)),

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MedicalSpecialty);

