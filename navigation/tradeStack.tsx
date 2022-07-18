import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import TradeScreen from "../screens/trade/Trade";
import StopPositionScreen from "../screens/trade/StopPosition"
import HistoryScreen from '../screens/trade/History'
import { Image, TouchableOpacity, Text } from "react-native";
import styled from "styled-components";
import AllTradeScreen from "../screens/trade/AllTrade";
const CancelButton = styled(Image)`
  width:28px;
  height:28px;
`;

const PreviousButton = styled(Image)`
  width:28px;
  height:28px;
`;

const Stack = createNativeStackNavigator<RootStackParamList>();

const TradeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TradeScreen" component={TradeScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
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
      <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="AllTradeScreen" component={AllTradeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TradeStack;
