import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/ducks/auth';
import clientReducer from '../store/ducks/client';

export default configureStore({
    reducer: {
        auth: authReducer,
        client: clientReducer
    }
})