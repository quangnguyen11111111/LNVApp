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
import { FlatList } from 'react-native';
export default function CourseOther({navigation}) {
const { isLoading,
    folderExceptUser,
    user,
    handleGetDetailFolder,
    onRefresh,
    refreshing,
    isSearch,
    toggleSearch,
    searchRef,
    dataInput,
    setDataInput,
    dataFolder,
    isLoadingMore,
    onEndReached,
  handleSearchFolder} = CourseOtherViewModel(navigation);
  return (
   <View style={courseStyle.container}>
         
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
                                  returnKeyType="search" // hoặc "done" tuỳ ngữ cảnh
  onSubmitEditing={() => {
    handleSearchFolder()
  }}
                       />
                     </View>}
        <FlatList
        
  data={dataFolder}
  keyExtractor={(item, index) => item.folderID?.toString() || index.toString()}
  numColumns={1} 
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleGetDetailFolder(-1, item.folderID)}>
      <View style={[baseTabsStyle.viewFolder, { marginBottom: 10 }]}>
        <View style={baseTabsStyle.viewTopFolder}>
          <AntDesign name="folderopen" size={32} color="white" />
          <Text style={baseTabsStyle.textTopFolder} numberOfLines={1} ellipsizeMode="tail">
            {item.folderName}
          </Text>
        </View>
        <View style={baseTabsStyle.viewBottomFolder}>
          <FontAwesome name="user-circle" size={15} color="white" />
          <Text style={baseTabsStyle.textBottomFolder} numberOfLines={1} ellipsizeMode="tail">
            {item.user.userName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
  onEndReached={onEndReached}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isLoadingMore && <ActivityIndicator size="small" color={Colors.backgroundFlower} />}
  contentContainerStyle={[baseTabsStyle.viewFolders, { marginTop: 5 }]}
/>

         
         
       </View>
  );
}
