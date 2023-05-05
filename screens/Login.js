import React, { useContext, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { validateLogin } from "../lib/util";
import { AuthenticatedUserContext } from "../App";
import { Formik } from "formik";
import * as yup from "yup";
const backImage = require("../assets/backImage2.jpg");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const onHandleLogin = () => {
    const valid = validateLogin(email, password);
    setUser({ fn: "test" });
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => setUser({ email: values.email })}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email("Email must be valid")
            .required("Email is required"),
          password: yup.string().min(6).required("Password is required"),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Sign In</Text>
            {touched.email && errors.email && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.email}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
            />

            {touched.password && errors.password && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.password}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
            />

            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              {/* <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Log In
          </Text> */}
              <AntDesign name="login" size={24} color="white" />
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
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}>
              <Divider insetType="middle" />
              <Text>or sign in with</Text>
              <Divider />
            </View>
            <View style={styles.socialIcons}>
              <Ionicons name="logo-apple" size={48} color="black" />
              <Ionicons name="logo-google" size={40} color="black" />
            </View>
          </SafeAreaView>
        )}
      </Formik>
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
    color: "orange",
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
    height: "75%",
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
    height: "75%",
    width: "80%",
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
    marginTop: "2em",
  },
});
