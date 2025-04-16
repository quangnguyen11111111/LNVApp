import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../constant/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { refreshToken } from './redux/user/userThunk'
import { useDispatch } from 'react-redux'

const StartApp = ({navigation}) => {
  const dispatch = useDispatch();
      useEffect (()=>{
      const  checkToken = async()=>{
        const token = await AsyncStorage.getItem("accessToken")
        
        if (!token) {
          navigation.navigate("auth", {
            screen: "loginAccount"
          });
      } else {
          // ✅ Nếu có token -> Gọi API refresh token
          dispatch(refreshToken())
              .unwrap()
              .then(() => {
                  navigation.replace("tabs");
              })
              .catch(() => {
                navigation.navigate("auth", {
                  screen: "loginAccount"
                });
              });
              
      }
      }
      checkToken();
    },[])
   // chuyển hướng đến login
    routerLogin = ()=>{
      navigation.navigate("auth", {
        screen: "loginAccount"
      });
      
    }
    //Chuyển hướng đến register
    routerRegister = ()=>{
      navigation.navigate("auth", {
        screen: "registerAccount"
      });

    }
  return (
    <View style={{flex:1,
        backgroundColor:Colors.backgroundColor,
        justifyContent:"center"
    }}>
      <View style={{
        padding:25
      }} >
      <Image source={require("../assets/images/logoApp.png")} style={styles.image} />
      <TouchableOpacity style={styles.button}
      onPress={()=>routerLogin()}
      >
        <Text style={[styles.buttonText]}>Login Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button,{backgroundColor:Colors.backgroundColor
      }]}  onPress={()=>routerRegister()} >
        <Text style={styles.buttonText} >Register</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

export default StartApp

const styles = StyleSheet.create({
  button:{
    padding:15,
    backgroundColor:Colors.backgroundButton,
    marginTop:20,
    borderRadius:8,
    elevation: 5,
    borderWidth:2,
    borderColor:"#383994"
  },
  buttonText:{
    textAlign:"center",
    fontSize:20,
    fontFamily:"outfit-bold",
    color:Colors.white
  },
  image:{
    width:"90%",
    height:300,
     alignSelf:"center",
     resizeMode: 'contain',
  }
})