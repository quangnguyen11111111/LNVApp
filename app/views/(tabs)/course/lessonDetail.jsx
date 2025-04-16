import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../../constant/Colors'
import baseTabsStyle from '../../../styles/baseTabsStyle'
import courseStyle from '../../../styles/courseStyle'
import { FontAwesome, AntDesign ,Ionicons} from '@expo/vector-icons';
const LessonDetail = ({navigation}) => {
  return (
    <View style={courseStyle.container}>
      
      <View style={courseStyle.viewHeader}>
      <TouchableOpacity style={courseStyle.onPressHeader} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={28} color="white" />
      <Text style={courseStyle.titleHeader}>Lesson</Text>
      </TouchableOpacity>
      </View>
      {/* View folders */}
      <View style={[baseTabsStyle.viewFolders,{marginTop:5}]}>
        {/* View folder */}
        <View style={baseTabsStyle.viewFolder} >
          {/* View Top folder */}
          <View
            style={baseTabsStyle.viewTopFolder}
          >
            <AntDesign name="filetext1" size={30} color="white" />
            <Text
              style={baseTabsStyle.textTopFolder}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              File 1
            </Text>
          </View>
          {/* View bottom folder */}
          <View
            style={baseTabsStyle.viewBottomFolder}
          >
            <AntDesign name="folderopen" size={15} color="white" />
            <Text
              style={baseTabsStyle.textBottomFolder}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Folder 1
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

export default LessonDetail