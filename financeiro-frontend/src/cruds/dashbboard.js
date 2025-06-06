import axios from "axios";
import Constants from '../../src/constants'

const constants = new Constants();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const axiosHeaderConfig = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
};

export const get = async () => {
  let response = await axios.get(constants.baseUrl + `/dashboard`);

  return response;
};

export const getDashboardClient = async (clientId) => {
  let response = await axios.get(constants.baseUrl + `/dashboard/client/${clientId}`,);

  return response;
}