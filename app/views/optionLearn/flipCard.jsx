import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import FlipCard from "react-native-flip-card";
import { Feather, Ionicons} from '@expo/vector-icons';
import baseOptionLearn from "../../styles/baseOptionLearn";
import flipCard from "../../styles/flipCard";
const { width } = Dimensions.get("window");

const data = [
  { front: "Thẻ 1", back: "Nội dung 1" },
  { front: "Thẻ 2", back: "Nội dung 2" },
  { front: "Thẻ 3", back: "Nội dung 3" },
];

export default function FlipCardOption({navigation}) {
  const [cardIndex, setCardIndex] = useState(0);
  const isCompleted = cardIndex === data.length;
  const lengthData = data.length;

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
  {/* View card */}
<View style={flipCard.viewSwiper}>
      {!isCompleted ? (
        <Swiper
          cards={data}
          cardIndex={cardIndex}
          onSwiped={(index) => setCardIndex(index + 1)}
          stackSize={2}
          backgroundColor="transparent"
          disableTopSwipe
          disableBottomSwipe
          renderCard={(item) => (
            <FlipCard
              flipHorizontal={true}
              flipVertical={false}
              style={[baseOptionLearn.card,flipCard.card]}
            >
              <View style={baseOptionLearn.face}>
                <Text style={baseOptionLearn.text}>{item.front}</Text>
              </View>
              <View style={baseOptionLearn.back}>
                <Text style={baseOptionLearn.text}>{item.back}</Text>
              </View>
            </FlipCard>
          )}
        />
      ) : (
        <Text style={baseOptionLearn.completedText}>🎉 Bạn đã hoàn thành khóa học!</Text>
      )}
    </View>
    {/* view botttom quai lại thẻ trước */}
    {!isCompleted && <View style={flipCard.viewBottom}>
      <TouchableOpacity style={flipCard.itemBack}>
      <Feather name="corner-up-left" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={flipCard.itemBack}>
      <Feather name="corner-up-right" size={32} color="white" />
      </TouchableOpacity>
    </View>}
</View>
  );
}
