import { Text, View, Image, Pressable, ScrollView, StatusBar, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React from 'react'
import baseTabsStyle from "../../styles/baseTabsStyle"
import { HomeViewModel } from '../../viewmodels/HomeViewModel'
import homeStyle from '../../styles/homeStyle'
import Colors from '../../../constant/Colors'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
const Home = ({navigation}) => {
  const {isLoading,user,folderTop4,folderTop8,onRefresh,refreshing,handleGetDetailFolder} = HomeViewModel(navigation)
  
  return (
    <ScrollView style={{backgroundColor:Colors.backgroundColor}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
       
    <View style={baseTabsStyle.container} >
      <View style={homeStyle.viewFlower} >
        <Image source={require("../../../assets/images/imageFlowerLeft.png")} style={homeStyle.flowerLeft} />
        <Image source={require("../../../assets/images/imageFlowerRight.png")} style={homeStyle.flowerRight} />
        <View style={homeStyle.viewTitleFlower}>
          <Text style={homeStyle.textNameUser}>Hi,{user ? user.userName : 'Guest'}</Text>
          <Text style={homeStyle.textQues}>What would you like to learn today?</Text>
        </View>
      </View>
      <View style={homeStyle.viewContent}>
        {/* View tong */}
        <View style={{
          padding: 20
        }}>
          {/* giao diện thu vieenjcuar bạn */}
          <View style={homeStyle.viewTitle}>
            <Text style={[homeStyle.textTitle,{fontSize:24}]}>Thư viện của bạn</Text>
            <Pressable onPress={()=>{navigation.navigate("course")}} >
              {({ pressed }) => (
                <Text style={{
                  color: pressed ? Colors.primary : Colors.white,
                  fontSize: 12,
                  textDecorationLine: "underline",
                  marginTop: 7
                }}>
                  Xem thêm {`-->`}
                </Text>
              )}
            </Pressable>
          </View>
          {/* View folders */}
          <View style={homeStyle.viewFolders}>
            {
              isLoading?
              <ActivityIndicator size="large" color={Colors.backgroundFlower} />
              :
              folderTop4&&folderTop4.length>0&&folderTop4.map((item,index)=>{
                return(
              <TouchableOpacity onPress={()=>{handleGetDetailFolder(user.userID,item.folderID)}} key={index} >
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
          {/* giao diện thư mục đề cử */}
          <View style={[homeStyle.viewTitle,{marginTop:20}]}>
            <Text style={[homeStyle.textTitle,{fontSize:25}]}>Thư viện đề cử</Text>
            <Pressable onPress={()=>{navigation.navigate("courseOther")}} >
              {({ pressed }) => (
                <Text style={{
                  color: pressed ? Colors.primary : Colors.white,
                  fontSize: 13,
                  textDecorationLine: "underline",
                    marginTop: 7
                }}>
                  Xem thêm {`-->`}
                </Text>
              )}
            </Pressable>
          </View>
          {/* View folders */}
          <View style={homeStyle.viewFolders}>
          {
              isLoading?
             <ActivityIndicator size="large" color={Colors.backgroundFlower} />
              :
              folderTop8&&folderTop8.length>0&&folderTop8.map((item,index)=>{
                return(
               <TouchableOpacity onPress={()=>{handleGetDetailFolder(-1,item.folderID)}} key={index} >
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
