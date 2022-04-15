/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeStack from './homeStack';
import MarketStack from './marketStack';
import ProfileStack from './profileStack';
import C2cStack from './c2cStack';
import TradeStack from './tradeStack';
import styled from "styled-components"

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const Icon = styled(Image)`
  width:75px;
  height:49px;
  margin-top:20px;
`

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle:{backgroundColor:"#242D37"}
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <Icon source={require("../assets/images/global/home-blue.png")} /> : <Icon source={require("../assets/images/global/home-gray.png")} />
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Market"
        component={MarketStack}
        options={({ navigation }: RootTabScreenProps<"Market">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <Icon source={require("../assets/images/global/market-blue.png")} /> : <Icon source={require("../assets/images/global/market-gray.png")} />
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Trade"
        component={TradeStack}
        options={({ navigation }: RootTabScreenProps<"Trade">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <Icon source={require("../assets/images/global/trade-blue.png")} /> : <Icon source={require("../assets/images/global/trade-gray.png")} />
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="C2c"
        component={C2cStack}
        options={({ navigation }: RootTabScreenProps<"C2c">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <Icon source={require("../assets/images/global/c2c-blue.png")} /> : <Icon source={require("../assets/images/global/c2c-gray.png")} />
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ navigation }: RootTabScreenProps<"Profile">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <Icon source={require("../assets/images/global/wallet-blue.png")} /> : <Icon source={require("../assets/images/global/wallet-gray.png")} />
          ),
          headerShown: false
        })}
      />
    </BottomTab.Navigator>
  );
}
