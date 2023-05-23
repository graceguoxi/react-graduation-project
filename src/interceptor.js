import { BaseUrl } from './environment'

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )

const onRequest = (config) => {
  const userToken = localStorage.getItem(
    'react-project-token'
  )
 
  config = {
    ...config,
    BaseUrl
  }

  if (!config.url?.includes('login')) {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        // ***** Localhost 80000:
        // 'Content-Type': 'application/json;charset=UTF-8',
        // 'Access-Control-Allow-Origin': '*',
        // 'Authorization': 'Bearer ' + userToken,

        // ***** spitritx.co.nz:
        'token': userToken
      }
    }
    return newConfig
  }
  return config
}

const onRequestError = (error) => {
  console.log(error)
  return error
}

const onResponse = (response) => {
  return response
}

const onResponseError = (error) => {
  console.log(error)
  return error
}

export const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    onRequest,
    onRequestError
  )
  axiosInstance.interceptors.response.use(
    onResponse,
    onResponseError
  )
  return axiosInstance
}
