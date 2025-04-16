// components/AddModal.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';

export default function AddModal  ({ visible, onClose }) {
  const navigation = useNavigation()
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.763)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            width: '80%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{ padding: 15, backgroundColor: '#2196f3', borderRadius: 8, marginBottom: 10,borderWidth:1,borderColor:"#4f5eeb" }}
            onPress={() => {
              onClose();
              navigation.navigate("addNew", {
                screen: "addNewCourse"
              });
            }}
          >
            <Text style={{ color: '#fff',fontSize:18,fontWeight:600 }}>Add new course →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15, backgroundColor: '#2196f3', borderRadius: 8, marginBottom: 10,borderWidth:1,borderColor:"#4f5eeb" }}
            onPress={() => {
              onClose();
              navigation.navigate("addNew", {
                screen: "addNewLesson"
              });
            }}
          >
            <Text style={{  color: '#fff',fontSize:18,fontWeight:600 }}>Add new lesson →</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

 
