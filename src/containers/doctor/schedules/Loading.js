import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Loading.scss';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router';

class Loading extends Component {

    constructor(props) {
        super(props);

    }

    render() {


        return (
            <React.Fragment>
                <div className="loader">
                    <div className="outer"></div>
                    <div className="middle"></div>
                    <div className="inner"></div>
                </div>


            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataDoctor: state.doctor.doctorInfo,
        isLoggedInPatient: state.user.isLoggedInPatient,
        patientInfo: state.user.patientInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loading));

