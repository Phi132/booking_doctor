import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Appointment.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import * as actions from '../../../store/actions';
import * as services from '../../../services';
import { languages } from '../../../utils/constant';
import moment from 'moment';
// import localization from 'moment/locale/vi';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { toast, Zoom } from 'react-toastify';
// import { sendEmailToPatient } from '../../../services/sendEmailToPatient';
// import LoadingOverlay from 'react-loading-overlay';
// import Loading from './Loading';

class Appointment extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.state = {
            seventDate: [],
            dataAppointment: [],

            date: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
            id: this.props.idDoctor,

            orderDetail: [],

            isLoggedInPatient: false,


            namePatient: '',
            phoneNumberPatient: 0,
            birthday: 0,
            matter: '',
            emailPatient: '',
            dateAppointment: '',
            AllCodesValueTime: {},

            seeMorePrice: false,

            isLoading: false,

        }
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    async componentDidMount() {

        let arrDate = [];
        var { language } = this.props;

        for (let i = 0; i < 7; i++) {
            let obj = {};
            let date = new Date();
            if (language === languages.VI) {

                let formatDate = moment(date).add(i, 'days').format('dddd - DD/MM');
                obj.date = '' + formatDate;

            } else {
                let formatDate = moment(date).add(i, 'days').locale('en').format('dddd - DD/MM');
                obj.date = '' + formatDate;

            }
            obj.valueOf = moment(date).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj)

        }
        if (arrDate && arrDate.length > 1) {
            this.setState({
                seventDate: arrDate
            })
        }

        this.setState({
            date: moment(new Date()).add(0, 'days').startOf('day').valueOf(),
            id: this.props.idDoctor
        })

        let { date, id } = this.state
        if (date && id) {
            let dataAppointment = await services.getDetailAppointment(date, id);
            if (dataAppointment && dataAppointment.data.detailAppointment.err === 0) {
                this.setState({
                    dataAppointment: dataAppointment.data.detailAppointment.findAppointment
                })
            }
        }
        if (this.props.isLoggedInPatient) {
            this.setState({
                isLoggedInPatient: this.props.isLoggedInPatient,
            })
        }


    }
    componentDidUpdate(prevProps, prevState) {
        var { language } = this.props;
        let arrDate = [];

        if (prevProps.language !== this.props.language) {
            for (let i = 0; i < 7; i++) {
                let obj = {};
                let date = new Date();

                if (language === languages.VI) {

                    let formatDate = moment(date).add(i, 'days').format('dddd - DD/MM');
                    obj.date = '' + formatDate;

                } else {
                    let formatDate = moment(date).add(i, 'days').locale('en').format('dddd - DD/MM');
                    obj.date = '' + formatDate;

                }
                obj.valueOf = moment(date).add(i, 'days').startOf('day').valueOf();
                arrDate.push(obj)


            }
            if (arrDate && arrDate.length > 1) {
                this.setState({
                    seventDate: arrDate
                })
            }
        }
        if (prevProps.idDoctor !== this.props.idDoctor) {
            this.setState({
                id: this.props.idDoctor
            })
        }
        if (prevProps.isLoggedInPatient !== this.props.isLoggedInPatient) {
            this.setState({
                isLoggedInPatient: this.props.isLoggedInPatient,
            })
        }

    }
    onChangeDate = async (e) => {
        let date = +e.target.value;
        let id = this.props.idDoctor;
        this.setState({
            date,
            id
        })

        if (date && id) {
            let dataAppointment = await services.getDetailAppointment(date, id);
            if (dataAppointment && dataAppointment.data.detailAppointment.err === 0) {
                this.setState({
                    dataAppointment: dataAppointment.data.detailAppointment.findAppointment
                })
            } else {
                this.setState({
                    dataAppointment: []
                })
            }
        }


    }
    onClickAppointment = (data) => {
        let { dataAppointment, id, date } = this.state;
        const { isLoggedInPatient, patientInfo,
            match, location, history } = this.props;

        this.setState({
            dateAppointment: data.appointment,
            AllCodesValueTime: data.Allcode
        })

        if (!isLoggedInPatient) {
            this.props.history.push("/login-patient-user");
        } else {
            let arrOrder = [];
            let obj = {};
            var patientid = patientInfo.id;
            obj.timetype = data.timetype;
            obj.date = '' + date;
            obj.doctorid = id;
            obj.patientid = patientid;
            obj.statusid = 'S1';
            arrOrder.push(obj);
            if (arrOrder && arrOrder.length > 0) {
                this.setState({
                    orderDetail: arrOrder
                })
            }

        }




    }
    onChangeModalOrderAppointment = (e, id) => {

        let keyPatient = id;
        let valuePatient = e.target.value;
        if (keyPatient === "namePatient") {
            this.setState({
                namePatient: valuePatient
            })
        }
        if (keyPatient === "phoneNumberPatient") {
            this.setState({
                phoneNumberPatient: valuePatient
            })
        }
        if (keyPatient === "birthday") {
            this.setState({
                birthday: valuePatient
            })
        }
        if (keyPatient === "matter") {
            this.setState({
                matter: valuePatient
            })
        }
        if (keyPatient === "emailPatient") {
            this.setState({
                emailPatient: valuePatient
            })
        }

    }
    submitInfoPatient = async () => {
        let { orderDetail, namePatient,
            phoneNumberPatient, birthday, matter,
            emailPatient, AllCodesValueTime, dateAppointment } = this.state;
        var { language } = this.props;



        this.props.isLoading(true);


        let sendEmail = await services.sendEmailToPatient({
            namePatient,
            phoneNumberPatient,
            birthday,
            matter,
            emailPatient,
            language,
            dateAppointment,
            doctorid: orderDetail[0].doctorid,
            timeEn: AllCodesValueTime.valueEn,
            timeVi: AllCodesValueTime.valueVi,
            date: orderDetail[0].date,
            timetype: orderDetail[0].timetype,

        });

        let submitInfo = await services.submitPatientInfo(orderDetail);
        
        this.props.isLoading(false);

        if (submitInfo.data && submitInfo.data.submit &&
            submitInfo.data.submit.err === 0) {

            if (language === languages.VI) {
                toast.success("Đặt Thành Công Vui Lòng Kiểm Tra Email ", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (language === languages.EN) {
                toast.success("Success!! please check your email", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } else if (submitInfo.data && submitInfo.data.submit &&
            submitInfo.data.submit.err === 9) {
            if (language === languages.VI) {
                toast.warn("Bác Sĩ Đã Có Lịch Khám Giờ Này", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.warn("The Doctor Has Appointment", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        } else {
            if (language === languages.VI) {
                toast.error("Tạo Lịch Khám Thất Bại", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error("Create Appointment Failure", {
                    transition: Zoom,
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }


        }

    }
    onClickSeeMorePrice = () => {
        this.setState({
            seeMorePrice: !this.state.seeMorePrice
        })
    }

    render() {

        var { language } = this.props;
        let { seventDate, date, id, dataAppointment, isLoggedInPatient } = this.state;


        return (
            <React.Fragment>

                <div className="day-section">
                    <select className="select-day"
                        onChange={(e) => this.onChangeDate(e)}
                    >
                        {
                            seventDate && seventDate.length > 0 &&
                            seventDate.map((item, index) => {
                                return (
                                    <option key={index}
                                        value={item.valueOf}
                                    >
                                        {item.date}
                                    </option>
                                )
                            })
                        }

                    </select>
                </div>
                <div className="title-appointment">
                    <div className="icon-appointment">
                        <i className="far fa-calendar-alt"></i>
                    </div>
                    <div className="text-title">
                        <FormattedMessage id="doctor-outstanding.schedules" />
                    </div>
                </div>
                <div className="info__schedules">
                    <div className="appointment-left">

                        {
                            dataAppointment && dataAppointment.length === 0 ?

                                <h2 className="data-time">
                                    {language === languages.VI ? "Không Có Lịch Khám Ngày Này" :
                                        "This day has no appointment"
                                    }
                                </h2>

                                :
                                dataAppointment.map((item, index) => {

                                    return (
                                        <button type="button"
                                            className="btn btn-data"
                                            data-toggle={isLoggedInPatient ? "modal" : ""}
                                            data-target={isLoggedInPatient ? "#exampleModalCenter" : ""}
                                            key={index}
                                            onClick={() => this.onClickAppointment(item)}
                                        >
                                            <div className="data-time">
                                                {language === languages.VI ? item.Allcode.valueVi :
                                                    item.Allcode.valueEn
                                                }
                                            </div>

                                        </button>
                                    )

                                })
                        }



                        <div className="booking">
                            <span className="choose">
                                <FormattedMessage id="doctor-outstanding.choose" />
                            </span>
                            <i className="far fa-hand-point-up"></i>
                            <span className="book">
                                <FormattedMessage id="doctor-outstanding.book" />
                            </span>

                        </div>
                    </div>
                    {/* modal */}
                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">
                                        Đặt Lịch Khám Bệnh
                                    </h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* <span>
                                        {JSON.stringify(orderDetail)}
                                    </span> */}
                                    <div className="title-name">Họ Tên Bệnh Nhân</div>
                                    <div className="name-customer">
                                        <input type="text"
                                            className="input-name-customer"
                                            onChange={(e) => this.onChangeModalOrderAppointment(e, "namePatient")}
                                        />
                                    </div>
                                    <div className="gender">
                                        <form>
                                            <input type="radio" id="gender_male" name="gender" value="M" />
                                            <label htmlFor="gender_male" className="label-gender-1">Nam</label><br></br>
                                            <input type="radio" id="gender_female" name="gender" value="F" />
                                            <label htmlFor="gender_female" className="label-gender-2">Nữ</label><br></br>
                                        </form>

                                    </div>
                                    <div className="title-name">Số Điện Thoại</div>
                                    <div className="name-customer">
                                        <input type="text"
                                            className="input-name-customer"
                                            onChange={(e) => this.onChangeModalOrderAppointment(e, "phoneNumberPatient")}

                                        />
                                    </div>
                                    <div className="title-name">Email</div>
                                    <div className="name-customer">
                                        <input type="text"
                                            className="input-name-customer"
                                            onChange={(e) => this.onChangeModalOrderAppointment(e, "emailPatient")}

                                        />
                                    </div>

                                    <div className="title-name">Ngày Sinh</div>
                                    <div className="name-customer">
                                        <input type="text"
                                            className="input-name-customer"
                                            onChange={(e) => this.onChangeModalOrderAppointment(e, "birthday")}
                                        />
                                    </div>
                                    <div className="title-name">Lý Do Khám</div>
                                    <div className="name-customer">
                                        <input type="text"
                                            className="input-name-customer"
                                            onChange={(e) => this.onChangeModalOrderAppointment(e, "matter")}
                                        />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary btn-close-order-modal" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary btn-close-confirm-modal" data-dismiss="modal"
                                        onClick={() => this.submitInfoPatient()}
                                    >
                                        Xác Nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="devide-slash">

                    </div>
                    <div className="appointment-right">
                        <div className="address-clinic">
                            <div className="title-address-clinic">địa chỉ phòng khám</div>
                            <div className="name-clinic">Phòng khám Chuyên khoa Da Liễu</div>
                            <div className="adress">207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                        </div>
                        <div className="price-clinic">
                            <div className="price1">GIÁ KHÁM</div>
                            <div className="price1 price-detail">: 250.000đ</div>
                            <div className="see-more"
                                onClick={() => this.onClickSeeMorePrice()}
                            >
                                <div className={this.state.seeMorePrice ? "detail d-none" : "detail"}
                                >
                                    Xem chi tiết
                                </div>

                            </div>

                        </div>
                        <div className={!this.state.seeMorePrice ? "open-see-more d-none" : "open-see-more"}>
                            <div className="title-see-more-1">
                                <div className="price11">Giá khám: </div>
                                <div className="price1 price-detail">250.000đ</div>
                            </div>
                            <div className="title-see-more-2">
                                <div className="title-see-more-2-1">
                                    Được ưu tiên khám trước khi đật khám qua BookingCare.
                                    Giá khám cho người nước ngoài là 30 USD
                                </div>
                            </div>
                            <div className="title-see-more-3">
                                <div className="title-see-more-3-1">
                                    Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                            </div>
                        </div>
                        <div className="btn-close-see-more"
                            onClick={() => this.onClickSeeMorePrice()}
                        >
                            <div className={!this.state.seeMorePrice ? "close-board-price d-none" : "close-board-price"}
                            >
                                Ẩn Bảng Giá
                            </div>

                        </div>


                    </div>

                </div>


            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataDoctor: state.doctor.doctorInfo,
        isLoggedInPatient: state.patient.isLoggedInPatient,
        patientInfo: state.patient.patientInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Appointment));

