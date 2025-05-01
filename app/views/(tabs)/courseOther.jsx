import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FlipCard from 'react-native-flip-card';
import baseOptionLearn from '../../styles/baseOptionLearn';
import homeOption from '../../styles/homeOption';
import {AntDesign, Entypo, Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import takeTheTestStyle from '../../styles/takeTheTestStyle';
import Colors from '../../../constant/Colors';

export default function CourseOther() {
  return (
    <ScrollView style={{    backgroundColor:Colors.backgroundColor,}}>
  <View style={takeTheTestStyle.container}>
    <View style={takeTheTestStyle.viewResultHeader}>
    <Text style={takeTheTestStyle.textTitleResultHeader} >Kết quả của bạn</Text>
    <View style={{alignItems:'center'}}>
      <Text style={[takeTheTestStyle.textCountResult,{color:Colors.green}]}>Đúng: 13</Text>
      <Text style={[takeTheTestStyle.textCountResult,{color:Colors.red}]}>Sai: 0</Text>
    </View>
    </View>
    <Text style={takeTheTestStyle.textTitleResult}>Đáp án kiểm tra</Text>
    <View style={takeTheTestStyle.viewItemResult}>
    <View style={takeTheTestStyle.viewItemResultIn}>
      <Text style={[takeTheTestStyle.textItemHeader,{borderBottomWidth:1,borderBottomColor:Colors.itemColor}]}>Hello</Text>
      <Text style={takeTheTestStyle.textItemHeader}>hành khách</Text>
      {/* hiển thị đáp án  */}
      <View style={takeTheTestStyle.viewAnswer}>
        <View>
        <AntDesign name="check" size={24} color="white" />
        <Text> đúng</Text>
        </View>
        <View>
        <Feather name="x" size={24} color="black" />
        <Text> sai</Text>
        </View>
      </View>
    </View>
     {/* View người dùng trả lời */}
     <View style={[takeTheTestStyle.viewResultBottom,{backgroundColor:Colors.green}]}>
      <AntDesign name="check" size={24} color="white" />
      <Text>Đúng</Text>
      </View>
    </View>
    <View style={takeTheTestStyle.viewItemResult}>
    <View style={takeTheTestStyle.viewItemResultIn}>
      <Text style={[takeTheTestStyle.textItemHeader,{borderBottomWidth:1,borderBottomColor:Colors.itemColor}]}>Hello</Text>
      <Text style={takeTheTestStyle.textItemHeader}>hành khách</Text>
      {/* hiển thị đáp án  */}
      <View style={takeTheTestStyle.viewAnswer}>
        <View>
        <AntDesign name="check" size={24} color="white" />
        <Text> đúng</Text>
        </View>
        <View>
        <Feather name="x" size={24} color="black" />
        <Text> sai</Text>
        </View>
      </View>
    </View>
     {/* View người dùng trả lời */}
     <View style={[takeTheTestStyle.viewResultBottom,{backgroundColor:Colors.red}]}>
      <AntDesign name="check" size={24} color="white" />
      <Text>Đúng</Text>
      </View>
    </View>
</View>
</ScrollView>
  );
}
