import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from 'expo-clipboard';
import { WebView } from 'react-native-webview';

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #131B24;
  border: none;
  flex:1;
`;

const Header = styled(View)<{ insets: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.insets}px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 11px;
  background-color: #18222d;

`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  font-weight:600;
  margin-right:30;
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const Web = ({ navigation }: RootStackScreenProps<"Web">) => {
  const [positionArray, setPositionArray] = useState([]);
  const [web, setWeb] = useState("");
  const insets = useSafeAreaInsets();

  const getPosition = () => {
    api.get("/investor/position").then(x => {
      setPositionArray(x.data);
    });
  };

  const copyToClipboard = async () => {
    await Clipboard.setString('hello world');
    Alert.alert("複製成功")
};

  useEffect(async () => {
    let web = await AsyncStorage.getItem("web");
    setWeb(web)
  }, []);

  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconImg
            source={require("../../assets/images/global/previous.png")}
          />
        </TouchableOpacity>
        <HeaderText>Google 驗證</HeaderText>
        <View></View>
      </Header>
      <WebView 
      source={{ uri: web }}
    />
    </Container>
  );
};

export default Web;
