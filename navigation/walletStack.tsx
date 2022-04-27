import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import WalletScreen from "../screens/wallet/Wallet";

const Stack = createNativeStackNavigator<RootStackParamList>();

const WalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WalletStack;
