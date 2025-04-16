import { View, Text } from 'react-native'
import React from 'react'
import addNewCourseStyle from '../../styles/addNewCourseStyle'
import baseAddNewStyle from '../../styles/baseAddNewStyle'
import {Entypo,Ionicons } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
const AddNewCourse = () => {
  return (
    <View style={baseAddNewStyle.viewContainer}>
      <View style={baseAddNewStyle.viewHeader}>
          <View style={baseAddNewStyle.viewBack}>
          <Ionicons name="arrow-back" size={32} color="white" />
          <Text style={baseAddNewStyle.textBack}>New course</Text>
          </View>
          <Entypo name="check" size={32} color="white" />
      </View>
      <FloatingLabelInput
            label="Course name"
            // value={userAccount}
            // onChangeText={setUserAccount}
            // inputStyles={styles.input}
            labelStyles={baseAddNewStyle.inputText}
            containerStyles={baseAddNewStyle.viewInput}
            customLabelStyles={baseAddNewStyle.inputCustomLabel}
          />
    </View>
  )
}

export default AddNewCourse