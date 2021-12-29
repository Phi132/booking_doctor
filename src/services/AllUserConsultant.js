import axios from "axios";
const AllUserConsultant = () => {
    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/get-all-consultant');
}


export { AllUserConsultant };