import React, { Component } from 'react';


import './DoctorAppointment.scss';

import Select from 'react-select';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { languages, actionsManage, dateFormat } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import * as service from '../../../services'
import { toast, Zoom } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';




class DoctorAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            description: '',
            allDoctors: [],
            idDoctor: '',
            action: '',

            appointmentDate: '',
            dateCurrentChoose: '',
            appointmentTime: [],
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getTime();


    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDataDoctors !== this.props.allDataDoctors) {
            let dataSelect = this.buildSelectOption(this.props.allDataDoctors)

            this.setState({
                allDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildSelectOption(this.props.allDataDoctors)

            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.time !== this.props.time) {
            let data = this.props.time;
            console.log("test data time", this.props.time);
            let currentDate = new Date();
            let currentDateWithOutTime = moment(new Date()).startOf('day');
            let defaultCurrentDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
            if (data && data.length > 0) {
                data = data.map((item, index) => ({
                    ...item,
                    isActiveTime: false
                }))
            }
            this.setState({
                appointmentTime: data,
                appointmentDate: defaultCurrentDate,
                dateCurrentChoose: currentDateWithOutTime,
            })
        }
    }
    buildSelectOption = (data) => {
        let option = [];

        let { language } = this.props;
        if (data && data.length > 0) {

            data.map((item, index) => {
                let object = {};
                let doctorVi = `${item.lastName} ${item.firstName}`;
                let doctorEn = `${item.firstName} ${item.lastName}`;

                object.label = language === languages.VI ? doctorVi : doctorEn;
                object.value = item.id;

                option.push(object);

            })
        }
        return option;

    }


    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption,
            idDoctor: selectedOption.value

        }, async () => {
            if (this.state.idDoctor) {
                let dataDescriptDoctor = await service.doctorDetail(this.state.idDoctor);
                console.log("kiem tra ngay hen", dataDescriptDoctor);
                if (dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.contentHTML &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.description
                ) {
                    this.setState({
                        contentHTML: dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.contentHTML,
                        description: dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.description,

                        action: actionsManage.EDIT,
                    })
                } else {
                    this.setState({
                        contentHTML: '',
                        description: '',
                        action: actionsManage.CREATE,

                    })
                }

            }

        })


    }


    ChangeDate = (date) => {
        if (date && date.length > 0) {
            let chooseDate = moment(date[0]).format(dateFormat.SEND_TO_SERVER);
            let currentDateWithOutTime = moment(date[0]).startOf('day');
            this.setState({
                appointmentDate: chooseDate,
                dateCurrentChoose: currentDateWithOutTime,
            })
        }

    }
    onClickTime = (time) => {
        let { appointmentTime } = this.state;
        //time.isActiveTime = !time.isActiveTime;

        if (appointmentTime && appointmentTime.length > 0) {
            appointmentTime = appointmentTime.map((value, index) => {
                if (value.id === time.id) {
                    value.isActiveTime = !value.isActiveTime;
                }
                return value
            })
        }

        this.setState({
            appointmentTime: appointmentTime
        })

    }
    onSubmitData = async () => {
        let { appointmentDate, appointmentTime, selectedOption, dateCurrentChoose } = this.state;


        let chooseDateAppointment = new Date(dateCurrentChoose).getTime();
        let formatDate = moment(chooseDateAppointment).startOf('day').valueOf();
        //console.log(formatDate);

        let detailSchedule = [];
        if (_.isEmpty(selectedOption)) {
            toast.warn("Chọn Bác Sĩ");

        } else {
            if (appointmentTime && appointmentTime.length > 0) {
                let selectTime = appointmentTime.filter((item) => item.isActiveTime === true);

                if (selectTime && selectTime.length > 0) {
                    selectTime.map((item, index) => {
                        let obj = {};
                        obj.appointment = appointmentDate;
                        obj.timetype = item.keyMap;
                        obj.timestamp = '' + formatDate;
                        obj.doctorid = selectedOption.value;

                        detailSchedule.push(obj)
                    })


                } else {
                    toast.warn("Chọn Giờ Khám");
                }
            }
            if (detailSchedule && detailSchedule.length > 0) {
                let saveSchedule = await service.saveSchedule({ detailSchedule });
                console.log("test khi gui appointment", saveSchedule.data);

                if (saveSchedule && saveSchedule.data &&
                    saveSchedule.data.saveScheduleDoctor &&
                    saveSchedule.data.saveScheduleDoctor.err === 0) {

                    toast.success("Gửi Thành Công");

                }
                else if (saveSchedule && saveSchedule.data &&
                    saveSchedule.data.saveScheduleDoctor &&
                    saveSchedule.data.saveScheduleDoctor.err === 6) {

                    toast.warn("Đã Có Lịch Hẹn Này");

                }
                else {
                    toast.error("Lỗi gì đó");

                }
            }
        }





    }

    render() {

        let { allDoctors, idDoctor, appointmentDate, appointmentTime,
            currentDate } = this.state;

        return (
            <div className="CKeditorInfo">
                <div className="title-manager-doctor">
                    <FormattedMessage id="schedules.header" />
                </div>

                <div className="edit-doctor">

                    <div className="select-area">
                        <label>
                            <FormattedMessage id="header.doctorOptions.chooseDr" />
                        </label>
                        <div className="select-doctor">
                            <Select
                                options={this.state.allDoctors}
                                onChange={this.handleChange}
                                value={this.state.selectedOption}
                                //defaultInputValue={{ label: `${labelSelect}`, value: 0 }}
                                placeholder={"Choose Doctor"}

                            />
                        </div>
                    </div>
                    <div className="content-text">
                        <label>
                            <FormattedMessage id="schedules.chooseDate" />
                        </label>
                        <div className="select-date">
                            <DatePicker
                                onChange={this.ChangeDate}
                                value={this.state.appointmentDate}
                                placeholder={this.state.appointmentDate ? this.state.appointmentDate : 'sdasd'}
                                minDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className="ckeditor-area">
                        <label>
                            <FormattedMessage id="header.doctorOptions.update" />
                        </label>
                        <div className="edit">
                            {
                                appointmentTime && appointmentTime.map((time, index) => {

                                    return (
                                        <button type="button"
                                            className={time.isActiveTime === true ? "btn btn-data active" : "btn btn-data"}
                                            key={index}
                                            onClick={() => this.onClickTime(time)}
                                        >
                                            <div className="data-time">
                                                {time.valueEn}
                                            </div>

                                        </button>
                                    )
                                })
                            }

                        </div>
                    </div>


                    <button type="submit"
                        className="btn btn-primary submit-btn"
                        onClick={(e) => this.onSubmitData()}
                    >
                        <span className="btn-submit">
                            <FormattedMessage id="crudBtn.save" />



                        </span>


                    </button>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        allDataDoctors: state.admin.dataAllDoctors,
        language: state.app.language,
        time: state.doctor.time,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        CreateInfoDoctor: (data) => dispatch(actions.CreateInfoDoctor(data)),
        getTime: () => dispatch(actions.doctorActionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAppointment);



