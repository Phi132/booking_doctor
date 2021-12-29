import axios from "axios";
const CreateProfileConsultant = (data) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/create-profile-consultant', data)
}


export { CreateProfileConsultant };