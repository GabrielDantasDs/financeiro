import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const simpleList = async (client_id) => {
  let response = await axios.get(constants.baseUrl + `/product/simple-list/${client_id}`)

  return response
}