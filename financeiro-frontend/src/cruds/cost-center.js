import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const simpleList = async (client_id) => {
  let response = await axios.get(constants.baseUrl + `/cost-center/simple-list/${client_id}`)

  return response
}

export const list = async (params) => {
  let url = constants.baseUrl + `/cost-center/list/${params.client_id}?page=${params.page}`;

  if (params.search !== "") {
    url = url + `&search=${params.search}`;
  }

  let response = await axios.get(url)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/cost-center/${id}`)

  return response
}

export const edit = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/cost-center/${id}`, data)

  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/cost-center/${id}`)

  return response
}

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/cost-center', data)

  return response
}