import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { languages } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state= {
            menuRole : [],
        }
    }

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    render() {
        const { processLogout, userInfo, language } = this.props;
        
        return (
            <Fragment>
                
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="header-container">

                    <div>

                    </div>

                    <div className="right-header-container">
                        <div className="welcom-user">
                            <span className="welcom-user-title">
                                <FormattedMessage id="loginHeader.welcome" />&nbsp;
                            </span>
                            <span>
                                {
                                    userInfo && userInfo.firstName ? userInfo.firstName : ''
                                }
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
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>

                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
