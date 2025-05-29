import axios from "../../../axios";
// lấy dữ liệu chi tiet file
export const handleGetAllDetailFile = (fileID,fileName) => {
    return axios.get('/api/getAllDetailFile', {
      params: { fileID:fileID,
        fileName:fileName }  // Truyền userId vào query string
    });
  };
// Tạo file và chi tiết file
export const handleCreateFile = (data) => {
    return axios.post('/api/createNewFile', data);
  };
//Cập nhật file và chi tiết file
export const handleUpdateFile = (data) => {
    return axios.post('/api/updateFile', data);
  };
//Hàm xóa file
export const handleDeleteFile = (fileID) => {
  return axios.delete('/api/deleteFile', {
    params: { fileID: fileID }
  });
};