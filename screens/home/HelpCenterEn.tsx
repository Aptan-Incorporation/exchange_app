import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import api from "../../common/api";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
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

const ModalHeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 26px;
`;

const ModalLeftCancelButton = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalHedaerTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.White};
`;

const ModalEmptyDiv = styled(View)`
  width: 28px;
  height: 28px;
`;

const HelpCenterEn = ({ navigation }: RootStackScreenProps<"HelpCenterEn">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userAccount, setUserAccount] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [modalVisible, setModalVisible] = useState(false);
  const [obj, setObj] = React.useState({
    completeAmount: 0,
    completeOrders: 0,
    completeRate: 0,
    completeUsers: 0
  });
  const [level, setLevel] = React.useState([
    {
      conditionCompleteAmount: 0,
      conditionCompleteOrders: 0,
      conditionCompleteRate: 0,
      conditionCompleteUsers: 0,
      deposit: 0,
      id: 0,
      isSpecial: false,
      maxAmountPerDay: 0,
      maxAmountPerOrder: 0,
      name: ""
    }
  ]);

  const [currentLevel, setCurrentLevel] = React.useState({
    conditionCompleteAmount: 0,
    conditionCompleteOrders: 0,
    conditionCompleteRate: 0,
    conditionCompleteUsers: 0,
    deposit: 0,
    id: 0,
    isSpecial: false,
    maxAmountPerDay: 0,
    maxAmountPerOrder: 0,
    name: ""
  });
  const [language, setLanguage] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const { t,i18n } = useTranslation();
  async function getData(){
    
  }
  useEffect(() => {
    getData()
    setLanguage(i18n.language)
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
        <HeaderText>{t("helpPage")}</HeaderText>
        <View></View>
      </Header>
      <ScrollView contentContainerStyle={{ padding: 16,paddingBottom:100 }}>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8 }}>
            <Text style={{color:"white",fontSize:18}}>Crypto Futures FAQ</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("HelpDetail",{
                  id: 19,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Introduction to perpetual contracts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("HelpDetail",{
                  id: 20,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>The transaction mode of the contract</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 21,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Auto-Reduce and Forced Liquidation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("HelpDetail",{
                  id: 22,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Margin and P&L calculation</Text>
            </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{color:"white",fontSize:18}}>List of Trading Agreements</Text>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 23,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Contractual Service Agreement</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 24,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Legal Statement</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 25,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Notice of risk of currency withdrawal</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 26,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Service Agreement</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 27,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>User Invitation Agreement </Text>
            </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{color:"white",fontSize:18}}>Terms</Text>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 28,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Login password and money password reset, retrieve password</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 29,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>What should I do if I don't receive the verification code or other notifications </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 30,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Why do I need KYC verification and how do I do it</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 31,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>About withdrawal fee and limit</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 32,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Deposit Hasn’t Been Credited To My Account </Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => { navigation.navigate("HelpDetail",{
                  id: 33,
                })}}>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}> What If I Deposit The Wrong Token</Text>
            </TouchableOpacity>
            
      </View>
      </ScrollView>
    </Container>
  );
};

export default HelpCenterEn;
