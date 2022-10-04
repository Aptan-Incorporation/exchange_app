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
import * as React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

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

  const [index, setIndex] = useState(-1);
  const [announce, setAnnounce] = useState([]);
  const insets = useSafeAreaInsets();
  const TextEl = useRef<TextInput | null>(null);
  const { t,i18n } = useTranslation();
  useEffect(() => {
    let category = "ACTIVITY"
    if(index === -1){
      api.get("/info/announcement?lang="+ i18n.language).then(x=>{
        setAnnounce(x.data)
      })
    }else{
      if(index === 1){
        category = "OTC"
      }else if(index === 2){
        category = "CONTRACT"
      }else if(index === 3){
        category = "NEWS"
      }
      api.get("/info/announcement?topic="+category+"&lang="+ i18n.language).then(x=>{
        setAnnounce(x.data)
      })
    }
  }, [index]);

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
        <HeaderText>{t("announcement")}</HeaderText>
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
              setIndex(-1);
            }}
            style={{ marginRight: 10 }}
          >
            {index === -1 ? (
              <HeaderTitleTextClicked>{t("allAnn")}</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>{t("allAnn")}</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(0);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 0 ? (
              <HeaderTitleTextClicked>{t("event")}</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>{t("event")}</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(1);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 1 ? (
              <HeaderTitleTextClicked>{t("tradeFiat")}</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>{t("tradeFiat")}</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(2);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 2 ? (
              <HeaderTitleTextClicked>{t("tradeFutures")}</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>{t("tradeFutures")}</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(3);
            }}
          >
            {index === 3 ? (
              <HeaderTitleTextClicked>{t("news")}</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>{t("news")}</HeaderTitleText>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView style={{display:"flex",flexDirection:"column"}} contentContainerStyle={{paddingBottom:150}}>
          {announce.map((x:any)=>{
            return(
              <TouchableOpacity style={{display: "flex", flexDirection: "column",paddingBottom:10,paddingTop:10, borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"center"}} onPress={()=>{
                navigation.navigate("AnnouncementDetail",{
                  id: x.id,
                })
              }}>
              <Text style={{ color: "#F4F5F6", fontSize: 16, fontWeight: "700" }}>{x.subject}</Text>
            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{new Date(x.createdDate).getFullYear()}-{new Date(x.createdDate).getMonth()+1 < 10 ? "0"+(new Date(x.createdDate).getMonth()+1) : new Date(x.createdDate).getMonth()+1}-{new Date(x.createdDate).getDate() < 10 ? "0"+(new Date(x.createdDate).getDate()) : new Date(x.createdDate).getDate()} {new Date(x.createdDate).getHours() < 10 ? "0"+(new Date(x.createdDate).getHours()) : new Date(x.createdDate).getHours()}:{new Date(x.createdDate).getMinutes() < 10 ? "0"+(new Date(x.createdDate).getMinutes()) : new Date(x.createdDate).getMinutes()}</Text>
              </TouchableOpacity>
            )
          })}
          
            
        </ScrollView>
      </View>
    </Container>
  );
};

export default Announcement;
