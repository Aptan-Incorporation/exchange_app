import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState } from 'react-native';
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
  const [socketUrl, setSocketUrl] = useState("wss://market.usefordemo.com/latest");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [market,setMarket] = useState([])

  const { lastJsonMessage } = useWebSocket(socketUrl,{
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 1000,
  });

  // const socketUrl2 =
  // "wss://ex-api.usefordemo.com/ws";
  // const { lastJsonMessage:lastJsonMessage2,sendMessage } = useWebSocket(socketUrl2, {
  //   // onOpen: () => console.log("opened"),
  //   //Will attempt to reconnect on all close events, such as server shutting down
  //   shouldReconnect: closeEvent => true,
  //   queryParams:{token:"Bearer " +token}
  // });
  // useEffect(async ()=>{
  //   let token = await AsyncStorage.getItem("token");
  //   setToken(token!)
  // },[])

  useEffect(() => {
    if(lastJsonMessage){
      let gfg = lastJsonMessage.sort(function (a:any, b:any) {
        return parseFloat(a.c) - parseFloat(b.c);
      });
      setMarket(gfg.reverse())
      for(let i = 0;i < lastJsonMessage.length;i++){
        if(lastJsonMessage[i].s === "BNBUSDT"){
          setDogePrice(lastJsonMessage[i].c.slice(0, -4));
          setDogeRate(lastJsonMessage[i].P);
          setDogeAmt(lastJsonMessage[i].v.split(".")[0]);
        }
        if(lastJsonMessage[i].s === "ETHUSDT"){
          setEthPrice(lastJsonMessage[i].c.slice(0, -4));
          setEthRate(lastJsonMessage[i].P);
          setEthAmt(lastJsonMessage[i].v.split(".")[0]);
        }
        if(lastJsonMessage[i].s === "BTCUSDT"){
          setBtcPrice(lastJsonMessage[i].c.slice(0, -4));
          setBtcRate(lastJsonMessage[i].P);
          setBtcAmt(lastJsonMessage[i].v.split(".")[0]);
        }
      }
    }
    // for(let i = 0;i < lastJsonMessage.length;i++){
    //   if(lastJsonMessage[i].x === "BTCUSET"){
    //       setBtcPrice(lastJsonMessage.data.c.slice(0, -6));
    //       setBtcRate(lastJsonMessage.data.P);
    //       setBtcAmt(lastJsonMessage.data.v.split(".")[0]);
    //   }
    // }
  },[lastJsonMessage]);

  useEffect(()=>{
    if(AppState.currentState == "active"){
      setSocketUrl("wss://market.usefordemo.com/latest")
    }else{
      setSocketUrl("wss://")
    }
    // resetGlobalState(socketUrl)
  },[AppState.currentState])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    );
  }
}
