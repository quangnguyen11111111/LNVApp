import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import pairingCardStyle from '../../styles/pairingCardStyle';
import { Feather } from '@expo/vector-icons';
import { PairingCardViewModel } from '../../viewmodels/optionLearn/PairingCardViewModel';

const PairingCard = ({ navigation }) => {
  const{
    restartGame,
    renderItem,
    mixedList,
    isCompleted}=PairingCardViewModel()

  return (
    <View style={pairingCardStyle.container}>
      <View style={pairingCardStyle.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {isCompleted ? (
        <View style={pairingCardStyle.viewCompleted}>
          <Text style={pairingCardStyle.textCompleted}>🎉 Bạn đã hoàn thành!</Text>
          <TouchableOpacity onPress={restartGame} style={pairingCardStyle.restartButton}>
            <Text style={pairingCardStyle.restartText}>Chơi lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mixedList}
          keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
};

export default PairingCard;
