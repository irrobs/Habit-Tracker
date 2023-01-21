import axios from 'axios'

//criar a chamada para a base do server
export const api = axios.create({
    baseURL:'http://localhost:3333'
})