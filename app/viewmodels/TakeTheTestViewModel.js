import React, {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { showToast } from "../../ToastShow/ToastUtil";
import { InteractionManager } from "react-native";
const ORIGINAL_DATA = [
  { id: "1", source: "Dog", target: "Chó" },
  { id: "2", source: "Sun", target: "Mặt trời" },
  { id: "3", source: "Water", target: "Nước" },
  { id: "4", source: "Cat", target: "Mèo" },
  { id: "5", source: "Moon", target: "Mặt trăng" },
  { id: "6", source: "Fire", target: "Lửa" },
  { id: "7", source: "Tree", target: "Cây" },
  { id: "8", source: "Book", target: "Sách" },
  { id: "9", source: "Pen", target: "Bút" },
  { id: "10", source: "Car", target: "Xe hơi" },
  { id: "11", source: "Cloud", target: "Đám mây" },
  { id: "12", source: "River", target: "Dòng sông" },
  { id: "13", source: "Mountain", target: "Núi" },
];
// hàm shuffleArrayF để trộn mảng dữ liệu
const shuffleArrayF = () => {
  const shuffled = [...ORIGINAL_DATA]; // tạo bản sao để không làm thay đổi mảng gốc
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // chọn vị trí ngẫu nhiên
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // hoán đổi phần tử
  }
  return shuffled;
};
//Xử lí trắc nghiệm
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
export default function TakeTheTestViewModel() {
  // xử lí giao diện SetUpTest
  const [modeTransform, setModeTransform] = useState("SetUpTest");
  const [isEnabledEssay, setIsEnabledEssay] = useState(false);
  const [isEnabledMultipleChoice, setIsEnabledMultipleChoice] = useState(true);
  const [isEnabledPairingCard, setIsEnabledPairingCard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [shuffleArray, setShuffleArray] = useState([]);
  const [modelNow, setModelNow] = useState("");
  const[inputText,setInputText]=useState("")
  const inputTextRef = useRef(null);
  const [indexModel, setIndexModel] = useState(0); //chỉ số câu của model
  //xử lí dữ liệu và câu trả lời của người dùng
  const [trueOrFalseData, setTrueOrFalseData] = useState([]);
  const [answersResult, setAnswersResult] = useState([]); // Lưu đáp án của người dùng

  //Xử lí bật tắt chế độ ktra
  const toggleSwitchEssay = useCallback(
    () => setIsEnabledEssay((prev) => !prev),
    []
  );
  const toggleSwitchMultipleChoice = useCallback(
    () => setIsEnabledMultipleChoice((prev) => !prev),
    []
  );
  const toggleSwitchPairingCard = useCallback(
    () => setIsEnabledPairingCard((prev) => !prev),
    []
  );
  const setModeTransformToStartTest = () => {
      if (isEnabledEssay || isEnabledMultipleChoice || isEnabledPairingCard) {
        setModeTransform("StartTest");
      } else {
        showToast("error", "Lỗi", "Vui lòng chọn ít nhất một chế độ kiểm tra");
      }
  };
  // xử lí giao diện StartTest

  useEffect(() => {
    if (modeTransform == "SetUpTest") {
      setShuffleArray(shuffleArrayF());
    }
  }, [modeTransform]);
  //danh sách chế độ người dùng chọn
  const enabledModes = useMemo(() => {
    const modes = [];
    if (isEnabledPairingCard) modes.push("trueOfFalse");
    if (isEnabledMultipleChoice) modes.push("multipleChoice");
    if (isEnabledEssay) modes.push("essay");
    return modes;
  }, [isEnabledPairingCard, isEnabledMultipleChoice, isEnabledEssay]);

  // Lượng dữ liệu dùng cho mỗi loại câu hỏi (cố gắng chia đều)
  const lengDataUse = useMemo(() => {
    if (enabledModes.length === 0) return 0;
    return Math.floor(ORIGINAL_DATA.length / enabledModes.length);
  }, [enabledModes.length]);

  // hàm handleAnswre xử lí chuyển câu
  // ✅ Sử dụng useEffect để set modelNow một lần
  useEffect(() => {
    setModelNow(enabledModes[0]);
  }, [isEnabledEssay, isEnabledMultipleChoice, isEnabledPairingCard]);
  // hàm handleAnswer xử lí chuyển câu
  const handleAnswer = useCallback(() => {
    if (currentIndex + 1 == lengDataUse && enabledModes.length > 1) {
      setModelNow(enabledModes[1]);
    }
    if (currentIndex + 1 == lengDataUse * 2 && enabledModes.length == 3) {
      setModelNow(enabledModes[2]);
    }
    let nextIndex = currentIndex + 1;
    if (nextIndex < shuffleArray.length) {
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex); // chuyển đến câu tiếp theo
    }else{
      setModeTransform("resultTest")
    }
  }, [currentIndex, lengDataUse, enabledModes, shuffleArray.length]);
  // Tạo dữ liệu đúng/sai ngẫu nhiên từ shuffleArray
  useEffect(() => {
    if (modelNow == "trueOfFalse" && isEnabledPairingCard) {
      setIndexModel(lengDataUse);
      const generateTrueOrFalseData = shuffleArray
        .slice(0, lengDataUse)
        .map((item) => {
          const isCorrect = Math.random() > 0.5;
          const randomTarget = isCorrect
            ? item.target
            : ORIGINAL_DATA[Math.floor(Math.random() * ORIGINAL_DATA.length)]
                .target;
          return {
            ...item,
            displayedTarget: randomTarget,
            isCorrectAnswer: item.target === randomTarget,
          };
        });
      setTrueOrFalseData(generateTrueOrFalseData);
    }
  }, [modeTransform]);
  const handleTrueOrFalseAnswer = useCallback(
    (userAnswer, currentItem) => {
      const isCorrect = userAnswer === currentItem.isCorrectAnswer;
      setAnswersResult((prev) => [
        ...prev,
        {
          id: currentItem.id,
          source: currentItem.source,
          displayedTarget: currentItem.displayedTarget,
          isCorrectDisplayTrue:currentItem.target === currentItem.displayedTarget ?'Đúng':'Sai',
          userAnswer,
          isCorrect,
        },
      ]);
      handleAnswer(); // chuyển sang câu tiếp theo
    },
    [handleAnswer]
  );
  // Lấy word hiện tại một cách an toàn
  const word = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < shuffleArray.length) {
      return shuffleArray[currentIndex];
    }
    return null; // Trả về null nếu index không hợp lệ
  }, [shuffleArray, currentIndex]);
  // Tạo các lựa chọn trắc nghiệm an toàn
  const options = useMemo(() => {
    if (modelNow === "multipleChoice" && word) {
      const allTargets = ORIGINAL_DATA.map((item) => item.source);
      return getRandomOptions(word.source, allTargets, word.target);
    }
    return []; // Trả về mảng rỗng nếu không phải mode trắc nghiệm hoặc không có word
  }, [ word]); // Phụ thuộc modelNow và word
  useEffect(() => {
    console.log("answersResult", answersResult);
  }, [answersResult]);
  //Hàm xử lí đúng sai MultipleChoice
  const handleMultipleChoiceAnswer = useCallback(
    (userAnswer, dataItem) => {
      const isCorrect = userAnswer === dataItem.source;
      setAnswersResult((prev) => [
        ...prev,
        {
          id: dataItem.id,
          source: dataItem.source,
          displayedTarget: dataItem.target,
          userAnswer,
          isCorrect,
        },
      ]);
      handleAnswer();
    },
    [handleAnswer]
  );
  const handleEssayAnswer =
   async (userAnswer, dataItem) => {
   
    
        
        const isCorrect = userAnswer === dataItem.source;
      setAnswersResult((prev) => [
        ...prev,
        {
          id: dataItem.id,
          source: dataItem.source,
          displayedTarget: dataItem.target,
          userAnswer,
          isCorrect,
        },
      ]);
      
      if (currentIndex + 1 == lengDataUse && enabledModes.length > 1) {
        setModelNow(enabledModes[1]);
      }
      if (currentIndex + 1 == lengDataUse * 2 && enabledModes.length == 3) {
        setModelNow(enabledModes[2]);
      }
      let nextIndex = currentIndex + 1;
      if (nextIndex < shuffleArray.length) {
       await flatListRef.current?.scrollToIndex({ index: nextIndex });
        setCurrentIndex(nextIndex); // chuyển đến câu tiếp theo
      }else{
        setModeTransform("resultTest")
      }
    }
    const handleRetry =()=>{
      setAnswersResult([])
      setModelNow(enabledModes[0])
      setCurrentIndex(0)
      setModeTransform('StartTest')
    }
  return {
    modeTransform,
    setModeTransform,
    isEnabledEssay,
    toggleSwitchEssay,
    isEnabledMultipleChoice,
    toggleSwitchMultipleChoice,
    isEnabledPairingCard,
    toggleSwitchPairingCard,
    setModeTransformToStartTest,
    shuffleArray,
    flatListRef,

    // Các hàm và biến khác cần cho giao diện StartTest
    handleEssayAnswer,
    modelNow,
    trueOrFalseData,
    answersResult,
    handleTrueOrFalseAnswer,
    options,
    word,
    lengDataUse,
    handleMultipleChoiceAnswer,
    //tu luan
    inputText  ,setInputText,
    inputTextRef,
    currentIndex,
    handleRetry
  };
}
