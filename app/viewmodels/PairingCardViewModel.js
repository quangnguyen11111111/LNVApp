import React, { useMemo, useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import pairingCardStyle from '../styles/pairingCardStyle';

export const PairingCardViewModel = () => {
    const DATA = [
        { id: '1', source: 'Dog', target: 'Chó' },
        { id: '2', source: 'Sun', target: 'Mặt trời' },
        { id: '3', source: 'Water', target: 'Nước' },
        { id: '4', source: 'Cat', target: 'Mèo' },
        { id: '5', source: 'Moon', target: 'Mặt trăng' },
        { id: '6', source: 'Fire', target: 'Lửa' },
      ];
      // Hàm shuffle
      // Hàm trộn ngẫu nhiên
      const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
        const [firstChoice, setFirstChoice] = useState(null);// thẻ  chọn đầu tiên
        const [hiddenItems, setHiddenItems] = useState([]);// các thẻ đã chọn đúng
        const [wrongPair, setWrongPair] = useState([]);// các thẻ đã chọn sai
        const [mixedList, setMixedList] = useState([]);// danh sách thẻ đã trộn

        
        useEffect(() => {
          const merged = DATA.flatMap((item) => [
            { id: item.id, type: 'source', text: item.source },
            { id: item.id, type: 'target', text: item.target },
          ]);
          setMixedList(shuffleArray(merged));
        }, []);// khi component được mount, gọi hàm này để trộn danh sách thẻ
        
        // Hàm xử lý khi người dùng nhấn vào thẻ
        const handlePress = (item) => {
            if (!firstChoice) {
              setFirstChoice(item);
            } else {
              if (firstChoice.type !== item.type) {
                if (firstChoice.id === item.id) {
                  setHiddenItems((prev) => [...prev, firstChoice, item]);
                } else {
                  setWrongPair([firstChoice, item]);
                  setTimeout(() => setWrongPair([]), 1000);
                }
              } else {
                setWrongPair([firstChoice, item]);
                setTimeout(() => setWrongPair([]), 1000);
              }
              setFirstChoice(null);
            }
          };

          // Hàm khởi động lại trò chơi
          const restartGame = () => {
            const merged = DATA.flatMap((item) => [
              { id: item.id, type: 'source', text: item.source },
              { id: item.id, type: 'target', text: item.target },
            ]);
            setMixedList(shuffleArray(merged));
            setFirstChoice(null);
            setHiddenItems([]);
            setWrongPair([]);
          };

          // Hàm render từng thẻ
          const renderItem = ({ item }) => {
            const isSelected =
              firstChoice?.id === item.id && firstChoice?.type === item.type;
            const isHidden = hiddenItems.some(
              (h) => h.id === item.id && h.type === item.type
            ); 
            const isWrong = wrongPair.some(
              (w) => w.id === item.id && w.type === item.type
            );
        
            return (
              <TouchableOpacity
                style={[
                  pairingCardStyle.card,
                  isSelected && pairingCardStyle.selected,
                  isWrong && pairingCardStyle.falseSelected,
                  isHidden && pairingCardStyle.hidden,
                ]}
                disabled={isHidden}
                onPress={() => handlePress(item)}
              >
                <Text style={pairingCardStyle.text}>{item.text}</Text>
              </TouchableOpacity>
            );
          };
          const isCompleted = hiddenItems.length === (mixedList.length);
          return {
            DATA,
            shuffleArray,
            firstChoice,
            setFirstChoice,
            hiddenItems,
            setHiddenItems,
            wrongPair,
            setWrongPair,
            mixedList,
            setMixedList,
            handlePress,
            restartGame,
            renderItem,
            isCompleted
          };
};
