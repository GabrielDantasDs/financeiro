import axios from "axios";
import Constants from "../constants";
import {login as loginAction} from '../store/ducks/auth';
import { useDispatch } from "react-redux";

const constants = new Constants();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";


export const login = (data, navigate) => {
  return async (dispatch) => {
    return axios
    .post(constants.baseUrl + "/login", data)
    .then((res) => {
      localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("access_token");
      dispatch(loginAction())
      navigate('/')
    });
  }

};
