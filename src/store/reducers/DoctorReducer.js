import actionTypes from '../actions/actionTypes';

const initialState = {
    doctorInfo: [],
    dataSpecialty: [],
    dataConsultant: [],
    AllUserConsultant: [],
    time: [],
}
const DoctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DOCTOR_INFO_SUCCESS:
            let copyDoctor = { ...state };
            copyDoctor.doctorInfo = action.data
            return {
                ...copyDoctor
            }
        case actionTypes.DOCTOR_INFO_FAILURE:
            return {
                // ...state,
                // started: true
            }
        // time
        case actionTypes.DOCTOR_TIME_SUCCESS:
            // lưu vào state
            var datatime = { ...state };
            datatime.time = action.data;
            return {
                ...datatime
            }
        case actionTypes.DOCTOR_TIME_FAILURE:
            return {
                ...state,
            }
        //medical specialty
        case actionTypes.GET_DATA_ALL_SPECIALTY_SUCCESS:
            // lưu vào state
            var specialty = { ...state };
            specialty.dataSpecialty = action.data;
            return {
                ...specialty
            }
        case actionTypes.GET_DATA_ALL_SPECIALTY_FAILURE:
            return {
                ...state,
            }

        // consultant
        // get al type consultant
        case actionTypes.GET_DATA_ALL_CONSULTANT_SUCCESS:
            // lưu vào state
            var consultant = { ...state };
            consultant.dataConsultant = action.data;
            return {
                ...consultant
            }
        case actionTypes.GET_DATA_ALL_CONSULTANT_FAILURE:
            return {
                ...state,
            }
        // get all use consultant
        case actionTypes.GET_ALL_USER_CONSULTANT_SUCCESS:
            // lưu vào state
            var userConsultant = { ...state };
            userConsultant.AllUserConsultant = action.data;
            return {
                ...userConsultant
            }
        case actionTypes.GET_ALL_USER_CONSULTANT_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default DoctorReducer;