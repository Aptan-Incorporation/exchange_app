/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image,Alert,View,Text} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeStack from './homeStack';
import MarketStack from './marketStack';
import WalletStack from './walletStack';
import C2cStack from './c2cStack';
import TradeStack from './tradeStack';
import styled from "styled-components"
import Member from "../screens/home/Member";
import Register from "../screens/home/Register";
import EmailVerify from "../screens/home/EmailVerify";
import Setting from "../screens/home/Setting";
import PhoneVerify from "../screens/home/PhoneVerify";
import PhoneInput from "../screens/home/PhoneInput";
import GoogleVerifyStep1 from "../screens/home/GoogleVerifyStep1";
import GoogleVerifyStep2 from "../screens/home/GoogleVerifyStep2";
import GoogleVerifyStep3 from "../screens/home/GoogleVerifyStep3";
import FundPassword from "../screens/home/FundPassword";
import ResetFundPassword from "../screens/home/ResetFundPassword";
import IdentityVerifyStep1 from "../screens/home/IdentityVerifyStep1";
import IdentityVerifyStep2 from "../screens/home/IdentityVerifyStep2";
import Payments from '../screens/home/Payments';
import PaymentsCreate from '../screens/home/PaymentsCreate';
import Advertisement from '../screens/home/Advertisement';
import AdvertisementEdit from '../screens/home/AdvertisementEdit';
import C2cCreateScreen from '../screens/c2c/C2cCreate';
import Web from "../screens/home/Web";
import Consult from "../screens/home/Consult";
import C2c from "../screens/home/C2c";
import C2cMember from "../screens/home/C2cMember";
import C2cApply from "../screens/home/C2cApply";
import C2cNotification from "../screens/home/C2cNotification";
import C2cHelp from "../screens/home/C2cHelp";
import EditName from "../screens/home/EditName";
import Rebate from "../screens/home/Rebate";
import {useEffect,useContext} from "react"
import { OrderContext } from "../App" 
import { useNavigation } from '@react-navigation/native';
import ForgotPassword from "../screens/home/ForgotPassword";
import ResetPassword from "../screens/home/ResetPassword";
import ResetGoogle from "../screens/home/ResetGoogle";
import Announcement from "../screens/home/Announcement";
import AnnouncementDetail from "../screens/home/AnnouncementDetail";
import AllLanguage from "../screens/home/AllLanguage";
import HelpCenter from "../screens/home/HelpCenter";
import HelpCenterEn from "../screens/home/HelpCenterEn";
import HelpDetail from "../screens/home/HelpDetail";
import { useTranslation } from "react-i18next";

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
  const context = useContext(OrderContext)
  const navigation = useNavigation();
  
  useEffect(()=>{
    // console.log(context)

    if(context.data){
      // Alert.alert(
      //   "訂單更新",
      //   "您有一筆訂單狀態更新，是否前往查看？",
      //   [
      //       {
      //           text: "取消",
      //           onPress: () => console.log("Cancel Pressed"),
      //           style: "cancel"
      //       },
      //       { text: "確定", onPress: () => { 
      //           navigation.navigate("C2cHistoryScreen")
      //       }}
      //   ]
      // );
    }
  },[context])

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="Member" component={Member} options={{ headerShown: false }} />
      <Stack.Screen name="Rebate" component={Rebate} options={{ headerShown: false }} />
      <Stack.Screen name="C2c" component={C2c} options={{ headerShown: false }} />
      <Stack.Screen name="C2cMember" component={C2cMember} options={{ headerShown: false }} />
      <Stack.Screen name="C2cApply" component={C2cApply} options={{ headerShown: false }} />
      <Stack.Screen name="C2cNotification" component={C2cNotification} options={{ headerShown: false }} />
      <Stack.Screen name="C2cHelp" component={C2cHelp} options={{ headerShown: false }} />
      <Stack.Screen name="EditName" component={EditName} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
      <Stack.Screen name="PhoneVerify" component={PhoneVerify} options={{ headerShown: false }} />
      <Stack.Screen name="PhoneInput" component={PhoneInput} options={{ headerShown: false }} />
      <Stack.Screen name="GoogleVerifyStep1" component={GoogleVerifyStep1} options={{ headerShown: false }} />
      <Stack.Screen name="GoogleVerifyStep2" component={GoogleVerifyStep2} options={{ headerShown: false }} />
      <Stack.Screen name="GoogleVerifyStep3" component={GoogleVerifyStep3} options={{ headerShown: false }} />
      <Stack.Screen name="FundPassword" component={FundPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ResetFundPassword" component={ResetFundPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="Announcement" component={Announcement} options={{ headerShown: false }} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} options={{ headerShown: false }} />
      <Stack.Screen name="ResetGoogle" component={ResetGoogle} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="EmailVerify" component={EmailVerify} options={{ headerShown: false }} />
      <Stack.Screen name="IdentityVerifyStep1" component={IdentityVerifyStep1} options={{ headerShown: false }} />
      <Stack.Screen name="IdentityVerifyStep2" component={IdentityVerifyStep2} options={{ headerShown: false }} />
      <Stack.Screen name="Payments" component={Payments} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentsCreate" component={PaymentsCreate} options={{ headerShown: false }} />
      <Stack.Screen name="Advertisement" component={Advertisement} options={{ headerShown: false }} />
      <Stack.Screen name="AdvertisementEdit" component={AdvertisementEdit} options={{ headerShown: false }} />
      <Stack.Screen name="C2cCreateScreen" component={C2cCreateScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Web" component={Web} options={{ headerShown: false }} />
      <Stack.Screen name="Consult" component={Consult} options={{ headerShown: false }} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} options={{ headerShown: false }} />
      <Stack.Screen name="HelpCenterEn" component={HelpCenterEn} options={{ headerShown: false }} />
      <Stack.Screen name="HelpDetail" component={HelpDetail} options={{ headerShown: false }} />
      <Stack.Group screenOptions={{ presentation: 'modal',headerShown: false }}>
      <Stack.Screen name="Modal" component={ModalScreen} />
      <Stack.Screen name="AllLanguage" component={AllLanguage} />
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
  width:31px;
  height:28px;
  margin-top:20px;
`

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { backgroundColor: "#242D37" }
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStack}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/home-blue.png")} />
              <Text style={{fontSize:10,color:"#6699CC"}}>{t("home")}</Text>
            </View> : <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/home-gray.png")} />
              <Text style={{fontSize:10,color:"#8D97A2"}}>{t("home")}</Text>
            </View> 
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
            focused ? <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Icon source={require("../assets/images/global/market-blue.png")} />
            <Text style={{fontSize:10,color:"#6699CC"}}>{t("market")}</Text>
          </View> : <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/market-gray.png")} />
              <Text style={{fontSize:10,color:"#8D97A2"}}>{t("market")}</Text>
            </View>
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
            focused ? <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Icon source={require("../assets/images/global/trade-blue.png")} />
            <Text style={{fontSize:10,color:"#6699CC"}}>{t("trade")}</Text>
          </View>  : <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/trade-gray.png")} />
              <Text style={{fontSize:10,color:"#8D97A2"}}>{t("trade")}</Text>
            </View>
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
            focused ? <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Icon source={require("../assets/images/global/c2c-blue.png")} />
            <Text style={{fontSize:10,color:"#6699CC"}}>C2C</Text>
          </View> : <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/c2c-gray.png")} />
              <Text style={{fontSize:10,color:"#8D97A2"}}>C2C</Text>
            </View>
          ),
          headerShown: false
        })}
      />
      <BottomTab.Screen
        name="Wallet"
        component={WalletStack}
        options={({ navigation }: RootTabScreenProps<"Wallet">) => ({
          title: "",
          tabBarIcon: ({ focused }) => (
            focused ? <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Icon source={require("../assets/images/global/wallet-blue.png")} />
            <Text style={{fontSize:10,color:"#6699CC"}}>{t("fund")}</Text>
          </View>  : <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <Icon source={require("../assets/images/global/wallet-gray.png")} />
              <Text style={{fontSize:10,color:"#8D97A2"}}>{t("fund")}</Text>
            </View>
          ),
          headerShown: false
        })}
      />
    </BottomTab.Navigator>
  );
}
