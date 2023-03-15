import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/customer', data)

  return response
}

export const list = async () => {
  let response = await axios.get(constants.baseUrl + '/customer')

  return response
}

export const edit = async () => {
  let response = await axios.get(constants.baseUrl + '/customer')

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/customer/${id}`)

  return response
}

export const getFinanceiro = async (id) => {
  let response = await axios.getFinanceiro(constants.baseUrl + `/customer/financeiro/${id}`)

  return response
}

