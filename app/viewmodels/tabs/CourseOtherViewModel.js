import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  handleGetDetailFolderThunk,
  handleGetAllFolderExceptUserThunk,
  handleSearchFolderThunk
} from "../../redux/folder/folderThunk";
export const CourseOtherViewModel = (navigation) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading, folderExceptUser } = useSelector((state) => state.folder);
  const [refreshing, setRefreshing] = useState(false);
  const [nextLoad, setNextLoad] = useState(true);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(
      handleGetAllFolderExceptUserThunk({
        userID: user.userID,
        offset: 0,
        limit: 10,
      })
    );
    setRefreshing(false);
  };
  const dispatch = useDispatch();
  const handleGetDetailFolder = async (userID, folderID) => {
    await  dispatch(handleGetDetailFolderThunk({ userID, folderID, offset: 0, limit: 10 }));
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
  const [dataFolder, setDataFolder] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Lấy 10 bản mỗi lần
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
 const handleSearchFolder = async()=>{
    if (isSearch && dataInput.trim() !== "") {
      const filteredData = await dispatch(handleSearchFolderThunk({ userID: folderExceptUser[0].userID, searchTerm: dataInput }));
      
      setDataFolder(filteredData.payload.data);
    } else {
      setDataFolder(folderExceptUser);
    }
  }
  useEffect(() => {
    if(!isSearch){
      setDataFolder(folderExceptUser);
    }
  }, [isSearch, dataInput, folderExceptUser]);
  // Hàm tải dữ liệu thêm khi người dùng cuộn đến cuối danh sách
  const onEndReached = async () => {
    // Khi người dùng cuộn gần đến cuối, tải thêm dữ liệu
    if (!isLoading && nextLoad && !isLoadingMore && !isSearch) {
      setIsLoadingMore(true);
      setOffset((prevOffset) => prevOffset + limit); // Tăng offset
      const res = await dispatch(
        handleGetAllFolderExceptUserThunk({
          userID: user.userID,
          offset: offset + limit,
          limit,
        })
      );
      if (res.payload.errCode === 0) {
        // Kiểm tra nếu không còn dữ liệu mới để tải
        if (res.payload.data.length < limit) {
          setNextLoad(false); // Không còn dữ liệu mới
        }
      }
      setIsLoadingMore(false);
    }
  };
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
    onEndReached,
    isLoadingMore,
    handleSearchFolder
  };
};
