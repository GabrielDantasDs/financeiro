import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/bank-account', data)

  return response
}

export const get = async (id, data) => {
  let response = await axios.post(constants.baseUrl + `/bank-account/account/${id}`, data)

  return response;
}

export const edit = async (id, data) => {
  let response = await axios.put(constants.baseUrl + `/bank-account/${id}`, data)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/bank-account/${id}`)

  return response
}

export const list = async (id) => {
  let response = await axios.get(constants.baseUrl + `/bank-account/${id}`)

  return response
}

export const getBankInstitutionList = async() => {
  let response = await axios.get("https://brasilapi.com.br/api/banks/v1");
  
  return response;
}
