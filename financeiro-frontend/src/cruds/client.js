import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/client', data)

  return response
}

export const list = async (client_id) => {
  let response = await axios.get(constants.baseUrl + '/client', { client_id })

  return response
}

export const edit = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/client/${id}`, data)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/client/${id}`)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/client/${id}`)

  return response
}

export const simpleList = async (client_id) => {
  let response = await axios.get(constants.baseUrl + `/client/simple-list/${client_id}`);

  return response;
}

