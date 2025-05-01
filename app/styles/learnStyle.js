import { StyleSheet } from "react-native";
import Colors from "../../constant/Colors"
const learnStyle = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: Colors.backgroundColor,

    },
    content: {
        display: 'flex',
        justifyContent: 'center',
      },
      quizContainer: {
        alignItems: 'flex-start',
        gap: 16,
      },
      option: {
        backgroundColor:Colors.itemColor,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1.3,
        borderColor: "gray",
      },
      correct: {
        borderWidth: 4,
       borderColor:Colors.backgroundButton
      },
      optionText: {
        fontSize: 18,
      },
      input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        fontSize: 18,
      },
      submitBtn: {
        backgroundColor: Colors.red,
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 12,
      },
      incorrect:{
        borderColor: Colors.red,
        borderWidth: 4,
      },
      viewprogress:{
        height: 10,
        width: '68%',
        backgroundColor: '#ddd',
        borderRadius: 10,
        // overflow: 'hidden',
      },
      progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 10,
      },
      questionText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        marginTop: 20,
        borderWidth:0.1,
        borderColor:"gray",
        borderRadius:10,
        padding:10,
      },
      viewHeaderProgress:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        gap:10,
      },
      textProgress:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        width: 45,
        textAlign: 'center',
        borderWidth:1,
        borderColor:Colors.primary,
        borderRadius:10,
        
      },
      message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        textAlign: 'center',
        color: Colors.red,
      },
      question:{
        color:Colors.white,
        fontSize:18,
        fontWeight:'bold',
        marginTop:20
      },
      textCompletePart:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
        color: Colors.white,
      },
      textLanguage:{
        color:Colors.backgroundButton,
        borderWidth:0.1,
        borderColor:"gray",
        borderRadius:10,
        padding:10,
        width:"100%",
      }
})
export default learnStyle;