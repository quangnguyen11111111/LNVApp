import { View, Text } from 'react-native'
import React from 'react'
import addNewCourseStyle from '../../styles/addNewCourseStyle'
import baseAddNewStyle from '../../styles/baseAddNewStyle'
import {Entypo,Ionicons } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {AddNewCourseViewModel} from '../../viewmodels/addNew/AddNewCourseViewModel';
import courseStyle from '../../styles/courseStyle';
import { TouchableOpacity } from 'react-native';
const AddNewCourse = ({navigation}) => {
  const { dataInput, setDataInput,user,createNewCouse } = AddNewCourseViewModel(navigation);
  
  return (
    <View style={baseAddNewStyle.viewContainer}>
      <View style={baseAddNewStyle.viewHeader}>
          <TouchableOpacity style={courseStyle.onPressHeader} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                    <Text style={courseStyle.titleHeader}>Cousre</Text>
                  </TouchableOpacity>
          <TouchableOpacity style={courseStyle.onPressHeader} onPress={() => createNewCouse(dataInput,user.userID,user.userName)}>
                    <Entypo name="check" size={32} color="white"/>
                  </TouchableOpacity>
          
      </View>
      <FloatingLabelInput
            label="Course name"
            value={dataInput}
            onChangeText={setDataInput}
            labelStyles={baseAddNewStyle.inputText}
            containerStyles={baseAddNewStyle.viewInput}
            customLabelStyles={baseAddNewStyle.inputCustomLabel}
          />
    </View>
  )
}

export default AddNewCourse