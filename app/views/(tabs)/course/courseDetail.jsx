import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constant/Colors'
import baseTabsStyle from '../../../styles/baseTabsStyle'
import courseStyle from '../../../styles/courseStyle'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
const CourseDetail = ({navigation}) => {
  return (
    <View style={courseStyle.container}>
      <Text style={[courseStyle.titleHeader,courseStyle.viewHeader]}>Course</Text>
      {/* View folders */}
      <View style={[baseTabsStyle.viewFolders,{marginTop:5}]}>
        {/* View folder */}
        <TouchableOpacity onPress={()=>navigation.navigate("lessonDetail")} >
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
              Folder 1
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
              Boonggg
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        {/* View folder */}
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
              Folder 1
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
              Boonggg
            </Text>
          </View>
        </View>
        {/* View folder */}
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
              Folder 1
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
              Boonggg
            </Text>
          </View>
        </View>
        {/* View folder */}
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
              Folder 1
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
              Boonggg
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CourseDetail