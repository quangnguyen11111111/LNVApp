import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors";
const courseStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor,
        
    },
    titleHeader:{
        fontSize:25,
        fontWeight:"bold",
        color:Colors.white,
    },
    viewHeader:{
        marginStart:20,
        marginEnd:20,
        marginTop:10,
        borderBottomWidth:2,
        borderColor:"gray",
        paddingBottom:10,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        justifyContent:"space-between"
    },
    onPressHeader:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:10,
        justifyContent:"center",
    }
})
export default courseStyle;