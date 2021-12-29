import axios from 'axios';
const patientLogin = (email, password) => {
    
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/login-user', {email,password})

}

export { patientLogin };


