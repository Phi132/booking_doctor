import axios from "axios";
const getDetailAppointment = (date, id) => {
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-appointment-doctor?date=${date}&id=${id}`)
}


export { getDetailAppointment };