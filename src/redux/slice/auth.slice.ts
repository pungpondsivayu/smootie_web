import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../@types/global";


// ระบุ selectId ที่ถูกต้อง

const initialState: IAuthState = {
  user : null,
  isAuthenticated  : false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      if (action.payload?.id) {
        state.user = action.payload
        state.isAuthenticated = true
      }
    },
    logoutUser: (state , action) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
});

export const { setLoggedInUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;