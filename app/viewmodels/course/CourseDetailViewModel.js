import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetDetailFolderThunk } from "../../redux/folder/folderThunk";
import { useRoute } from "@react-navigation/native";
export const CourseDetailViewModel = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading, folder } = useSelector((state) => state.folder);
  const dispatch = useDispatch();

  const handleGetDetailFolder = async (userID, folderID) => {
    dispatch(handleGetDetailFolderThunk({ userID, folderID }));
    navigation.navigate("lessonDetail", { folderID,userIDNow: userID});
  };
  // Xử lí tìm kiếm
  const [dataFolder, setDataFolder] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);
  const toggleSearch = () => {
    setIsSearch(!isSearch);
    setDataInput("");
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 300);
  };
  useEffect(() => {
    if (isSearch && dataInput.trim() !== "") {
      const filteredData = folder.filter((item) =>
        item.folderName.toLowerCase().includes(dataInput.toLowerCase())
      );
      setDataFolder(filteredData);
    } else {
      setDataFolder(folder);
    }
  }, [isSearch, dataInput, folder]);
  return {
    isLoading,
    folder,
    handleGetDetailFolder,
    user,
    isSearch,
    toggleSearch,
    searchRef,
    dataInput,
    setDataInput,
    dataFolder,
  };
};
