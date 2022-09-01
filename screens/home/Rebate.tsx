import { Text, View, TouchableOpacity, Image, ScrollView,Alert } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { PriceContext, ThreePriceContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from 'expo-clipboard';
import api from "../../common/api"
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

const GrayHeader = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.color.DarkGray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 16px;
`;

const GrayText = styled(Text)`
  font-size: 13px;
  color: ${props => props.theme.color.ExtraLightGray};
  font-weight: 500;
`;

const PriceText = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

const USDText = styled(Text)`
  font-size: 15px;
  color: #8D97A2;
  font-weight:500;
`;

const PercentText = styled(Text)`
  font-size: 32px;
  color: ${props => props.theme.color.Secondary};
  font-weight: 700;
`;

const RedPercentText = styled(Text)`
  font-size: 15px;
  color: #F4F5F6;
  font-weight: 700;
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

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;

const Rebate = ({ navigation }: RootStackScreenProps<"Rebate">) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [memberNumber, setMemberNumber] = useState(0);
  const [records, setRecord] = useState([]);
  const [tradeMembers, setTradeMembers] = useState([]);
  const [sum, setSum] = useState(0);
  const [code, setCode] = useState("");
  const { t } = useTranslation();
  const copyToClipboard = async () => {
    await Clipboard.setString("ABC963412");
    Alert.alert("複製成功")
  };

  useEffect(()=>{
    api.get("/investor/commission").then(x=>{
      // console.log(x.data)
      let sum = 0
      setMemberNumber(x.data.memberNumber)
      setRecord(x.data.records)
      setTradeMembers(x.data.tradeMembers)
      for(let i = 0;i < x.data.records.length ; i++){
        sum = sum + x.data.records[i].amount
      }
      setSum(sum)
    })
    api.get("/investor/invite-code").then(x=>{
      setCode(x.data)
    })
  },[])
  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={async () => {
            navigation.goBack();
          }}
        >
          <IconImg
            source={require("../../assets/images/global/previous.png")}
          />
        </TouchableOpacity>
        <HeaderText>代理返傭</HeaderText>
        <View></View>
      </Header>
      <View style={{ padding: 16 }}>
        <View
          style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37" }}
          onPress={() => {
            AsyncStorage.setItem("trade", "BTCUSDT");
            navigation.navigate("Trade");
          }}
        >
          <GrayHeader>
            <GrayText>我的推薦碼</GrayText>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            ></View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
            <Text style={{ color: "#608FBE", fontSize: 20,fontWeight:"700" }}>
              {code}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
            <IconImg
            source={require("../../assets/images/wallet/copy.png")}
            style={{width:20,height:20}}
            />
            </TouchableOpacity>
            
            </View>
            
          </GrayHeader>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              alignItems: "center"
            }}
          >
            <View>
              <USDText>返傭收入</USDText>
            </View>
            <RedPercentText>{sum.toFixed(6)} USDT</RedPercentText>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 16,
              paddingRight: 16,
              alignItems: "center"
            }}
          >
            <View>
              <USDText>已交易用戶</USDText>
            </View>
            <RedPercentText>{tradeMembers.length} 人</RedPercentText>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              alignItems: "center"
            }}
          >
            <View>
              <USDText>推薦用戶</USDText>
            </View>
            <RedPercentText>{memberNumber} 人</RedPercentText>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: 33,
            borderBottomWidth: 1,
            borderBottomColor: "#242D37",
            marginTop: 24
          }}
        >
          {index === 0 ? (
            <TouchableOpacity
              style={{
                height: 33,
                borderBottomWidth: 2,
                borderBottomColor: "#608FBE"
              }}
              onPress={() => {
                setIndex(0);
              }}
            >
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>
                返傭紀錄
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ height: 33 }}
              onPress={() => {
                setIndex(0);
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}
              >
                返傭紀錄
              </Text>
            </TouchableOpacity>
          )}
          {index === 1 ? (
            <TouchableOpacity
              style={{
                height: 33,
                borderBottomWidth: 2,
                borderBottomColor: "#608FBE",
                marginLeft: 24
              }}
              onPress={() => {
                setIndex(1);
              }}
            >
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>
              推薦用戶
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ height: 33, marginLeft: 24 }}
              onPress={() => {
                setIndex(1);
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}
              >
                推薦用戶
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <ScrollView contentContainerStyle={{ paddingBottom: 600 }}>
            {index === 0 &&
              records.map((x: any) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 12,
                        alignItems: "center"
                      }}
                    >
                      <View style={{display:"flex",flexDirection:"column"}}>
                      <Text
                        style={{
                          color: "#F4F5F6",
                          fontSize: 15,
                          fontWeight: "400"
                        }}
                      >
                        ID {x.childAccount}
                      </Text>
                      <Text
                        style={{
                          color: "#8D97A2",
                          fontSize: 12,
                          fontWeight: "400"
                        }}
                      >
                        {new Date(x.createdDate).toISOString().split("T")[0]}
                      </Text>
                      </View>
                      
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: 40
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "600" }}>
                            {x.amount} USDT
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
              {index === 1 &&
              tradeMembers.map((x: any) => {
                return (
                  <>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 12,
                        alignItems: "center"
                      }}
                    >
                      <View style={{display:"flex",flexDirection:"column"}}>
                      <Text
                        style={{
                          color: "#F4F5F6",
                          fontSize: 15,
                          fontWeight: "400"
                        }}
                      >
                        ID {x}
                      </Text>
                      {/* <Text
                        style={{
                          color: "#8D97A2",
                          fontSize: 12,
                          fontWeight: "400"
                        }}
                      >
                        2021-10-26 16:12:08
                      </Text> */}
                      </View>
                      
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: 40
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "600" }}>
                            已交易
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                );
              })}
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default Rebate;
