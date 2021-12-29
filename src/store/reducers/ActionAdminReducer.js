import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    dataUser: [],
    dataDoctor: [],
    dataAllDoctors: [],
    userByIdConsultant: [],
}

const ActionAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        // gender
        case actionTypes.ADMIN_ACTION_START:
            return {
                ...state,
            }
        case actionTypes.ADMIN_ACTION_SUCCESS:
            // lưu vào state
            var dataGender = { ...state };
            dataGender.genders = action.data;
            return {
                ...dataGender
            }
        case actionTypes.ADD_USER_FAILURE:
            return {
                ...state,
            }
        // role
        case actionTypes.ADMIN_ROLE_START:

            return {

            }
        case actionTypes.ADMIN_ROLE_SUCCESS:

            let copyRoles = { ...state }
            copyRoles.roles = action.data
            return {
                ...copyRoles
            }
        case actionTypes.ADMIN_ROLE_FAILURE:

            return {

            }
        //posiiton
        case actionTypes.ADMIN_POSITION_START:
            // tạo 1 biến isLoading set = true, ban đầu là false
            // xong qua thằng render nếu true thì render ra loading là set nó lại = false
            return {

            }
        case actionTypes.ADMIN_POSITION_SUCCESS:
            let copyPosition = { ...state }
            //cái biến data ở adminActions là biến data này
            copyPosition.positions = action.data
            return {
                ...copyPosition
            }
        case actionTypes.ADMIN_POSITION_FAILURE:
            return {

            }

        //get Data User
        case actionTypes.ADMIN_FETCH_GET_DATA_SUCCESS:

            action.data.reverse()
            let copyDataUser = { ...state }
            copyDataUser.dataUser = action.data

            return {
                ...copyDataUser
            }
        case actionTypes.ADMIN_POSITION_FAILURE:
            console.log("Lấy Thông Tin Thất Bại")
            return {

            }
        // data doctor with limit
        case actionTypes.FETCH_DOCTOR_LIMIT_SUCCESS:
            let copyDataDoctor = { ...state }
            copyDataDoctor.dataDoctor = action.dataDoctor

            return {
                ...copyDataDoctor
            }
        case actionTypes.FETCH_DOCTOR_LIMIT_FAILURE:
            console.log("Lấy Thông Tin Thất Bại")
            return {

            }
        //data consultant with limit
        case actionTypes.FETCH_REMOTE_CONSULTANT_LIMIT_SUCCESS:
            let copyDataConsultant = { ...state }
            copyDataConsultant.userByIdConsultant = action.userByIdConsultant

            return {
                ...copyDataConsultant
            }
        case actionTypes.FETCH_REMOTE_CONSULTANT_LIMIT_FAILURE:
            console.log("Lấy Thông Tin Thất Bại")
            return {

            }
        // get data all doctors
        case actionTypes.GET_DATA_ALL_DOCTORS_SUCCESS:
            let copyDataAllDoctors = { ...state }
            copyDataAllDoctors.dataAllDoctors = action.data

            return {
                ...copyDataAllDoctors
            }
        case actionTypes.GET_DATA_ALL_DOCTORS_FAILURE:
            console.log("Lấy Thông Tin Thất Bại")
            return {

            }
        default:
            return state;
    }
}

export default ActionAdminReducer;