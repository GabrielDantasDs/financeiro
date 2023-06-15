import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/client', data)

  return response
}

export const list = async () => {
  let response = await axios.get(constants.baseUrl + '/client')

  return response
}

export const edit = async () => {
  let response = await axios.get(constants.baseUrl + '/client')

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

export const getFinanceiro = async (id) => {
  let response = await axios.getFinanceiro(constants.baseUrl + `/client/financeiro/${id}`)

  return response
}

