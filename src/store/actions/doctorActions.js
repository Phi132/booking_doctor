import actionTypes from './actionTypes';
import * as services from '../../services';

export const doctorInfo = (id) => {
    return async (dispatch, getData) => {
        let doctorInfo = await services.doctorInfo(id);
        if (doctorInfo && doctorInfo.data.dataDetailDoctor.err === 0) {
            dispatch({
                type: actionTypes.DOCTOR_INFO_SUCCESS,
                data: doctorInfo.data.dataDetailDoctor.dataDetail
            });

        } else {
            dispatch({
                type: actionTypes.DOCTOR_INFO_FAILURE
            });

        }
    }
}
export const doctorActionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await services.getAllCode('TIME');
            console.log("test all conde type time", res);
            if (res && res.data.AllCodeErr === 0) {
                dispatch(doctorActionSuccess(res.data.allCodeData.AllCode))
            }
            else {
                dispatch(doctorActionFailure())
            }

        } catch (e) {
            console.log("co lỗi là ", e);
        }
    }
}
export const doctorActionSuccess = (timeData) => ({
    type: actionTypes.DOCTOR_TIME_SUCCESS,
    data: timeData
})
export const doctorActionFailure = () => ({
    type: actionTypes.DOCTOR_TIME_FAILURE
})

