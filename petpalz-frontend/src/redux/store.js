// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        pets: petReducer,
        auth: authReducer,
        // Add more reducers as needed
    },
});