import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginApi,
  registerApi,
  refreshTokenApi,
  loginWithGoogleApi
} from "./userApi";
// Hàm xử lý lỗi chung
const handleError = (e, { rejectWithValue }) => {
  console.error("Lỗi khi gọi API:", e);
  if (e.response) {
    console.error("Response Data:", e.response.data);
  } else if (e.request) {
    console.error("Không nhận được phản hồi từ server");
  } else {
    console.error("Lỗi khác:", e.message);
  }
  return rejectWithValue({ message: "Lỗi máy chủ" });
};
// Hàm xử lí login
export const loginAccount = createAsyncThunk("user/loginAccount", async (data, { rejectWithValue }) => {
  try {
    const res = await loginApi(data);
    if (res && res.errCode === 0) {
      const { data, message, accessToken, refreshToken, errCode } = res;
      // lưu token vào store
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      return { data, accessToken, message, errCode };
    } else {
      return { message: res.message, errCode: res.errCode };
    }
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí refreshToken
export const refreshToken = createAsyncThunk("user/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
    if (!storedRefreshToken) throw new Error("No refresh token");

    const res = await refreshTokenApi(storedRefreshToken);
    const accessToken = res.accessToken;
    const data = res.data
    if (!accessToken) {
      return rejectWithValue({ message: res.message });
    }
    await AsyncStorage.setItem("accessToken", accessToken);
    
    return { accessToken,data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí logoutAccount
export const logoutAccount = createAsyncThunk("user/logout", async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
});

// hàm xử lí register
export const registerAccount = createAsyncThunk("user/registerAccount", async (data, { rejectWithValue }) => {
  try {
    const res = await registerApi(data);
    return { errCode: res.errCode, message: res.message };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí login with google
export const loginWithGoogleAccount = createAsyncThunk("user/loginWithGoogleAccount", async (data, { rejectWithValue }) => {
  try {
    const res = await loginWithGoogleApi(data);
    if (res && res.errCode === 0) {
      const { data, message, accessToken, refreshToken, errCode } = res;
      // lưu token vào store
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      return { data, accessToken, message, errCode };
    } else {
      return { message: res.message, errCode: res.errCode };
    }
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});