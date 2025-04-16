import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const homeStyle = StyleSheet.create({
flowerLeft:{
    position:"absolute",
          width:"60%",
          objectFit:"contain",
          left:0,
          top:-18,
          opacity:0.8
},
flowerRight:{
    position:"absolute",
    width:"60%",
    objectFit:"contain",
    right:-43
},
viewFlower:{
    width:"100%",
    height:200,
    position:"relative"
},
viewTitleFlower:{
    alignSelf:"center",
        justifyContent:"center",
        flex:1
},
textNameUser:{
    fontSize:30,
    fontWeight:"bold",
    color:Colors.white
},
textQues:{
    fontSize:16,
    fontWeight:400,
    color:Colors.white
},
viewContent:{
    flex:1,
    backgroundColor:Colors.backgroundColor,
    borderTopEndRadius:30,
    borderTopStartRadius:30,
},
viewTitle:{
    display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10
},
textTitle:{
    fontSize: 19,
    fontWeight: 600,
    color:Colors.white
},
viewFolders:{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10
          },
          viewFolder:{
                          overflow: 'hidden',
                          width: 170,
                          height: 85,
                          paddingStart: 15,
                          paddingTop: 11,
                          paddingEnd: 15,
                          paddingBottom: 11,
                          borderWidth: 2,
                          borderColor: Colors.primary,
                          borderRadius: 10,
                          marginTop:10
                        },
        viewTopFolder:{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 8, // dùng columnGap thay vì gap (gap không hỗ trợ tốt trong RN)
          },
          textTopFolder:{ fontSize: 16, color:Colors.white },
        viewBottomFolder:{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            columnGap: 8,
          },
          textBottomFolder:{ fontSize: 13, color:Colors.white }
})
export default homeStyle;