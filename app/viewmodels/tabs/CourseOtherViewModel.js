import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  handleGetDetailFolderThunk,
  handleGetAllFolderExceptUserThunk,
} from "../../redux/folder/folderThunk";
export const CourseOtherViewModel = (navigation) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading, folderExceptUser } = useSelector((state) => state.folder);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(handleGetAllFolderExceptUserThunk(user.userID));
    setRefreshing(false);
  };
  const dispatch = useDispatch();
  const handleGetDetailFolder = async (userID, folderID) => {
    dispatch(handleGetDetailFolderThunk({ userID, folderID }));
    navigation.navigate("course", {
      screen: "lessonDetail",
      params: {
        fromHome: true,
        fromScreen: "courseOther",
        folderID,
        userIDNow: userID,
      },
    });
  };
  //xử lí tìm kiếm
    const [dataFolder,setDataFolder] = useState("");
      const [dataInput,setDataInput] = useState("");
          const [isSearch,setIsSearch] = useState(false);
      const searchRef=useRef(null)
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
          const filteredData = folderExceptUser.filter(item => 
            item.folderName.toLowerCase().includes(dataInput.toLowerCase())||
            item.user.userName.toLowerCase().includes(dataInput.toLowerCase())
          );
          setDataFolder(filteredData);
        } else {
          setDataFolder(folderExceptUser);
        }
      }, [isSearch, dataInput, folderExceptUser]);
  return {
    isLoading,
    folderExceptUser,
    user,
    handleGetDetailFolder,
    onRefresh,
    refreshing,
        isSearch,
    toggleSearch,
    searchRef,
    dataInput,
    setDataInput,
    dataFolder,
  };
};
