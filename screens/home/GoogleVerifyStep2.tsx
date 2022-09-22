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
import * as Clipboard from "expo-clipboard";
import { useTranslation } from "react-i18next";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #131b24;
  border: none;
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
  background-color: #18222d;
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  font-weight: 600;
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const GoogleVerifyStep2 = ({
  navigation
}: RootStackScreenProps<"GoogleVerifyStep2">) => {
  const [positionArray, setPositionArray] = useState([]);
  const [code, setCode] = useState("");
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const getPosition = () => {
    api.get("/user/google-auth").then(x => {
      setCode(x.data);
    });
  };

  const copyToClipboard = async () => {
    await Clipboard.setString(code);
    Alert.alert(t("copied"));
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
        <HeaderText>{t("googleAuth")}</HeaderText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("GoogleVerifyStep3");
          }}
        >
          <Text style={{ color: "#A8C2DC", fontSize: 16, fontWeight: "600" }}>
            下一步
          </Text>
        </TouchableOpacity>
      </Header>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: 20
        }}
      >
        {/* <View style={{width:189,height:189,backgroundColor:"white",borderRadius:8,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Image source={require("../../assets/images/wallet/qrcode.png")} style={{width:141,height:141}}/>

          </View> */}
        <Text
          style={{
            color: "#8D97A2",
            fontSize: 13,
            fontWeight: "500",
            marginTop: 20
          }}
        >
          請複製下方代碼後至 Google 驗證 APP 貼上。
        </Text>
        <Text
          style={{
            color: "#8D97A2",
            fontSize: 13,
            fontWeight: "500",
            marginTop: 5
          }}
        ></Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: "#F4F5F6",
              fontSize: 24,
              fontWeight: "700",
              marginTop: 20
            }}
          >
            {code}
          </Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Image
              source={require("../../assets/images/wallet/copy.png")}
              style={{ width: 20, height: 20, marginLeft: 5, marginTop: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default GoogleVerifyStep2;
