import axios from "axios";
import Constants from "../constants";
import { login as loginAction } from "../store/ducks/auth";
import { logout as logoutAction } from "../store/ducks/auth";
import { useDispatch } from "react-redux";

const constants = new Constants();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const login = (data, navigate) => {
  return async (dispatch) => {
    return axios.post(constants.baseUrl + "/login", data).then((res) => {
      localStorage.setItem(
        "access_token",
        JSON.stringify(res.data.access_token)
      );
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("access_token")?.replace(/['"]+/g, "");
      dispatch(loginAction({user: res.data}));
      navigate("/");
    });
  };
};

export const logout = (navigate) => {
  let myPromise = new Promise(function (myResolve, myReject) {
    localStorage.removeItem("access_token");

    myResolve(); // when successful
    myReject(); // when error
  });

  return async (dispatch) => {
    return myPromise.then((res) => {
      dispatch(logoutAction());
      navigate("/auth");
    });
  };
};
