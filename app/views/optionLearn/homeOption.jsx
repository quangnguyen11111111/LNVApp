import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FlipCard from 'react-native-flip-card';
import baseOptionLearn from '../../styles/baseOptionLearn';
import homeOption from '../../styles/homeOption';
import {HomeOptionLearnViewModel} from "../../viewmodels/optionLearn/HomeOptionLearnViewModel"
import {AntDesign, Entypo, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../../../constant/Colors';
import courseStyle from '../../styles/courseStyle';
import lessonDetailStyle from '../../styles/lessonDetailStyle';
const { width } = Dimensions.get('window');
 const HomeOption=({navigation})=>{
  const{isLoading,fileDetail,fileName,toggleModal,
    isModalVisible,
    isSetting,handleOpenUpdateFileModal,handleDeleteFile}=HomeOptionLearnViewModel(navigation)
  return (
<View style={homeOption.container}>

{isLoading?<ActivityIndicator size="large" color={Colors.backgroundFlower} />:<>
<View style={[homeOption.viewHeader,{justifyContent: 'space-between'}]}>
      <TouchableOpacity style={homeOption.onPressHeader} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
      {isSetting && <TouchableOpacity style={[courseStyle.onPressHeader, { paddingHorizontal: 15 }]} onPress={toggleModal}>
                <AntDesign name="setting" size={28} color="white" />
              </TouchableOpacity>}
      </View>
{!isModalVisible && <Carousel
      loop={false}
      width={width}
      height={250}
      autoPlay={false}
      data={fileDetail}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
        parallaxAdjacentItemScale: 0.8,
      }}
      initialNumToRender={1} // Render 1 item ban đầu
        maxToRenderPerBatch={1} // Render 1 item mỗi batch
        windowSize={3} // Render 1 item trước và 1 sau item hiện tại
      scrollAnimationDuration={500}
      renderItem={({ item }) => (
        <FlipCard style={baseOptionLearn.card}>
          <View style={baseOptionLearn.face}>
            <Text style={baseOptionLearn.text}>{item.fileSource}</Text>
          </View>
          <View style={baseOptionLearn.back}>
            <Text style={baseOptionLearn.text}>{item.fileTarget}</Text>
          </View>
        </FlipCard>
      )}
    />}
    {/* các lựa chọn học  */}
    <View style={homeOption.containerOption} >
      <Text style={homeOption.textNameFile}>{fileName}</Text>
      {/* Thẻ ghi nhớ */}
      <TouchableOpacity style={homeOption.viewItemTouchableOpacity} onPress={()=>navigation.navigate("flipCard")} >
      <MaterialCommunityIcons name="layers" size={35} color="#3a6bf3d2" />
      <Text style={homeOption.textViewItem}>Thẻ ghi nhớ</Text>
      </TouchableOpacity>
      {/* Học */}
      <TouchableOpacity style={homeOption.viewItemTouchableOpacity} onPress={()=>navigation.navigate("learn")}  >
      <Entypo name="open-book" size={33} color="#3a6bf3d2" />
      <Text style={homeOption.textViewItem}>Học</Text>
      </TouchableOpacity>
      {/* Kiểm tra */}
      <TouchableOpacity style={homeOption.viewItemTouchableOpacity} onPress={()=>navigation.navigate("takeTheTest")} >
      <AntDesign name="calculator" size={32} color="#3a6bf3d2" />
      <Text style={homeOption.textViewItem}>Kiểm tra</Text>
      </TouchableOpacity>
      {/* ghép thẻ */}
      <TouchableOpacity style={homeOption.viewItemTouchableOpacity} onPress={()=>navigation.navigate("pairingCard")} >
      <Entypo name="list" size={32} color="#3a6bf3d2" />
      <Text style={homeOption.textViewItem}>Ghép thẻ</Text>
      </TouchableOpacity>
        {/* Gọi modal tại đây */}
      <OptionModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        handleOpenUpdateFileModal={handleOpenUpdateFileModal}
        handleDeleteFile={handleDeleteFile}
      />
    </View>
</>}

</View>
  );
}
export default HomeOption
const OptionModal = ({ isVisible, toggleModal,handleOpenUpdateFileModal,handleDeleteFile}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
    >
      <TouchableOpacity style={lessonDetailStyle.modalContainer} onPress={toggleModal}>
        <View style={lessonDetailStyle.modalContent}>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={() => { handleOpenUpdateFileModal()}}>
            <Text style={lessonDetailStyle.modalButtonText}>Chỉnh sửa tên file</Text>
          </TouchableOpacity>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={() => {handleDeleteFile()  }}>
            <Text style={lessonDetailStyle.modalButtonText}>Xóa file</Text>
          </TouchableOpacity>
          <TouchableOpacity style={lessonDetailStyle.modalButton} onPress={toggleModal}>
            <Text style={lessonDetailStyle.modalButtonText}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};