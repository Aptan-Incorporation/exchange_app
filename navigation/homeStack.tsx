import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import HomeScreen from "../screens/home/Home"

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
    return(
        <Stack.Navigator>
           <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack