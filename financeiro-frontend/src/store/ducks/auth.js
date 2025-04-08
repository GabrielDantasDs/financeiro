import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    isAuthenticated: localStorage.getItem('access_token') ? true : false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export const login = createAction('LOGIN');
export const logout = createAction('LOGOUT');

export default createReducer(INITIAL_STATE, {
	[login.type]: (state, action) => ({ ...state, isAuthenticated: true, user: action.payload.user }),
	[logout.type]: (state, action) => ({ ...state, isAuthenticated: false, user: null }),
});