import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
export const FlipCardViewModel = () => {
  const { isLoading, fileDetail, fileName } = useSelector(
    (state) => state.file
  );
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = useRef(null);

  const isCompleted = cardIndex === fileDetail.length;
  const lengthData = fileDetail.length;
  const countIndex = (index) => {
    setCardIndex(index + 1);
  };
const handelBack = () => {
  if (cardIndex > 0) {
    const newIndex = cardIndex - 1;
    setCardIndex(newIndex);
    swiperRef.current?.jumpToCardIndex(newIndex);
  }
};

const handelNext = () => {
  if (cardIndex < fileDetail.length - 1) {
    const newIndex = cardIndex + 1;
    setCardIndex(newIndex);
    swiperRef.current?.jumpToCardIndex(newIndex);
  }
};
const resetLearning = () => {
  setCardIndex(0);
  swiperRef.current?.jumpToCardIndex(0);
};
  return {
    isLoading,
    fileDetail,
    fileName,
    isCompleted,
    lengthData,
    countIndex,
    cardIndex,
    swiperRef,
    handelBack,
    handelNext,
    resetLearning
  };
};
