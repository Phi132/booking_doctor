import axios from 'axios';
const HandleLoginApi = (username, password) => {
    
    return axios.post('https://booking-doctor-first-server.herokuapp.com/api/login', {email:username,password:password})

}

export { HandleLoginApi };


