import axios from "axios";
const allDoctors = () => {
    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/get-all-doctors')
}


export { allDoctors };