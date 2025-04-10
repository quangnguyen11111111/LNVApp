// src/viewmodels/RegisterAccountViewModel.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAccount } from "../redux/user/userThunk";
import { showToast } from "../../ToastShow/ToastUtil";

export const useRegisterAccountViewModel = (navigation) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    userAccount: "",
    userPassword: "",
    userGmail: "",
    userPhone: "",
    userName: "",
  });

  const [error, setError] = useState({});

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!user.userAccount) {
      errors.errorUserAccount = "Tài khoản không được để trống.";
      isValid = false;
    } else if (user.userAccount.includes(" ")) {
      errors.errorUserAccount = "Tài khoản không được chứa khoảng trắng.";
      isValid = false;
    }

    if (!user.userPassword) {
      errors.errorUserPassword = "Mật khẩu không được để trống.";
      isValid = false;
    } else if (user.userPassword.includes(" ")) {
      errors.errorUserPassword = "Mật khẩu không được chứa khoảng trắng.";
      isValid = false;
    } else if (user.userPassword.length < 6) {
      errors.errorUserPassword = "Mật khẩu phải có ít nhất 6 ký tự.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.userGmail) {
      errors.errorUserGmail = "Email không được để trống.";
      isValid = false;
    } else if (!emailRegex.test(user.userGmail)) {
      errors.errorUserGmail = "Email không hợp lệ.";
      isValid = false;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!user.userPhone.trim()) {
      errors.errorUserPhone = "Số điện thoại không được để trống.";
      isValid = false;
    } else if (!phoneRegex.test(user.userPhone)) {
      errors.errorUserPhone = "Số điện thoại phải có 10 số và bắt đầu bằng 0.";
      isValid = false;
    }

    if (!user.userName.trim()) {
      errors.errorUserName = "Tên không được để trống.";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleRegisterAccount = async () => {
    if (!validate()) return;

    try {
      const response = await dispatch(registerAccount(user)).unwrap();
      if (response.errCode === 0) {
        showToast("success", "Thành công", response.message);
        setUser({
          userAccount: "",
          userPassword: "",
          userGmail: "",
          userPhone: "",
          userName: "",
        });
        navigation.replace("loginAccount");
      } else {
        showToast("error", "Thất bại", response.message);
      }
    } catch (error) {
      showToast("error", "Lỗi kết nối", "Hệ thống bị mất kết nối");
    }
  };

  return {
    user,
    error,
    isLoading,
    handleChange,
    handleRegisterAccount,
  };
};
