import axios from 'axios'
import Constants from '../../src/constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const search = async (data) => {
  let response = await axios.post(constants.baseUrl + '/report', data)

  return response
}