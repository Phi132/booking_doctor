import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';


import {
    userIsAuthenticated, userIsNotAuthenticated,
    userIsNotAuthenticatedPatient, userIsAuthenticatedPatient
} from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Login from '../components/Auth/Login';
import PatientLogin from '../components/Auth/PatientLogin';

import System from '../routes/System';
import Homepage from './homepage/Homepage';
import MedicalSpecialty from './medicalSpecialty/MedicalSpecialty';


import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import DoctorDetail from './doctor/DoctorDetail';
import ConfirmAppointment from './doctor/ConfirmAppointment';
import ConsultantClient from './consultant/remoteConsultant/ConsultantClient';

import './App.scss'
class App extends Component {
    _isMounted = false;

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };
    
    constructor(props) {
        super(props);
        this.state = {
            pathWeb: '/homepage',
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.handlePersistorState();

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />


                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOMEPAGE} component={Homepage} />
                                <Route path="/medical-specialty/:id" component={MedicalSpecialty} />
                                <Route path="/remote-consultant/:id" component={ConsultantClient} />
                                <Route path="/doctor-detail-id/:id" component={DoctorDetail} />
                                <Route path={path.HOME} exact component={(Home)} />
                                {/* patient login */}
                                <Route path="/login-patient-user" component={userIsNotAuthenticatedPatient(PatientLogin)} />
                                <Route path='/homepage' component={userIsAuthenticatedPatient(Homepage)} />
                                {/*  */}

                                {/* admin */}
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />



                                <Route path="/verify-token-appointment" component={ConfirmAppointment} />
                            </Switch>
                        </span>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);