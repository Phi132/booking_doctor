import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, userInfo, isLoggedInPatient, patientInfo } = this.props;

        //let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/homepage';
        let linkToRedirect;
        if (isLoggedIn && !isLoggedInPatient) {
            linkToRedirect = '/system/user-manage';

        }
        if (!isLoggedIn && isLoggedInPatient && patientInfo.roleid === 'R3') {
            linkToRedirect = '/homepage';

        }
        if (!isLoggedIn && !isLoggedInPatient) {
            linkToRedirect = '/homepage';

        }

        // nếu islogg và role R1 thì vào system còn R3 thì vào homepage
        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        isLoggedInPatient: state.user.isLoggedInPatient,
        patientInfo: state.user.patientInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
