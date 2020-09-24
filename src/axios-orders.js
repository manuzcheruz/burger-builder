import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-c76e6.firebaseio.com/'
});

export default instance;