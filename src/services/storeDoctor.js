import axios from "axios";
const storeDoctor = (data) => {
    return axios.put('https://booking-doctor-first-server.herokuapp.com/api/store-info-doctor',data)
}


export { storeDoctor };