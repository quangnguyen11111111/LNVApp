import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Colors from '../../constant/Colors';
import learnStyle from '../styles/learnStyle';
export const LearnViewModel = () => {
    const ORIGINAL_DATA = [
        { id: '1', source: 'Dog', target: 'Chó' },
        { id: '2', source: 'Sun', target: 'Mặt trời' },
        { id: '3', source: 'Water', target: 'Nước' },
        { id: '4', source: 'Cat', target: 'Mèo' },
        { id: '5', source: 'Moon', target: 'Mặt trăng' },
        { id: '6', source: 'Fire', target: 'Lửa' },
        { id: '7', source: 'Tree', target: 'Cây' },
        { id: '8', source: 'Book', target: 'Sách' },
        { id: '9', source: 'Pen', target: 'Bút' },
        { id: '10', source: 'Car', target: 'Xe hơi' },
        { id: '11', source: 'Cloud', target: 'Đám mây' },
        { id: '12', source: 'River', target: 'Dòng sông' },
        { id: '13', source: 'Mountain', target: 'Núi' },
      ];
      
      const BATCH_SIZE = 6;
      
      const getRandomOptions = (correct, allTargets) => {
        const options = [correct];
        while (options.length < 4) {
          const random = allTargets[Math.floor(Math.random() * allTargets.length)];
          if (!options.includes(random)) {
            options.push(random);
          }
        }
        return options.sort(() => Math.random() - 0.5);
      };
       const [batchIndex, setBatchIndex] = useState(0);// chỉ số của batch hiện tại
        const [stage, setStage] = useState('multiple');
        const [currentBatch, setCurrentBatch] = useState([]);
        const [currentIndex, setCurrentIndex] = useState(0);
        const [repeatList, setRepeatList] = useState([]);
        const [isRepeating, setIsRepeating] = useState(false);// trạng thái lặp lại
        const [inputText, setInputText] = useState('');
        const [message, setMessage] = useState('');
        const [isAnswered, setIsAnswered] = useState(false);
        const [isAnsweredEssay, setIsAnsweredEssay] = useState(false);
        const [selectedTrueFalse, setSelectedTrueFalse] = useState(false);
        const [correctCount, setCorrectCount] = useState(0);
        const [prevStage, setPrevStage] = useState('');// trạng thái trước đó
        const [arrOriginalData, setArrOriginalData] = useState([]);// mảng dữ liệu gốc


        const [selectedOption, setSelectedOption] = useState('')
      
        const allTargets = ORIGINAL_DATA.map((item) => item.target);
        const totalQuestions = ORIGINAL_DATA.length * 2;
      
        useEffect(() => {
          const start = batchIndex * BATCH_SIZE;
          const batch = ORIGINAL_DATA.slice(start, start + BATCH_SIZE);
          if (batch.length === 0) {
            setStage('complete');
          } else {
            setCurrentBatch(batch);
            setCurrentIndex(0);
            setRepeatList([]);
            setIsRepeating(false);
            setStage('multiple');
          }
        }, [batchIndex]);
      
        const word = currentBatch[currentIndex];// lấy từ hiện tại trong batch
        const options = useMemo(() => {
          if (word && stage === 'multiple') {
            return getRandomOptions(word.target, allTargets);
          }
          return [];
        }, [word, stage]);
        useEffect(() => {
          if (isAnswered && selectedTrueFalse) {
            const timeout = setTimeout(() => {
              handleNext();
            }, 1000);
          
            return () => clearTimeout(timeout);
          }
        }, [isAnswered, selectedTrueFalse]);        
        // ========== Trắc nghiệm ==========
        const handleNext = () => {
          if (currentIndex < currentBatch.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            if (repeatList.length > 0) {
              setCurrentBatch(repeatList);
              setRepeatList([]);
              setIsRepeating(true);
            } else {
              setPrevStage('multiple');
              setStage('review');
            }
            setCurrentIndex(0);
          }
          setSelectedTrueFalse(false);
          setMessage('');
          setIsAnswered(false);
        };
        const renderMultipleChoice = () => {
          if (!word) return null;
        
          const handleSelect = (selected) => {
            const isCorrect = selected === word.target;
            setSelectedOption(selected);
            if (isCorrect) {
              setMessage('Chính xác!');
              setArrOriginalData((prev) => [...prev, word]);
              setSelectedTrueFalse(true);
              setCorrectCount((prev) => prev + 1);
            } else {
              setMessage(`Sai rồi! Đáp án là: ${word.target}`);
              setSelectedTrueFalse(false);
              setRepeatList((prev) => [...prev, word]);
            }
            setIsAnswered(true);
          };
        
          
        
         
        
          return (
            <View style={learnStyle.quizContainer}>
              <Text style={learnStyle.questionText}>{word.source}</Text>
              <Text style={learnStyle.question}>Chọn câu trả lời:</Text>
        
              {options.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    learnStyle.option,
                    isAnswered && option === word.target && learnStyle.correct,
                    isAnswered &&
                      selectedOption === option &&
                      selectedOption !== word.target &&
                      learnStyle.incorrect,
                  ]}
                  onPress={() => handleSelect(option)}
                  disabled={isAnswered}
                >
                  <Text style={learnStyle.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
        
              {message && (
                <Text
                  style={[
                    learnStyle.message,
                    selectedTrueFalse && { color: Colors.backgroundButton },
                  ]}
                >
                  {message}
                </Text>
              )}
        
              {/* Nếu sai thì hiện nút "Tiếp theo" */}
              {isAnswered && !selectedTrueFalse && (
                <TouchableOpacity
                  style={learnStyle.submitBtn}
                  onPress={handleNext}
                >
                  <Text style={learnStyle.optionText}>Tiếp theo</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        };
      
        // ========== Tự luận ==========
        const renderEssay = () => {
          if (!word) return null;
      
          const handleCheck = () => {
            const isCorrect = inputText.trim().toLowerCase() === word.source.trim().toLowerCase();
            if (isCorrect) {
              setMessage('Bạn đang tiến lên phía trước!');
              setSelectedTrueFalse(true);
              setArrOriginalData((prev) => [...prev, word]);// thêm từ đúng vào mảng dữ liệu gốc
              setCorrectCount((prev) => prev + 1);
            } else {
              setMessage(`Sai rồi! Đáp án đúng là: ${word.source}`);
              setSelectedTrueFalse(false);
                setRepeatList((prev) => [...prev, word]);
              
            }
            setIsAnsweredEssay(true);
          };
      
          const handleNextEssay = () => {
            if (currentIndex < currentBatch.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setInputText('');
                setIsAnsweredEssay(false);
                setMessage('');
              } else {
                if (repeatList.length > 0) {
                  setCurrentBatch(repeatList);
                  setRepeatList([]);
                  setIsRepeating(true);
                } else {
                  setPrevStage('essay');
                  setStage('review'); // hiển thị phần tổng kết
                }
                setCurrentIndex(0);
                setInputText('');
                setIsAnsweredEssay(false);
                setMessage('');
              }
              
          };
      
          return (
            <View style={learnStyle.quizContainer}>
              <Text style={learnStyle.questionText}>{word.target}</Text>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                style={learnStyle.input}
                placeholder="Nhập đáp án"
                editable={!isAnsweredEssay}
              />
              {!isAnsweredEssay ? (
                <TouchableOpacity style={[learnStyle.submitBtn,{ backgroundColor: Colors.backgroundButton,}]} onPress={handleCheck} disabled={!inputText}>
                  <Text style={learnStyle.optionText}>Xác nhận</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[learnStyle.submitBtn,selectedTrueFalse&&{backgroundColor:Colors.backgroundButton}]} onPress={handleNextEssay}>
                  <Text style={learnStyle.optionText}>Tiếp theo</Text>
                </TouchableOpacity>
              )}
              {message && <Text style={[learnStyle.message,selectedTrueFalse&&{color:Colors.primary}]}>{message}</Text>}
            </View>
          );
        };
        //== hàm hoàn thành 1 phần  ==//
        const renderCompletePart = (options) => {
            const handleNext = () => {
              if (prevStage === 'multiple') {
                setArrOriginalData([]);// reset mảng dữ liệu gốc
                setStage('essay'); // chuyển sang tự luận
                setCurrentBatch(ORIGINAL_DATA.slice(batchIndex * BATCH_SIZE, batchIndex * BATCH_SIZE + BATCH_SIZE));
              } else if (prevStage === 'essay') {
                setArrOriginalData([]);// reset mảng dữ liệu gốc
                setBatchIndex((prev) => prev + 1); // chuyển sang batch tiếp theo
              }
            };
          
            return (
              <ScrollView contentContainerStyle={learnStyle.quizContainer}>
                <Text style={learnStyle.textCompletePart}>🎉 Bạn đã học thêm được:</Text>
                {options.map((option, index) => (
                  <Text key={index} style={[learnStyle.optionText, learnStyle.textLanguage]}>
                    {option.source}: {option.target}
                  </Text>
                ))}
                <TouchableOpacity style={[learnStyle.submitBtn,{backgroundColor:Colors.backgroundButton}]} onPress={handleNext}>
                  <Text style={learnStyle.optionText}>Tiếp theo</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          };
        //== hàm hoàn thành ==//          
        const renderComplete = () => (
          <View style={learnStyle.quizContainer}>
            <Text style={learnStyle.questionText}>🎉 Bạn đã học xong tất cả từ!</Text>
          </View>
        );
        return {
            renderMultipleChoice,
            renderEssay,
            renderComplete,
            currentBatch,
            batchIndex,
            setBatchIndex,
            stage,
            setStage,
            isRepeating,
            setIsRepeating,
            correctCount,
            totalQuestions,
            renderCompletePart,
            arrOriginalData
        }
};
