// src/viewModels/LoginViewModel.ts
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAccount,loginWithGoogleAccount } from "../redux/user/userThunk";
import { showToast } from "../../ToastShow/ToastUtil";
import 'expo-dev-client';
import { GoogleSignin,GoogleSigninButton  } from '@react-native-google-signin/google-signin';

export const useLoginViewModel = (navigation) => {
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const accountInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const validate = () => {
    if (userAccount === "") {
      showToast("error", "Lỗi", "Vui lòng nhập tài khoản");
      accountInputRef.current?.focus();
      return false;
    }
    if (userPassword === "") {
      showToast("error", "Lỗi", "Vui lòng nhập mật khẩu");
      passwordInputRef.current?.focus();
      return false;
    }
    if (userAccount.includes(" ") || userPassword.includes(" ")) {
      showToast("error", "Lỗi", "Tài khoản hoặc mật khẩu không được chứa dấu cách");
      return false;
    }
    if (userPassword.length < 6) {
      showToast("error", "Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      passwordInputRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleLoginWithGoogle = async (userInfo) => {
    try {
      const response = await dispatch(loginWithGoogleAccount({ userAccount:userInfo.email, userGmail:userInfo.email,userName:userInfo.name })).unwrap();
      if (response.errCode === 0) {
        showToast("success", "Thành công", response.message);
        navigation.reset({
          index: 0,  // Chỉ định màn hình đầu tiên trong stack (tabs)
          routes: [{ name: 'tabs' }],  // Định nghĩa các route muốn giữ lại
        });
        
      } else {
        showToast("error", "Thất bại", response.message);
      }
    } catch (error) {
      showToast("error", "Lỗi kết nối", "Hệ thống bị mất kết nối");
      console.log(error);
      
    }
  };
  const handleLogin = async () => {
    if (!validate()) return;
    try {
      const response = await dispatch(loginAccount({ userAccount, userPassword })).unwrap();
      if (response.errCode === 0) {
        showToast("success", "Thành công", response.message);
        navigation.reset({
          index: 0,  // Chỉ định màn hình đầu tiên trong stack (tabs)
          routes: [{ name: 'tabs' }],  // Định nghĩa các route muốn giữ lại
        });
      } else {
        showToast("error", "Thất bại", response.message);
      }
    } catch (error) {
      showToast("error", "Lỗi kết nối", "Hệ thống bị mất kết nối");
      console.log(error);
      
    }
  };

    useEffect(() => {
      GoogleSignin.configure({
        webClientId: '428261725591-09ei2o0r3gp4rijospe96atjq0uhogle.apps.googleusercontent.com',
      });
    }, []);
   const onGoogleButtonPress = async () => {
      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();
    
        // ✅ Lấy idToken từ đúng chỗ
        const idToken = signInResult.data?.idToken;
        const userInfo = signInResult.data?.user;
    
        if (!idToken) throw new Error('Không lấy được idToken');
    
       
       await handleLoginWithGoogle(userInfo)
        
        await GoogleSignin.signOut();
    
      } catch (error) {
        console.log('❌ Lỗi đăng nhập:', error?.message || error);
      }
    };
    
    
  
    const onLogoutPress = async () => {
      try {
        setUser(null); // Chỉ xoá user local
        console.log('✅ Đã đăng xuất');
      } catch (error) {
        console.log('❌ Lỗi khi đăng xuất:', error?.message || error);
      }
    };
  return {
    userAccount,
    setUserAccount,
    userPassword,
    setUserPassword,
    handleLogin,
    accountInputRef,
    passwordInputRef,
    isLoading,
    onLogoutPress,
    onGoogleButtonPress,
    GoogleSigninButton
  };
};
