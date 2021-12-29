import axios from 'axios';
const sendEmailToPatient = (data) => {
    
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/send-email-to-patient', data);

}

export { sendEmailToPatient };


