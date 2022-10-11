import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState, Alert } from 'react-native';
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ThemeProvider } from "styled-components";
import { Theme } from "./constants/Theme";
import { useState, createContext, useEffect,useMemo } from "react";
import useWebSocket from "react-use-websocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash"
import { Platform } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import "./local/i18n"

export default function App() {

  // const [socketUrl, setSocketUrl] = useState("wss://ex-api.usefordemo.com/market/ws/latest");
  // const [socketUrl2, setSocketUrl2] = useState("wss://ex-api.usefordemo.com/otc/ws");
  // const [socketUrl3, setSocketUrl3] = useState("wss://ex-api.usefordemo.com/ws");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // useEffect(() => {
  //   if (Platform.OS !== "android") {
  //     if (AppState.currentState == "active") {
  //       setSocketUrl("wss://ex-api.usefordemo.com/market/ws/latest")
  //       setSocketUrl2("wss://ex-api.usefordemo.com/otc/ws")
  //       setSocketUrl3("wss://ex-api.usefordemo.com/ws")
  //     } else {
  //       setSocketUrl("wss://")
  //       setSocketUrl2("wss://")
  //       setSocketUrl3("wss://")
  //     }
  //   }
  // }, [AppState.currentState])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <ThemeProvider theme={Theme}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
