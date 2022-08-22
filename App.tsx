import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState,Alert } from 'react-native';
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ThemeProvider } from "styled-components";
import { Theme } from "./constants/Theme";
import { useState, createContext, useEffect } from "react";
import useWebSocket,{resetGlobalState} from "react-use-websocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash"
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
} from "react-native-paper";
// import { useNavigation } from '@react-navigation/native';


export const PriceContext = createContext(
    [{
      E:"",
      P:"",
      c:"",
      e:"",
      p:"",
      s:"",
      v:"",
      w:"",
      m:""
    }],
);

export const PositionContext = createContext(
  [{
    "avgPrice": 0,
    "forceClose": 0,
    "leverage": 0,
    "lossPrice": 0,
    "margin": 0,
    "owner": "",
    "positionId": "",
    "profitAndLoss": 0,
    "profitPrice": 0,
    "quantity": 0,
    "side": "",
    "status": "",
    "symbol": "",
    "type": "",
  }],
);

export const ThreePriceContext = createContext(
  {
    btcPrice:"123",
    btcRate:"",
    btcAmt:"",
    ethPrice:"",
    ethRate:"",
    ethAmt:"",
    dogePrice:"",
    dogeRate:"",
    dogeAmt:""
  }
);

export const OrderContext = createContext(
  {
    data:{
      status:3
    }
  }
);


export default function App() {

  
  const [btcPrice, setBtcPrice] = useState("");
  const [btcRate, setBtcRate] = useState("");
  const [btcAmt, setBtcAmt] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [ethRate, setEthRate] = useState("");
  const [ethAmt, setEthAmt] = useState("");
  const [dogePrice, setDogePrice] = useState("");
  const [dogeRate, setDogeRate] = useState("");
  const [dogeAmt, setDogeAmt] = useState("");
  const [token, setToken] = useState("");
  const [socketUrl, setSocketUrl] = useState("wss://ex-api.usefordemo.com/market/ws/latest");
  const [socketUrl2, setSocketUrl2] = useState("wss://ex-api.usefordemo.com/otc/ws");
  const [socketUrl3, setSocketUrl3] = useState("wss://ex-api.usefordemo.com/ws");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [market,setMarket] = useState([])
  const [position,setPosition] = useState([])
  const [order, setOrder] = useState({data:{status:3}});
  // const navigation = useNavigation();

  const { lastJsonMessage } = useWebSocket(socketUrl,{
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 1000,
  });

  const { lastJsonMessage:lastJsonMessage2,sendJsonMessage } = useWebSocket(socketUrl2, {
    onOpen: () => sendJsonMessage({
      "operation": "subscribe",
      "channel": "otcOrder"
    }),    
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: closeEvent => true,
    queryParams:{token: token}
  });

  const { lastJsonMessage:lastJsonMessage3,sendJsonMessage:sendJsonMessage2 } = useWebSocket(socketUrl3, {
    onOpen: () => sendJsonMessage2({
      "operation": "subscribe",
      "channel": "position"
    }),    
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: closeEvent => true,
    queryParams:{token: token}
  });
  useEffect(async ()=>{
    let token = await AsyncStorage.getItem("token");
    setToken(token!)
  },[])

  useEffect(async() => {
    let token = await AsyncStorage.getItem("token");
    setToken(token!)
    if(!token){
      setPosition([])
    }
    if(lastJsonMessage){
      let gfg = lastJsonMessage.sort(function (a:any, b:any) {
        return parseFloat(a.P) - parseFloat(b.P);
      });
      setMarket(gfg.reverse())
      for(let i = 0;i < lastJsonMessage.length;i++){
        if(lastJsonMessage[i].s === "BNB-USDT"){
          setDogePrice(lastJsonMessage[i].c.slice(0, -4));
          setDogeRate(lastJsonMessage[i].P);
          setDogeAmt(lastJsonMessage[i].v.split(".")[0]);
        }
        if(lastJsonMessage[i].s === "ETH-USDT"){
          setEthPrice(lastJsonMessage[i].c.slice(0, -4));
          setEthRate(lastJsonMessage[i].P);
          setEthAmt(lastJsonMessage[i].v.split(".")[0]);
        }
        if(lastJsonMessage[i].s === "BTC-USDT"){
          setBtcPrice(lastJsonMessage[i].c.slice(0, -4));
          setBtcRate(lastJsonMessage[i].P);
          setBtcAmt(lastJsonMessage[i].v.split(".")[0]);
        }
      }
    }
  },[lastJsonMessage]);
  useEffect(() => {
    if(lastJsonMessage2){
      setOrder(lastJsonMessage2)     
    }

  },[lastJsonMessage2]);
  useEffect(() => {
    console.log(lastJsonMessage3)
    if(lastJsonMessage3){
      setPosition(lastJsonMessage3.data)
    }

  },[lastJsonMessage3]);

  useEffect(()=>{
    if(AppState.currentState == "active"){
      setSocketUrl("wss://ex-api.usefordemo.com/market/ws/latest")
      setSocketUrl2("wss://ex-api.usefordemo.com/otc/ws")
      setSocketUrl3("wss://ex-api.usefordemo.com/ws")
    }else{
      setSocketUrl("wss://")
      setSocketUrl2("wss://")
      setSocketUrl3("wss://")
    }
    // resetGlobalState(socketUrl)
  },[AppState.currentState])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PositionContext.Provider value={position}>
        <OrderContext.Provider value={order}>
        <PriceContext.Provider value={market}>
        <ThreePriceContext.Provider value={  {
            btcPrice:btcPrice,
            btcRate:btcRate,
            btcAmt:btcAmt,
            ethPrice:ethPrice,
            ethRate:ethRate,
            ethAmt:ethAmt,
            dogePrice:dogePrice,
            dogeRate:dogeRate,
            dogeAmt:dogeAmt
        }}>
          <ThemeProvider theme={Theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>
          </ThreePriceContext.Provider>
          </PriceContext.Provider>
          </OrderContext.Provider>
          </PositionContext.Provider>
      </SafeAreaProvider>
    );
  }
}
