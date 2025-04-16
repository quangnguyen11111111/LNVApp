import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const baseTabsStyle = StyleSheet.create({
container:{
    flex:1,
    backgroundColor:Colors.backgroundFlower
},
viewFolders:{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            justifyContent:'center'
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
export default baseTabsStyle;