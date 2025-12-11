import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  showSideBar: true
};

export const openSideBar = createAction("OPENSIDEBAR");
export const closeSideBar = createAction("CLOSESIDEDBAR");

export default createReducer(INITIAL_STATE, {
  [openSideBar.type]: (state, action) => {
    return ({ ...state, showSideBar: true });
  },
  [closeSideBar.type]: (state, action) => {
    return ({ ...state, showSideBar: false });
  }
});
