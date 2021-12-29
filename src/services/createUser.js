import axios from "axios";
const createUser = (dataUser) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/create-data',  dataUser )
}


export { createUser };