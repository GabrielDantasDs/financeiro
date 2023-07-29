import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/categories', data)

  return response
}

export const list = async () => {
  let response = await axios.get(constants.baseUrl + '/categories')

  return response
}

export const edit = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/categories/${id}`, data)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/categories/${id}`)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/categories/${id}`)

  return response
}
