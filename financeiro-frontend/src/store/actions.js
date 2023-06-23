import { setClient as setClientAction, unsetClient as unsetClientAction } from "./ducks/client";

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
    navigate("/clientes/index");
  };
};
