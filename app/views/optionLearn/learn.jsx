// Learn.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import learnStyle from '../../styles/learnStyle';
import { LearnViewModel } from '../../viewmodels/optionLearn/LearnViewModel';
import pairingCardStyle from '../../styles/pairingCardStyle';
import { Feather } from '@expo/vector-icons';
const Learn = ({ navigation }) => {
  const { renderMultipleChoice,
    renderEssay,
    renderComplete,
    stage,
    currentBatch,
    arrOriginalData,
    totalQuestions,
    renderCompletePart,
    correctCount,
    fileName } = LearnViewModel(navigation)

  return (
    <View style={learnStyle.container}>
      <ScrollView>
      <View style={pairingCardStyle.viewHeader}>
        <TouchableOpacity style={learnStyle.touchableOpacityBack} onPress={() => navigation.goBack()}>
          <Feather name="x" size={32} color="white" />
          <Text style={learnStyle.textFIleName} >{fileName}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 12, marginTop: 20 }}>
        <View
          style={learnStyle.viewHeaderProgress}
        ><Text style={learnStyle.textProgress}>{correctCount}</Text>
          <View style={learnStyle.viewprogress} >
            <Text
              style={[{
                width: `${(correctCount / totalQuestions) * 100}%`,
              }, learnStyle.progressBar]}
            /></View>
          <Text style={learnStyle.textProgress}>{totalQuestions}</Text>
        </View>

      </View>
      <View style={learnStyle.content}>

        {stage === 'multiple' && renderMultipleChoice()}
        {stage === 'essay' && renderEssay()}
        {stage === 'review' && renderCompletePart(arrOriginalData)}
        {stage === 'complete' && renderComplete()}
      </View>
      </ScrollView>
    </View>
  );
};

export default Learn;