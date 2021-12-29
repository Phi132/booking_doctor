import axios from "axios";
const getDoctorLimit = (limit, roleId) => {
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-data-doctor-limit?limit=${limit}&roleId=${roleId}`);
}

export { getDoctorLimit };