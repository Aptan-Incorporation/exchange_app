import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  TextInput
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #18222d;
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

const FundsScreen = ({ navigation }: RootStackScreenProps<"Funds">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();

  const getPosition = () => {
    api.get("/investor/position").then(x => {
      setPositionArray(x.data);
    });
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
        <HeaderText>資金劃轉</HeaderText>
        <View></View>
      </Header>
      <View style={{padding:16}}>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#242D37",borderRadius:4,alignItems:"center"}}>
              <View style={{width:"80%"}}>
                <View style={{display:"flex",flexDirection:"row",width:"100%",padding:12,alignItems:"center",borderBottomWidth:1,borderBottomColor:"#333C47"}}>
                    <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500"}}>從</Text>
                    <Text style={{color:"white",fontSize:15,fontWeight:"400",marginLeft:20}}>現貨資產</Text>
                </View>
                <View style={{display:"flex",flexDirection:"row",width:"100%",padding:12,alignItems:"center"}}>
                    <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500"}}>至</Text>
                    <Text style={{color:"white",fontSize:15,fontWeight:"400",marginLeft:20}}>合約資產</Text>
                </View>
              </View>
              <TouchableOpacity  style={{marginRight:10}}>
                  <Image source={require("../../assets/images/wallet/swap.png")} style={{width:28,height:28}}/>
              </TouchableOpacity>
          </View>
         <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>數量</Text>
         <TextInput style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}} placeholder="輸入劃轉數量" keyboardType={"decimal-pad"} returnKeyType={"done"}/>
         <TouchableOpacity>
            <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:10}}>可用 57,649.86 USDT</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#3D6A97",padding:12,borderRadius:4,marginTop:30}}>
             <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>劃轉</Text>
         </TouchableOpacity>
      </View>
    </Container>
  );
};

export default FundsScreen;
