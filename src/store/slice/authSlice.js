import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
    },
    setAuthState: (state, action) => {
        console.log("🚀 ~ action:", action.payload)
        state.isAuthenticated = action.payload;
      },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess,setAuthState, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
