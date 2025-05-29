
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateFolderThunk,
    handleUpdateFolderNameThunk,
 } from "../../redux/folder/folderThunk"
import { showToast } from "../../../ToastShow/ToastUtil";
import { useRoute } from "@react-navigation/native";
export const AddNewCourseViewModel = (navigation) => {
    const {user } = useSelector((state) => state.user);
      const { message,errCode } = useSelector((state) => state.folder);
    const dispatch = useDispatch();
    const [dataInput,setDataInput] = useState("");
    let validate=()=>{
      let str=""
      let err=true
       if(dataInput.trim() === ""){
        str = "Tên khóa học không được để trống";
         showToast("error", "Lỗi", str);
        err=false
      }
      return err
    }
    const createNewCouse= async(folderName,userID,userName)=>{
      if(!validate()) return
       let response
       if (isUpdate) {
        response = await dispatch(handleUpdateFolderNameThunk({folderID,newFolderName:folderName,userID}));}
      else {
        response = response = await dispatch(handleCreateFolderThunk({folderName:folderName,userID,userName}));;}
       const {payload}=response
       
        
        if(payload.errCode == 0){
            showToast("success", "Thành công", payload.message);
        }else{
            showToast("error", "Thất bại", payload.message);
        }
        navigation.goBack();
    }
    //xử lí cập nhật tên folder
      const route = useRoute();
      const { isUpdate,folderName,folderID,userID } = route.params || {};
      useEffect(() => {
        if (isUpdate) {
          setDataInput(folderName);
        } else {
          setDataInput("");
        }
      }, [isUpdate]);
  return {dataInput, setDataInput,user,createNewCouse}
};
