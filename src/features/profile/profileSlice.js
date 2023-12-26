// src/features/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getProfile: (state, action) => {
      // Implement fetching logic
    },
    updateProfile: (state, action) => {
      // Implement update logic
    },
  },
});

export const { getProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
