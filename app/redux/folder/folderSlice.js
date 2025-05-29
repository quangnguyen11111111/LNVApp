import { createSlice } from "@reduxjs/toolkit";
import {
    handleGetAllFolderUserThunk,
    handleGetAllFolderExceptUserThunk,
    handleGetDetailFolderThunk,
    handleCreateFolderThunk,
    handleUpdateFolderNameThunk,
    handleDeleteFolderThunk
} from "./folderThunk"
//Vì lỡ để list file bên folder nên phải chỉnh sửa ở file này
import {handleUpdateFileThunk,
  handleDeleteFileThunk
}  from "../file/fileThunk";
const initialState = {
    folder: null,
    isLoading: false,
    errCode: null,
    message: null,
    folderExceptUser:null,
    folderName:null,
    isLoadingDetail:false,
    folderDetail:null,
  };
const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //lấy tất cả folder người dùng
      .addCase(handleGetAllFolderUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetAllFolderUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleGetAllFolderUserThunk.fulfilled, (state, action) => {
        state.folder = action.payload.data;
        state.isLoading = false;
      })
      //lấy tất cả folder người dùng trừ người dùng hiện tại
      .addCase(handleGetAllFolderExceptUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetAllFolderExceptUserThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleGetAllFolderExceptUserThunk.fulfilled, (state, action) => {
        state.folderExceptUser = action.payload.data;
        state.isLoading = false;
      })
      //lấy chi tiết folder
      .addCase(handleGetDetailFolderThunk.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(handleGetDetailFolderThunk.rejected, (state) => {
        state.isLoadingDetail = false;
      })
      .addCase(handleGetDetailFolderThunk.fulfilled, (state, action) => {
        state.folderDetail = action.payload.data;
        state.isLoadingDetail = false;
        state.folderName=action.payload.folderName;
      })
      //Tạo thư mục
      .addCase(handleCreateFolderThunk.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(handleCreateFolderThunk.rejected, (state) => {
        state.isLoadingDetail = false;
      })
      .addCase(handleCreateFolderThunk.fulfilled, (state, action) => {
        if (action.payload.errCode == 0) {
          state.folder = [ action.payload.data,...state.folder,];
        }
        state.isLoading = false;
        state.message = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      //Cập nhật tên thư mục
      .addCase(handleUpdateFolderNameThunk.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(handleUpdateFolderNameThunk.rejected, (state) => {
        state.isLoadingDetail = false;
      })
      .addCase(handleUpdateFolderNameThunk.fulfilled, (state, action) => {
        if (action.payload.errCode == 0) {
          const updatedFolder = state.folder.map((folder) =>
        folder.folderID === action.payload.data.folderID
          ? { ...folder, folderName: action.payload.data.newFolderName }
          : folder
          );
          state.folder = updatedFolder;
          state.folderName = action.payload.data.newFolderName;
        }
        state.isLoadingDetail = false;
        state.message = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      //xóa thư mục
      .addCase(handleDeleteFolderThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleDeleteFolderThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleDeleteFolderThunk.fulfilled, (state, action) => {
        if (action.payload.errCode == 0) {
          state.folder = state.folder.filter(
        (folder) => folder.folderID != action.payload.data
          );
        }
        
        state.isLoading = false;
        state.message = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      //xóa file
      .addCase(handleDeleteFileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleDeleteFileThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleDeleteFileThunk.fulfilled, (state, action) => {
        if (action.payload.errCode == 0) {
          state.folderDetail = state.folderDetail.filter(
        (folderDetail) => folderDetail.fileID != action.payload.data
          );
        }
        
        state.isLoading = false;
        state.message = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      // cập nhật file trong folder
      .addCase(handleUpdateFileThunk.pending, (state) => {
        state.isLoadingDetail = true;
      })
      .addCase(handleUpdateFileThunk.rejected, (state) => {
        state.isLoadingDetail = false;
      })
      .addCase(handleUpdateFileThunk.fulfilled, (state, action) => {
  if (action.payload.errCode === 0) {
    const { fileID, fileName, folderID } = action.payload.data;

    // Tìm file hiện tại theo ID
    const fileInState = state.folderDetail.find((file) => file.fileID == fileID);

    if (fileInState) {
      if (fileInState.folderID == folderID) {
        // Cùng folder -> cập nhật tên
        state.folderDetail = state.folderDetail.map((file) =>
          file.fileID == fileID ? { ...file, fileName } : file
        );
      } else {
        // Khác folder -> xóa khỏi folder hiện tại
        state.folderDetail = state.folderDetail.filter((file) => file.fileID !== fileID);
      }
    }
  }
  state.isLoadingDetail = false;
});

  },
});

export default folderSlice.reducer;