import actionTypes from './actionTypes';
import * as services from '../../services';
import { create, kebabCase } from 'lodash';
import { toast, Zoom } from 'react-toastify';

// get Gender
export const adminActionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await services.getAllCode('GENDER');
            if (res && res.data.AllCodeErr === 0) {
                dispatch(adminActionSuccess(res.data.allCodeData.AllCode))
            }
            else {
                dispatch(adminActionFailure())
            }

        } catch (e) {
            console.log("co lỗi là ", e);
        }
    }
}

export const adminActionSuccess = (genderData) => ({
    type: actionTypes.ADMIN_ACTION_SUCCESS,
    data: genderData
})
export const adminActionFailure = () => ({
    type: actionTypes.ADD_USER_FAILURE
})
//get Role
export const adminRoleStart = () => {
    return async (dispatch, getData) => {
        try {
            // dispatch({
            //     type: actionTypes.ADDMIN_ROLE_START
            // });
            let getRole = await services.getAllCode('ROLE');
            if (getRole && getRole.data.AllCodeErr === 0) {
                dispatch(adminRoleSuccess(getRole.data.allCodeData.AllCode));
            }
            else {
                dispatch(adminRoleFailure());
            }
        } catch (e) {
            console.log(e)
        }
    }
}
export const adminRoleSuccess = (role) => ({
    type: actionTypes.ADMIN_ROLE_SUCCESS,
    data: role
})
export const adminRoleFailure = () => ({
    type: actionTypes.ADMIN_ROLE_FAILURE
})
// get position
export const adminPositionStart = () => {
    return async (dispatch, getData) => {
        try {
            let position = await services.getAllCode('POSITION');
            if (position && position.data.AllCodeErr === 0) {
                dispatch(adminPositionSuccess(position.data.allCodeData.AllCode));
            }
            else {
                dispatch(adminPositionFailure())
            }
        } catch (e) {
            console.log("co lỗi position là : ", e)
        }
    }
}

export const adminPositionSuccess = (position) => ({
    type: actionTypes.ADMIN_POSITION_SUCCESS,
    data: position
})

export const adminPositionFailure = () => ({
    type: actionTypes.ADMIN_POSITION_FAILURE,
})

//create new user
export const createUserStart = (dataUser) => {
    return async (dispatch, getData) => {
        let createUser = await services.createUser(dataUser);
        if (createUser && createUser.data.err === 0) {
            dispatch(createUserSuccess());
            dispatch(fetchDataUserStart());
            toast.success("Create User Successfully", {
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
            dispatch(createUserFailure());
            toast.warn("Create User Failure");
        }
    }
}
export const createUserSuccess = () => ({
    type: actionTypes.ADMIN_CREATE_SUCCESS
})
export const createUserFailure = () => ({
    type: actionTypes.ADMIN_CREATE_FAILURE
})

// get all data user 
export const fetchDataUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let resData = await services.getDataFromServer();

            if (resData) {
                dispatch(fetchDataUserSuccess(resData.data.data))
            }
            else {
                dispatch(fetchDataUserFailure())
            }

        } catch (e) {
            console.log("co lỗi là ", e);
        }
    }
}
export const fetchDataUserSuccess = (data) => ({
    type: actionTypes.ADMIN_FETCH_GET_DATA_SUCCESS,
    data: data
})
export const fetchDataUserFailure = () => ({
    type: actionTypes.ADMIN_FETCH_GET_DATA_FAILURE,
})
//get data doctor with limit
export const fetchDoctorLimitStart = (limit) => {
    return async (dispatch, getState) => {
        try {
            let doctorLimit = await services.getDoctorLimit(9, 'R2');
            //console.log("kiem tra error code:, ", doctorLimit.data)
            if (doctorLimit && doctorLimit.data.err === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_LIMIT_SUCCESS,
                    dataDoctor: doctorLimit.data.dataDoctor
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_LIMIT_FAILURE,

                })
            }

        } catch (e) {
            console.log("co lỗi là ", e);
        }
    }
}
// get consultant info with limit
export const fetchConsultantLimit = (consultantId) => {
    return async (dispatch, getState) => {
        try {
            let dataUserConulstant = await services.userByIdConsultant(consultantId);
            // console.log("kiem tra error code:, ", dataUserConulstant.data.responese)
            if (dataUserConulstant.data && dataUserConulstant.data.responese.err === 0) {
                dispatch({
                    type: actionTypes.FETCH_REMOTE_CONSULTANT_LIMIT_SUCCESS,
                    userByIdConsultant: dataUserConulstant.data.responese.user
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_REMOTE_CONSULTANT_LIMIT_FAILURE,

                })
            }

        } catch (e) {
            console.log("co lỗi là ", e);
        }
    }
}

// admin delete User
export const deleteDataUserStart = (idUser) => {
    return async (dispatch, getData) => {
        try {
            let isDeleteUser = await services.deleteUser(idUser);
            if (isDeleteUser) {
                dispatch(fetchDataUserStart());
                toast.success("Delete User Success", {
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
                toast.warn("Delete User Failure", {
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

        } catch (e) {
            console.log("Lỗi xóa User là: ", e)
        }
    }
}
//admin edit user
export const editUserStart = (data) => {
    return async (dispatch, getData) => {
        try {
            let editUser = await services.editUser(data);
            if (editUser) {
                dispatch(fetchDataUserStart());
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

        } catch (e) {
            console.log("co lỗi edit User là : ", e)
        }
    }
}
// get all data doctors
export const getAllDoctors = () => {
    return async (dispatch, getData) => {
        try {
            let allDoctors = await services.allDoctors();
            if (allDoctors && allDoctors.data.err === 0) {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_DOCTORS_SUCCESS,
                    data: allDoctors.data.dataDoctor
                })
            } else {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_DOCTORS_FAILURE,

                })
            }

        } catch (e) {
            console.log("loi get all doctors", e);
        }
    }
}
//save data doctor
export const CreateInfoDoctor = (data) => {
    return async (dispatch, getData) => {
        let createDataDoctor = await services.saveInfoDoctor(data);
        if (createDataDoctor && createDataDoctor.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_DATA_DOCTORS_SUCCESS
            });
            toast.success("Create User Successfully", {
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
            dispatch({
                type: actionTypes.CREATE_DATA_DOCTORS_FAILURE
            });
            toast.warn("Create User Failure");
        }
    }
}

//get all data specialty
export const allSpecialty = () => {
    return async (dispatch, getData) => {
        try {
            let allSpecialty = await services.getAllSpecialty();

            if (allSpecialty && allSpecialty.data.dataAll.err === 0) {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_SPECIALTY_SUCCESS,
                    data: allSpecialty.data.dataAll.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_SPECIALTY_FAILURE,

                })
            }

        } catch (e) {
            console.log("loi get all doctors", e);
        }
    }
}

// get all type consultant
export const allConsultant = () => {
    return async (dispatch, getData) => {
        try {
            let allConsultant = await services.getAllConsultant();

            if (allConsultant.data && allConsultant.data.dataAll && allConsultant.data.dataAll.err === 0) {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_CONSULTANT_SUCCESS,
                    data: allConsultant.data.dataAll.data
                })
            } else {
                dispatch({
                    type: actionTypes.GET_DATA_ALL_CONSULTANT_FAILURE,

                })
            }

        } catch (e) {
            console.log("loi get all doctors", e);
        }
    }
}
// get all data user consultant
export const allUserConsultant = () => {
    return async (dispatch, getData) => {
        try {
            let allUserConsultant = await services.AllUserConsultant();
            if (allUserConsultant.data && allUserConsultant.data.err === 0) {
                dispatch({
                    type: actionTypes.GET_ALL_USER_CONSULTANT_SUCCESS,
                    data: allUserConsultant.data.dataDoctor
                })
            } else {
                dispatch({
                    type: actionTypes.GET_ALL_USER_CONSULTANT_FAILURE,

                })
            }

        } catch (e) {
            console.log("loi get all doctors", e);
        }
    }
}