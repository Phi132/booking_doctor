import axios from "axios";

export const doctorDetail= (id) => {
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/get-detail-doctor-by-id?id=${id}`)
}