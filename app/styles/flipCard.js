import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const flipCard = StyleSheet.create({
    viewSwiper:{
        alignItems:'center',
        justifyContent:"center",
        flex:1
    },
    card:{
        flex: 1,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.backgroundFlower,
                overflow: 'hidden',
                height:250,
                alignSelf:"center",
                marginTop:10,
        bottom:75,
        width:"100%"
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