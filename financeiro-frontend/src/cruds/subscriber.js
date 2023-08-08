import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const list = async (id) => {
  let response = await axios.get(constants.baseUrl + `/subscriber`)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/subscriber/${id}`)

  return response
}

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/subscriber', data)

  return response
}