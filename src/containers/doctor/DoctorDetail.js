import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import * as service from '../../services'
import { languages } from '../../utils/constant'
import HeaderHome from '../homepage/HeaderHome';
import ReactHtmlParser from 'react-html-parser';
import Appointment from './schedules/Appointment';
import DoctorInfo from './doctorDetail/DoctorInfo';
import LoadingOverlay from 'react-loading-overlay';
import Loading from './schedules/Loading';

class DoctorDetail extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.state = {
            idDocotrAppointment: this.props.match.params.id,
            contentCkeditor: {},

            isLoading: false,
        }
    }

    storeCkeditor = (e) => {
        if (e) {
            this.setState({
                contentCkeditor: e,
            })
        }
    }

    isLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        })
    }

    render() {
        var { language, dataDoctor } = this.props;
        var { idDocotrAppointment } = this.state

        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner={<Loading />}

                >
                    
                    <HeaderHome />
                    <div className="container-doctor-detail">
                        <DoctorInfo
                            idDocotrAppointment={idDocotrAppointment}
                            storeCkeditor={this.storeCkeditor}
                        />

                        <Appointment
                            idDoctor={+idDocotrAppointment}
                            isLoading={this.isLoading}
                        />



                    </div>
                    <div className="description">
                        <div className="description-doctor">
                            {
                                this.state.contentCkeditor && this.state.contentCkeditor.contentHTML &&
                                (
                                    ReactHtmlParser(this.state.contentCkeditor.contentHTML)
                                )
                            }

                        </div>
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
        //getDoctorDetail: (id) => dispatch(actions.doctorInfo(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);

