import { StyleSheet, Text, View, Button, Image } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [user, setUser] = useState(null);

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
  
      // ✅ Dùng userInfo trực tiếp (không cần Firebase Auth nếu bạn không muốn lưu phiên)
      setUser({
        name: userInfo.name,
        email: userInfo.email,
        photo: userInfo.photo,
      });
  
      // ❌ KHÔNG gọi auth().signInWithCredential nếu bạn không muốn lưu token
      // 👉 Bạn có thể gửi idToken này về server để xác thực thủ công
  
      // (Tuỳ chọn) Đăng xuất khỏi Google để xoá cache
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

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={{ fontSize: 20 }}>Chào {user.name}</Text>
          <Text>Email: {user.email}</Text>
          {user.photo && (
            <Image
              source={{ uri: user.photo }}
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
            />
          )}
          <Button title="Đăng xuất" onPress={onLogoutPress} />
        </>
      ) : (
        <Button title="Đăng nhập với Google" onPress={onGoogleButtonPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
