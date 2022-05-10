import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import WalletScreen from "../screens/wallet/Wallet";
import RechargeScreen from "../screens/wallet/Recharge"
import WithdrawScreen from "../screens/wallet/Withdraw"
import FundsScreen from "../screens/wallet/Funds"

const Stack = createNativeStackNavigator<RootStackParamList>();

const WalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="Recharge" component={RechargeScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="Funds" component={FundsScreen} />
      </Stack.Group>    
    </Stack.Navigator>
  );
};

export default WalletStack;
