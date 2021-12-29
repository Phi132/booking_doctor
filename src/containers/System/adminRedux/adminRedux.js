import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { languages, manageActions } from '../../../utils/constant';
import { CommonUtils } from '../../../utils';
import GetAllUsers from './GetAllUsers';
import CKeditorInfo from './CKeditorInfo';
import './adminRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            genders: [],
            gender: '',
            roles: [],
            roleid: '',
            positions: [],
            positionid: '',

            urlImg: '',
            baseImage: '',
            isOpenImg: false,
            image: '',

            isCreateNewUser: false,

            idEditUser: '',

            actionCrud: manageActions.CREATE,

        }
    }

    componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        this.props.getPositionStart();

    }
    componentDidUpdate(prevProps, prevState) {
        let { getGenderData, getRoleData, getPositionData } = this.props
        if (this.props.getGenderData !== prevProps.getGenderData) {
            this.setState({
                genders: getGenderData,
                gender: getGenderData && getGenderData.length > 0 ? getGenderData[0].key : ''
            })
        }
        if (this.props.getRoleData !== prevProps.getRoleData) {
            this.setState({
                roles: getRoleData,
                roleid: getRoleData && getRoleData.length > 0 ? getRoleData[0].key : ''
            })
        }
        if (this.props.getPositionData !== prevProps.getPositionData) {
            this.setState({
                positions: getPositionData,
                positionid: getPositionData && getPositionData.length > 0 ? getPositionData[0].key : ''
            })
        }
        if (this.props.dataUserAdmin !== prevProps.dataUserAdmin) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                genders: getGenderData,
                gender: getGenderData && getGenderData.length > 0 ? getGenderData[0].key : '',
                roles: getRoleData,
                roleid: getRoleData && getRoleData.length > 0 ? getRoleData[0].key : '',
                positions: getPositionData,
                positionid: getPositionData && getPositionData.length > 0 ? getPositionData[0].key : '',
            })
        }



    }
    onChangeInputData = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })

    }
    toggle = (modal) => {
        this.setState({
            modal: !modal
        })
    }
    onChangeImage = async (e) => {
        let imgData = e.target.files;
        let fileImg = imgData[0];
        let base64 = await CommonUtils.getBase64(fileImg);
        let urlImg = URL.createObjectURL(fileImg);
        this.setState({
            urlImg: urlImg,
            baseImage: base64,
        })
    }
    onClickOpenImg = () => {
        this.setState({
            isOpenImg: true
        })
    }
    onSubmitCreateUser = () => {

        // tạo mới user
        if (this.state.actionCrud === manageActions.CREATE) {

            this.props.getCreateUserStart({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                positionid: this.state.positionid,
                gender: this.state.gender,
                roleid: this.state.roleid,
                image: this.state.baseImage,
            });
            this.setState({
                actionCrud: manageActions.CREATE,
                urlImg: '',
            })

        }
        // click btn lưu sửa user


        if (this.state.actionCrud === manageActions.EDIT) {
            let data = this.state;
            this.props.editUserStart({
                id: this.state.idEditUser,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                positionid: this.state.positionid,
                gender: this.state.gender,
                roleid: this.state.roleid,
                image: this.state.baseImage,

            });
            this.setState({
                actionCrud: manageActions.CREATE,
                urlImg: '',
            })

        }


    }
    editUserData = (userData) => {
        let baseImg64;
        if (userData.image) {
            baseImg64 = Buffer.from(userData.image, 'base64').toString('binary');

        }

        this.setState({
            idEditUser: userData.id,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            phonenumber: userData.phonenumber,
            positionid: userData.positionid,
            gender: userData.gender,
            roleid: userData.roleid,
            actionCrud: manageActions.EDIT,
            urlImg: baseImg64,
        })
        // console.log("test user data ",userData.positionid);
    }

    render() {

        let { modal, genders, gender, roles,
            roleid, positions, positionid, urlImg,
            isOpenImg, actionCrud } = this.state;
        let { language } = this.props;
        
        return (
            <>
                <div className="container-manager-redux">
                    <div className="form-row">
                        <div className="form-group col-md-12 mb-4 ">
                            <div className="mb-3 mt-2 ">
                                <label htmlFor="inputEmail4">Email</label>
                                <div className="input-area">
                                    <input type="text" className="form-control" value={this.state.email}
                                        name="email" id="inputEmail4" placeholder="Email"
                                        onChange={(e) => this.onChangeInputData(e, 'email')}
                                    />

                                    <span className="bottom"></span>
                                    <span className="right"></span>
                                    <span className="top"></span>
                                    <span className="left"></span>
                                </div>
                                <div className="mb-3 "
                                    hidden={actionCrud === manageActions.CREATE ? false : true}
                                >

                                    <label htmlFor="inputPassword4">Password</label>
                                    <div className="input-area">
                                        <input type="password" className="form-control"
                                            value={this.state.password}
                                            name="password" id="inputPassword4"
                                            placeholder="Password"
                                            onChange={(e) => this.onChangeInputData(e, 'password')}

                                        />

                                        <span className="bottom"></span>
                                        <span className="right"></span>
                                        <span className="top"></span>
                                        <span className="left"></span>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="inputFirstName">FirstName</label>
                                <div className="input-area">
                                    <input type="text" className="form-control" value={this.state.firstName}
                                        name="firstName" id="inputFirstName"
                                        placeholder="First Name"
                                        onChange={(e) => this.onChangeInputData(e, 'firstName')}

                                    />

                                    <span className="bottom"></span>
                                    <span className="right"></span>
                                    <span className="top"></span>
                                    <span className="left"></span>
                                </div>

                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="inputLastName">LastName</label>
                                <div className="input-area">
                                    <input type="text" className="form-control" value={this.state.lastName}
                                        name="lastName" id="inputLastName"
                                        placeholder="Last Name"
                                        onChange={(e) => this.onChangeInputData(e, 'lastName')}

                                    />

                                    <span className="bottom"></span>
                                    <span className="right"></span>
                                    <span className="top"></span>
                                    <span className="left"></span>
                                </div>

                            </div>
                        </div>
                        <div className="form-group col-md-12 mb-4 ">

                            <div className="mb-3 ">
                                <label htmlFor="inputAddress">Address</label>
                                <div className="input-area">
                                    <input type="text" className="form-control" value={this.state.address}
                                        name="address" id="inputAddress"
                                        placeholder="Address"
                                        onChange={(e) => this.onChangeInputData(e, 'address')}

                                    />

                                    <span className="bottom"></span>
                                    <span className="right"></span>
                                    <span className="top"></span>
                                    <span className="left"></span>
                                </div>

                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="inputPhoneNumber">Phone Number</label>
                                <div className="input-area">
                                    <input type="text" className="form-control" value={this.state.phonenumber}
                                        name="phonenumber" id="inputPhoneNumber"
                                        placeholder="Phone Number"
                                        onChange={(e) => this.onChangeInputData(e, 'phonenumber')}

                                    />

                                    <span className="bottom"></span>
                                    <span className="right"></span>
                                    <span className="top"></span>
                                    <span className="left"></span>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="form-row">
                        <div className="row">
                            {/* gender */}
                            <div className="form-group col-md-4 mb-4 ">
                                <label htmlFor="inputState">
                                    <FormattedMessage id="gender" />
                                </label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInputData(e, 'gender')}
                                    value={gender}
                                >
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((value, index) => {
                                            return (
                                                <option key={index} value={value.keyMap}>
                                                    {language == languages.VI ? value.valueVi : value.valueEn}

                                                </option>


                                            )
                                        })

                                    }

                                </select>
                            </div>
                            {/* role */}
                            <div className="form-group col-md-4 mb-4 ">
                                <label htmlFor="inputState">
                                    <FormattedMessage id="role" />
                                </label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInputData(e, 'roleid')}
                                    value={roleid}
                                >
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((value, index) => {
                                            return (
                                                <option key={index} value={value.keyMap}>
                                                    {language == languages.VI ? value.valueVi : value.valueEn}

                                                </option>

                                            )
                                        })
                                    }


                                </select>
                            </div>
                            {/* position */}
                            <div className="form-group col-md-4 mb-4 ">
                                <label htmlFor="inputState">
                                    <FormattedMessage id="position" />
                                </label>
                                <select className="form-control"
                                    onChange={(e) => this.onChangeInputData(e, 'positionid')}
                                    value={positionid}
                                >
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((value, index) => {
                                            return (
                                                <option key={index} value={value.keyMap}>
                                                    {
                                                        language === languages.VI ? value.valueVi : value.valueEn
                                                    }
                                                </option>
                                            )
                                        })
                                    }


                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="form-row d-flex">
                        <input type="file" id="inputImage" hidden
                            onChange={(e) => this.onChangeImage(e)}
                        />

                        <button className="btn-upload-image">
                            <label htmlFor="inputImage" className="label-upload-image">
                                Tải Lên
                            </label>
                        </button>
                        <div className="preview-image"
                            style={{ backgroundImage: `url(${urlImg})` }}
                            onClick={(e) => this.onClickOpenImg(e)}
                        >
                            {isOpenImg && (
                                <Lightbox
                                    mainSrc={urlImg}
                                    onCloseRequest={() => this.setState({ isOpenImg: false })}

                                />
                            )}
                        </div>

                    </div>

                    <button type="submit"

                        className={actionCrud === manageActions.CREATE ? "btn btn-primary submit-btn"
                            : "btn btn-primary edit-btn"
                        }
                        onClick={(e) => this.onSubmitCreateUser()}
                    >
                        <span className="btn-submit">
                            {actionCrud === manageActions.CREATE ? <FormattedMessage id="crudBtn.submit" />
                                : <FormattedMessage id="crudBtn.save" />
                            }
                        </span>


                    </button>
                    <GetAllUsers
                        editUserData={this.editUserData}

                    />


                </div>
                <div style={{ height: '500px' }}>

                </div>
            </>


        );
    }

}

const mapStateToProps = state => {
    return {
        getGenderData: state.admin.genders,
        getRoleData: state.admin.roles,
        dataUserAdmin: state.admin.dataUser,
        getPositionData: state.admin.positions,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.adminActionStart()),
        getRoleStart: () => dispatch(actions.adminRoleStart()),
        getPositionStart: () => dispatch(actions.adminPositionStart()),
        GetDataUserStart: () => dispatch(actions.fetchDataUserStart()),
        getCreateUserStart: (data) => dispatch(actions.createUserStart(data)),
        editUserStart: (id) => dispatch(actions.editUserStart(id)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
