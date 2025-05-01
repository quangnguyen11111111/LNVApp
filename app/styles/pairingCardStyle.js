import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constant/Colors";

const { width, height } = Dimensions.get('window');
const numColumns = 3;
const numRows = 4; // Giả sử có tối đa 4 dòng
const itemHeight = (height - 110) / numRows; // trừ header, padding, margin

const itemSize = (width - 50) / numColumns;
const pairingCardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    padding: 15
  },
  viewHeader: {
    padding: 10,
    backgroundColor: Colors.backgroundColor,
  },
  card: {
    width: itemSize,
    height: itemHeight,
    backgroundColor: Colors.itemColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff'
  },
  selected: {
    backgroundColor: Colors.primary,
  },
  falseSelected: {
    backgroundColor: "red",
  },
  hidden: {
    opacity: 0,
  },viewCompleted:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButton:{
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textCompleted:{
    fontSize: 24,
    color: Colors.green,
    marginBottom: 20,
  },
});

export default pairingCardStyle;
