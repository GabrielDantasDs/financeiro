import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const axiosHeaderConfig = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access_token').replace(/['"]+/g, ''),
  },
}

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/customer', data, axiosHeaderConfig)

  return response
}

export const list = async () => {
  let response = await axios.get(constants.baseUrl + '/customer', axiosHeaderConfig)

  return response
}

export const edit = async () => {
  let response = await axios.get(constants.baseUrl + '/customer', axiosHeaderConfig)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/customer/${id}`, axiosHeaderConfig)

  return response
}

