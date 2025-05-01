// Learn.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import learnStyle from '../../styles/learnStyle';
import { LearnViewModel } from '../../viewmodels/LearnViewModel';
import pairingCardStyle from '../../styles/pairingCardStyle';
import { Feather } from '@expo/vector-icons';
const Learn = ({navigation}) => {
 const {renderMultipleChoice,
  renderEssay,
  renderComplete,
  stage,
  currentBatch,
  arrOriginalData,
  totalQuestions,
  renderCompletePart,
  correctCount} =LearnViewModel()

  return (
<View style={learnStyle.container}>
<View style={pairingCardStyle.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={32} color="white" />
        </TouchableOpacity>
      </View>
<View style={{ marginBottom: 12,marginTop: 20 }}>
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
</View>
  );
};

export default Learn;