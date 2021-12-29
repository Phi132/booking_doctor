import axios from 'axios';
const getAllConsultant = () => {

    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/all-data-remote-consultant')

}

export { getAllConsultant };


