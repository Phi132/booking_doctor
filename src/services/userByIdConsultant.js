import axios from 'axios';
const userByIdConsultant = (id) => {

    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-user-by-id-consultant?consultantId=${id}`)

}

export { userByIdConsultant };


