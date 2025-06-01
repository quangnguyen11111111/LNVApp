import axios from "../../../axios";
// lấy dữ liệu 1 người
export const handleGetAllFoldersUser = (userID, offset, limit) => {
    return axios.get('/api/getAllFoldersUser', {
      params: { userID, offset, limit }  // Truyền userId vào query string
    });
  };
// lấy dữ liệu folder của mn trừ 1 người
export const handleGetAllFoldersExceptUser = (userID, offset, limit) => {
    return axios.get('/api/getAllFoldersExceptUser', {
      params: { userID, offset, limit }  // Truyền userId vào query string
    });
  };
// lấy dữ liệu chi tiết của folder
export const handleGetFolderDetail = (userID,folderID,offset, limit) => {
    return axios.get('/api/getFolderDetail', {
      params: { userID:userID
        ,folderID:folderID,
        offset, limit
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
export const handleSearchFolder = (userID, searchTerm) => {
  return axios.get('/api/searchFolder', {
    params: { userID, searchTerm }  // Truyền userId và searchTerm vào query string
  });
}