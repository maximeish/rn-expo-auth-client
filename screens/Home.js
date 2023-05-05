import React, { useEffect, useContext } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { AuthenticatedUserContext } from "../App";
import { Formik } from "formik";
import * as yup from "yup";

const Home = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="logout"
          size={24}
          color="black"
          style={{ marginRight: 15 }}
          onPress={() => setUser(null)}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          pwd: "",
          cpwd: "",
        }}
        onSubmit={(values) => {
          if (values.email.length !== 0 || values.pwd.length !== 0) {
            setUser({ email: values.email });
          } else {
            console.log("At least one field needs to be updated");
          }
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email(),
          pwd: yup.string().min(6),
          cpwd: yup
            .string()
            .min(6)
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
            <Text style={styles.title}>Welcome</Text>
            {touched.email && errors.email && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.email}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Update email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={true}
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
              placeholder="Update password"
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
                Update
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
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

  form: {
    marginHorizontal: "auto",
    justifyContent: "center",
    height: "100%",
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
});
