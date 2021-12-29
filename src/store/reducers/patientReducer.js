import actionTypes from '../actions/actionTypes';

const initialState = {
    patientInfo: null,
    isLoggedInPatient: false,
}

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        //login patient
        case actionTypes.PATIENT_LOGIN_SUCCESS:

            return {
                ...state,
                isLoggedInPatient: true,
                patientInfo: action.patientInfo,

            }
        case actionTypes.PATIENT_LOGIN_FAIL:
            return {
                ...state,
                isLoggedInPatient: false,
                patientInfo: null
            }
        case actionTypes.PROCESS_LOGOUT_PATIENT:
            return {
                ...state,
                isLoggedInPatient: false,
                patientInfo: null
            }
        default:
            return state;
    }
}

export default patientReducer;