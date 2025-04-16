import { View, Text, ScrollView, TextInput,Alert  } from 'react-native'
import React,{useEffect, useState} from 'react'
import {Entypo,Ionicons,AntDesign  } from '@expo/vector-icons';
import addNewLessonStyle from '../../styles/addNewLessonStyle'
import baseAddNewStyle from '../../styles/baseAddNewStyle'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Colors from '../../../constant/Colors';
const AddNewLesson = () => {
  // test 
  const initialCourses = [
    { id: '1', title: 'React Native' },
    { id: '2', title: 'Node.js' },
    { id: '3', title: 'Python Basics' },
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  //kết thúc test

  return (
    <AutocompleteDropdownContextProvider>
    <View style={baseAddNewStyle.viewContainer}>
      <ScrollView >

      
    <View style={baseAddNewStyle.viewHeader}>
        <View style={baseAddNewStyle.viewBack}>
        <Ionicons name="arrow-back" size={32} color="white" />
        <Text style={baseAddNewStyle.textBack}>New lesson</Text>
        </View>
        <Entypo name="check" size={32} color="white" />
    </View>
    <FloatingLabelInput
          label="Lesson name"
          // value={userAccount}
          // onChangeText={setUserAccount}
          // inputStyles={styles.input}
          labelStyles={baseAddNewStyle.inputText}
          containerStyles={baseAddNewStyle.viewInput}
          customLabelStyles={baseAddNewStyle.inputCustomLabel}
        />
        <Text style={addNewLessonStyle.textChoose}>Choose course</Text>
        <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={(item) => setSelectedItem(item)}
        dataSet={initialCourses}
        textInputProps={{
          placeholder:"Choose your course ",
          placeholderTextColor:"#92aee2d4",
          autoCorrect:false,
          autoCapitalize:'none'
        }}
                            inputContainerStyle={addNewLessonStyle.inputContainerStyleDropDown}
      />
        <View style={addNewLessonStyle.viewInputSourceTarget}>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput}>source language</Text>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput} >target language</Text>
        </View>
        <View style={addNewLessonStyle.viewInputSourceTarget}>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput}>source language</Text>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput} >target language</Text>
        </View>
        <View style={addNewLessonStyle.viewInputSourceTarget}>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput}>source language</Text>
          <TextInput style={addNewLessonStyle.inputSourceTarget}/>
          <Text style={addNewLessonStyle.textInput} >target language</Text>
        </View>
        
        </ScrollView>
        <View style={addNewLessonStyle.addPlus}>
        <AntDesign name="pluscircleo" size={60} color="white" />
        </View>
  </View>
  </AutocompleteDropdownContextProvider>
  )
}

export default AddNewLesson