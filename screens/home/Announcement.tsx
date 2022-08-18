import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { ThreePriceContext,PriceContext } from "../../App";
import * as React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;

const HeaderTitleTextClicked = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: ${props => props.theme.color.White};
`;

const HeaderTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.Gray};
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

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`
const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  font-weight:600;
  margin-right:50;
`;

const Announcement = ({ navigation }: RootStackScreenProps<"MarketScreen">) => {

  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState([]);
  const insets = useSafeAreaInsets();
  const TextEl = useRef<TextInput | null>(null);

  useEffect(() => {
    api.get("/info/announcement").then(x=>{
      setAnnounce(x.data)
    })
  }, []);

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
        <HeaderText>公告</HeaderText>
      <View></View>
      </Header>
      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIndex(0);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 0 ? (
              <HeaderTitleTextClicked>最新活動</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>最新活動</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(1);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 1 ? (
              <HeaderTitleTextClicked>法幣交易</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>法幣交易</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(2);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 2 ? (
              <HeaderTitleTextClicked>合約交易</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>合約交易</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(3);
            }}
          >
            {index === 3 ? (
              <HeaderTitleTextClicked>新聞</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>新聞</HeaderTitleText>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={{display:"flex",flexDirection:"column"}} contentContainerStyle={{paddingBottom:150}}>
          {announce.map((x:any)=>{
            return(
              <TouchableOpacity style={{display: "flex", flexDirection: "column", height: 56, borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"center"}} onPress={()=>{
                navigation.navigate("AnnouncementDetail",{
                  id: x.id,
                })
              }}>
              <Text style={{ color: "#F4F5F6", fontSize: 16, fontWeight: "700" }}>{x.subject}</Text>
            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{`${new Date(x.createdDate).toISOString().split("T")[0]}`}</Text>
              </TouchableOpacity>
            )
          })}
            
        </ScrollView>
      </View>
    </Container>
  );
};

export default Announcement;
