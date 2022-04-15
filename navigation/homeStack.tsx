import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import HomeScreen from "../screens/home/Home";
import Login from "../screens/home/Login";
import Member from "../screens/home/Member";
import Register from "../screens/home/Register";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Member" component={Member} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeStack;
