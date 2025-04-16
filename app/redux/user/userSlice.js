import { createSlice } from "@reduxjs/toolkit";
import {
  loginAccount,
  logoutAccount,
  refreshToken,
  registerAccount,
  loginWithGoogleAccount
} from "./userThunk";

const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  errCode: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.errCode = action.payload.errCode;
        state.message = action.payload.message;
      })
      .addCase(loginWithGoogleAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogleAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginWithGoogleAccount.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.errCode = action.payload.errCode;
        state.message = action.payload.message;
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.data
        state.isLoading = false;
      })

      .addCase(logoutAccount.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      })

      .addCase(registerAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errCode = action.payload.errCode;
        state.message = action.payload.message;
      });
  },
});

export default userSlice.reducer;
