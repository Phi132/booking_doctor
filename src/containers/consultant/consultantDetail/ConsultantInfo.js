import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConsultantInfo.scss';
// import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import * as actions from '../../../store/actions';
import * as services from '../../../services';
import { languages } from '../../../utils/constant';
import { withRouter } from 'react-router';
import { SocketContext } from '../../../SocketContext';


class ConsultantInfo extends Component {

    static contextType = SocketContext;


    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            description: '',
            infoDoctor: {},
            position: {},
            gender: {},
            doctorId: +this.props.doctorId,


        }
    }
    async componentDidMount() {

        const value = this.context;

        value.testFunction();

        let id = this.state.doctorId;
        let dataConsultantUser = await services.profileConsultant(id);

        if (dataConsultantUser.data && dataConsultantUser.data.responese &&
            dataConsultantUser.data.responese.err === 0
        ) {
            this.setState({
                data: dataConsultantUser.data.responese.data,

                infoDoctor: dataConsultantUser.data.responese.data.Account_user,
                description: dataConsultantUser.data.responese.data.description,
            })

            this.props.getDoctorDetail(id);
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.dataDoctor !== prevProps.dataDoctor) {
            this.setState({
                position: this.props.dataDoctor.positionData,
                gender: this.props.dataDoctor.genderData
            })


        }
    }


    clickInfoDoctor = (id) => {
        this.props.history.push(`/doctor-detail-id/${id}`);
    }



    render() {
        // var { testFunction } = React.useContext(SocketContext);
        var { language } = this.props;
        var { infoDoctor, description, data, doctorId } = this.state;
        let imageUserConsultantURL = '';


        if (infoDoctor && infoDoctor.image && infoDoctor.image.data) {

            imageUserConsultantURL = Buffer.from(infoDoctor.image.data, 'base64').toString('binary');

        }

        let InfoDoctorVi = '';
        let InfoDoctorEn = '';

        if (language === languages.VI && this.state.position && Object.keys(this.state.position).length
            
        ) {
            InfoDoctorVi = `${this.state.position.valueVi}, ${infoDoctor.lastName} ${infoDoctor.firstName}`

        }
        if (language === languages.EN && this.state.position && Object.keys(this.state.position).length
            
        ) {
            InfoDoctorEn = `${this.state.position.valueEn}, ${infoDoctor.firstName} ${infoDoctor.lastName}`
        }
        
        return (
            <React.Fragment>
                <div className="detail-doctor">

                    <div className="img-doctor"
                        onClick={() => this.clickInfoDoctor(data.doctorId)}
                    >
                        <div className="img"
                            style={
                                imageUserConsultantURL ? { backgroundImage: `url(${imageUserConsultantURL})` } :
                                    {}
                            }
                        >

                        </div>
                    </div>
                    <div className="info-doctor">
                        <h1 onClick={() => this.clickInfoDoctor(data.id)} className="name-doctor">
                            {

                                language === languages.VI && this.state.position ?
                                    InfoDoctorVi
                                    :

                                    InfoDoctorEn
                            }
                        </h1>
                        <div className="description-doctor">
                            <span>
                                {description}
                            </span>


                        </div>
                    </div>
                </div>
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
        getDoctorDetail: (id) => dispatch(actions.doctorInfo(id)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConsultantInfo));

