// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice';

export const store = configureStore({
    reducer: {
        pets: petReducer,
        // Add more reducers as needed
    },
});