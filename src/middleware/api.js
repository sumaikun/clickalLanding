import axios from 'axios'

import Swal from 'sweetalert2' 

const BASE_URL = process.env.REACT_APP_SERVER_HOST

/* eslint-disable-next-line */
console.log("BASE URL",BASE_URL,process.env);

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {} // do not remove this, its added to add params later in the config
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {


  config.headers.common['Access-Control-Allow-Origin'] = '*'
  config.headers.common['Content-Type'] = 'application/json'
  return config
}, function (error) {
  // Do something with request error
  // eslint-disable-next-line no-console
  //console.log("front end error",error.config,"e",error.response) 

  
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {

     return response;
  }, (error) => {  

    // eslint-disable-next-line no-console
    //console.log(error.config,error.message,error.config.url.includes("auth"));
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "sucedio un error con el servidor",          
      })

    return Promise.reject(error)
})

export default {
  getData (action) {
    let url = `${BASE_URL}`
    url += action
    /* eslint-disable-next-line */
    //console.log("app url",url);
    return instance.get(url)
  },
  postData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  putData (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData (action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login (action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  }
}
