import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator,RefreshControl } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FlipCard from 'react-native-flip-card';
import baseOptionLearn from '../../styles/baseOptionLearn';
import homeOption from '../../styles/homeOption';
import {AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Colors from '../../../constant/Colors';
import {CourseOtherViewModel} from '../../viewmodels/tabs/CourseOtherViewModel';
import courseStyle from '../../styles/courseStyle';
import baseTabsStyle from '../../styles/baseTabsStyle';
import { FloatingLabelInput } from 'react-native-floating-label-input';
export default function CourseOther({navigation}) {
const {isLoading,folderExceptUser,user,handleGetDetailFolder,onRefresh,refreshing,isSearch,toggleSearch,searchRef,dataInput,setDataInput,dataFolder} = CourseOtherViewModel(navigation);
  return (
   <View style={courseStyle.container}>
         <>
         <View style={courseStyle.viewHeader}>
                       <Text style={[courseStyle.titleHeader]}>Course Other</Text>
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
         {isLoading ?
         <ActivityIndicator size="large" color={Colors.backgroundFlower} />
         :
         
         <>
         
         <ScrollView style={{backgroundColor:Colors.backgroundColor}}
         refreshControl={
               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
             }
         >
         {/* View folders */}
         <View style={[baseTabsStyle.viewFolders,{marginTop:5}]}>
           {/* View folder */}
           {
             dataFolder&&dataFolder.length>0&&dataFolder.map((item,index)=>{
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
         </ScrollView>
         </>}
         </>
         
       </View>
  );
}
