import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constant/Colors";
const { width,height } = Dimensions.get('window');
const takeTheTestStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
    }, 
    containerSetUpTest: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: 'flex-start',
        gap: 90,
    }, 
    viewModelTest:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: Colors.itemColor,
        paddingVertical: 15,
        // paddingHorizontal: 16,
        // borderRadius: 10,
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: Colors.itemColor,
    },
    viewHeader:{
        borderBottomWidth: 0.5,
        borderColor: Colors.itemColor,
        paddingBottom: 20,
    },
    textNameFile:{
        fontSize: 18,
        fontWeight: 500,
        color: "gray",
    },
    textSetUpTest:{
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.white,
    },textModelTest:{
        fontSize: 18,
        fontWeight: 500,
        color: Colors.white,
    },
    button: {
        padding: 10,
        backgroundColor: Colors.backgroundButton,
        marginTop: 20,
        borderRadius: 8,
        elevation: 5,
        justifyContent:"center"
},
textButton:{
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
},
viewStartTest:{
    flex:1,
    width:width,
    height:height,
    backgroundColor:Colors.backgroundColor
},
viewTrueOrFalse:{
    flex:1,
    backgroundColor:Colors.backgroundColor,
    padding:15
},
textTitle:{
    fontSize:16,
    color:Colors.itemColor,
    fontWeight:500
},
textItem:{
    fontSize:20,
    marginBottom:10,
},
btnTrueOfFalse:{
    width:"96%",
    borderWidth:3,
    borderColor:Colors.itemColor,
    borderRadius:8,
    padding:13,
    marginBottom:10,
    marginTop:10
},
textOnTouchable:{
    fontSize:17,
    fontWeight:500
},
textSourceMultipleChoice:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 20,
    padding:10,
},
TouchableOpacityMultipleChoice:{
    width:"96%",
    borderWidth:3,
    borderColor:Colors.itemColor,
    borderRadius:8,
    padding:13,
    marginTop:10
},
//giao diện hoàn thành
viewResultHeader:{
    display:'flex',
    // flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    borderBottomWidth:1,
    borderBottomColor:Colors.itemColor,
    paddingBottom:20
},
textTitleResultHeader:{
    fontSize:18,
    fontWeight:500
},
textCountResult:{
    fontSize:22,
    fontWeight:700
},
textTitleResult:{
    fontSize:18,
    fontWeight:500,
    marginVertical:10,
    marginTop:15,
    borderTopWidth:1,
    borderTopColor:Colors.itemColor,
    paddingTop:20
},
viewItemResultIn:{
    paddingHorizontal:15,
    paddingTop:15,
    width:'100%',
    // height:170
},
viewItemResult:{
    borderWidth:2,
    borderColor:Colors.itemColor,
    borderRadius:10,
    overflow:'hidden',
    width:'100%',
    marginTop:30
    // height:170
},
viewAnswer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:15,
    marginBottom:25
},viewResultBottom:{
    flexDirection:'row',
    gap:10,
    padding:10
},
textItemHeader:{
    fontSize:18,
    fontWeight:500,paddingVertical:8
},
touchableOpacityRetry:{
    backgroundColor:Colors.backgroundButton,
    padding:10,
    borderRadius:10,
    alignItems:'center',
    marginTop:15
},
textRetry:{
    fontSize:18,
    fontWeight:600
}
});
export default takeTheTestStyle;