// src/redux/petSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserPets = createAsyncThunk(
    'pets/fetchUserPets',
    async ({ userId, page, limit, sort }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/pets/user/${userId}`, {
                params: { page, limit, sort },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return []; // Return an empty array if no pets are found for the user
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const petSlice = createSlice({
    name: 'pets',
    initialState: {
        userPets: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPets.fulfilled, (state, action) => {
                state.loading = false;
                state.userPets = action.payload;
            })
            .addCase(fetchUserPets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default petSlice.reducer;