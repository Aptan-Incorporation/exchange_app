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
// import QRCode  from 'qrcode.react';
import SvgQRCode from 'react-native-qrcode-svg';

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
  margin-right: 30px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const RechargeScreen = ({ navigation }: RootStackScreenProps<"Recharge">) => {
  const [address, setAddress] = useState([]);
  const insets = useSafeAreaInsets();

  const getAddress = () => {
    api.get("/investor/wallet").then(x => {
      setAddress(x.data)
    });
  };

  const copyToClipboard = async () => {
    await Clipboard.setString(address);
    Alert.alert("複製成功")
};

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
       getAddress();
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
        <HeaderText>充值USDT</HeaderText>
        <View></View>
      </Header>
      <View style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column",marginTop:20}}>
          <View style={{width:189,height:189,backgroundColor:"white",borderRadius:8,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <SvgQRCode value={address} size={141}/>

          </View>
          <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500",marginTop:20}}>此地址只可接收USDT</Text>
          <View style={{width:"90%"}}>
          <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>網路</Text>
          <View style={{backgroundColor:"#242D37",borderRadius:4,padding:12,marginTop:5}}>
          <Text style={{color:"white"}}>TRON(TRC20)</Text>
          </View>
          
         </View>
          <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                <Text style={{color:"#F4F5F6",fontSize:15,fontWeight:"700",marginTop:20}} >{address}</Text>
                <TouchableOpacity onPress={copyToClipboard}>
                     <Image source={require("../../assets/images/wallet/copy.png")} style={{width:20,height:20,marginLeft:5,marginTop:20}}/>
                </TouchableOpacity>
          </View>
      </View>
    </Container>
  );
};

export default RechargeScreen;
