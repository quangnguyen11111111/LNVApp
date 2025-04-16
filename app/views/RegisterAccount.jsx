import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from "../../constant/Colors";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { useRegisterAccountViewModel } from '../viewmodels/RegisterViewModel';
import styles from "../styles/authStyle"
export default function RegisterAccount({ navigation }) {
  const {
    user,
    error,
    isLoading,
    handleChange,
    handleRegisterAccount,
  } = useRegisterAccountViewModel(navigation);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={{ padding: 30 }}>
          <Image source={require("../../assets/images/logoApp.png")} style={styles.imageRegister} />
          <Text style={styles.textTitle}>Create New Account</Text>

          {/* Các Input */}
          {[
            { label: "Account", field: "userAccount", errorKey: "errorUserAccount" },
            { label: "Password", field: "userPassword", isPassword: true, errorKey: "errorUserPassword" },
            { label: "Name", field: "userName", errorKey: "errorUserName" },
            { label: "Phone", field: "userPhone", errorKey: "errorUserPhone", keyboardType: "phone-pad", maxLength: 10 },
            { label: "Gmail", field: "userGmail", errorKey: "errorUserGmail", keyboardType: "email-address" },
          ].map((item, index) => (
            <View key={index}>
              <FloatingLabelInput
                label={item.label}
                value={user[item.field]}
                onChangeText={(text) => handleChange(item.field, text)}
                isPassword={item.isPassword}
                togglePassword={item.isPassword ? false : undefined}
                keyboardType={item.keyboardType}
                maxLength={item.maxLength}
                inputStyles={styles.input}
                labelStyles={styles.inputText}
                containerStyles={[styles.viewInput, index > 0 && { marginTop: 30 }]}
                customLabelStyles={styles.inputCustomLabel}
              />
              {error[item.errorKey] && <Text style={styles.error}>{error[item.errorKey]}</Text>}
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleRegisterAccount}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.backgroundColor} />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.bottomText}>
            <Text style={{ fontFamily: "outfit", color: Colors.white }}>Already have an account?</Text>
            <Pressable onPress={() => navigation.replace("loginAccount")}>
              {({ pressed }) => (
                <Text style={{ color: pressed ? Colors.white : Colors.primary }}>Sign In Here</Text>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
