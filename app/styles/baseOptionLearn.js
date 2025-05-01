import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const { width } = Dimensions.get('window');
const baseOptionLearn = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.backgroundFlower,
        overflow: 'hidden',
        width:width,
        height:250,
        alignSelf:"center",
        marginTop:10,
      },
      face: {
        flex: 1,
        backgroundColor: Colors.itemColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      back: {
        flex: 1,
        backgroundColor: Colors.itemColor,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color:Colors.white
      },
  completedText: {
    fontSize: 22,
    color: "green",
    fontWeight: "bold",
    marginTop: 20,
  },
  
})
export default baseOptionLearn;