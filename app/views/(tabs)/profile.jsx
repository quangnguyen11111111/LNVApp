import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import baseTabsStyle from '../../styles/baseTabsStyle'
import { FontAwesome } from '@expo/vector-icons';
const Profile = () => {
  return (
    <View style={baseTabsStyle.container}>
      <FontAwesome name="user-circle" size={55} color="black"  />
      <StatusBar barStyle="light-content" backgroundColor="#5f75a0" />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

})