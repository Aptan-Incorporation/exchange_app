import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import api from "../../common/api";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const Header = styled(View) <{ insets: number }>`
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
  margin-right:30px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`

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

const C2cApply = ({ navigation }: RootStackScreenProps<"C2cApply">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [modalVisible, setModalVisible] = useState(false);
  const [obj, setObj] = React.useState({
    "accountCreatedTime": 7606317426,
    "averageConfirmTime30days": 0,
    "averagePayTime30days": 0,
    "buyCompleteAmount": 0,
    "buyCompleteOrdersCount": 0,
    "completeAmount30days": 0,
    "completeOrders30daysCount": 0,
    "completeOrders30daysRate": 0,
    "completeUsers": 0,
    "firstCompleteTime": 0,
    "sellCompleteAmount": 0,
    "sellCompleteOrdersCount": 0,
  });
  const [user, setUser] = React.useState({
    "buyFeeRate": 0,
    "forbiddens": [],
    "sellFeeRate": 0,
    "advertiserDeposit": 0,
    "advertiserLevel":0
  });
  const [kyc, setKyc] = React.useState({
    "financePwd": false,
    "googleAuth": false,
    "kyc": null,
    "phone": true,
  });

  useEffect(async () => {
    let user = await AsyncStorage.getItem("user")
    api.get(`/otc/api/user/${JSON.parse(user!).account}/otcOrders/statistics?type=advertiser`).then(x=>{
      setObj(x)
    })
    api.get(`/otc/api/user/${JSON.parse(user!).account}`).then(x=>{
      setUser(x)
    })
    api.get("/user/security").then(x=>{
      console.log(x.data)
      setKyc(x.data)
    })
    
  }, [])
  useEffect(async () => {
    let user = await AsyncStorage.getItem("user")
    api.get(`/otc/api/user/${JSON.parse(user!).account}/otcOrders/statistics?type=${role}`).then(x=>{
      setObj(x)
    })
  }, [role])
  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconImg source={require("../../assets/images/global/previous.png")} />
        </TouchableOpacity>
        <HeaderText>申請商家質押</HeaderText>
        <View>

        </View>
       
      </Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ }}>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#333C47", padding: 16, borderRadius: 4 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Level 1</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>目前等級</Text>
                <IconImg source={require("../../assets/images/home/selected.png")} style={{ width: 24, height: 24 }} />
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#333C47", padding: 16, borderRadius: 4, marginTop: 16 ,borderWidth:1,borderColor:"#A8C2DC"}}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Level 2</Text>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", borderRadius: 8, marginTop: 24 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>質押金額</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averageConfirmTime30days > 0 ? obj.averageConfirmTime30days/(1000*60) : obj.averageConfirmTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>單筆最高限額</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>單日最高限額</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: "#333C47",height:1,marginTop:16,marginBottom:16}}></View>
          <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "500",marginBottom:12 }}>升級限制</Text>
          <View style={{ display: "flex", flexDirection: "column", borderRadius: 8}}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>交易人次</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#FABD43", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averageConfirmTime30days > 0 ? obj.averageConfirmTime30days/(1000*60) : obj.averageConfirmTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>/100</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>總交易數</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#FABD43", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>/100</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>總交易量</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#FABD43", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>/100</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>成功率</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#FABD43", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>/100</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
          
          }}>
            <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>升級</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
      <View>
        <Modal
          isVisible={modalVisible}
          animationInTiming={500}
          animationOutTiming={700}
          backdropOpacity={0.7}
          swipeDirection={['down']}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          hideModalContentWhileAnimating={true}
        >
          <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
            <ModalHeaderContainer>
              <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                <ModalLeftCancelButton source={require("../../assets/images/trade/cancel.png")} />
              </TouchableOpacity>
              <ModalHedaerTitleText>商戶限制剩餘時間</ModalHedaerTitleText>
              <ModalEmptyDiv></ModalEmptyDiv>
            </ModalHeaderContainer>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>廣告單限制</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>0</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>C2C 交易限制</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>0</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30,marginBottom: 10 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>換轉限制</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>0</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </Container>
  );
};

export default C2cApply;
