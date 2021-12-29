import axios from 'axios';
const specialtyByID = (id) => {
    
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/medical-specialty-by-id/${id}`)

}

export { specialtyByID };


