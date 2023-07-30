import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/category', data)

  return response
}

export const list = async () => {
  let response = await axios.get(constants.baseUrl + '/category')

  return response
}

export const edit = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/category/${id}`, data)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/category/${id}`)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/category/${id}`)

  return response
}
