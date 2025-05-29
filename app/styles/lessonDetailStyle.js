import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors";
const lessonDetailStyle = StyleSheet.create({
    //xử lí modal
modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: Colors.backgroundColor,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalButton: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.white,
  },
  modalButtonText: {
    fontSize: 18,
    textAlign: 'center',
  }
})
export default lessonDetailStyle;