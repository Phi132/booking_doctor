import axios from "axios";
const editUser = (data) => {
    return axios.put('https://booking-doctor-first-server.herokuapp.com/api/updateDataUser', data)
}


export { editUser };