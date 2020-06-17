import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.29.66:3333' //reid
    //'http://192.168.0.114:3333'//gj
})
  
export default api
