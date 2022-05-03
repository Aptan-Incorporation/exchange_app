import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ThemeProvider } from "styled-components";
import { Theme } from "./constants/Theme";
import { useState, createContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export const PriceContext = createContext(
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
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const socketUrl =
    "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/dogeusdt@ticker";
  const { lastJsonMessage } = useWebSocket(socketUrl, {
    // onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: closeEvent => true
  });
  const [btcPrice, setBtcPrice] = useState("");
  const [btcRate, setBtcRate] = useState("");
  const [btcAmt, setBtcAmt] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [ethRate, setEthRate] = useState("");
  const [ethAmt, setEthAmt] = useState("");
  const [dogePrice, setDogePrice] = useState("");
  const [dogeRate, setDogeRate] = useState("");
  const [dogeAmt, setDogeAmt] = useState("");

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.stream === "btcusdt@ticker") {
        setBtcPrice(lastJsonMessage.data.c.slice(0, -6));
        setBtcRate(lastJsonMessage.data.P);
        setBtcAmt(lastJsonMessage.data.v.split(".")[0]);
      }
      if (lastJsonMessage.stream === "ethusdt@ticker") {
        setEthPrice(lastJsonMessage.data.c.slice(0, -6));
        setEthRate(lastJsonMessage.data.P);
        setEthAmt(lastJsonMessage.data.v.split(".")[0]);
      }
      if (lastJsonMessage.stream === "dogeusdt@ticker") {
        setDogePrice(lastJsonMessage.data.c.slice(0, -6));
        setDogeRate(lastJsonMessage.data.P);
        setDogeAmt(lastJsonMessage.data.v.split(".")[0]);
      }
    }
  });
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PriceContext.Provider value={{
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
        </PriceContext.Provider>
      </SafeAreaProvider>
    );
  }
}
