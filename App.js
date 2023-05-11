import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import AuthUserProvider, { AuthUserContext } from "./context/Auth";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator defaultScreenOptions={Home}>
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user } = useContext(AuthUserContext);

  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthUserProvider>
      <RootNavigator />
    </AuthUserProvider>
  );
};

export default App;
