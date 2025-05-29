import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  handleDeleteFileThunk
 } from "../../redux/file/fileThunk";
import { Alert } from "react-native";
import { showToast } from "../../../ToastShow/ToastUtil";
export const HomeOptionLearnViewModel = (navigation) => {
  const { isLoading, fileDetail, fileName } = useSelector(
    (state) => state.file
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //Xử lí chỉnh sửa file và xóa
  const [isSetting, setIsSetting] = useState(true);
  const route = useRoute();
  const { userIDNow,folderID,fileID} = route.params || {};

  //hàm kiểm tra có được quyền chỉnh sửa folder hay không
  useEffect(() => {
    if (userIDNow == user.userID) {
      setIsSetting(true);
    } else {
      setIsSetting(false);
    }
  }, [userIDNow]);
  //xử lí modal
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // useEffect(() => {
  //   setModalVisible(false);
  // }, []);
    const handleOpenUpdateFileModal = () => {

    navigation.navigate("addNew", {
      screen: "addNewLesson",
      params: {
        isUpdate: true,
        fileName: fileName,
        arrFile: fileDetail,
        folderID: folderID,
        fileID: fileID,
      },
    });
     setModalVisible(false);
  };
  const handleDeleteFile = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa file này không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await dispatch(
                handleDeleteFileThunk({ fileID })
              );
              const { payload } = response;
  
              if (payload.errCode == 0) {
                showToast("success", "Thành công", payload.message);
                navigation.goBack();
              } else {
                showToast("error", "Thất bại", payload.message);
              }
            } catch (error) {
              showToast("error", "Lỗi", "Đã có lỗi xảy ra");
            }
          }
        }
      ],
      { cancelable: true }
    );
  };
  console.log("fileID", fileID);
  
  return {
    isLoading,
    fileDetail,
    fileName,
    toggleModal,
    isModalVisible,
    isSetting,
    handleOpenUpdateFileModal,
    handleDeleteFile
  };
};
