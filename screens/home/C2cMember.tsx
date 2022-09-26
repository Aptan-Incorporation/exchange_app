import { Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import api from "../../common/api";
import { useTranslation } from "react-i18next";

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

const Member = ({ navigation }: RootStackScreenProps<"C2cMember">) => {
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
  const { t } = useTranslation();
  useEffect(async () => {
    let user = await AsyncStorage.getItem("user")
    api.get(`/otc/api/user/${JSON.parse(user!).account}/otcOrders/statistics?type=advertiser`).then(x=>{
      setObj(x)
    })
    api.get(`/otc/api/user/${JSON.parse(user!).account}`).then(x=>{
      setUser(x)
    })
    api.get("/user/security").then(x=>{
      setKyc(x.data)
    })
    const interval = setInterval(() => {
      api.get(`/otc/api/user/${JSON.parse(user!).account}`).then(x=>{
        setUser(x)
      })
    }, 2000);
    return () => clearInterval(interval); 
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
        <View >
        </View>
        {role === "user" ? 
         <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
         <Text style={{ color: "#BCC2C8", fontSize: 13, fontWeight: "500", marginRight: 5 }}>{t("switchMch")}</Text>
         <TouchableOpacity onPress={()=>{setRole("advertiser")}}>
           <IconImg source={require("../../assets/images/home/swap.png")} />
         </TouchableOpacity>
       </View>:
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#BCC2C8", fontSize: 13, fontWeight: "500", marginRight: 5 }}>{t("switchUser")}</Text>
        <TouchableOpacity onPress={()=>{setRole("user")}}>
          <IconImg source={require("../../assets/images/home/swap.png")} />
        </TouchableOpacity>
      </View>}
       
      </Header>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#A8C2DC", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 32, fontWeight: "600" }}>N</Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#F4F5F6", fontSize: 16, fontWeight: "700" }}>{user.nickName ? user.nickName : t("nickNameYet")}</Text>
              <TouchableOpacity onPress={() => { navigation.navigate("EditName") }}>
              <IconImg source={require("../../assets/images/home/edit.png")} style={{ width: 20, height: 20, marginLeft: 5 }} />

              </TouchableOpacity>
            </View>
            {role === "user" ?            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{t("verifiedUser")}</Text>
:            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{t("verifiedMch")}</Text>
}
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#242D37", padding: 16, borderRadius: 8 }}>
            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("verifyStatus")}</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <IconImg source={require("../../assets/images/home/check.png")} style={{ width: 16, height: 16, marginRight: 5 }} />
              <Text style={{ color: "#F4F5F6", fontSize: 12, fontWeight: "400", marginRight: 5 }}>{t("email")}</Text>
              {kyc.phone && <>
                <IconImg source={require("../../assets/images/home/check.png")} style={{ width: 16, height: 16, marginRight: 5 }} />
                <Text style={{ color: "#F4F5F6", fontSize: 12, fontWeight: "400", marginRight: 5 }}>{t("mobile")}</Text>
              </>}
              {kyc.kyc && <>
                <IconImg source={require("../../assets/images/home/check.png")} style={{ width: 16, height: 16, marginRight: 5 }} />
              <Text style={{ color: "#F4F5F6", fontSize: 12, fontWeight: "400", marginRight: 5 }}>{t("identity")}</Text>
              </>}
              
              {/* <IconImg source={require("../../assets/images/home/check.png")} style={{ width: 16, height: 16, marginRight: 5 }} />
              <Text style={{ color: "#F4F5F6", fontSize: 12, fontWeight: "400", marginRight: 5 }}>質押</Text> */}
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("thirtyDaysDeal")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.completeOrders30daysCount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("times")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("thirtyDaysDealRate")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.completeOrders30daysRate}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>%</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("thirtyDaysAvgSellTime")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averageConfirmTime30days > 0 ? obj.averageConfirmTime30days/(1000*60) : obj.averageConfirmTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("minutes")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("thirtyDaysAvgBuyTime")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.averagePayTime30days > 0 ? obj.averagePayTime30days/(1000*60) : obj.averagePayTime30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("minutes")}</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("accountEst")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.accountCreatedTime > 0 ? (obj.accountCreatedTime/(1000*60*60*24)).toFixed(0):obj.accountCreatedTime}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("days")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("firstDealtill")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.firstCompleteTime > 0 ?(obj.firstCompleteTime/(1000*60*60*24)).toFixed(0):obj.firstCompleteTime}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("days")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("dealPeopleNum")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.completeUsers}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("people")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("dealNum")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.buyCompleteOrdersCount + obj.sellCompleteOrdersCount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("times")}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}></Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.buyCompleteOrdersCount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatOrderBuy")}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginRight: 5, marginLeft: 5 }}>|</Text>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.sellCompleteOrdersCount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatOrderSell")}</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("thirtyDaysDealAmount")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.completeAmount30days}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("totalDealAmount")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.buyCompleteAmount + obj.sellCompleteAmount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}></Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.buyCompleteAmount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatOrderBuy")}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginRight: 5, marginLeft: 5 }}>|</Text>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{obj.sellCompleteAmount}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatOrderSell")}</Text>
              </View>
            </View>
          </View>
          {role === "advertiser" && <>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("stackAmount")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{user.advertiserLevel ? user.advertiserLevel.name:"尚無等級"}</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("maxAmountPer")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{user.advertiserLevel ? user.advertiserLevel.maxAmountPerOrder:0}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("maxAmountPerDay")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{user.advertiserLevel ? user.advertiserLevel.maxAmountPerDay:0}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>USDT</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatBuyFee")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{user.buyFeeRate}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>%</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatSellFee")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>{user.sellFeeRate}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>%</Text>
              </View>
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "column", backgroundColor: "#242D37", padding: 16, borderRadius: 8, marginTop: 16 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("restrictTime")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                  setModalVisible(true)
                }}>
                  <IconImg source={require("../../assets/images/home/heip.png")} style={{ width: 24, height: 24 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          </>}
          
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
              <ModalHedaerTitleText>{t("restrictTime")}</ModalHedaerTitleText>
              <ModalEmptyDiv></ModalEmptyDiv>
            </ModalHeaderContainer>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("adsRestrict")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>0</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("fiatRestrict")}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 13, fontWeight: "600", marginRight: 5 }}>0</Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30,marginBottom: 10 }}>
              <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "500" }}>{t("transferRestrict")}</Text>
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

export default Member;
