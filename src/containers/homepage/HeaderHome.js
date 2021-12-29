import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { languages } from '../../utils/constant';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";

class HeaderHome extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    clickHome = () => {
        this.props.history.push(`/homepage`);
    }
    clickLogin = () => {
        let currentLink = window.location.href
        sessionStorage.setItem('cd-link', `${currentLink}`);
        this.props.history.push(`/login-patient-user`);
    }
    render() {
        var { language, patientInfo, isLoggedInPatient, processLogoutPatient } = this.props;
        //console.log(isLoggedInPatient);

        return (
            <React.Fragment>
                <div className="header-area">
                    <div className="header-home-container">
                        <div className="left-header-container">
                            <div className="icon__menu__main">
                                <i className="fas fa-bars"></i>
                            </div>
                            <div className="logo__main"
                                onClick={() => { this.clickHome() }}
                            >

                            </div>
                        </div>

                        <div className="middle-header-container">
                            <ul className="middle-header-content">

                                <li className="middle-content-1">
                                    <div className="title-content">
                                        <FormattedMessage
                                            id="header.specailty"
                                        />

                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.describe-specailty"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1">
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.healthfacilities"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.choose"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1">
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.doctor"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.chooseGudDoc"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1">
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.package"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.check"
                                            />
                                        </span>
                                    </div>
                                </li>

                            </ul>
                        </div>

                        <div className="right-header-container">

                            <div className="language-right">
                                <div className="icon-support">
                                    <i className="fas fa-question-circle"></i>
                                </div>
                                <div className="support">
                                    <span>

                                        < FormattedMessage
                                            id="header.support"
                                        />
                                    </span>

                                </div>
                                <div className="changeLanguage">
                                    <span className={language === languages.VI ? "changeLanguageVI active" : "changeLanguageVI"}
                                        onClick={() => this.changeLanguageClick(languages.VI)}
                                    >
                                        VI
                                    </span>
                                    <span className={language === languages.EN ? "changeLanguageEN active" : "changeLanguageEN"}
                                        onClick={() => this.changeLanguageClick(languages.EN)}
                                    >
                                        EN
                                    </span>
                                </div>
                            </div>
                            <div className="login-right">
                                {
                                    isLoggedInPatient ?
                                        <>
                                            <span className="welcom-user-title">
                                                <FormattedMessage id="loginHeader.welcome" />&nbsp;
                                            </span>
                                            <span>
                                                {
                                                    patientInfo && patientInfo.firstName ? patientInfo.firstName : ''
                                                }
                                            </span>
                                            <div className="btn btn-logout" onClick={processLogoutPatient}>

                                                <i className="fas fa-sign-out-alt"></i>
                                            </div>

                                        </>

                                        :
                                        <>
                                            <div className="login-paintion-right"
                                                onClick={this.clickLogin}
                                            >

                                                Đăng Nhập

                                            </div>
                                            <div className="signin-right">
                                                Đăng Ký
                                            </div>
                                        </>

                                }



                            </div>
                        </div>
                    </div>

                </div>




            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        patientInfo: state.patient.patientInfo,
        isLoggedInPatient: state.patient.isLoggedInPatient,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutPatient: () => dispatch(actions.processLogoutPatient()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));

