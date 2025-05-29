import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice";
import folderReducer from "./folder/folderSlice"
import fileReducer from "./file/fileSlice"
export const store = configureStore({
    reducer: {
        user: userReducer,
        folder:folderReducer,
        file:fileReducer
      },
      
})