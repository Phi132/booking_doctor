import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConfirmAppointment.scss';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import HeaderHome from '../homepage/HeaderHome';
import * as serveices from '../../services';

class ConfirmAppointment extends Component {


    async componentDidMount() {
        //console.log(this.props.match.params.id);
        if (this.props.match) {
            let slug = new URLSearchParams(this.props.location.search);
            let token = slug.get("token");
            let doctorid = slug.get("doctorid");
            let confirm = await serveices.confirmAppointment(token, doctorid);
            console.log(confirm);

        }



    }


    render() {

        return (
            <React.Fragment>

                <HeaderHome />
                <div className="confirm-title">
                    <h1>
                        đã xác nhận thành công
                    </h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAppointment);

