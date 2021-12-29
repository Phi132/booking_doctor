import React, { Component, Fragment } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonUtils } from '../../../../utils';
import './Consultant.scss';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { languages } from '../../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import * as services from '../../../../services';
import { toast, Zoom } from 'react-toastify';
import _ from 'lodash';
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../../../doctor/schedules/Loading';




class Consultant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            urlImg: '',
            isOpenImg: false,
            contentHTMLconsultants: '',

            isLoading: false,
        }
    }
    changeNameSpecialty = (e) => {
        this.state.name = e.target.value;

    }
    onChangeIMG = async (e) => {
        let imgData = e.target.files;
        let fileImg = imgData[0];
        let base64 = await CommonUtils.getBase64(fileImg);
        let urlImg = URL.createObjectURL(fileImg);
        this.setState({
            image: base64,
            urlImg
        })

    }

    onChangeCKE = (event, editor) => {
        const data = editor.getData();
        this.setState({
            contentHTMLconsultants: data
        });

    }
    onBlurCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }
    onFocusCKE = (event, editor) => {
        //console.log('Blur.', editor);
    }

    // }
    onSubmitSpeacialty = async (e) => {
        let { image, name, contentHTMLconsultants } = this.state;
        let { language } = this.props;
        this.setState({
            isLoading: true
        })
        let response = await services.saveConsultant({
            name,
            image,
            contentHTMLconsultants
        });
        this.setState({
            isLoading: false
        })
        if (response && response.data.responseRemoteConsultant && response.data.responseRemoteConsultant.err === 0) {
            this.setState({
                name: '',
                image: '',
                contentHTMLconsultants: '',
            })
            if (language === languages.VI) {
                toast.success("Lưu Thành Công", {
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
                toast.success("Save Success", {
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
                toast.warn("Lưu Thất Bại", {
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
                toast.warn("Save Failure", {
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
        let { urlImg, isOpenImg } = this.state
        return (
            <Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner={<Loading />}
                >
                    <div className="main-medical-specailty">
                        <div className="title-main">
                            <FormattedMessage id="main-title-admin.specialty.consultation" />
                        </div>

                        <div className="manage-container">
                            <div className="name-specialty">
                                <div className="name-medical-specialty">
                                    <FormattedMessage id="main-content-admin.consultant.name" />
                                </div>
                                <div className="input-name-medical-specialty">
                                    <input type="text"
                                        onChange={(e) => this.changeNameSpecialty(e)}
                                        placeholder='.................' />
                                </div>
                            </div>
                            <div className="image-specialty">
                                <div className="title-upload-img">
                                    <FormattedMessage id="main-content-admin.consultant.image" />
                                </div>
                                <div className="upload-image">
                                    <button type="button" className="btn-upload-image" htmlFor="img-specialty">
                                        <label className="label-upload-image" htmlFor="imgSpecialty">
                                            <FormattedMessage id="main-content-admin.consultant.uploadImg" />
                                        </label>
                                    </button>
                                    <input type="file" id="imgSpecialty"
                                        onChange={(e) => this.onChangeIMG(e)}
                                        hidden />
                                    <div className="preview-image" onClick={() => {
                                        this.setState({
                                            isOpenImg: true
                                        })
                                    }}
                                        style={{ backgroundImage: `url('${urlImg}')` }}>
                                        {isOpenImg && (
                                            <Lightbox
                                                mainSrc={urlImg}
                                                onCloseRequest={() => this.setState({ isOpenImg: false })}

                                            />
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className="ckEditor-specialty">
                                <label>
                                    <FormattedMessage id="main-content-admin.consultant.ckEditor" />
                                </label>
                                <div className="edit">
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={this.state.contentHTMLconsultants}
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

                        </div>
                        <div className="btn-submit-specialty">
                            <button type="submit"
                                className="submit-btn-specialty"
                                onClick={(e) => this.onSubmitSpeacialty(e)}
                            >
                                <FormattedMessage id="crudBtn.submit" />

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
        // allDataDoctors: state.admin.dataAllDoctors,
        language: state.app.language,
        // time: state.doctor.time,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.getAllDoctors()),
        CreateInfoDoctor: (data) => dispatch(actions.CreateInfoDoctor(data)),
        getTime: () => dispatch(actions.doctorActionStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Consultant);



