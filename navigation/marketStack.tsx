import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import MarketScreen from "../screens/market/Market";
import MarketTradeScreen from "../screens/market/AllTrade";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MarketStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MarketScreen" component={MarketScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="MarketTradeScreen" component={MarketTradeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MarketStack;
