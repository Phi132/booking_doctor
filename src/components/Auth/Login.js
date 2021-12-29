import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { HandleLoginApi } from '../../services/userService';

// import { KeyCodeUtils, LanguageUtils } from "../utils";

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
// import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            errorMess: ''
        }
    }
    handleChangeUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleShowPass = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })

    }


    onSubmitForm = async (e) => {
        e.preventDefault();
        const { userLoginSuccess, processLogoutPatient } = this.props;
        try {
            var server = await HandleLoginApi(this.state.username, this.state.password)

            if (server.data.error !== 0) {
                this.setState({
                    errorMess: server.data.mess
                })
            }

            else {
                processLogoutPatient();
                userLoginSuccess(server.data.userData);
                //this.props.userLoginSuccess(server.user)
                //console.log(server.data.userData);
            }

        } catch (e) {
            console.log(e)

        }
    }
    render() {
        return (
            <div className="login-wrapper">
                <div className="login-picture">
                    <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.png"
                        className="img-login-admin"
                    />
                </div>
                <div className="login-container">
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form_login">
                            <div className="title">
                                <div className="title-head-login">
                                    Sign in with
                                </div>
                                <div className="icon-fb-head-login">
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                                <div className="icon-twitter-head-login">
                                    <i className="fab fa-twitter"></i>
                                </div>
                                <div className="icon-in-head-login">
                                    <i className="fab fa-linkedin-in"></i>
                                </div>
                            </div>
                            <div className="other-login-with">
                                <p>Or</p>
                            </div>
                            <div className="input-user-pass">
                                <div className="user-name">
                                    <div className="user-name-title">
                                        <label>Username</label>
                                    </div>

                                    <input className="input_user"
                                        type="text"
                                        placeholder="Nhập Tài Khoản"
                                        name="username"
                                        value={this.state.username}
                                        onChange={(e) => this.handleChangeUser(e)}
                                    >

                                    </input>

                                </div>
                                <div className="password">

                                    <div className="password-title">
                                        <label>Password</label>
                                    </div>
                                    <div className="input_pass_container">
                                        <input className="input_pass"
                                            type={this.state.showPassword ? "text" : "password"}
                                            placeholder="Nhập Mật Khẩu"
                                            name="password"
                                            onChange={(e) => this.handleChangePassword(e)}
                                        >

                                        </input>
                                    </div>
                                    <div className="showPass"
                                        onClick={this.handleShowPass}
                                    >
                                        <i className={this.state.showPassword ?
                                            "fas fa-eye-slash icon-eye" : "fas fa-eye icon-eye"}

                                        ></i>

                                    </div>

                                    <div className="forgot_pass">
                                        <div>
                                            Forgot password?
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="error-mess" style={{ color: 'red', marginTop: 20 }}>
                                {this.state.errorMess}
                            </div>

                            <div className="btn-login">
                                <div className="btn-login-container">
                                    <div className="btn-login-text">
                                        <button
                                            type="submit"
                                        //onClick={this.handleClickBtnLogin}
                                        >
                                            LOGIN
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogoutPatient: () => dispatch(actions.processLogoutPatient()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
