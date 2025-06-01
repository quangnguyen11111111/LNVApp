import { createAsyncThunk } from "@reduxjs/toolkit";
import {handleGetAllFoldersUser,
  handleGetAllFoldersExceptUser,
  handleGetFolderDetail,
  handleCreateFolder,
  handleUpdateFolderName,
  handleDeleteFolder,
  handleSearchFolder

}from './folderApi'
import { showToast } from "../../../ToastShow/ToastUtil";
//hàm hiển thị lỗi chung
const handleError = (e, { rejectWithValue }) => {
    showToast("error", "Lỗi", "Đã có lỗi xảy ra khi gọi API");
    if (e.response) {
      showToast("error", "Lỗi", e.response.data.message || "Lỗi máy chủ");
    } else if (e.request) {
      showToast("error", "Lỗi", "Không nhận được phản hồi từ server");
    } else {
      showToast("error", "Lỗi", e.message || "Lỗi máy chủ");
    }
    return rejectWithValue({ message: "Lỗi máy chủ" });
  };

  // hàm xử lí lấy dữ liệu folder của người dùng
  export const handleGetAllFolderUserThunk = createAsyncThunk("folder/getAllFoldersUser",async({ userID, offset, limit },{rejectWithValue})=>{
    try {
        const res = await handleGetAllFoldersUser( userID, offset, limit )
        const {errCode,data,offset1}=res
        console.log("đang lấy dữ liệu folder",userID,offset,offset1,data);
        
        return{errCode,data,offset1}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
  // hàm xử lí lấy dữ liệu folder của mọi người dùng trừ người dùng hiện tại
  export const handleGetAllFolderExceptUserThunk = createAsyncThunk("folder/getAllFoldersExceptUser",async({ userID, offset, limit },{rejectWithValue})=>{
    try {
        const res = await handleGetAllFoldersExceptUser(userID, offset, limit )
        const {errCode,data,offset1}=res
        return{errCode,data,offset1}
    } catch (e) {
        handleError(e,{rejectWithValue})
    }
})
  // hàm xử lí lấy chi tiÕt dữ liệu folder
  export const handleGetDetailFolderThunk = createAsyncThunk("folder/getAllDetailFolder",async({userID,folderID, offset, limit },{rejectWithValue})=>{
    try {
    const res = await handleGetFolderDetail(userID,folderID, offset, limit)
        console.log("đang lấy dữ liệu chi tiết folder",userID,folderID,offset,limit);
        const {errCode,data,folderName,offset1}=res
        return{errCode,data,folderName,offset1}
    } catch (e) {
        handleError(e,{rejectWithValue})
        console.log("đã có lỗi xảy ra khi lấy dữ liệu chi tiết folder", offset, limit);
        
        
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
    const { errCode, message,data } = res;
    return { errCode, message,data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});
// hàm xử lí tìm kiếm dữ liệu folder
export const handleSearchFolderThunk = createAsyncThunk("folder/handleSearchFolder", async ({userID, searchTerm}, { rejectWithValue }) => {
  try {
    const res = await handleSearchFolder(userID, searchTerm);
    const { errCode, data } = res;
    return { errCode, data };
  } catch (e) {
    return handleError(e, { rejectWithValue });
  }
});