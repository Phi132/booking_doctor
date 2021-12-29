import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})
export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT
})
//login patient

export const patientLoginSuccess = (patientInfo) => ({
    type: actionTypes.PATIENT_LOGIN_SUCCESS,
    patientInfo: patientInfo
})
export const patientLoginFail = () => ({
    type: actionTypes.PATIENT_LOGIN_FAIL
})

export const processLogoutPatient = () => ({
    type: actionTypes.PROCESS_LOGOUT_PATIENT
})