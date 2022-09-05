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

const HelpCenter = ({ navigation }: RootStackScreenProps<"HelpCenter">) => {
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
  const [advertiserLevel, setAdvertiserLevel] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const { t } = useTranslation();
  async function getData(){
    
  }
  useEffect(() => {
    getData()
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
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{color:"white",fontSize:18}}>交易協議列表</Text>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>合約服務協議</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>提幣風險告知書</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>服務協議</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>法律聲明</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>用戶邀請協議</Text>
            </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{color:"white",fontSize:18}}>合約說明</Text>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>永續合約簡介</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>強評語風險限制</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>合約的交易模式</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>保證金與盈虧計算</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>委託方式</Text>
            </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <Text style={{color:"white",fontSize:18}}>新手指南</Text>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>充币未到账情況</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>充错币种怎么办？</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>关于提币 手续费 与额度限制</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>为什么要进行KYC验证，如何验证？</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>收不到验证码或其他通知怎么办？</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>登录密码与资金密码重置、找回密码</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>关于合约标的价格波动的风险提示</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>关于杠杆风险的提示</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>如何加强账户安全</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>如何预防常见OTC交易诈骗</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>常见诈骗套路说明</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color:"white",fontSize:15,marginTop:10,marginLeft:20}}>Mung Bean关于防范假冒官方工作人员进行网络电话诈骗的风险提示</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>
    </Container>
  );
};

export default HelpCenter;
