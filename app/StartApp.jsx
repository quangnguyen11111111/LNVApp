import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constant/Colors'

const StartApp = ({navigation}) => {
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