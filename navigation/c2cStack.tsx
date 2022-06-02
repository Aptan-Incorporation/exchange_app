import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import C2cScreen from "../screens/c2c/C2c";
import C2cBuyScreen from "../screens/c2c/C2cBuy"
import C2cSellScreen from "../screens/c2c/C2cSell";
import C2cCreateScreen from "../screens/c2c/C2cCreate";
import C2cHistoryScreen from "../screens/c2c/C2cHistory";

const Stack = createNativeStackNavigator<RootStackParamList>();

const C2cStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="C2cScreen" component={C2cScreen} />
        <Stack.Screen name="C2cBuyScreen" component={C2cBuyScreen} />
        <Stack.Screen name="C2cSellScreen" component={C2cSellScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="C2cHistoryScreen" component={C2cHistoryScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="C2cCreateScreen" component={C2cCreateScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default C2cStack;
