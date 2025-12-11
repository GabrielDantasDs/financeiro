import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/ducks/auth';
import clientReducer from '../store/ducks/client';
import sideBarReducer from '../store/ducks/sidebar';

export default configureStore({
    reducer: {
        auth: authReducer,
        client: clientReducer,
        showSideBar: sideBarReducer
    }
})