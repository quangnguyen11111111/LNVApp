import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const baseAddNewStyle = StyleSheet.create({
    viewContainer:{
        padding:20,
        paddingStart:25,
        paddingEnd:25,
        height:"90%",
        position:"relative"
    },
    viewHeader:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottomWidth:1,
        paddingBottom:15,
        borderColor:"gray",
    },
    viewBack:{
           display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:15
    },
    textBack:{
        fontSize:22,
        fontWeight:700
    },
    inputText:{
        color: Colors.white,
        backgroundColor: Colors.backgroundColor,
    },
    viewInput:{
        height: 50,
                borderWidth: 1,
                borderColor: Colors.primary,
                padding: 10,
                borderRadius: 10,
                marginTop:25
    },
    inputCustomLabel:{
            topFocused: -30, // Dịch label lên cao hơn khi focus
                fontSizeFocused: 14,
                fontSizeBlurred: 15,
                colorFocused: Colors.label,
    }
})
export default baseAddNewStyle;