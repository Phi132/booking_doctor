import React, { Component } from 'react';
import './Container.scss';
import Slider from "react-slick";
// import { Route, Switch } from 'react-router-dom';
import {
    changeLanguageApp, fetchDoctorLimitStart,
    adminPositionStart,
    // fetchDataUserStart, 
    allSpecialty, allConsultant,
} from '../../store/actions';
import { languages } from '../../utils/constant'
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import DoctorDetail from '../doctor/DoctorDetail';
import { withRouter } from 'react-router';

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: [],
            dataSpecialty: [],
            dataConsultant: [],
        }
    }
    componentDidMount() {

        this.props.getDataDoctorLimit();
        this.props.getAllCodePosition();
        this.props.getAllSpecialty();
        this.props.getAllConsultant();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataDoctor !== this.props.dataDoctor) {
            this.setState({
                dataDoctor: this.props.dataDoctor,

            })
        }
        if (prevProps.dataSpecialty !== this.props.dataSpecialty) {
            this.setState({
                dataSpecialty: this.props.dataSpecialty
            })
        }
        if (prevProps.dataConsultant !== this.props.dataConsultant) {
            this.setState({
                dataConsultant: this.props.dataConsultant
            })
        }

    }
    onClickDoctorOutStanding = (doctor) => {
        this.props.history.push(`/doctor-detail-id/${doctor.id}`);
    }
    changeDirectionToMSpecialty = (specialty) => {
        this.props.history.push(`/medical-specialty/${specialty.id}`);
    }
    changeDirectionToRemoteConsultant = (e) => {
        let { isLoggedInPatient } = this.props;
        sessionStorage.setItem('cd-link', `/remote-consultant/${e.id}`);
        if (isLoggedInPatient) {
            this.props.history.push(`/remote-consultant/${e.id}`);
        }
        if (!isLoggedInPatient) {
            this.props.history.push(`/login-patient-user`);
        }


    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };
        let { dataDoctor, dataSpecialty, dataConsultant } = this.state;
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className="container-area">
                    <div className="container-title">
                        <div className="container-title1">
                            Bác sĩ từ xa qua Video
                        </div>
                        <div className="container-title2">
                            <button type="button" >
                                <span>
                                    XEM THÊM
                                </span>

                            </button>
                        </div>
                    </div>
                    <div className="slider-container">
                        <div className="space-bot-top-slider">
                            <Slider {...settings}>
                                {
                                    dataConsultant && dataConsultant.length > 0 &&
                                    dataConsultant.map((e, index) => {
                                        if (e.image) {
                                            var imgSpecialtyData = Buffer.from(e.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className="slider-picture"
                                                key={index}
                                                onClick={() => this.changeDirectionToRemoteConsultant(e)}
                                            >
                                                <div className="slider-img" style={{ backgroundImage: `url('${imgSpecialtyData}')` }}>
                                                    <span className="video-icon">
                                                        <i className="fas fa-video"></i>
                                                    </span>

                                                </div>
                                                <div className="slider-picture-title">
                                                    <span>
                                                        {e.name}
                                                    </span>

                                                </div>

                                            </div>
                                        )
                                    })

                                }


                            </Slider>
                        </div>

                    </div>

                </div>
                <div className="container-area container-area-2">
                    <div className="container-title">
                        <div className="container-title1">
                            Chuyên khoa phổ biến
                        </div>
                        <div className="container-title2">
                            <button type="button" >
                                <span>
                                    XEM THÊM
                                </span>

                            </button>
                        </div>
                    </div>
                    <div className="slider-container">
                        <div className="space-bot-top-slider">
                            <Slider {...settings}>
                                {
                                    dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((e, index) => {
                                        if (e.image) {
                                            var imgSpecialtyData = Buffer.from(e.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className="slider-picture"
                                                key={index}
                                                onClick={() => this.changeDirectionToMSpecialty(e)}
                                            >
                                                <div className="slider-img" style={{ backgroundImage: `url('${imgSpecialtyData}')` }}>
                                                    <span className="video-icon">
                                                        <i className="fas fa-video"></i>
                                                    </span>

                                                </div>
                                                <div className="slider-picture-title">
                                                    <span>
                                                        {e.name}
                                                    </span>

                                                </div>

                                            </div>
                                        )
                                    })

                                }


                            </Slider>
                        </div>

                    </div>

                </div>
                <div className="container-area">
                    <div className="container-title">
                        <div className="container-title1">
                            Cơ sở y tế nổi bật
                        </div>
                        <div className="container-title2">
                            <button type="button" >
                                <span>
                                    XEM THÊM
                                </span>

                            </button>
                        </div>
                    </div>
                    <div className="slider-container">
                        <div className="space-bot-top-slider">
                            <Slider {...settings}>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                                <div className="slider-picture--factory">
                                    <div className="slider-img--factory">
                                        <span className="video-icon--factory">
                                            <i className="fas fa-video"></i>
                                        </span>

                                    </div>
                                    <div className="slider-picture-title--factory">
                                        <span>
                                            Tư vấn, trị liệu Tâm lý từ xa
                                        </span>

                                    </div>

                                </div>
                            </Slider>
                        </div>

                    </div>

                </div>
                <div className="doctor-outstanding">
                    <div className="container-title">
                        <div className="container-title1">
                            Bác sĩ nổi bật tuần qua
                        </div>
                        <div className="container-title2">
                            <button type="button" >
                                <span>
                                    TÌM KIẾM
                                </span>

                            </button>
                        </div>
                    </div>
                    <div className="slider-container">
                        <div className="space-bot-top-slider">
                            <Slider {...settings}>

                                {
                                    dataDoctor && dataDoctor.length > 0 &&
                                    dataDoctor.map((value, index) => {
                                        let imageDoctor;
                                        if (value.image) {

                                            imageDoctor = Buffer.from(value.image, 'base64').toString('binary');

                                        }
                                        let infoVi;
                                        let infoEn;
                                        if (!value.positionData.valueEn || !value.positionData.valueVi) {
                                            infoVi = `${value.positionid}, ${value.lastName} ${value.firstName}`
                                            infoEn = `${value.positionid}, ${value.firstName} ${value.lastName}`
                                        } else {
                                            infoVi = `${value.positionData.valueVi}, ${value.lastName} ${value.firstName}`
                                            infoEn = `${value.positionData.valueEn}, ${value.firstName} ${value.lastName}`
                                        }

                                        return (
                                            <div className="slider-doctor" key={index}
                                                onClick={() => this.onClickDoctorOutStanding(value)}
                                            >
                                                <div className="slider-doctor-picture">
                                                    <div className="slider-doctor-img"
                                                        style={{ backgroundImage: `url(${imageDoctor})` }}
                                                    >
                                                        <span className="video-icon">
                                                            <i className="fas fa-video"></i>
                                                        </span>


                                                    </div>
                                                    <div className="info-doctor">
                                                        {
                                                            language === languages.VI ? infoVi : infoEn
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>

                    </div>

                </div>
                <div className="downloadApp-area">
                    <div className="downloadApp">

                        <div className="downloadAppContainer">
                            <div className="downloadApp-img">
                                <img src="https://bookingcare.vn/assets/anh/bookingcare-app-2020.png" />
                            </div>

                            <div className="downloadApp-title">
                                <div className="downloadApp-title1">
                                    <span>
                                        Tải ứng dụng BookingCare
                                    </span>

                                </div>
                                <div className="downloadApp-title2">
                                    <ul>
                                        <li>
                                            <i className="fas fa-check"></i>
                                            <span>
                                                Đặt khám nhanh hơn
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fas fa-check"></i>
                                            <span>
                                                Nhận thông báo từ hệ thống
                                            </span>
                                        </li>
                                        <li>
                                            <i className="fas fa-check"></i>
                                            <span>
                                                Nhận hướng dẫn đi khám chi tiết
                                            </span>
                                        </li>
                                    </ul>

                                </div>
                                <div className="downloadApp-title3">

                                </div>
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
        isLoggedIn: state.user.isLoggedIn,
        isLoggedInPatient: state.patient.isLoggedInPatient,
        language: state.app.language,
        dataDoctor: state.admin.dataDoctor,
        dataSpecialty: state.doctor.dataSpecialty,
        dataConsultant: state.doctor.dataConsultant,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        getDataDoctorLimit: () => dispatch(fetchDoctorLimitStart()),
        getAllCodePosition: () => dispatch(adminPositionStart()),
        getAllSpecialty: () => dispatch(allSpecialty()),
        getAllConsultant: () => dispatch(allConsultant()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));