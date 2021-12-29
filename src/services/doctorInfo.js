import axios from "axios";

export const doctorInfo= (id) => {
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-detail-doctor-allcodes-users?id=${id}`)
}