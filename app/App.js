import { useFonts } from "expo-font";
import { Text, StatusBar, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Colors from "../constant/Colors";
//Khai báo đường dẫn
import StartApp from "./StartApp";
import LoginAccount from "./views/LoginAccount";
import RegisterAccount from "./views/RegisterAccount";
import Home from "./views/(tabs)/home";
import Profile from "./views/(tabs)/profile";
import AddModal from "./views/(tabs)/add";
import AddNewCourse from "./views/addNew/AddNewCourse";
import AddNewLesson from "./views/addNew/AddNewLesson";
// import Course from "./views/(tabs)/course";
import CourseDetail from "./views/(tabs)/course/courseDetail";
import LessonDetail from "./views/(tabs)/course/lessonDetail";
import CourseOther from "./views/(tabs)/courseOther";
//
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Color from "../constant/Colors";
import { FontAwesome, Ionicons, FontAwesome6, Entypo } from "@expo/vector-icons";
import { useState } from "react";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App({ navigation }) {
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
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
          initialRouteName="tabs"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: Colors.backgroundColor },
          }}
        >
          <Stack.Screen name="startApp" component={StartApp} />
          <Stack.Screen name="auth" component={AuthNavigation} />
          <Stack.Screen name="tabs" component={Tabs} />
          <Stack.Screen name="addNew" component={AddNew} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundColor}
      />
    </Provider>
  );
}
// auth
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.backgroundColor },
      }}
    >
      <Stack.Screen name="loginAccount" component={LoginAccount} />
      <Stack.Screen name="registerAccount" component={RegisterAccount} />
    </Stack.Navigator>
  );
};
// tabs navigation
const Tabs = () => {
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const openModal = () => setAddModalVisible(true);
  const closeModal = () => setAddModalVisible(false);

  const EmptyScreen = () => null;
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "home") {
              iconName = "home";
              size += 8;
            } else if (route.name === "add") {
              iconName = "plus-square-o";
              size += 15;
            } else if (route.name === "profile") {
              iconName = focused ? "user" : "user-o";
            }
            if (route.name === "add") {
              return (
                <Ionicons
                  name="add-circle-outline"
                  size={size + 15}
                  color={color}
                  style={{
                    height: 50,
                    width: 50,
                    textAlign: "center",
                  }}
                />
              );
            } else if (route.name === "course") {
              return (
                <FontAwesome6
                  name="book-open"
                  size={size + 5}
                  color={color}
                  style={{
                    height: 50,
                    width: 50,
                    textAlign: "center",
                    marginTop: 35,
                  }}
                />
              );
            } 
            else if (route.name === "courseOther") {
              return (
                <Entypo name="network" size={size + 8} color={color} style={{
                  height: 50,
                  width: 50,
                  textAlign: "center",
                  marginTop: 30,
                }} />
              );
            }
            else
              return (
                <FontAwesome
                  name={iconName}
                  size={size + 5}
                  color={color}
                  style={{
                    height: 50,
                    width: 50,
                    textAlign: "center",
                    marginTop: 25,
                  }}
                />
              );
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: Color.backgroundButton,
          tabBarInactiveTintColor: Color.white,
          tabBarStyle: {
            backgroundColor: Color.backgroundColor,
            height: 60,
            paddingBottom: 10,
            paddingTop: 2,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen name="course" component={Course} />
        <Tab.Screen
          name="add"
          component={EmptyScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              openModal();
            },
          }}
        />
        <Tab.Screen name="courseOther" component={CourseOther}/>
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
      <AddModal visible={isAddModalVisible} onClose={closeModal} />
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.backgroundFlower}
      />
    </>
  );
};
// add new
const AddNew = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.backgroundColor },
        }}
      >
        <Stack.Screen name="addNewCourse" component={AddNewCourse} />
        <Stack.Screen name="addNewLesson" component={AddNewLesson} />
      </Stack.Navigator>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundColor}
      />
    </>
  );
};
//course
const Course = () => {
  return (
    <>
    <Stack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="courseDetail" component={CourseDetail} />
      <Stack.Screen name="lessonDetail" component={LessonDetail} />
    </Stack.Navigator>
    <StatusBar
    barStyle="dark-content"
    backgroundColor={Colors.backgroundColor}
  />
  </>
  );
};
