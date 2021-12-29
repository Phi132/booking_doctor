import axios from "axios";
const saveSpecialty = (data) => {
  return axios.post('https://booking-doctor-first-server.herokuapp.com/api/post-save-medical-specialty', data)
}


export { saveSpecialty };