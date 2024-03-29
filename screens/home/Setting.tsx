import { Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import api from "../../common/api";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  useEffect(async () => {
    let user = await AsyncStorage.getItem("user");
    setEmail(JSON.parse(user!).account);
    setUserId(JSON.parse(user!).userId);
    api.getData("/user/security").then(x => {
      setKyc(x.data);
    });
    const interval = setInterval(() => {
      api.getData("/user/security").then(x => {
        setKyc(x.data);
      });

    }, 1000);

  return () => clearInterval(interval);
    
  },[]);
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
        <HeaderText>{t("security")}</HeaderText>
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
              if(kyc.phone){
                alert(t("mobileVerifyComp"))
              }else{
                navigation.navigate("PhoneInput");
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>{t("mobileVerification")}</Text>
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
                {t("verificationComp")}
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                {t("verificationUnavb")}
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
              if(kyc.googleAuth){
                navigation.navigate("ResetGoogle");
              }else{
                navigation.navigate("GoogleVerifyStep1");

              }
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>{t("googleAuth")}</Text>
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
                {t("verificationComp")}
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                {t("verificationUnavb")}
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
              if(kyc.kyc == "CREATE"){
                alert(t("idAuthenticationComp"))
              }else{
                navigation.navigate("IdentityVerifyStep1");
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>{t("idAuth")}</Text>
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
                {t("verificationUnavb")}
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
              if(kyc.financePwd ){
                navigation.navigate("ResetFundPassword");
              }else{
                navigation.navigate("FundPassword");
              }
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>{t("fundPass")}</Text>
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
                {t("verificationSet")}
              </Text>:
              <>
              <Text
                style={{ color: "#8D97A2", fontSize: 15, fontWeight: "400" }}
              >
                {t("verificationUnset")}
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
              navigation.navigate("ResetPassword");
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>{t("resetFundPass")}</Text>
            
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Setting;
