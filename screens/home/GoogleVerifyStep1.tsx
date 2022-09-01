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
import { useTranslation } from "react-i18next";

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
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const GoogleVerifyStep1 = ({ navigation }: RootStackScreenProps<"GoogleVerifyStep1">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
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
        <HeaderText>Google 驗證</HeaderText>
        <TouchableOpacity onPress={()=>{navigation.navigate("GoogleVerifyStep2")}}>
          <Text style={{color:"#A8C2DC",fontSize:16,fontWeight:"600"}}>下一步</Text>
        </TouchableOpacity>
      </Header>
      <View style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column",marginTop:20}}>
          <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500",marginTop:20}}>請下載 Google 驗證 APP。</Text>
          <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>{
              AsyncStorage.setItem("web","https://apps.apple.com/tw/app/google-authenticator/id388497605")
              navigation.navigate("Web")
            }}>
               <Image source={require("../../assets/images/home/appstore.png")} style={{width:223,height:80,marginTop:40}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              AsyncStorage.setItem("web","https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh_TW&gl=US")
              navigation.navigate("Web")
            }}>
              <Image source={require("../../assets/images/home/googleplay.png")} style={{width:223,height:80,marginTop:20}}/>
            </TouchableOpacity>
          </View>
      </View>
    </Container>
  );
};

export default GoogleVerifyStep1;
