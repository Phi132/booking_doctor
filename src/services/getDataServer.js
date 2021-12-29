import axios from 'axios';
const getDataFromServer = () => {
    
    return axios.get('https://booking-doctor-first-server.herokuapp.com/api/get-data')

}

export { getDataFromServer };


