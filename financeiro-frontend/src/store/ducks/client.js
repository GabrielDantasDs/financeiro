import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = localStorage.getItem("client");

export const setClient = createAction("SETCLIENT");
export const unsetClient = createAction("UNSETCLIENT");

export default createReducer(INITIAL_STATE, {
  [setClient.type]: (state, action) => action.payload,
  [unsetClient.type]: (state, action) => null,
});
