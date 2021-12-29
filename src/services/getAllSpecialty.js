import axios from 'axios';
const getAllSpecialty = () => {
    
    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/all-data-medical-specialty')

}

export { getAllSpecialty };


