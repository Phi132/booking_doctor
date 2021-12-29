import axios from "axios";
const saveConsultant = (data) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/post-save-remote-consultant', data)
}


export { saveConsultant };