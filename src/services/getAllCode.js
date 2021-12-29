import axios from "axios";

export const getAllCode= (typeInput) => {
    return axios.get(`https://booking-doctor-first-server.herokuapp.com/api/allcode?type=${typeInput}`)
}