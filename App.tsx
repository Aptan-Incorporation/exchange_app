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
import { Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import "./local/i18n"

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

export const PriceContext2 = createContext(
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

export const FutureContext = createContext(
  [{
    "orderId": "",
    "investor": "",
    "symbol": "",
    "origQty": 0,
    "avgPrice": 0,
    "cumQty": 0,
    "executedQty": 0,
    "price": 0,
    "stopPrice": 0,
    "side": "",
    "status": "",
    "type": "",
    "positionSide": "",
    "leverage": 0,
    "createdDate": 0
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
  const [market2,setMarket2] = useState([])
  const [position,setPosition] = useState([])
  const [future,setFuture] = useState([])
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
    onClose: () => console.log('close'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: closeEvent => true,
    queryParams:{token: token}
  });

  const { lastJsonMessage:lastJsonMessage3,sendJsonMessage:sendJsonMessage2 } = useWebSocket(socketUrl3, {
    onOpen: () => {
      sendJsonMessage2({
        "operation": "subscribe",
        "channel": "position"
      })
      sendJsonMessage2({
        "operation": "subscribe",
        "channel": "future"
      })
    },    
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
      setFuture([])
    }
    if(lastJsonMessage){
      let gfg = lastJsonMessage.sort(function (a:any, b:any) {
        return parseFloat(a.P) - parseFloat(b.P);
      });
      setMarket(gfg.reverse())
      setMarket2(gfg)
      const bnb = _.find(lastJsonMessage, function(o) { return o.s == "BNB-USDT" })
      const eth = _.find(lastJsonMessage, function(o) { return o.s == "ETH-USDT" })
      const btc = _.find(lastJsonMessage, function(o) { return o.s == "BTC-USDT" })
      setDogePrice((parseFloat(bnb.c) < 0.006 && parseFloat(bnb.c) > 0) ? bnb.c : (parseFloat(bnb.c) < 0.1 && parseFloat(bnb.c) > 0.006)  ? bnb.c.slice(0, -1) : (parseFloat(bnb.c) < 1 && parseFloat(bnb.c) > 0.1) ?bnb.c.slice(0, -2): (parseFloat(bnb.c) < 50 && parseFloat(bnb.c) > 1) ?bnb.c.slice(0, -3) : bnb.c.slice(0, -4));
      setDogeRate(bnb.P);
      setDogeAmt(bnb.v.split(".")[0]);
      setEthPrice((parseFloat(eth.c) < 0.006 && parseFloat(eth.c) > 0) ? eth.c : (parseFloat(eth.c) < 0.1 && parseFloat(eth.c) > 0.006)  ? eth.c.slice(0, -1) : (parseFloat(eth.c) < 1 && parseFloat(eth.c) > 0.1) ?eth.c.slice(0, -2): (parseFloat(eth.c) < 50 && parseFloat(eth.c) > 1) ?eth.c.slice(0, -3) : eth.c.slice(0, -4));
      setEthRate(eth.P);
      setEthAmt(eth.v.split(".")[0]);
      setBtcPrice((parseFloat(btc.c) < 0.006 && parseFloat(btc.c) > 0) ? btc.c : (parseFloat(btc.c) < 0.1 && parseFloat(btc.c) > 0.006)  ? btc.c.slice(0, -1) : (parseFloat(btc.c) < 1 && parseFloat(btc.c) > 0.1) ?btc.c.slice(0, -2): (parseFloat(btc.c) < 50 && parseFloat(btc.c) > 1) ?btc.c.slice(0, -3) : btc.c.slice(0, -4));
      setBtcRate(btc.P);
      setBtcAmt(btc.v.split(".")[0]);
      // for(let i = 0;i < lastJsonMessage.length;i++){
      //   if(lastJsonMessage[i].s === "BNB-USDT"){
      //     setDogePrice(lastJsonMessage[i].c.slice(0, -4));
      //     setDogeRate(lastJsonMessage[i].P);
      //     setDogeAmt(lastJsonMessage[i].v.split(".")[0]);
      //   }
      //   if(lastJsonMessage[i].s === "ETH-USDT"){
      //     setEthPrice(lastJsonMessage[i].c.slice(0, -4));
      //     setEthRate(lastJsonMessage[i].P);
      //     setEthAmt(lastJsonMessage[i].v.split(".")[0]);
      //   }
      //   if(lastJsonMessage[i].s === "BTC-USDT"){
      //     setBtcPrice(lastJsonMessage[i].c.slice(0, -4));
      //     setBtcRate(lastJsonMessage[i].P);
      //     setBtcAmt(lastJsonMessage[i].v.split(".")[0]);
      //   }
      // }
    }
  },[lastJsonMessage]);
  useEffect(() => {
    if(lastJsonMessage2){
      setOrder(lastJsonMessage2)     
    }

  },[lastJsonMessage2]);
  useEffect(() => {
    if(lastJsonMessage3){
      if(lastJsonMessage3.channel === "position"){
        setPosition(lastJsonMessage3.data)
      }else{
        setFuture(lastJsonMessage3.data)
      }
    }

  },[lastJsonMessage3]);

  useEffect(()=>{
    if(Platform.OS !== "android"){
      if(AppState.currentState == "active"){
        setSocketUrl("wss://ex-api.usefordemo.com/market/ws/latest")
        setSocketUrl2("wss://ex-api.usefordemo.com/otc/ws")
        setSocketUrl3("wss://ex-api.usefordemo.com/ws")
      }else{
        setSocketUrl("wss://")
        setSocketUrl2("wss://")
        setSocketUrl3("wss://")
      }
    }
  },[AppState.currentState])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PositionContext.Provider value={position}>
        <FutureContext.Provider value={future}>
        <OrderContext.Provider value={order}>
        <PriceContext.Provider value={market}>
        <PriceContext2.Provider value={market2}>
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
          </PriceContext2.Provider>
          </PriceContext.Provider>
          </OrderContext.Provider>
          </FutureContext.Provider>
          </PositionContext.Provider>
      </SafeAreaProvider>
    );
  }
}
