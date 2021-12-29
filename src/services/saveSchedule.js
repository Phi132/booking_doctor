import axios from "axios";
const saveSchedule = (data) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/save-schedule-appointment', data)
}


export { saveSchedule };