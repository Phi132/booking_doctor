import axios from "axios";
const confirmAppointment = (token, doctorid) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/verify-token-appointment', {token, doctorid})
}


export { confirmAppointment };