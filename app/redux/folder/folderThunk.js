import { createAsyncThunk } from "@reduxjs/toolkit";
import {handleGetAllFoldersUser,
  handleGetAllFoldersExceptUser,
  handleGetFolderDetail,
  handleCreateFolder,
  handleUpdateFolderName,
  handleDeleteFolder

}from './folderApi'
//hàm hiển thị lỗi chung
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

  // hàm xử lí lấy dữ liệu folder của người dùng
  export const handleGetAllFolderUserThunk = createAsyncThunk("folder/getAllFoldersUser",async(data1,{rejectWithValue})=>{
    try {
        const res = await handleGetAllFoldersUser(data1)
        const {errCode,data}=res
        return{errCode,data}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
  // hàm xử lí lấy dữ liệu folder của mọi người dùng trừ người dùng hiện tại
  export const handleGetAllFolderExceptUserThunk = createAsyncThunk("folder/getAllFoldersExceptUser",async(data1,{rejectWithValue})=>{
    try {
        const res = await handleGetAllFoldersExceptUser(data1)
        const {errCode,data}=res
        return{errCode,data}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
  // hàm xử lí lấy chi tiÕt dữ liệu folder
  export const handleGetDetailFolderThunk = createAsyncThunk("folder/getAllDetailFolder",async({userID,folderID},{rejectWithValue})=>{
    try {
    const res = await handleGetFolderDetail(userID,folderID)
      
        const {errCode,data,folderName}=res
        return{errCode,data,folderName}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
// hàm xử lí tạo thư mục
export const handleCreateFolderThunk = createAsyncThunk("folder/handleCreateFolder", async (data1, { rejectWithValue }) => {
  try {
    const res = await handleCreateFolder(data1);
    const { errCode, message, data } = res;
    return { errCode, message, data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí tạo thư mục
export const handleUpdateFolderNameThunk = createAsyncThunk("folder/handleUpdateFolderName", async (data1, { rejectWithValue }) => {
  try {
    const res = await handleUpdateFolderName(data1);
    const { errCode, message, data } = res;
    return { errCode, message, data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
//hàm xử lí xóa thư mục
export const handleDeleteFolderThunk = createAsyncThunk("folder/handleDeleteFolder", async ({ userID, folderID }, { rejectWithValue }) => {
  try {
    const res = await handleDeleteFolder(userID, folderID);
    log("đang xóa folder", userID, folderID);
    const { errCode, message,data } = res;
    return { errCode, message,data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});