import { View, Text, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo, Ionicons, AntDesign } from '@expo/vector-icons';
import addNewLessonStyle from '../../styles/addNewLessonStyle'
import baseAddNewStyle from '../../styles/baseAddNewStyle'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { AddNewLessonViewModel } from '../../viewmodels/addNew/AddNewLessonViewModel';
import Colors from '../../../constant/Colors';
import { TouchableOpacity } from 'react-native';
import courseStyle from '../../styles/courseStyle';
const AddNewLesson = ({ navigation }) => {

  const { dropdownData,
    user,
    selectedItem,
    setSelectedItem,
    nameFile,
    setNameFile,
    handleInputChange,
    addNewInputPair,
    arrDataDetail,
    scrollViewRef,
    inputRefs,
    validateInputs,
    handleCreateFile,
    inputFolder,
    inputFile,
    loading } = AddNewLessonViewModel(navigation)
  return (
    <AutocompleteDropdownContextProvider>
      <View style={baseAddNewStyle.viewContainer}>
        <View style={[baseAddNewStyle.viewHeader, addNewLessonStyle.viewHeader,{marginBottom: 10}]}>
          <TouchableOpacity style={courseStyle.onPressHeader} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
            <Text style={courseStyle.titleHeader}>Lesson</Text>
          </TouchableOpacity>
          <TouchableOpacity style={courseStyle.onPressHeader} onPress={handleCreateFile}>
            <Entypo name="check" size={32} color="white" />
          </TouchableOpacity>
        </View>
        {loading ?
          <ActivityIndicator size="large" color={Colors.backgroundFlower} />
          : <ScrollView ref={scrollViewRef} >
            <FloatingLabelInput
              label="Lesson name"
              ref={inputFile}
              value={nameFile}
              onChangeText={setNameFile}
              // labelStyles={baseAddNewStyle.inputText}
              // containerStyles={baseAddNewStyle.viewInput}
              // customLabelStyles={baseAddNewStyle.inputCustomLabel}
            />
            <Text style={addNewLessonStyle.textChoose}>Choose course</Text>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              ref={inputFolder}
              closeOnSubmit={false}
              onSelectItem={(item) => setSelectedItem(item)}
              dataSet={dropdownData}
              textInputProps={{
                placeholder: "Choose your course ",
                placeholderTextColor: "#92aee2d4",
                autoCorrect: false,
                autoCapitalize: 'none'
              }}
              inputContainerStyle={addNewLessonStyle.inputContainerStyleDropDown}
            />
            {arrDataDetail.map((item, index) => (
              <View style={addNewLessonStyle.viewInputSourceTarget} key={index}>
                <FloatingLabelInput
                  label="source language"
                  value={item.fileSource}
                  onChangeText={(text) => handleInputChange(index, 'fileSource', text)}
                  ref={(ref) => inputRefs.current[index * 2] = ref}
                />
                <FloatingLabelInput
                  label="target language"
                  value={item.fileTarget}
                  onChangeText={(text) => handleInputChange(index, 'fileTarget', text)}
                  ref={(ref) => inputRefs.current[index * 2 + 1] = ref}
                />
              </View>
            ))}



          </ScrollView>}

        <TouchableOpacity style={addNewLessonStyle.addPlus} onPress={addNewInputPair}>
          <AntDesign name="pluscircleo" size={60} color="white" />
        </TouchableOpacity>

      </View>
    </AutocompleteDropdownContextProvider>
  )
}

export default AddNewLesson