import axios from 'axios';
const typeConsultantbyIdDoctor = (doctorId) => {

    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-type-consultant-by-id?doctorId=${doctorId}`)

}

export { typeConsultantbyIdDoctor };


