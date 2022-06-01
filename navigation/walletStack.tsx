import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import WalletScreen from "../screens/wallet/Wallet";
import RechargeScreen from "../screens/wallet/Recharge"
import WithdrawScreen from "../screens/wallet/Withdraw"
import FundsScreen from "../screens/wallet/Funds"
import HistoryScreen from "../screens/wallet/History"
import StopPositionScreen from "../screens/trade/StopPosition"
import styled from "styled-components";
import { Image, TouchableOpacity, Text } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const CancelButton = styled(Image)`
  width:28px;
  height:28px;
`;

const WalletStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="Recharge" component={RechargeScreen} />
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="Funds" component={FundsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Group>    
      <Stack.Group screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <CancelButton source={require("../assets/images/global/cancel.png")} />
          </TouchableOpacity>
        ),
        title: '止盈/止損',
        headerStyle: { backgroundColor: '#18222D' },
      })}>
        <Stack.Screen name="StopPositionScreen" component={StopPositionScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WalletStack;
