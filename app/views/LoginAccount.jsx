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
import styles from "../styles/authStyle"
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
  } = useLoginViewModel(navigation);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <ScrollView>
        <View style={{ padding: 25 }}>
          <Image
            source={require("../../assets/images/logoApp.png")}
            style={styles.imageLogin}
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
          <View style={{
            flexDirection: "row",
            justifyContent: "center", marginTop: 5
          }}>
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

