import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGetDetailFolderThunk,
  handleGetAllFolderUserThunk,
  handleSearchFolderThunk
 } from "../../redux/folder/folderThunk";
import { useRoute } from "@react-navigation/native";
export const CourseDetailViewModel = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
  const { isLoading, folder,folderSearch } = useSelector((state) => state.folder);
  const dispatch = useDispatch();
    const [offset, setOffset] = useState(0);
  const [limit] = useState(10); // Lấy 10 bản mỗi lần
  const handleGetDetailFolder = async (userID, folderID) => {
   await dispatch(handleGetDetailFolderThunk({ userID, folderID, offset: 0, limit: 10 }));
    navigation.navigate("lessonDetail", { folderID,userIDNow: userID});
  };
  // Xử lí tìm kiếm
  const [dataFolder, setDataFolder] = useState("");
  const [dataInput, setDataInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextLoad, setNextLoad] = useState(true);
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
      const filteredData = await dispatch(handleSearchFolderThunk({ userID: user.userID, searchTerm: dataInput }));
      
      setDataFolder(filteredData.payload.data);
    } else {
      setDataFolder(folder);
    }
  }
  useEffect(() => {
    if(!isSearch){
      setDataFolder(folder);
    }
  }, [isSearch, dataInput, folder]);
  // Hàm tải dữ liệu thêm khi người dùng cuộn đến cuối danh sách
  const onEndReached = async () => {
    
    // Khi người dùng cuộn gần đến cuối, tải thêm dữ liệu
    if (!isLoading && nextLoad && !isLoadingMore&&!isSearch) {
      setIsLoadingMore(true);
      setOffset((prevOffset) => prevOffset + limit); // Tăng offset
      const res = await dispatch(handleGetAllFolderUserThunk({ userID: user.userID, offset: offset + limit, limit }));
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
    folder,
    handleGetDetailFolder,
    user,
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
