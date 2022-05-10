import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = "https://ex-api.usefordemo.com"
// const url = "http://3.1.37.240:3002"


const Api = {
  async post(api, data) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios.post(url + api, data,config).then((res) => {
      return res.data
    })
      .catch((error) => {
        if(error.response.status === 401){
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          alert("登入過期，請重新登入")
          window.location.reload()
        }else{
          alert(error.response.data.msg)
        }
        return error.response
      })
  },
  async postData(api, data) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios.post(url + api, data,config).then((res) => {
      return res.data
    })
      .catch((error) => {
        return error.response
      })
  },
  async postFormData(api, data) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    return axios.post(url + api, data,{headers: { 'content-type': 'multipart/form-data',Authorization: token }}).then((res) => {
      return res.data
    })
      .catch((error) => {
        return error.response
      })
  },
  async get(api) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(url + api, config)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        if(error.response.status === 401){
          AsyncStorage.removeItem("token")
          AsyncStorage.removeItem("user")
          alert("登入過期，請重新登入")
          // window.location.reload()
        }else{
          // alert(error.response.data.msg)
        }
        return error.response
      })
    return response
  },
  async getData(api) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    const response = await axios.get(url + api, config)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error.response
      })
    return response
  },
  async put(api, data) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    var response = await axios.put(url + api, data,config)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error.response
      })
    return response
  },
  async delete(api) {
    let token = await AsyncStorage.getItem("token")
    let config = {
      headers: {
        Authorization: token
      }
    };
    await axios.delete(url + api,config)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error.response
      })
  }
}

export default Api