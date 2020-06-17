import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.114:3333'//gj
    //'http://192.168.29.66:3333' //reid
})
  
export default api
