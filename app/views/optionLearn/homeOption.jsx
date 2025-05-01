import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FlipCard from 'react-native-flip-card';
import baseOptionLearn from '../../styles/baseOptionLearn';
import homeOption from '../../styles/homeOption';
import {AntDesign, Entypo, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
const { width } = Dimensions.get('window');

const data = [
  { front: 'Mặt trước 1', back: 'Mặt sau 1' },
  { front: 'Mặt trước 2', back: 'Mặt sau 2' },
  { front: 'Mặt trước 3', back: 'Mặt sau 3' },
];

export default function HomeOption({navigation}) {
  return (
<View style={homeOption.container}>
<View style={homeOption.viewHeader}>
      <TouchableOpacity style={homeOption.onPressHeader} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>
      </View>
<Carousel
      loop={false}
      width={width}
      height={250}
      autoPlay={false}
      data={data}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
        parallaxAdjacentItemScale: 0.8,
      }}
      scrollAnimationDuration={500}
      renderItem={({ item }) => (
        <FlipCard style={baseOptionLearn.card}>
          <View style={baseOptionLearn.face}>
            <Text style={baseOptionLearn.text}>{item.front}</Text>
          </View>
          <View style={baseOptionLearn.back}>
            <Text style={baseOptionLearn.text}>{item.back}</Text>
          </View>
        </FlipCard>
      )}
    />
    {/* các lựa chọn học  */}
    <View style={homeOption.containerOption} >
      <Text style={homeOption.textNameFile}>File 1</Text>
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
    </View>
</View>
  );
}
