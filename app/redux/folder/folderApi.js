import axios from "../../../axios";
// lấy dữ liệu 1 người
export const handleGetAllFoldersUser = (userID) => {
    return axios.get('/api/getAllFoldersUser', {
      params: { userID }  // Truyền userId vào query string
    });
  };
// lấy dữ liệu folder của mn trừ 1 người
export const handleGetAllFoldersExceptUser = (userID) => {
    return axios.get('/api/getAllFoldersExceptUser', {
      params: { userID }  // Truyền userId vào query string
    });
  };
// lấy dữ liệu chi tiết của folder
export const handleGetFolderDetail = (userID,folderID) => {
    return axios.get('/api/getFolderDetail', {
      params: { userID:userID
        ,folderID:folderID
      } 
    });
  };
// lấy dữ liệu chi tiết của folder
export const handleCreateFolder = (data) => {
    return axios.post('/api/createNewFolder', data);
  };
// cập nhật lại tên folder
export const handleUpdateFolderName = (data) => {
    return axios.post('/api/updateFolderName', data);
  };
// xóa folder
export const handleDeleteFolder = (userID,folderID) => {
  return axios.delete('/api/deleteFolder', {
    params: { userID:userID
        ,folderID:folderID
      }  
  });
  };