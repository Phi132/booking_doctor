import axios from "axios";
const submitPatientInfo = (data) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/submit-info-patient',data)
}


export { submitPatientInfo };