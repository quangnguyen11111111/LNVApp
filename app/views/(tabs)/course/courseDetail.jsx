import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import React from 'react'
import baseTabsStyle from '../../../styles/baseTabsStyle'
import courseStyle from '../../../styles/courseStyle'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { CourseDetailViewModel } from '../../../viewmodels/course/CourseDetailViewModel'
import Colors from '../../../../constant/Colors';
import baseAddNewStyle from '../../../styles/baseAddNewStyle';
import { FloatingLabelInput } from 'react-native-floating-label-input';
const CourseDetail = ({ navigation }) => {

  const { isLoading,
    folder,
    handleGetDetailFolder,
    user,
    isSearch,
    toggleSearch,
    searchRef,
    dataInput,
    setDataInput,
    dataFolder,
    onEndReached,
    isLoadingMore,
    handleSearchFolder} = CourseDetailViewModel({ navigation })
  return (

    <View style={courseStyle.container}>
      {/* <> */}
        {/* {isLoading ?
          <ActivityIndicator size="large" color={Colors.backgroundFlower} />
          :
          <> */}
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
    <TouchableOpacity onPress={() => handleGetDetailFolder(user.userID, item.folderID)}>
      <View style={[baseTabsStyle.viewFolder, { marginBottom: 5 }]}>
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

          {/* </>}
      </> */}

    </View>
  )
}

export default CourseDetail