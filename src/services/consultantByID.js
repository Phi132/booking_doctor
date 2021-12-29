import axios from 'axios';
const consultantByID = (id) => {

    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/remote-consultant-by-id/${id}`)

}

export { consultantByID };


