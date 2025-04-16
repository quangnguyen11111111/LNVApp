import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const addNewLessonStyle = StyleSheet.create({
    viewInputSourceTarget:{
        backgroundColor:Colors.viewInput,
        borderRadius:10,
        marginTop:10,
        paddingBottom:10,
        paddingStart:15,
        paddingEnd:15,
        paddingTop:5
    },
    inputSourceTarget:{
        borderBottomWidth:3,
        borderColor:Colors.primary,
        height:50,
        fontSize:18,
        paddingStart:5
    },
    textInput:{
        fontSize:13,
        marginBottom:10,
        marginTop:10,
        textTransform:"uppercase",
        fontWeight:500,
        color:Colors.itemColor
    },
    addPlus:{
        position:"absolute",
        bottom:-53,
        right:50
    },
    inputContainerStyleDropDown:{
                     backgroundColor: Colors.backgroundColor,
                                                   borderRadius:10,
                                                   borderWidth:1,
                                                   height:50,
                                                   borderColor:Colors.primary,
                                                   marginBottom:10
                  },
                  textChoose:{
                    fontSize:18,
                    fontWeight:500,
                    marginTop:10,
                    marginBottom:10
                  }
})
export default addNewLessonStyle;