import React, {
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { showToast } from "../../../ToastShow/ToastUtil";
import { InteractionManager } from "react-native";
import { useSelector } from "react-redux";
// const ORIGINAL_DATA = [
//   { detailID: "1", fileSource: "Dog", fileTarget: "Chó" },
//   { detailID: "2", fileSource: "Sun", fileTarget: "Mặt trời" },
//   { detailID: "3", fileSource: "Water", fileTarget: "Nước" },
//   { detailID: "4", fileSource: "Cat", fileTarget: "Mèo" },
//   { detailID: "5", fileSource: "Moon", fileTarget: "Mặt trăng" },
//   { detailID: "6", fileSource: "Fire", fileTarget: "Lửa" },
//   { detailID: "7", fileSource: "Tree", fileTarget: "Cây" },
//   { detailID: "8", fileSource: "Book", fileTarget: "Sách" },
//   { detailID: "9", fileSource: "Pen", fileTarget: "Bút" },
//   { detailID: "10", fileSource: "Car", fileTarget: "Xe hơi" },
//   { detailID: "11", fileSource: "Cloud", fileTarget: "Đám mây" },
//   { detailID: "12", fileSource: "River", fileTarget: "Dòng sông" },
//   { detailID: "13", fileSource: "Mountain", fileTarget: "Núi" },
// ];
// hàm shuffleArrayF để trộn mảng dữ liệu
const shuffleArrayF = (ORIGINAL_DATA1) => {
  const shuffled = [...ORIGINAL_DATA1]; // tạo bản sao để không làm thay đổi mảng gốc
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
  const { isLoading, fileDetail, fileName } = useSelector(
    (state) => state.file
  );
  const ORIGINAL_DATA = fileDetail;
  // xử lí giao diện SetUpTest
  const [modeTransform, setModeTransform] = useState("SetUpTest");
  const [isEnabledEssay, setIsEnabledEssay] = useState(false);
  const [isEnabledMultipleChoice, setIsEnabledMultipleChoice] = useState(true);
  const [isEnabledPairingCard, setIsEnabledPairingCard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [shuffleArray, setShuffleArray] = useState([]);
  const [modelNow, setModelNow] = useState("");
  const [inputText, setInputText] = useState("");
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
      setShuffleArray(shuffleArrayF(ORIGINAL_DATA));
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
    } else {
      setModeTransform("resultTest");
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
            ? item.fileTarget
            : ORIGINAL_DATA[Math.floor(Math.random() * ORIGINAL_DATA.length)]
                .fileTarget;
          return {
            ...item,
            displayedTarget: randomTarget,
            isCorrectAnswer: item.fileTarget === randomTarget,
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
          detailID: currentItem.detailID,
          fileSource: currentItem.fileSource,
          displayedTarget: currentItem.displayedTarget,
          isCorrectDisplayTrue:
            currentItem.fileTarget === currentItem.displayedTarget
              ? "Đúng"
              : "Sai",
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
      const allTargets = ORIGINAL_DATA.map((item) => item.fileSource);
      return getRandomOptions(word.fileSource, allTargets, word.fileTarget);
    }
    return []; // Trả về mảng rỗng nếu không phải mode trắc nghiệm hoặc không có word
  }, [word]); // Phụ thuộc modelNow và word
  //Hàm xử lí đúng sai MultipleChoice
  const handleMultipleChoiceAnswer = useCallback(
    (userAnswer, dataItem) => {
      const isCorrect = userAnswer === dataItem.fileSource;
      setAnswersResult((prev) => [
        ...prev,
        {
          detailID: dataItem.detailID,
          fileSource: dataItem.fileSource,
          displayedTarget: dataItem.fileTarget,
          userAnswer,
          isCorrect,
        },
      ]);
      handleAnswer();
    },
    [handleAnswer]
  );
  const handleEssayAnswer = async (userAnswer, dataItem) => {
    const isCorrect = userAnswer === dataItem.fileSource;
    setAnswersResult((prev) => [
      ...prev,
      {
        detailID: dataItem.detailID,
        fileSource: dataItem.fileSource,
        displayedTarget: dataItem.fileTarget,
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
    } else {
      setModeTransform("resultTest");
    }
  };
  const handleRetry = () => {
    setAnswersResult([]);
    setModelNow(enabledModes[0]);
    setCurrentIndex(0);
    setModeTransform("StartTest");
  };
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
    inputText,
    setInputText,
    inputTextRef,
    currentIndex,
    handleRetry,
  };
}
