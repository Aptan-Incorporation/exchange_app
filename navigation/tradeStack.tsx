import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import TradeScreen from "../screens/trade/Trade"

const Stack = createNativeStackNavigator<RootStackParamList>();

const TradeStack = () => {
    return(
        <Stack.Navigator>
           <Stack.Screen name="TradeScreen" component={TradeScreen}/>
        </Stack.Navigator>
    )
}

export default TradeStack