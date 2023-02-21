import axios from 'axios'
import { redirect, useH } from 'react-router-dom'
import Constants from 'src/constants'
import { useNavigate } from "react-router-dom";

const constants = new Constants()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const axiosHeaderConfig = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  },
}

export const get = async () => {
  let response = await axios
    .get(constants.baseUrl + '/dashboard', axiosHeaderConfig);

  return response
}
