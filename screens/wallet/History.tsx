import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #18222d;
  border: none;
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
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  margin-right: 30px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const HistoryScreen = ({ navigation }: RootStackScreenProps<"History">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();

  const getPosition = () => {
    api.get("/investor/position").then(x => {
      setPositionArray(x.data);
    });
  };

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      getPosition();
    }
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
        <HeaderText>資金紀錄</HeaderText>
        <View></View>
      </Header>
      <Text>Funds</Text>
    </Container>
  );
};

export default HistoryScreen;
