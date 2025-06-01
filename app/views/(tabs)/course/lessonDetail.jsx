import { View, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../../../constant/Colors'
import baseTabsStyle from '../../../styles/baseTabsStyle'
import courseStyle from '../../../styles/courseStyle'
import { LessonDetailViewModel } from '../../../viewmodels/course/LessonDetailViewModel'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Modal, StyleSheet } from 'react-native';
import lessonDetailStyle from '../../../styles/lessonDetailStyle'
const LessonDetail = ({ navigation }) => {
  const {  isLoadingDetail,
    folderName,
    folderDetail,
    handleGetDetailFile,
    handleBack,
    toggleModal,
    isModalVisible,
    handleOpenUpdateFolderModal,
    handleDeleteFolder,
    isSetting,
    onEndReached,
    isLoadingMore ,
  dataFolder} = LessonDetailViewModel(navigation)
  return (
    <View style={courseStyle.container}>

      <View style={courseStyle.viewHeader}>
        <TouchableOpacity style={courseStyle.onPressHeader} onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="white" />
          <Text style={courseStyle.titleHeader}>Lesson</Text>
        </TouchableOpacity>
        {isSetting && <TouchableOpacity style={[courseStyle.onPressHeader, { paddingHorizontal: 15 }]} onPress={toggleModal}>
          <AntDesign name="setting" size={28} color="white" />
        </TouchableOpacity>}
        
      </View>
      {dataFolder.length == 0 && <Text style={{textAlign:'center', fontSize:18,
        marginTop: 10, color: Colors.backgroundFlower
      }} >Không có dữ liệu</Text> }
<FlatList
  data={dataFolder}
  keyExtractor={(item, index) => item.fileID?.toString() || index.toString()}
  numColumns={1} 
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => { handleGetDetailFile(item.fileID, item.fileName) }}>
                     <View style={[baseTabsStyle.viewFolder, { marginBottom: 5 }]}>
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
                            {item.fileName}
                          </Text>
                        </View>
                        {/* View bottom folder */}
                        <View
                          style={[baseTabsStyle.viewBottomFolder, { marginStart: 5, marginTop: 10 }]}
                        >
                          <AntDesign name="folderopen" size={15} color="white" />
                          <Text
                            style={baseTabsStyle.textBottomFolder}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {folderName}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>

  )}
  onEndReached={onEndReached}
  onEndReachedThreshold={0.5}
  ListFooterComponent={isLoadingMore && <ActivityIndicator size="large" color={Colors.backgroundFlower} />}
  contentContainerStyle={[baseTabsStyle.viewFolders, { marginTop: 5 }]}
/>
{/* } */}
      {/* Gọi modal tại đây */}
      <OptionModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        handleOpenUpdateFolderModal={handleOpenUpdateFolderModal}
        handleDeleteFolder={handleDeleteFolder}
      />
    </View>
  )
}
export default LessonDetail
const OptionModal = ({ isVisible, toggleModal, handleOpenUpdateFolderModal, handleDeleteFolder }) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
    >
      <TouchableOpacity style={lessonDetailStyle.modalContainer} onPress={toggleModal}>
        <View style={lessonDetailStyle.modalContent}>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={() => { handleOpenUpdateFolderModal() }}>
            <Text style={lessonDetailStyle.modalButtonText}>Chỉnh sửa tên thư mục</Text>
          </TouchableOpacity>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={() => { handleDeleteFolder() }}>
            <Text style={lessonDetailStyle.modalButtonText}>Xóa thư mục</Text>
          </TouchableOpacity>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={toggleModal}>
            <Text style={lessonDetailStyle.modalButtonText}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
