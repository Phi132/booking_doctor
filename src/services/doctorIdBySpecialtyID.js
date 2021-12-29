import axios from 'axios';
const doctorIdBySpecialtyID = (id) => {
    
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/doctorInfo-by-specialtyId?id=${id}`)

}

export { doctorIdBySpecialtyID };


