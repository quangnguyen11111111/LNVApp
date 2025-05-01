import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const flipCard = StyleSheet.create({
    viewSwiper:{
        alignItems:'center',
        justifyContent:"center",
        flex:1
    },
    card:{
        bottom:75,
    },
    container:{
        height:"100%",
        backgroundColor:Colors.backgroundColor,
        zIndex:-1
    },
    viewHeader:{
        display:'flex',
        flexDirection:"row",
        padding:20,
        gap:130
    },
    viewBottom:{
        paddingStart:20,
        paddingBottom:25,
        zIndex:10,
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemBack:{
        width:50,
        height:40
    }
})
export default flipCard;