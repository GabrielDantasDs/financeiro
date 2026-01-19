import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/product', data)
  return response
}

export const list = async (params) => {
  let url = constants.baseUrl + `/product/list/${params.client_id}?page=${params.page}`

  if (params.search && params.search !== '') {
    url += `&search=${encodeURIComponent(params.search)}`
  }

  let response = await axios.get(url)
  return response
}

export const update = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/product/${id}`, data)
  return response
}

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/product/${id}`)
  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/product/${id}`)
  return response
}

export const simpleList = async (client_id) => {
  let response = await axios.get(constants.baseUrl + `/product/simple-list/${client_id}`)
  return response
}