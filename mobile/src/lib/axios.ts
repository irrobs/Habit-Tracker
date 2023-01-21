import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.0.14:3333'//para mobile é necessário usar o IP, não funciona com localhost
})

