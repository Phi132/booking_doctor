import axios from 'axios';
const profileConsultant = (id) => {

    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-profile-user-by-doctorId?doctorId=${id}`)

}

export { profileConsultant };


