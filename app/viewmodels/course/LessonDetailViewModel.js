import { useDispatch, useSelector } from "react-redux";
import {
  handleGetAllDetailFileThunk,

} from "../../redux/file/fileThunk";
import {handleDeleteFolderThunk,
  handleGetDetailFolderThunk
} from "../../redux/folder/folderThunk";
import { showToast } from "../../../ToastShow/ToastUtil";
import { useRoute } from "@react-navigation/native";
import { use, useEffect, useState } from "react";
import { Alert } from "react-native";
export const LessonDetailViewModel = (navigation) => {
  const { isLoadingDetail, folderName, folderDetail } = useSelector(
    (state) => state.folder
  );
  const [dataFolder, setDataFolder] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isSetting, setIsSetting] = useState(true);
     const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Lấy 10 bản mỗi lần
    const [isLoadingMore, setIsLoadingMore] = useState(false);// Dùng để kiểm tra xem có đang tải thêm dữ liệu hay không
  const [nextLoad, setNextLoad] = useState(true);
  const route = useRoute();
  const { fromScreen,folderID,userIDNow } = route.params || {};
    useEffect(() => {
        setDataFolder(folderDetail);
        setOffset(0);
        setNextLoad(true);
    },[folderDetail]);
  const handleGetDetailFile = (fileID, fileNameRes) => {
    dispatch(handleGetAllDetailFileThunk({ fileID, fileNameRes }));
    navigation.navigate("optionLearn", {
      screen: "homeOption",
      params: {
        userIDNow,
        folderID,
        fileID
      },
    });
  };
  const handleBack = () => {
    if (fromScreen === "home") {
      navigation.navigate("home");
    } else if (fromScreen === "courseOther") {
      navigation.navigate("courseOther");
    } else {
      navigation.goBack(); // fallback nếu không có
    }
  };
  //hàm kiểm tra có được quyền chỉnh sửa folder hay không
  useEffect(() => {
    if (userIDNow === user.userID) {
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
  // hàm xử lí cập nhật tên folder
  const handleOpenUpdateFolderModal = () => {

    navigation.navigate("addNew", {
      screen: "addNewCourse",
      params: {
        isUpdate: true,
        folderName: folderName,
        folderID: folderID,
        userID: folderDetail.userID,
      },
    });
    setModalVisible(false);
  };
useEffect(() => {
   setModalVisible(false);
  }, [folderName, isLoadingDetail]);

  // hàm xóa folder
const handleDeleteFolder = () => {
  Alert.alert(
    "Xác nhận xóa",
    "Bạn có chắc chắn muốn xóa thư mục này không?",
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
              handleDeleteFolderThunk({ folderID, userID: user.userID })
            );
            const { payload } = response;

            if (payload.errCode === 0) {
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

  const onEndReached = async () => {
    
    // Khi người dùng cuộn gần đến cuối, tải thêm dữ liệu
    if ( nextLoad) {
      setIsLoadingMore(true);
      setOffset((prevOffset) => prevOffset + limit); // Tăng offset
      const res = await dispatch(handleGetDetailFolderThunk({ userID: user.userID,folderID, offset: offset + limit, limit }));
      if (res.payload.errCode == 0) {
        // Kiểm tra nếu không còn dữ liệu mới để tải
        if (res.payload.data.length < limit) {
          setNextLoad(false); // Không còn dữ liệu mới
        }
        
      }
      setIsLoadingMore(false);
    }
  };

  return {
    isLoadingDetail,
    folderName,
    folderDetail,
    handleGetDetailFile,
    handleBack,
    toggleModal,
    isModalVisible,
    handleOpenUpdateFolderModal,
    handleDeleteFolder,
    isSetting,
    onEndReached,
    isLoadingMore,
    dataFolder
  };
};
