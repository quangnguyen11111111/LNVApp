import { Dimensions, StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const { width } = Dimensions.get('window');
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
                          width: width*0.9,
                          height: 85,
                          paddingStart: 15,
                          paddingTop: 11,
                          paddingEnd: 15,
                          paddingBottom: 11,
                          borderWidth: 2,
                          borderColor: Colors.primary,
                          borderRadius: 10,
                          marginTop:5
                        },
        viewTopFolder:{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 8, 
          },
          textTopFolder:{ fontSize: 17, color:Colors.white, fontWeight:"bold" },
        viewBottomFolder:{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            columnGap: 8,
          },
          textBottomFolder:{ fontSize: 10, color:Colors.white }
})
export default baseTabsStyle;