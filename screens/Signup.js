import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Divider } from "@rneui/themed";
const backImage = require("../assets/backImage.jpeg");
import { Ionicons } from "@expo/vector-icons";

export default function Signup({ navigation }) {
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [cpwd, setCpwd] = useState("");

  const onHandleSignup = () => {};

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        {/* <Text style={styles.title}>Sign Up</Text> */}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="words"
          keyboardType="default"
          textContentType="username"
          autoFocus={true}
          value={fn}
          onChangeText={(text) => setFn(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="words"
          keyboardType="default"
          textContentType="username"
          autoFocus={true}
          value={ln}
          onChangeText={(text) => setLn(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={pwd}
          onChangeText={(text) => setPwd(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={cpwd}
          onChangeText={(text) => setCpwd(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#576CBC", fontWeight: "600", fontSize: 14 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}>
          <Divider insetType="middle" />
          <Text>or sign up with</Text>
          <Divider inset={true} insetType="middle" />
        </View>
        <View style={styles.socialIcons}>
          <Ionicons name="logo-apple" size={48} color="black" />
          <Ionicons name="logo-google" size={40} color="black" />
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#576CBC",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "90%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  form: {
    marginTop: "auto",
    marginBottom: 0,
    justifyContent: "center",
    height: "90%",
    width: "80%",
    paddingTop: 20,
  },
  button: {
    backgroundColor: "#576CBC",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  separator: {
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2em",
  },
  socialIcons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "1em",
  },
});
