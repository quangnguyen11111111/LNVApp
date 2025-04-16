import { Text, View, Image, Pressable, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import baseTabsStyle from "../../styles/baseTabsStyle"
import { HomeViewModel } from '../../viewmodels/HomeViewModel'
import homeStyle from '../../styles/homeStyle'
import Colors from '../../../constant/Colors'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
const Home = () => {
  const { isLoading, user } = HomeViewModel()

  return (
    <ScrollView style={{backgroundColor:Colors.backgroundColor}}>
       
    <View style={baseTabsStyle.container} >
      <View style={homeStyle.viewFlower} >
        <Image source={require("../../../assets/images/imageFlowerLeft.png")} style={homeStyle.flowerLeft} />
        <Image source={require("../../../assets/images/imageFlowerRight.png")} style={homeStyle.flowerRight} />
        <View style={homeStyle.viewTitleFlower}>
          {/* <Text style={homeStyle.textNameUser}>Hi, {user.userName}</Text> */}
          <Text style={homeStyle.textQues}>What would you like to learn today?</Text>
        </View>
      </View>
      <View style={homeStyle.viewContent}>
        {/* View tong */}
        <View style={{
          padding: 20
        }}>
          {/* See more */}
          <View style={homeStyle.viewTitle}>
            <Text style={homeStyle.textTitle}>Choose your course</Text>
            <Pressable >
              {({ pressed }) => (
                <Text style={{
                  color: pressed ? Colors.primary : Colors.white,
                  fontSize: 12,
                  textDecorationLine: "underline"
                }}>
                  See more {`-->`}
                </Text>
              )}
            </Pressable>
          </View>
          {/* View folders */}
          <View style={homeStyle.viewFolders}>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
          </View>
          {/* See more recommended */}
          <View style={[homeStyle.viewTitle,{marginTop:20}]}>
            <Text style={[homeStyle.textTitle,{fontSize:18}]}>Recommended Courses</Text>
            <Pressable >
              {({ pressed }) => (
                <Text style={{
                  color: pressed ? Colors.primary : Colors.white,
                  fontSize: 13,
                  textDecorationLine: "underline"
                }}>
                  See more {`-->`}
                </Text>
              )}
            </Pressable>
          </View>
          {/* View folders */}
          <View style={homeStyle.viewFolders}>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
              {/* View folder */}
              <View style={homeStyle.viewFolder} >
                {/* View Top folder */}
                <View
                  style={homeStyle.viewTopFolder}
                >
                  <AntDesign name="folderopen" size={32} color="white" />
                  <Text
                    style={homeStyle.textTopFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Folder 1
                  </Text>
                </View>
                {/* View bottom folder */}
                <View
                  style={homeStyle.viewBottomFolder}
                >
                  <FontAwesome name="user-circle" size={15} color="white" />
                  <Text
                    style={homeStyle.textBottomFolder}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Boonggg
                  </Text>
                </View>
              </View>
          </View>
        </View>
        <View>
        </View>
          </View>
        </View>
        <View>

        </View>
        <StatusBar barStyle="light-content" backgroundColor="#5f75a0" />
    </ScrollView>
  )
}

export default Home
