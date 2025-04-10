import { useFonts } from "expo-font";
import { Text, StatusBar,TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Colors from "../constant/Colors";
import StartApp from "./StartApp";
import LoginAccount from "./views/LoginAccount";
import RegisterAccount from "./views/RegisterAccount";
import Toast from "react-native-toast-message";
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Hiển thị màn hình loading nếu font chưa load xong
  }

  // Áp dụng font chữ mặc định cho toàn bộ ứng dụng
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "outfit", color: Colors.white };
  TextInput.defaultProps = Text.defaultProps || {};
  TextInput.defaultProps.style = { fontFamily: "outfit", color: Colors.white };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="startApp"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.backgroundColor },
          }}
        >
          <Stack.Screen name="startApp" component={StartApp} />
          <Stack.Screen name="auth" component={AuthNavigation}/>
        </Stack.Navigator>
        </NavigationContainer>
      <Toast />
      <StatusBar barStyle="light-content" backgroundColor={Colors.backgroundColor} />
    </Provider>
  );
}
const AuthNavigation = ()=>{
  return(
    <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.backgroundColor },
          }} >
            <Stack.Screen name="loginAccount" component={LoginAccount} />
            <Stack.Screen name="registerAccount" component={RegisterAccount} />
          </Stack.Navigator>
  )
}