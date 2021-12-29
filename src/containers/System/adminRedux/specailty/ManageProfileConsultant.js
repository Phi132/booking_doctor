import React, { Component, Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonUtils } from '../../../../utils';
import './ManageProfileConsultant.scss';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { languages, actionsManage } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import * as services from '../../../../services';
import { toast, Zoom } from 'react-toastify';
import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../../../doctor/schedules/Loading';
import Select from 'react-select';
import axios from 'axios';




class ManageProfileConsultant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            urlImg: '',
            isOpenImg: false,

            contentHTML: '',
            description: '',

            dataConsultantOption: [],
            allTypeConsultant: [],

            selectedOptionConsultant: '',
            idConsultantUser: '',

            selectTypeConsultent: '',
            idTypeConsultant: '',

            action: actionsManage.CREATE,

            isLoading: false,
        }
    }
    buildUserConsultant = (data) => {
        let option = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((value, index) => {

                let object = {};
                let dataVi = `${value.lastName} ${value.firstName}`;
                let dataEn = `${value.firstName} ${value.lastName}`;

                object.label = language === languages.VI ? dataVi : dataEn;
                object.id = value.id;
                option.push(object);
            })
        }
        return option;
    }
    buildTypeConsultant = (data) => {
        let option = [];
        if (data && data.length > 0) {
            data.map((value, index) => {

                let object = {};
                object.label = value.name;
                object.id = value.id;
                option.push(object);
            })
        }
        return option;
    }

    async componentDidMount() {
        this.props.getAllUserConsultant();
        let typeConsultant = await services.allTypeConsultant();
        if (typeConsultant.data.responese && typeConsultant.data.responese.err === 0) {
            let data = typeConsultant.data.responese;
            let selectTypeConsultant = this.buildTypeConsultant(data.dbConsultant);
            this.setState({
                allTypeConsultant: selectTypeConsultant,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.AllUserConsultant !== this.props.AllUserConsultant) {
            let dataSelect = this.buildUserConsultant(this.props.AllUserConsultant)
            console.log(this.props.AllUserConsultant);
            this.setState({
                dataConsultantOption: dataSelect

            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildUserConsultant(this.props.AllUserConsultant)

            this.setState({
                dataConsultantOption: dataSelect
            })
        }
    }

    handleChangeConsultant = (selected) => {
        this.setState({
            selectedOptionConsultant: selected,
            idConsultantUser: selected.id,
        }, async () => {
            if (this.state.idConsultantUser) {
                // let resUserConsultantById = await services.UserConsultantById(this.state.idConsultantUser);
                let resTypeConsultantByDoctorId = await services.typeConsultantbyIdDoctor(this.state.idConsultantUser);
                console.log("test change option ", resTypeConsultantByDoctorId);
                if (resTypeConsultantByDoctorId.data &&
                    resTypeConsultantByDoctorId.data.typeConsultant &&
                    resTypeConsultantByDoctorId.data.typeConsultant.err === 0 &&
                    resTypeConsultantByDoctorId.data.typeConsultant.dataDetail
                ) {
                    let data = resTypeConsultantByDoctorId.data.typeConsultant.dataDetail;
                    let arr = [];
                    arr.push(data.Consultant)
                    let selectTypeConsultant = this.buildTypeConsultant(arr);
                    console.log(selectTypeConsultant);
                    this.setState({
                        description: data.description,
                        contentHTML: data.contentHTML,
                        selectTypeConsultent: selectTypeConsultant,
                        idTypeConsultant: selectTypeConsultant[0].id,
                        action: actionsManage.EDIT,
                    })
                } else {
                    this.setState({
                        description: '',
                        contentHTML: '',
                        selectTypeConsultent: '',
                        action: actionsManage.CREATE,
                    })
                }
            }

        })

    }

    changeTypeConsultant = (selected) => {
        this.setState({
            selectTypeConsultent: selected,
            idTypeConsultant: selected.id

        })
    }
    onChangeTextArea = (e) => {
        this.setState({
            description: e.target.value,
        })

    }

    onChangeCKE = (event, editor) => {
        const data = editor.getData();
        this.setState({
            contentHTML: data
        });

    }
    onBlurCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }
    onFocusCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }

    // }
    onSubmitUserConsultant = async (e) => {
        let { contentHTML, action, selectedOptionConsultant, idConsultantUser } = this.state;
        let { language } = this.props;
        this.setState({
            isLoading: true
        })
        if (selectedOptionConsultant) {
            if (action === 'create') {
                //create
                let isSuccessCreate = await services.CreateProfileConsultant({
                    contentHTML: this.state.contentHTML,
                    description: this.state.description,
                    doctorId: this.state.idConsultantUser,
                    consultantId: this.state.idTypeConsultant,
                })
                console.log(isSuccessCreate);
            } else if (action === 'edit') {
                let isSuccessUpdate = await services.UpdateProfileConsultant({
                    contentHTML: this.state.contentHTML,
                    description: this.state.description,
                    doctorId: this.state.idConsultantUser,
                    consultantId: this.state.idTypeConsultant,
                });
                if (isSuccessUpdate && isSuccessUpdate.data &&
                    isSuccessUpdate.data.responese &&
                    isSuccessUpdate.data.responese.err === 0) {
                    toast.success("Edit profile consultant Success", {
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
                    toast.error("Edit profile consultant Failure", {
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
        } else {
            toast.error("Chọn Tư Vấn Viên", {
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

        // let response = await services.saveSpecialty({
        //     name,
        //     image,
        //     contentHTML
        // });
        this.setState({
            isLoading: false
        })
        // if (response && response.data.responseMedicalSpecialty && response.data.responseMedicalSpecialty.err === 0) {
        //     this.setState({
        //         name: '',
        //         image: '',
        //         contentHTML: '',
        //     })
        //     if (language === languages.VI) {
        //         toast.success("Lưu Thành Công", {
        //             transition: Zoom,
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     } else {
        //         toast.success("Save Success", {
        //             transition: Zoom,
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }

        // } else {
        //     if (language === languages.VI) {
        //         toast.warn("Lưu Thất Bại", {
        //             transition: Zoom,
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     } else {
        //         toast.warn("Save Failure", {
        //             transition: Zoom,
        //             position: "bottom-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }

        // }

    }

    render() {
        let { urlImg, isOpenImg, allTypeConsultant } = this.state

        return (
            <Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner={<Loading />}
                >
                    <div className="CKeditorInfo">
                        <div className="title-manager-doctor">

                            <FormattedMessage id="main-title-admin.specialty.profileConsultation.title" />
                        </div>

                        <div className="edit-doctor">

                            <div className="select-area">
                                <label>
                                    <FormattedMessage id="main-title-admin.specialty.profileConsultation.chooseProfile" />
                                </label>
                                <div className="select-doctor">
                                    {/* choose profile consultant */}
                                    <Select
                                        options={this.state.dataConsultantOption}
                                        onChange={this.handleChangeConsultant}
                                        value={this.state.selectedOptionConsultant}

                                        placeholder={"Choose Doctor"}

                                    />
                                </div>
                            </div>
                            <div className="content-text">
                                <label>
                                    <FormattedMessage id="main-title-admin.specialty.profileConsultation.infoIntro" />
                                </label>
                                <textarea rows="4" className="form-control"
                                    onChange={(e) => this.onChangeTextArea(e)}
                                    value={this.state.description}
                                ></textarea>
                            </div>

                            <div className="specialty-clinic-area">
                                <div className="select-area-specialty">
                                    <label>
                                        <FormattedMessage id="main-title-admin.specialty.profileConsultation.chooseConsultant" />
                                    </label>
                                    <div className="select-doctor">
                                        {/* choose type consultant */}
                                        <Select
                                            options={this.state.allTypeConsultant}
                                            onChange={this.changeTypeConsultant}
                                            value={this.state.selectTypeConsultent}
                                            //defaultInputValue={{ label: `${labelSelect}`, value: 0 }}
                                            placeholder={"Choose Specialty"}
                                            className="selecte-specialty"

                                        />
                                    </div>
                                </div>
                                <div className="select-area-clinic">
                                    <label>
                                        <FormattedMessage id="main-title-admin.specialty.profileConsultation.chooseClinic" />
                                    </label>
                                    <div className="select-doctor">
                                        {/* choose clinic */}
                                        <Select
                                            options={this.state.allDoctors}
                                            // onChange={this.handleChange}
                                            // value={this.state.selectedOption}
                                            //defaultInputValue={{ label: `${labelSelect}`, value: 0 }}
                                            placeholder={"Choose clinic"}
                                            className="selecte-clinic"

                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="ckeditor-area">
                                <label>
                                    <FormattedMessage id="main-title-admin.specialty.profileConsultation.UpdateInfo" />
                                </label>
                                <div className="edit">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={this.state.contentHTML}
                                        //data={ReactHtmlParser(this.state.contentHTML)}
                                        onReady={editor => { }}
                                        onChange={(event, editor) => { this.onChangeCKE(event, editor) }}
                                        onBlur={(event, editor) => { this.onBlurCKE(event, editor) }}
                                        onFocus={(event, editor) => { this.onFocusCKE(event, editor) }}
                                        onConfig={
                                            {
                                                ckfinder: {
                                                    uploadUrl: '/uploads'
                                                }
                                            }
                                        }


                                    />
                                </div>
                            </div>


                            <button type="submit"
                                className="btn btn-primary submit-btn"
                                onClick={(e) => this.onSubmitUserConsultant()}
                            >
                                <span className="btn-submit">
                                    {
                                        this.state.action === 'edit' ? <FormattedMessage id="crudBtn.save" /> :
                                            <FormattedMessage id="crudBtn.submit" />
                                    }



                                </span>


                            </button>
                        </div>

                    </div>
                </LoadingOverlay>
            </Fragment >
        );

    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        // time: state.doctor.time,
        AllUserConsultant: state.doctor.AllUserConsultant,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUserConsultant: () => dispatch(actions.allUserConsultant()),
        CreateInfoDoctor: (data) => dispatch(actions.CreateInfoDoctor(data)),
        getTime: () => dispatch(actions.doctorActionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProfileConsultant);



