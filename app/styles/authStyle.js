import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"

const authStyle = StyleSheet.create({
    imageLogin: {
        width: "70%",
        height: 200,
        alignSelf: "center",
        resizeMode: "contain",
        marginTop: "10%",
      },
      imageRegister:{
        width:150,
        height:150,
        alignSelf:"center",
        resizeMode: 'contain'
      },
      textTitle: {
        textAlign: "center",
        color: Colors.white,
        fontSize: 25,
        marginBottom: 30,
        fontFamily: "outfit-bold",
      },
      input: {
        color: Colors.white,
        outlineWidth: 0,
        fontSize: 18,
        height:"100%"
      },
      viewInput: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
      },
      inputText: {
        color: Colors.white,
        backgroundColor: Colors.backgroundColor,
      },
      inputCustomLabel: {
        topFocused: -30, // Dịch label lên cao hơn khi focus
        fontSizeFocused: 14,
        fontSizeBlurred: 16,
        colorFocused: Colors.label,
      },
      button: {
        padding: 10,
        backgroundColor: Colors.backgroundButton,
        marginTop: 20,
        borderRadius: 8,
        elevation: 5,
        justifyContent:"center"
      },
      buttonText: {
        fontSize: 20,
        color: Colors.white,
        fontFamily: "outfit-bold",
        textAlign:"center"
      },
      bottomText: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
        marginTop: 15,
      },
      googleButton: {
        width: "100%",
        height: 60,
        alignSelf: 'center'
      },
         error:{
            color:Colors.red,
            fontSize:15,
            position:"absolute",
            bottom:-20,
            left:5
          },
          bottomText: {
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              marginTop: 15,
            },
})
export default authStyle;