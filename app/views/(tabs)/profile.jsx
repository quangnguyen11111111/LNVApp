import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import baseTabsStyle from '../../styles/baseTabsStyle'
import {logoutAccount}from "../../redux/user/userThunk"
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
const Profile = ({navigation}) => {
  const dispatch = useDispatch()
  return (
    <View style={baseTabsStyle.container}>
      <FontAwesome name="user-circle" size={55} color="black"  />
      <StatusBar barStyle="light-content" backgroundColor="#5f75a0" />
      <TouchableOpacity onPress={()=>{
        dispatch(logoutAccount())
        navigation.navigate("auth")
      }}>
        <Text style={{color:'black',fontSize:20,marginTop:10}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

})