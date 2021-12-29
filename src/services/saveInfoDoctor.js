import axios from "axios";
const saveInfoDoctor = (data) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/save-info-doctor',data)
}


export { saveInfoDoctor };