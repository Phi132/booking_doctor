import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './CKeditorInfo.scss';

import Select from 'react-select';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { languages, manageActions } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import * as service from '../../../services'
import { toast, Zoom } from 'react-toastify';


class CKeditorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentCKEditor: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            idDoctor: '',
            action: '',

            allSpecialty: [],
            allNameSpecialty: [],
            specialtyId: 0,
        }
    }

    async componentDidMount() {
        this.props.getAllDoctors();
        let resSpecialty = await service.getNameSpecialty();

        if (resSpecialty.data && resSpecialty.data.err === 0) {
            let buildDataSpecialty = this.buildSpecialtyOption(resSpecialty.data.dataSpecialty);
            //console.log(buildDataSpecialty);
            if (buildDataSpecialty && buildDataSpecialty.length > 0) {
                this.setState({
                    allSpecialty: resSpecialty.data.dataSpecialty,
                    allNameSpecialty: buildDataSpecialty
                })
            }

        }

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
    buildSpecialtyOption = (data) => {
        let option = [];
        if (data && data.length > 0) {

            data.map((item, index) => {
                let object = {};
                object.label = item.name;
                object.value = item.id;

                option.push(object);

            })
        }
        return option;
    }


    onChangeTextArea = (e) => {
        this.setState({
            description: e.target.value
        })

    }
    handleChange = async (selectedOption) => {
        
        this.setState({
            selectedOption,
            idDoctor: selectedOption.value

        }, async () => {
            // save ckeditor
            if (this.state.idDoctor) {
                let dataDescriptDoctor = await service.doctorDetail(this.state.idDoctor);
                console.log("test data in backend", dataDescriptDoctor);
                if (dataDescriptDoctor.data.dataDetailDoctor &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.contentHTML &&
                    dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.description
                ) {
                    this.setState({
                        contentHTML: dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.contentHTML,
                        description: dataDescriptDoctor.data.dataDetailDoctor.dataDetail.Ckeditor.description,

                        action: 'edit',
                    })
                } else {
                    this.setState({
                        contentHTML: '',
                        description: '',
                        action: 'create',

                    })
                }

            }

        })
    }
    changeSpecialty = (selectedOption) => {
        this.setState({
            specialtyId: selectedOption.value
        })
    }

    onChangeCKE = (event, editor) => {
        const data = editor.getData();
        this.setState({
            contentHTML: data
        })
    }
    onBlurCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }
    onFocusCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }
    onSubmitCreateUser = async () => {
        if (this.state.action === 'create') {
            this.props.CreateInfoDoctor({
                contentHTML: this.state.contentHTML,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                specialtyId: this.state.specialtyId,
            })
            setTimeout(() => {
                this.setState({
                    contentHTML: '',
                    selectedOption: '',
                    description: '',
                })
            }, 400);
        }
        else {
            // luuw
            let isStore = await service.storeDoctor({
                contentHTML: this.state.contentHTML,
                description: this.state.description,
                doctorId: this.state.idDoctor,
                specialtyId: this.state.specialtyId,
            })
            if (isStore && isStore.data && isStore.data.err === 0) {
                toast.success("Edit User Success", {
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
                toast.error("Edit User Failure", {
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

    render() {

        let { allDoctors, idDoctor } = this.state;
        return (
            <div className="CKeditorInfo">
                <div className="title-manager-doctor">
                    <FormattedMessage id="header.doctorOptions.adjust" />
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
                            <FormattedMessage id="header.doctorOptions.info" />
                        </label>
                        <textarea rows="4" className="form-control"
                            onChange={(e) => this.onChangeTextArea(e)}
                            value={this.state.description}
                        ></textarea>
                    </div>

                    <div className="specialty-clinic-area">
                        <div className="select-area-specialty">
                            <label>
                                <FormattedMessage id="header.doctorOptions.chooseSpecialty" />
                            </label>
                            <div className="select-doctor">
                                <Select
                                    options={this.state.allNameSpecialty}
                                    onChange={this.changeSpecialty}
                                    // value={this.state.selectedOption}
                                    //defaultInputValue={{ label: `${labelSelect}`, value: 0 }}
                                    placeholder={"Choose Specialty"}
                                    className="selecte-specialty"

                                />
                            </div>
                        </div>
                        <div className="select-area-clinic">
                            <label>
                                <FormattedMessage id="header.doctorOptions.chooseClinic" />
                            </label>
                            <div className="select-doctor">
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
                            <FormattedMessage id="header.doctorOptions.update" />
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
                        onClick={(e) => this.onSubmitCreateUser()}
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
        );
    }
}
const mapStateToProps = state => {
    return {
        allDataDoctors: state.admin.dataAllDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        CreateInfoDoctor: (data) => dispatch(actions.CreateInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CKeditorInfo);



