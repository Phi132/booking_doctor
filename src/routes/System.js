import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import ProductManage from '../containers/System/ProductManage';
import adminRedux from '../containers/System/adminRedux/adminRedux';
import Header from '../containers/Header/Header';
import CKeditorInfo from '../containers/System/adminRedux/CKeditorInfo';
import DoctorAppointment from '../containers/System/adminRedux/DoctorAppointment';
import ManageMedicalSpecialty from '../containers/System/adminRedux/specailty/ManageMedicalSpecialty';
import Consultant from '../containers/System/adminRedux/specailty/Consultant';
import ManageProfileConsultant from '../containers/System/adminRedux/specailty/ManageProfileConsultant';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <span>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/product-manage" component={ProductManage} />
                            <Route path="/system/crud-redux" component={adminRedux} />
                            <Route path="/system/managerDoctor" component={CKeditorInfo} />
                            <Route path="/system/doctor-manage-appointment" component={DoctorAppointment} />
                            <Route path="/system/manage-specialty" component={ManageMedicalSpecialty} />
                            <Route path="/system/manage-consultation" component={Consultant} />
                            <Route path="/system/manage-profile-consultation" component={ManageProfileConsultant} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </span>

        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
