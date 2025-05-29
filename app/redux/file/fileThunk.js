import { createAsyncThunk } from "@reduxjs/toolkit";
import {handleGetAllDetailFile,
  handleCreateFile,
  handleUpdateFile,
  handleDeleteFile
}from './fileApi'
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

  // hàm xử lí lấy dữ liệu folder của mọi người dùng trừ người dùng hiện tại
  export const handleGetAllDetailFileThunk = createAsyncThunk("file/getAllDetailFile",async({fileID,fileNameRes},{rejectWithValue})=>{
    try {
        const res = await handleGetAllDetailFile(fileID,fileNameRes)
        
        const {errCode,data,fileName}=res
        return{errCode,data,fileName}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
// hàm xử lí tạo file
export const handleCreateFileThunk = createAsyncThunk("file/handleCreateFile", async (data1, { rejectWithValue }) => {
  try {
    const res = await handleCreateFile(data1);
    const { errCode, message } = res;
    return { errCode, message };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí cập nhật file
export const handleUpdateFileThunk = createAsyncThunk("file/handleUpdateFile", async (data1, { rejectWithValue }) => {
  try {
    const res = await handleUpdateFile(data1);
    console.log("đang cập nhật file", res.data);
    
    const { errCode, message,data } = res;
    return { errCode, message,data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí xóa file
export const handleDeleteFileThunk = createAsyncThunk("file/handleDeleteFile", async ({fileID}, { rejectWithValue }) => {
  try {
    const res = await handleDeleteFile(fileID);
    console.log("đang cập nhật file", res.data,errCode,fileID);
    const { errCode, message, data } = res;
    return { errCode, message, data};
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});