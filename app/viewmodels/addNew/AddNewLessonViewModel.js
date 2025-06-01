import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../ToastShow/ToastUtil";
import {handleCreateFileThunk,handleUpdateFileThunk} from '../../redux/file/fileThunk'
import { useRoute } from "@react-navigation/native";
export const AddNewLessonViewModel = (navigation) => {
  const { user } = useSelector((state) => state.user);
  const { folder } = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [nameFile, setNameFile] = useState("");
  const [arrDataDetail, setArrDataDetail] = useState([
    { fileSource: '', fileTarget: '' }
  ]);
  const scrollViewRef = useRef(null);
  const inputFolder = useRef(null);
  const inputFile = useRef(null);
  const inputRefs = useRef([]);
//Hàm xử lí dữ liệu định dạng id title
  const dropdownData = folder.map((item) => ({
    id: item.folderID.toString(),
    title: item.folderName || 'Không tên',
  }));
//hàm cập nhật dữ liệu khi người dùng nhập vào
const handleInputChange = (index, key, value) => {
  setArrDataDetail(prev => {
    const updated = [...prev];
    updated[index] = {
      ...updated[index],
      [key]: value
    };
    return updated;
  });
};
const [loading, setLoading] = useState(true); // thêm dòng này

// Hàm thêm cặp mới vào mảng arrDataDetail
  const addNewInputPair = () => {
    setArrDataDetail(prev => {
      const newArr = [...prev, { fileSource: '', fileTarget: '' }];
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return newArr;
    });
  };
// validateInputs là hàm kiểm tra dữ liệu người dùng nhập vào
  const validateInputs = () => {
    if (!selectedItem) {
      showToast("error", "Lỗi", "Vui lòng chọn thư mục để lưu bài học");
      inputFolder.current?.focus();
      return false;
    }
    if (nameFile.trim() === "") {
      showToast("error", "Lỗi", "Vui lòng nhập tên bài học");
      inputFile.current?.focus();
      return false;
    }
    if (arrDataDetail.length < 4) {
      showToast("error", "Lỗi","Bạn cần nhập ít nhất 4 cặp ngôn ngữ.");
      return false;
    }
    if (!isUpdate) {
      for (let i = 0; i < arrDataDetail.length; i++) {
        const { fileSource, fileTarget } = arrDataDetail[i];
        if (!fileSource.trim()) {
          showToast("error", "Lỗi", "Không được để trống trường nào trong cặp thứ " + (i + 1));
          inputRefs.current[i * 2]?.focus();
          return false;
        }
        if (!fileTarget.trim()) {
          showToast("error", "Lỗi", "Không được để trống trường nào trong cặp thứ " + (i + 1));
          inputRefs.current[i * 2 + 1]?.focus();
          return false;
        }
      }
    } else {
      const filteredData = arrDataDetail.filter(({ fileSource, fileTarget }) => fileSource.trim() || fileTarget.trim());
      if (filteredData.length !== arrDataDetail.length && filteredData.length >4) {
        setArrDataDetail(filteredData);
        console.log("Đã xóa các cặp rỗng.");
      }else{
        for (let i = 0; i < arrDataDetail.length; i++) {
        const { fileSource, fileTarget } = arrDataDetail[i];
        if (!fileSource.trim()) {
          showToast("error", "Lỗi", "Không được để trống trường nào trong cặp thứ " + (i + 1));
          inputRefs.current[i * 2]?.focus();
          return false;
        }
        if (!fileTarget.trim()) {
          showToast("error", "Lỗi", "Không được để trống trường nào trong cặp thứ " + (i + 1));
          inputRefs.current[i * 2 + 1]?.focus();
          return false;
        }
      }
      }
    }
    return true;
  };
const handleCreateFile = async () => {
    if (!validateInputs()) return;
    let response
    if (isUpdate) {
      console.log('đang cập nhật file');
      
    const fileData = {
      fileID: fileID,
      fileName: nameFile,
      folderID: selectedItem.id,
      arrDataDetail: arrDataDetail,
    };
     response = await dispatch(handleUpdateFileThunk(fileData));
     
    }else{
      
    const fileData = {
      fileName: nameFile,
      folderID: selectedItem.id,
      arrDataDetail: arrDataDetail
    };
     response = await dispatch(handleCreateFileThunk(fileData));}
         const { payload } = response;
    if (payload.errCode === 0) {
      showToast("success", "Thành công", payload.message);
      
    } else {
      showToast("error", "Thất bại", payload.message);
    }navigation.goBack();
}
//xử lí dữ liệu cập nhật file
  const route = useRoute();
  const { isUpdate,fileName,arrFile,folderID,fileID } = route.params || {};
  useEffect(() => {
    if (isUpdate) {
  setLoading(true);
  setTimeout(() => {
    setNameFile(fileName || "");
    setArrDataDetail(arrFile || []);
    setLoading(false);
  }, 50);
} else {
  setLoading(false);
}

  }, [isUpdate, fileName, arrFile, folderID, folder]);
useEffect(() => {
  if (!loading && folderID && dropdownData.length > 0) {
    const selectedFolder = dropdownData.find((item) => item.id == folderID);
    if (selectedFolder) {
      setSelectedItem(selectedFolder);
    }
  }
}, [loading]);


  return {
    dropdownData,
    user,
    selectedItem,
    setSelectedItem,
    nameFile,
    setNameFile,
    handleInputChange,
    addNewInputPair,
    arrDataDetail,
    scrollViewRef,
    inputRefs,
    validateInputs,
    handleCreateFile,
    inputFolder,
    inputFile,
    loading
  };
};
