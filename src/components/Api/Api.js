import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8090/';

export const get = (url) => {
    return axios.get(`http://127.0.0.1:8090/${url}`);
};

