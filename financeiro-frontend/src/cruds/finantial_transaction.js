import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const create = async (data) => {
  let response = await axios.post(constants.baseUrl + '/financial-transaction', data)

  return response
}

export const update = async (id, data) => {
  let response = await axios.patch(constants.baseUrl + `/financial-transaction/update/${id}`, data)

  return response
}

export const list = async (id, search = "") => {
  let url = "";
  if (search != "") {
    url = `/financial-transaction/list/${id}?search=${search}`;
  } else {
    url = `/financial-transaction/list/${id}`;
  }

  let response = await axios.get(constants.baseUrl + url,)

  return response
}

export const markedPaid = async (id) => {
  let response = await axios.put(constants.baseUrl + `/financial-transaction/marked-paid/${id}`);

  return response;
}

// export const edit = async () => {
//   let response = await axios.get(constants.baseUrl + '/customer')

//   return response
// }

export const get = async (id) => {
  let response = await axios.get(constants.baseUrl + `/financial-transaction/${id}`)

  return response
}

export const remove = async (id) => {
  let response = await axios.delete(constants.baseUrl + `/financial-transaction/${id}`)

  return response
}

export const getFinanceiro = async (id) => {
  let response = await axios.get(constants.baseUrl + `/financial-transaction/${id}`)

  return response
}

export const getCalendar = async (id) => {
    let response = await axios.get(constants.baseUrl + `/financial-transaction/calendar/${id}`);

	return response;
}
// export const getChartsData = async (id) => {
//   let response = await axios.get(constants.baseUrl + `/financial-transaction/charts/${id}`)

//   return response;
// }

