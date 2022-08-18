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

const AnnouncementDetail = ({ navigation,route }: RootStackScreenProps<"AnnouncementDetail">) => {
  const { id } = route.params;
  console.log(id)
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState({
    subject:"",
    createdDate:0,
    content:""
  });
  const insets = useSafeAreaInsets();
  const TextEl = useRef<TextInput | null>(null);

  useEffect(() => {
    api.get("/info/announcement/"+id).then(x=>{
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
        
        <ScrollView style={{display:"flex",flexDirection:"column"}} contentContainerStyle={{paddingBottom:150}}>

              <TouchableOpacity style={{display: "flex", flexDirection: "column", height: 60, borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"center",paddingBottom:10}}>
              <Text style={{ color: "#F4F5F6", fontSize: 25, fontWeight: "700" }}>{announce.subject}</Text>
            <Text style={{ color: "#8D97A2", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{`${new Date(announce.createdDate).toISOString().split("T")[0]}`}</Text>
              </TouchableOpacity>
              <Text style={{ color: "white", fontSize: 13, fontWeight: "600", marginTop: 4 }}>{announce.content}</Text>            
        </ScrollView>
      </View>
    </Container>
  );
};

export default AnnouncementDetail;
