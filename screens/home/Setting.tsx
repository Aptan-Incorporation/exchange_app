import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../common/api";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
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

const Setting = ({ navigation }: RootStackScreenProps<"Setting">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [kyc, setKyc] = React.useState({
    financePwd: false,
    googleAuth: false,
    kyc: null,
    phone: false
  });
  useEffect(async () => {
    let user = await AsyncStorage.getItem("user");
    setEmail(JSON.parse(user!).account);
    setUserId(JSON.parse(user!).userId);
    api.getData("/user/security").then(x => {
      // console.log(x)
      setKyc(x.data);
    });
  });
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
        <HeaderText>安全設置</HeaderText>
        <View></View>
      </Header>
      <View style={{ padding: 16 }}>
        <View>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              height: 56,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#242D37",
              justifyContent: "space-between"
            }}
            onPress={() => {
              navigation.navigate("PhoneInput");
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>手機驗證</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {kyc.phone ? <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                已驗證
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                驗證
              </Text>
              <IconImg
                source={require("../../assets/images/home/next.png")}
              />
            </>}
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              height: 56,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#242D37",
              justifyContent: "space-between"
            }}
            onPress={() => {
              navigation.navigate("GoogleVerifyStep1");
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Google 驗證</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {kyc.googleAuth ? <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                已驗證
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                驗證
              </Text>
              <IconImg
                source={require("../../assets/images/home/next.png")}
              />
            </>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              height: 56,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#242D37",
              justifyContent: "space-between"
            }}
            onPress={() => {
              navigation.navigate("IdentityVerifyStep1");
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>身份驗證</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                驗證
              </Text>
              <IconImg source={require("../../assets/images/home/next.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              height: 56,
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "#242D37",
              justifyContent: "space-between"
            }}
            onPress={() => {
              navigation.navigate("FundPassword");
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>資金密碼</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {kyc.financePwd ? <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                已設置
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                驗證
              </Text>
              <IconImg
                source={require("../../assets/images/home/next.png")}
              />
            </>}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Setting;
