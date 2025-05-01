import { View, Text, Switch, TouchableOpacity, Dimensions, FlatList, TextInput, KeyboardAvoidingView, Platform, InteractionManager, ScrollView } from 'react-native';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import takeTheTestStyle from '../../styles/takeTheTestStyle';
import { AntDesign, Feather } from '@expo/vector-icons';
import pairingCardStyle from '../../styles/pairingCardStyle';
import TakeTheTestViewModel from '../../viewmodels/TakeTheTestViewModel';
import learnStyle from '../../styles/learnStyle';
import Colors from '../../../constant/Colors';

const { width, height } = Dimensions.get('window');

const TakeTheTest = ({ navigation }) => {
  const {
    modeTransform,
    setModeTransform,
    isEnabledEssay,
    toggleSwitchEssay,
    isEnabledMultipleChoice,
    toggleSwitchMultipleChoice,
    isEnabledPairingCard,
    toggleSwitchPairingCard,
    shuffleArray,
    setModeTransformToStartTest,
    flatListRef,
    handleEssayAnswer,
    modelNow,
    trueOrFalseData,
    answersResult,
    handleTrueOrFalseAnswer,
    options,
    word,
    lengDataUse,
    handleMultipleChoiceAnswer,
    inputText, setInputText,
    inputTextRef,
    currentIndex,
    handleRetry
  } = TakeTheTestViewModel();
  const totalCorrect = answersResult.filter(item => item.isCorrect === true).length;
const totalIncorrect = answersResult.filter(item => item.isCorrect === false).length;

  return (
    <View style={takeTheTestStyle.container}>
      <View style={pairingCardStyle.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={32} color="white" />
        </TouchableOpacity>
      </View>
      {modeTransform === 'SetUpTest' && (
        <SetUpTest
          setModeTransform={setModeTransform}
          isEnabledEssay={isEnabledEssay}
          toggleSwitchEssay={toggleSwitchEssay}
          isEnabledMultipleChoice={isEnabledMultipleChoice}
          toggleSwitchMultipleChoice={toggleSwitchMultipleChoice}
          isEnabledPairingCard={isEnabledPairingCard}
          toggleSwitchPairingCard={toggleSwitchPairingCard}
          setModeTransformToStartTest={setModeTransformToStartTest}
        />
      )}
      {modeTransform === 'StartTest' && shuffleArray && (
        <StartTest
          isEnabledEssay={isEnabledEssay}
          isEnabledMultipleChoice={isEnabledMultipleChoice}
          isEnabledPairingCard={isEnabledPairingCard}
          shuffleArray={shuffleArray}
          flatListRef={flatListRef}
          handleAnswer={handleEssayAnswer}
          modelNow={modelNow}
          trueOrFalseData={trueOrFalseData}
         
          handleTrueOrFalseAnswer={handleTrueOrFalseAnswer}
          options={options}
          word={word}
          lengDataUse={lengDataUse}
          modeTransform={modeTransform}
          handleMultipleChoiceAnswer={handleMultipleChoiceAnswer}
          inputText={inputText}
          setInputText={setInputText}
          inputTextRef={inputTextRef}
          currentIndex={currentIndex}
        />
      )}
      {modeTransform==='resultTest'&&(
        <ResultTest  answersResult={answersResult} totalCorrect={totalCorrect} totalIncorrect={totalIncorrect} handleRetry={handleRetry} navigation={navigation}/>
      )}
    </View>
  );
};

const SetUpTest = ({
  setModeTransform,
  isEnabledEssay,
  toggleSwitchEssay,
  isEnabledMultipleChoice,
  toggleSwitchMultipleChoice,
  isEnabledPairingCard,
  toggleSwitchPairingCard,
  setModeTransformToStartTest
}) => (
  <View style={takeTheTestStyle.containerSetUpTest}>
    <View style={takeTheTestStyle.viewHeader}>
      <Text style={takeTheTestStyle.textNameFile}>File1</Text>
      <Text style={takeTheTestStyle.textSetUpTest}>Thiết lập bài kiểm tra </Text>
    </View>
    <View>
      <View style={takeTheTestStyle.viewModelTest}>
        <Text style={takeTheTestStyle.textModelTest}>Kiểm tra tự luận</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabledEssay ? '#2196f3' : '#f4f3f4'}
          onValueChange={toggleSwitchEssay}
          value={isEnabledEssay}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>
      <View style={takeTheTestStyle.viewModelTest}>
        <Text style={takeTheTestStyle.textModelTest}>Kiểm tra trắc nghiệm</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabledMultipleChoice ? '#2196f3' : '#f4f3f4'}
          onValueChange={toggleSwitchMultipleChoice}
          value={isEnabledMultipleChoice}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>
      <View style={takeTheTestStyle.viewModelTest}>
        <Text style={takeTheTestStyle.textModelTest}>Kiểm tra ghép từ</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabledPairingCard ? '#2196f3' : '#f4f3f4'}
          onValueChange={toggleSwitchPairingCard}
          value={isEnabledPairingCard}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>
    </View>
    <TouchableOpacity style={takeTheTestStyle.button} onPress={setModeTransformToStartTest}>
      <Text style={takeTheTestStyle.textButton}>Bắt đầu kiểm tra </Text>
    </TouchableOpacity>
  </View>
);

const StartTest = ({
  isEnabledEssay,
  isEnabledMultipleChoice,
  isEnabledPairingCard,
  shuffleArray,
  flatListRef,
  handleAnswer,
  modelNow,
  trueOrFalseData,
  handleTrueOrFalseAnswer,
  options,
  word,
  modeTransform,
  handleMultipleChoiceAnswer,
  inputText, setInputText,
  inputTextRef,
  currentIndex
}) => (
  <View style={takeTheTestStyle.viewStartTest}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height" }
      style={{ flex: 1 }}
    >
      <FlatList
        ref={flatListRef}
        data={shuffleArray}
        keyExtractor={(item) => item.id}
        horizontal={true}
        onContentSizeChange={() => {
          flatListRef.current.scrollToIndex({ index: currentIndex });  // Cuộn đến index hiện tại
        }}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={1} // Render 1 item ban đầu
        maxToRenderPerBatch={1} // Render 1 item mỗi batch
        windowSize={3} // Render 1 item trước và 1 sau item hiện tại
        pagingEnabled={true}
        getItemLayout={(data, index) => (
          { length: width, offset: width * index, index }
        )}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          let content = null;

          if (modelNow === 'trueOfFalse' && modeTransform === 'StartTest' && isEnabledPairingCard && index < trueOrFalseData.length) {
            content =
              <TrueOrFalse
                item={trueOrFalseData[index]}
                handleAnswer={handleTrueOrFalseAnswer}
              />

          }

          else if (modelNow === 'essay' && modeTransform === 'StartTest' && isEnabledEssay) {
            content = <Essay handleAnswer={handleAnswer}
              word={word}
              inputText={inputText}
              setInputText={setInputText}
              inputTextRef={inputTextRef}
            />;
          }

          else if (modelNow === 'multipleChoice' && modeTransform === 'StartTest' && isEnabledMultipleChoice) {
            content = (
              <MultipleChoice
                handleAnswer={handleMultipleChoiceAnswer}
                options={options}
                word={word}
              />
            );
          }

          return (
            <View style={takeTheTestStyle.viewStartTest} key={index}>
              {content}
            </View>
          );
        }}
      />
    </KeyboardAvoidingView>
  </View>
);

const TrueOrFalse = memo(({ item, handleAnswer }) => (
  <View style={takeTheTestStyle.viewTrueOrFalse}>
    <Text style={takeTheTestStyle.textTitle}>Định nghĩa</Text>
    <Text style={takeTheTestStyle.textItem}>{item.source}</Text>
    <Text style={takeTheTestStyle.textTitle}>Thuật ngữ</Text>
    <Text style={takeTheTestStyle.textItem}>{item.displayedTarget}</Text>
    <Text style={[takeTheTestStyle.textTitle, { marginTop: 10 }]}>Chọn câu trả lời</Text>
    <TouchableOpacity
      style={takeTheTestStyle.btnTrueOfFalse}
      onPress={() => handleAnswer(true, item)}
    >
      <Text style={takeTheTestStyle.textOnTouchable}>Đúng</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={takeTheTestStyle.btnTrueOfFalse}
      onPress={() => handleAnswer(false, item)}
    >
      <Text style={takeTheTestStyle.textOnTouchable}>Sai</Text>
    </TouchableOpacity>
  </View>
))

const MultipleChoice = memo(({ handleAnswer, options, word }) => (
  <View style={takeTheTestStyle.container}>
    <Text style={takeTheTestStyle.textSourceMultipleChoice}>{word.target}</Text>
    <Text style={learnStyle.question}>Chọn câu trả lời:</Text>
    {options.map((option, idx) => (
      <TouchableOpacity
        key={idx}
        style={takeTheTestStyle.TouchableOpacityMultipleChoice}
        onPress={() => handleAnswer(option, word)}
      >
        <Text style={learnStyle.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
));

const Essay = memo(({ word, handleAnswer }) => {
  // Kiểm tra word
  if (!word) return <View><Text>Loading question...</Text></View>;
  const [inputText, setInputText] = useState('');
  const inputTextRef = useRef(null)
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputTextRef.current?.focus();
    }, 350); // Delay nhẹ 100ms để đảm bảo FlatList đã mount xong
  
    return () => clearTimeout(timeout);
  });
  
  const submitAnswer = () => {
     setTimeout(() => {
      handleAnswer(inputText, word); // Gọi handler với text và word hiện tại
     setInputText(''); // Xóa input sau khi nộp
     }, 500);
  };

 return (
  <View style={[takeTheTestStyle.container]}>
  <View style={{ flex: 1 }}>
    <Text style={[learnStyle.questionText, { width: "96%" }]}>{word.target}</Text>
    <TextInput
      ref={inputTextRef}
      value={inputText}
      onChangeText={setInputText}
      placeholder="Nhập đáp án"
      style={[{width: '96%',marginVertical:20,
        borderBottomWidth:3,
        borderBlockColor:"gray",
        fontSize:16
      }]}
      onSubmitEditing={submitAnswer}
    />
  </View>
</View>
 );
});
const ResultTest = memo(({answersResult,totalCorrect,totalIncorrect,handleRetry,navigation})=>(
<ScrollView style={{    backgroundColor:Colors.backgroundColor,}}>
  <View style={takeTheTestStyle.container}>
    <View style={takeTheTestStyle.viewResultHeader}>
    <Text style={takeTheTestStyle.textTitleResultHeader} >Kết quả của bạn</Text>
    <View style={{alignItems:'center'}}>
      <Text style={[takeTheTestStyle.textCountResult,{color:Colors.green}]}>Đúng: {totalCorrect}</Text>
      <Text style={[takeTheTestStyle.textCountResult,{color:Colors.red}]}>Sai: {totalIncorrect}</Text>
    </View>
    </View>
    <TouchableOpacity style={takeTheTestStyle.touchableOpacityRetry} onPress={handleRetry}>
      <Text style={takeTheTestStyle.textRetry}>Làm lại bài kiểm tra</Text>
    </TouchableOpacity>
    <TouchableOpacity style={takeTheTestStyle.touchableOpacityRetry} onPress={()=>navigation.goBack()}>
      <Text style={takeTheTestStyle.textRetry}>Quay lại ôn tập</Text>
    </TouchableOpacity>
    <Text style={takeTheTestStyle.textTitleResult}>Đáp án kiểm tra</Text>
     {answersResult && answersResult.map((item, index) => {
  if (item.userAnswer === true || item.userAnswer === false) {
    return (
      <View style={takeTheTestStyle.viewItemResult} key={index}>
        <View style={takeTheTestStyle.viewItemResultIn}>
          <Text style={[takeTheTestStyle.textItemHeader, { borderBottomWidth: 1, borderBottomColor: Colors.itemColor }]}>{item.source}</Text>
          <Text style={takeTheTestStyle.textItemHeader}>{item.displayedTarget}</Text>
          {/* hiển thị đáp án  */}
          <View style={takeTheTestStyle.viewAnswer}>
            <View>
              <AntDesign name="check" size={28} color={Colors.green} />
              <Text style={{color:Colors.green}}> {item.isCorrectDisplayTrue}</Text>
            </View>
            {!item.isCorrect&&<View>
              <Feather name="x" size={28} color={Colors.red} />
              <Text style={{color:Colors.red}}> {item.userAnswer}</Text>
            </View>}
          </View>
        </View>
        {/* View người dùng trả lời */}
        <View style={[takeTheTestStyle.viewResultBottom, { backgroundColor: item.isCorrect ? Colors.green : Colors.red }]}>
          {item.isCorrect ? (
            <>
              <AntDesign name="check" size={24} color="white" />
              <Text>Đúng</Text>
            </>
          ) : (
            <>
              <Feather name="x" size={24} color="white" />
              <Text>Sai</Text>
            </>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={takeTheTestStyle.viewItemResult} key={index}>
        <View style={takeTheTestStyle.viewItemResultIn}>
          <Text style={takeTheTestStyle.textItemHeader}>{item.displayedTarget}</Text>
          {/* hiển thị đáp án  */}
          <View style={takeTheTestStyle.viewAnswer}>
            <View style={{alignItems:'center'}}>
              <AntDesign name="check" size={28} color={Colors.green} />
              <Text style={{color:Colors.green}}> {item.source}</Text>
            </View>
            {!item.isCorrect&&<View style={{alignItems:'center'}}>
              <Feather name="x" size={28} color={Colors.red} />
              <Text style={{color:Colors.red}}> {item.userAnswer}</Text>
            </View>}
          </View>
        </View>
        {/* View người dùng trả lời */}
        <View style={[takeTheTestStyle.viewResultBottom, { backgroundColor: item.isCorrect ? Colors.green : Colors.red }]}>
          {item.isCorrect ? (
            <>
              <AntDesign name="check" size={24} color="white" />
              <Text>Đúng</Text>
            </>
          ) : (
            <>
              <Feather name="x" size={24} color="white" />
              <Text>Sai</Text>
            </>
          )}
        </View>
      </View>
    );
  }
})}

    
</View>
</ScrollView>
));
export default TakeTheTest;