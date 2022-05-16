/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  HomeScreen:undefined;
  MarketScreen:undefined;
  TradeScreen:undefined;
  StopPositionScreen:undefined;
  HistoryScreen:undefined;
  C2cScreen:{
    Id: string,
    CryptoAsset: string,
    fiatCurrency: string,
    Owner: string,
    Account: string,
    SuccessRate: number,
    AvailableNum: string,
    LimitFrom: string,
    LimitTo: string,
    Price: string,
    payTypeAccount: boolean,
    payTypeTouchnGo: boolean,
    payTypePpay: boolean
  };
  C2cBuyScreen: undefined;
  C2cSellScreen: undefined;
  C2cHistoryScreen: undefined;
  ProfileScreen:undefined;
  WalletScreen:undefined;
  Login:undefined;
  Member:undefined;
  Register:undefined;
  EmailVerify:undefined;
  Recharge:undefined;
  Withdraw:undefined;
  Funds:undefined;
  History:undefined;
  Setting:undefined;
  PhoneVerify:undefined;
  PhoneInput:undefined;
  GoogleVerifyStep1:undefined;
  GoogleVerifyStep2:undefined;
  GoogleVerifyStep3:undefined;
  IdentityVerifyStep1:undefined;
  IdentityVerifyStep2:undefined;
  FundPassword:undefined;
  Web:undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Home:undefined;
  Market:undefined;
  Trade:undefined;
  C2c:undefined;
  Wallet:undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
