import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import FlipCard from "react-native-flip-card";
import { Feather, Ionicons } from '@expo/vector-icons';
import baseOptionLearn from "../../styles/baseOptionLearn";
import flipCard from "../../styles/flipCard";
import { FlipCardViewModel } from "../../viewmodels/optionLearn/FlipCardViewModel"
import Colors from "../../../constant/Colors";
import takeTheTestStyle from "../../styles/takeTheTestStyle";
const { width } = Dimensions.get("window");


export default function FlipCardOption({ navigation }) {
  const { isLoading, fileDetail, fileName, isCompleted, lengthData, countIndex, cardIndex, swiperRef,
    handelBack,
    handelNext,
  resetLearning } = FlipCardViewModel()
  return (
    <View style={flipCard.container}>
      {/* View header */}
      <View style={flipCard.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={32} color="white" />
        </TouchableOpacity>
        <Text>
          {cardIndex}/{lengthData}
        </Text>
      </View>
      {/* View card */
}
      <View style={flipCard.viewSwiper}>
        <View
    style={[
      baseOptionLearn.card,
      {
        position: 'absolute',
        backgroundColor: Colors.itemColor,
        zIndex: 0,
        height:"99%",
        width: width - 40, // Giảm bớt khoảng cách từ hai bên
        bottom: 10,
      },
    ]}
  />
        {!isCompleted ? (

  <Swiper
    ref={swiperRef}
    cards={fileDetail}
    cardIndex={cardIndex}
    onSwiped={(index) => countIndex(index)}
    backgroundColor="transparent"
    disableTopSwipe
    removeCardOnSwipe={false}
    disableBottomSwipe
    stackSize={1} // hoặc có thể bỏ
    renderCard={(item, index) => (
      <FlipCard
        key={index}
        flipHorizontal={true}
        flipVertical={false}
        style={[baseOptionLearn.card, flipCard.card, { zIndex: 1 }]}
      >
        <View style={baseOptionLearn.face}>
          <Text style={baseOptionLearn.text}>{item.fileSource}</Text>
        </View>
        <View style={baseOptionLearn.back}>
          <Text style={baseOptionLearn.text}>{item.fileTarget}</Text>
        </View>
      </FlipCard>
    )}
  />

        ) : (
          <>
          <Text style={baseOptionLearn.completedText}>🎉 Bạn đã hoàn thành khóa học!</Text>
          <TouchableOpacity style={[takeTheTestStyle.touchableOpacityRetry,{width:200}]} onPress={resetLearning}>
        <Text style={takeTheTestStyle.textRetry}>Học lại</Text>
      </TouchableOpacity>
          <TouchableOpacity style={[takeTheTestStyle.touchableOpacityRetry,{width:200}]}onPress={() => {
                navigation.navigate("takeTheTest");
              }}>
        <Text style={takeTheTestStyle.textRetry}>Làm bài kiểm tra</Text>
      </TouchableOpacity>
      
          </>
          
        )}
      </View>
      {/* view botttom quai lại thẻ trước */}
      {!isCompleted && <View style={flipCard.viewBottom}>
        <TouchableOpacity style={flipCard.itemBack} onPress={handelBack}>
          <Feather name="corner-up-left" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={flipCard.itemBack} onPress={handelNext}>
          <Feather name="corner-up-right" size={32} color="white" />
        </TouchableOpacity>
      </View>}
    </View>
  );
}

