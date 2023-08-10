import axios from 'axios'
import Constants from '../constants'

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

export const simpleList = async (data) => {
  let response = await axios.get(constants.baseUrl + '/cost-center', data)

  return response
}
