import axios from "axios";
const deleteUser = (id) => {
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/deleteUser', {id})
}


export { deleteUser };