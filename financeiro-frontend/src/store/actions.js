import { setClient as setClientAction, unsetClient as unsetClientAction } from "./ducks/client";
import { openSideBar as openSideBarAction, closeSideBar as closeSideBarAction } from "./ducks/sidebar";

export const setClient = (data, navigate) => {    
  return async (dispatch) => {
    localStorage.setItem("client", data);
    dispatch(setClientAction(data));
    navigate("/");
  };
};

export const unsetClient = (data, navigate) => {    
  return async (dispatch) => {
    localStorage.removeItem("client");
    dispatch(unsetClientAction());
    navigate("/clients");
  };
};

export const openSideBar = () => {    
  return async (dispatch) => {
    dispatch(openSideBarAction());
  };
};

export const closeSideBar = () => {   
  return async (dispatch) => {
    dispatch(closeSideBarAction());
  };
};
