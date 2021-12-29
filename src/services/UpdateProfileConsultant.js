import axios from "axios";
const UpdateProfileConsultant = (data) => {
    return axios.put('https://booking-doctor-first-server.herokuapp.com/api/update-profile-consultant', data)
}


export { UpdateProfileConsultant };