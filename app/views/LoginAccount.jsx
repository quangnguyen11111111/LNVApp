// src/screens/LoginAccount.tsx
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Button
} from "react-native";
import Colors from "../../constant/Colors";
import React from "react";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useLoginViewModel } from "../viewmodels/LoginViewModel";

export default function LoginAccount({ navigation }) {
  const {
    userAccount,
    setUserAccount,
    userPassword,
    setUserPassword,
    handleLogin,
    accountInputRef,
    passwordInputRef,
    isLoading,
    onLogoutPress,
    onGoogleButtonPress,
    GoogleSigninButton
  } = useLoginViewModel();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <ScrollView>
        <View style={{ padding: 25 }}>
          <Image
            source={require("../../assets/images/logoApp.png")}
            style={styles.image}
          />
          <Text style={styles.textTitle}>Wellcome Back</Text>

          <FloatingLabelInput
            ref={accountInputRef}
            label="Account"
            value={userAccount}
            onChangeText={setUserAccount}
            inputStyles={styles.input}
            labelStyles={styles.inputText}
            containerStyles={styles.viewInput}
            customLabelStyles={styles.inputCustomLabel}
          />

          <FloatingLabelInput
            ref={passwordInputRef}
            label="Password"
            value={userPassword}
            onChangeText={setUserPassword}
            isPassword
            togglePassword={false}
            inputStyles={styles.input}
            labelStyles={styles.inputText}
            containerStyles={[styles.viewInput, { marginTop: 20 }]}
            customLabelStyles={styles.inputCustomLabel}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.backgroundColor} />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>
          <View style={{flexDirection: "row",
    justifyContent: "center",marginTop:5}}>
            <Text style={{ fontFamily: "outfit", color: Colors.white }}>
              Or login with: 
            </Text>
          </View>
          <GoogleSigninButton
  style={styles.googleButton}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={onGoogleButtonPress}
/>

          <View style={styles.bottomText}>
            <Text style={{ fontFamily: "outfit", color: Colors.white }}>
              Don't have an account ?
            </Text>
            <Pressable onPress={() => navigation.replace("registerAccount")}>
              {({ pressed }) => (
                <Text style={{ color: pressed ? Colors.white : Colors.primary }}>
                  Create New Here
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "70%",
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: "10%",
  },
  textTitle: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 30,
    marginBottom: 30,
    fontFamily: "outfit-bold",
  },
  input: {
    color: Colors.white,
    outlineWidth: 0,
    fontSize: 18,
    height:"100%"
  },
  viewInput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  inputText: {
    color: Colors.white,
    backgroundColor: Colors.backgroundColor,
  },
  inputCustomLabel: {
    topFocused: -30, // Dịch label lên cao hơn khi focus
    fontSizeFocused: 14,
    fontSizeBlurred: 16,
    colorFocused: Colors.label,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.backgroundButton,
    marginTop: 20,
    borderRadius: 8,
    elevation: 5,
    justifyContent:"center"
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: "outfit-bold",
    textAlign:"center"
  },
  bottomText: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 15,
  },
  googleButton: {
    width: "100%",
    height: 60,
    alignSelf: 'center'
  }
});
