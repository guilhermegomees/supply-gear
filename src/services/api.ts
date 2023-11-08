import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://10.133.161.181:3000'
});