import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import C2cScreen from "../screens/c2c/C2c"

const Stack = createNativeStackNavigator<RootStackParamList>();

const C2cStack = () => {
    return(
        <Stack.Navigator>
           <Stack.Screen name="C2cScreen" component={C2cScreen}/>
        </Stack.Navigator>
    )
}

export default C2cStack