import React, { useState, useContext } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import { AuthenticatedUserContext } from "../App";
import axios from "axios";

export default function Signup({ navigation }) {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <Formik
        initialValues={{
          fn: "",
          ln: "",
          email: "",
          pwd: "",
          cpwd: "",
        }}
        onSubmit={async (values) => {
          await axios
            .post("http://localhost:8080/api/users", {
              first_name: values.fn,
              last_name: values.ln,
              password: values.pwd,
              email: values.email,
            })
            .then((r) => {
              console.log("Sign up successful", r.data);
              navigation.navigate("Login");
            })
            .catch((err) => console.log(err));
          // setUser({ email: values.email });
        }}
        validationSchema={yup.object().shape({
          fn: yup.string().min(2).required("First name is required"),
          ln: yup.string().min(2).required("Last name is required"),
          email: yup
            .string()
            .email("Email must be valid")
            .required("Email is required"),
          pwd: yup.string().min(8).required("Password is required"),
          cpwd: yup
            .string()
            .min(8)
            .required("Confirm password is required")
            .test("passwords-match", "Passwords must match", function (p) {
              return this.parent.pwd === p;
            }),
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
            {/* <Text style={styles.title}>Sign Up</Text> */}
            {touched.fn && errors.fn && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.fn}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              autoCapitalize="words"
              keyboardType="default"
              textContentType="username"
              value={values.fn}
              onChangeText={handleChange("fn")}
              onBlur={() => setFieldTouched("fn")}
            />

            {touched.ln && errors.ln && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.ln}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCapitalize="words"
              keyboardType="default"
              textContentType="username"
              value={values.ln}
              onChangeText={handleChange("ln")}
              onBlur={() => setFieldTouched("ln")}
            />

            {touched.email && errors.email && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.email}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
            />

            {touched.pwd && errors.pwd && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.pwd}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={values.pwd}
              onChangeText={handleChange("pwd")}
              onBlur={() => setFieldTouched("pwd")}
            />

            {touched.cpwd && errors.cpwd && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.cpwd}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={values.cpwd}
              onChangeText={handleChange("cpwd")}
              onBlur={() => setFieldTouched("cpwd")}
            />
            <TouchableOpacity
              style={styles.button}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
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
                <Text
                  style={{ color: "#576CBC", fontWeight: "600", fontSize: 14 }}
                >
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
