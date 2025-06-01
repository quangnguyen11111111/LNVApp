
import { useDispatch, useSelector } from "react-redux";
import {handleGetAllFolderUserThunk,
  handleGetAllFolderExceptUserThunk,
  handleGetDetailFolderThunk
} from '../redux/folder/folderThunk'
import {  useEffect, useState } from "react";
export const HomeViewModel = (navigation) => {
  const {user } = useSelector((state) => state.user);
    const { isLoading,folder,folderExceptUser } = useSelector((state) => state.folder);
      const dispatch = useDispatch();
      const [refreshing, setRefreshing] = useState(false);
      useEffect(()=>{
           dispatch(handleGetAllFolderUserThunk({ userID: user.userID, offset: 0, limit:10 }))
           dispatch(handleGetAllFolderExceptUserThunk({ userID: user.userID, offset: 0, limit:10 }))
      },[])
      const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(handleGetAllFolderExceptUserThunk({ userID: user.userID, offset: 0, limit:10 }));
       await dispatch(handleGetAllFolderUserThunk({userID:user.userID,offset: 0,limit: 10}))
        setRefreshing(false);
      };
          const handleGetDetailFolder=async(userID,folderID)=>{
            
          await  dispatch(handleGetDetailFolderThunk({userID,folderID,offset: 0, limit:10}))
            navigation.navigate("course", {
  screen: "lessonDetail",
  params: {
    fromHome: true,
    fromScreen: "home", 
    folderID,
    userIDNow:userID
  },
});


          }
      let folderTop4 = [];
      if (!isLoading && Array.isArray(folder) && folder.length > 0) {
        folderTop4 = folder.length > 4 ? folder.slice(0, 4) : folder;
      }
      let folderTop8 = [];
      if (!isLoading && Array.isArray(folderExceptUser) && folderExceptUser.length > 0) {
        folderTop8 = folderExceptUser.length > 8 ? folderExceptUser.slice(0, 8) : folderExceptUser;
      }
      
  return {isLoading,user,folderTop4,folderTop8,onRefresh,refreshing,handleGetDetailFolder}
};
