import { useCallback, useEffect, useRef, useState } from "react";

export default function EssayViewModel( index,flatListRefEssay,lengDataUse,enabledModes){
    const [indexNow, setIndexNow]=useState(index)
    const [inputText, setInputText]=useState("")
     const inputTextRef = useRef(null);
     useEffect(()=>{
        if (inputTextRef.current) {
            inputTextRef.current?.focus();
           }
     })
     const handleEssayAnswer =useCallback(
     async (userAnswer, dataItem) => {
        console.log("đã ấn vào");
        
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
        
        if (indexNow + 1 == lengDataUse && enabledModes.length > 1) {
          setModelNow(enabledModes[1]);
        }
        if (indexNow + 1 == lengDataUse * 2 && enabledModes.length == 3) {
          setModelNow(enabledModes[2]);
        }
        let nextIndex = indexNow + 1;
        if (nextIndex < shuffleArray.length) {
         await flatListRefEssay.current?.scrollToIndex({ index:  indexNow + 1 });
         setIndexNow(nextIndex); // chuyển đến câu tiếp theo
        }
        setInputText('')
        forcusInput()
      } )
      return {
        handleEssayAnswer,inputTextRef,setInputText,inputText,flatListRefEssay
      }
}