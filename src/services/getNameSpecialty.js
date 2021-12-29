import axios from 'axios';
const getNameSpecialty = () => {

    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/get-all-specialty')

}

export { getNameSpecialty };


