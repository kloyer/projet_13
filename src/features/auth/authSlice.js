// Import necessary libraries and modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as AuthService from './AuthService'; // Import authentication service module

// Retrieve the token from local storage, if it exists
const token = localStorage.getItem('token');

// Define the initial state for the authentication slice
const initialState = {
  isAuthenticated: !!token, // Determine if the user is authenticated based on the presence of a token
  user: null, // Initialize user information as null
  token: token, // Set the token from local storage, if available
};

// Create an asynchronous thunk for handling user login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  console.log('Login thunk called with:', credentials); // Log the login attempt
  try {
    // Attempt to login using the provided credentials
    const data = await AuthService.login(credentials);
    console.log('Login successful, received data:', data); // Log successful login
    localStorage.setItem('token', data.token); // Store the token in local storage
    return { user: data.user, token: data.token }; // Return user and token data on successful login
  } catch (error) {
    console.error('Login failed with error:', error); // Log login failure with error
    return thunkAPI.rejectWithValue(error.response.data); // Reject the login with the error data
  }
});

// Create an authentication slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState, // Set the initial state
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token'); // Remove the token from local storage on logout
      state.isAuthenticated = false; // Set isAuthenticated to false
      state.user = null; // Reset user information to null
      state.token = null; // Reset the token to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true; // Set isLoading to true during login request
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true; // Set isAuthenticated to true on successful login
        state.user = action.payload.user; // Set the user information from the payload
        state.token = action.payload.token; // Set the token from the payload
        state.isLoading = false; // Set isLoading to false after successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false; // Set isLoading to false on login rejection
        state.error = action.payload; // Set the error based on the payload
        state.user = null; // Reset user information to null
        state.token = null; // Reset the token to null
      });
  },
});

// Export the logout action for use in the application
export const { logout } = authSlice.actions;

// Export the authentication slice reducer
export default authSlice.reducer;