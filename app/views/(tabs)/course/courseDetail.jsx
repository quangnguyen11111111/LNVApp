import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import baseTabsStyle from '../../../styles/baseTabsStyle'
import courseStyle from '../../../styles/courseStyle'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { CourseDetailViewModel } from '../../../viewmodels/course/CourseDetailViewModel'
import Colors from '../../../../constant/Colors';
import baseAddNewStyle from '../../../styles/baseAddNewStyle';
import { FloatingLabelInput } from 'react-native-floating-label-input';
const CourseDetail = ({ navigation }) => {

  const { isLoading, folder, handleGetDetailFolder, user,isSearch,toggleSearch,searchRef,dataInput,setDataInput,dataFolder } = CourseDetailViewModel({ navigation })
  return (

    <View style={courseStyle.container}>
      <>
        {isLoading ?
          <ActivityIndicator size="large" color={Colors.backgroundFlower} />
          :

          <>
            <View style={courseStyle.viewHeader}>
              <Text style={[courseStyle.titleHeader]}>Course</Text>
              <TouchableOpacity style={[courseStyle.onPressHeader, { paddingHorizontal: 15 }]} onPress={toggleSearch}>
                <AntDesign name="search1" size={25} color="white" />
              </TouchableOpacity>
            </View>
            {isSearch &&<View style={{ marginHorizontal: 15,marginTop: 10 }}>
              <FloatingLabelInput
                label="Nhập tìm kiếm"
                value={dataInput}
                onChangeText={setDataInput}
                ref={searchRef}
                autoFocus={true}
              />
            </View>}
            
            <ScrollView style={{ backgroundColor: Colors.backgroundColor }}>
              {/* View folders */}
              <View style={[baseTabsStyle.viewFolders, { marginTop: 5 }]}>
                {/* View folder */}
                {
                  dataFolder && dataFolder.length > 0 && dataFolder.map((item, index) => {
                    return (
                      <TouchableOpacity onPress={() => { handleGetDetailFolder(user.userID, item.folderID) }} key={index} >
                        <View style={baseTabsStyle.viewFolder} >
                          {/* View Top folder */}
                          <View
                            style={baseTabsStyle.viewTopFolder}
                          >
                            <AntDesign name="folderopen" size={32} color="white" />
                            <Text
                              style={baseTabsStyle.textTopFolder}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.folderName}
                            </Text>
                          </View>
                          {/* View bottom folder */}
                          <View
                            style={baseTabsStyle.viewBottomFolder}
                          >
                            <FontAwesome name="user-circle" size={15} color="white" />
                            <Text
                              style={baseTabsStyle.textBottomFolder}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.user.userName}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>
          </>}
      </>

    </View>
  )
}

export default CourseDetail