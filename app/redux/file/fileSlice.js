import { createSlice } from "@reduxjs/toolkit";
import {
  handleGetAllDetailFileThunk,
  handleCreateFileThunk,
  handleUpdateFileThunk,
  handleDeleteFileThunk
} from "./fileThunk"

const initialState = {
    fileDetail: null,
    isLoading: false,
    errCode: null,
    message: null,
    fileName:null,
    errCodeCreateFile: null,
  };
const fileSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetAllDetailFileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleGetAllDetailFileThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleGetAllDetailFileThunk.fulfilled, (state, action) => {
        state.fileDetail = action.payload.data;
        state.fileName = action.payload.fileName;
        state.isLoading = false;
        state.errCode = action.payload.errCode;
      })
      .addCase(handleCreateFileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleCreateFileThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleCreateFileThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.errCodeCreateFile = action.payload.errCode;
      })
      .addCase(handleUpdateFileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleUpdateFileThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleUpdateFileThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        
        state.isLoading = false;
        state.errCode = action.payload.errCode;
        if (action.payload.errCode == 0) {
          state.fileName = action.payload.data.fileName;
          state.fileDetail = action.payload.data.arrDataDetail;
        }
      })
      .addCase(handleDeleteFileThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleDeleteFileThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(handleDeleteFileThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.errCode = action.payload.errCode;
      })

  },
});

export default fileSlice.reducer;