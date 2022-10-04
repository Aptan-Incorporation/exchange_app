import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TextInput
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import Spinner from "react-native-loading-spinner-overlay";
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

const GoogleVerifyStep3 = ({
  navigation
}: RootStackScreenProps<"GoogleVerifyStep3">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState("");
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();
  const getPosition = () => {
    api.get("/investor/position").then(x => {
      setPositionArray(x.data);
    });
  };

  const copyToClipboard = async () => {
    await Clipboard.setString("hello world");
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
      {loading && <Spinner visible={loading} textContent={""} />}
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
            if (!code) {
              Alert.alert("請輸入驗證碼");
            } else {
              setLoading(true);
              api.postData("/user/google-auth", { code: code }).then(x => {
                setLoading(false);
                if (x.status !== 400) {
                  api
                    .postData("/user/google-auth/verify", { code: code })
                    .then(x => {
                      if (x.status !== 400) {
                        navigation.navigate("Setting");
                      } else {
                        alert(x.data.msg);
                      }
                    });
                } else {
                  alert(x.data.msg);
                }
              });
            }
          }}
        >
          <Text style={{ color: "#A8C2DC", fontSize: 16, fontWeight: "600" }}>
            {t("nickNameDone")}
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: "#DDE0E3",
            fontSize: 13,
            fontWeight: "500",
            marginTop: 20,
            marginBottom: 5
          }}
        >
          Google 驗證碼
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TextInput
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#242D37",
              borderRadius: 4,
              color: "white",
              fontSize: 15,
              paddingLeft: 10
            }}
            maxLength={6}
            onChangeText={text => {
              setCode(text);
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default GoogleVerifyStep3;
