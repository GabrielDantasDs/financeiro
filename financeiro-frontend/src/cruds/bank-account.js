import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/bank-account', data)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/bank-account/${id}`)

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

export const list = async (params) => {
  let url = constants.baseUrl + `/bank-account/list/${params.client_id}?page=${params.page}`;

  if (params.search !== "") {
    url = url + `&search=${params.search}`;
  }

  let response = await axios.get(url)

  return response
}

export const simpleList = async (client_id) => {
  let response = await axios.get(constants.baseUrl + `/bank-account/simple-list/${client_id}`)

  return response
}

export const getBankInstitutionList = async() => {
  let response = await axios.get("https://brasilapi.com.br/api/banks/v1");
  
  return response;
}
