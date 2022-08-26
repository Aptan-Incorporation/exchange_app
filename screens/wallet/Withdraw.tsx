import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  TextInput
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay'

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

const WithdrawScreen = ({ navigation }: RootStackScreenProps<"Withdraw">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();
  const [loading,setLoading] = useState(false)
  const [address,setAddress] = useState("")
  const [number,setNumber] = useState("")

  return (
    <Container>
      {loading && 
        <Spinner visible={true} textContent={''} />
      }
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
        <HeaderText>提現USDT</HeaderText>
        <View></View>
      </Header>
      <View style={{padding:16}}>
         <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500"}}>USDT提現地址</Text>
         <TextInput style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}} placeholder="輸入USDT提現地址" onChangeText={text => setAddress(text)}/>
         {/* <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>備註</Text>
         <TextInput style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}} placeholder="選填"/> */}
         <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>網路</Text>
         <View style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}}>
          <Text style={{color:"white"}}>TRON(TRC20)</Text>
         </View>

         <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>數量</Text>
         <TextInput style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}} placeholder="輸入提現數量" keyboardType={"decimal-pad"} returnKeyType={"done"} onChangeText={text => setNumber(text)}/>
         <TouchableOpacity style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#3D6A97",padding:12,borderRadius:4,marginTop:30}} onPress={()=>{
                  if(!address){
                    alert("請輸入地址")
                  }else if (!number){
                    alert("請輸入數量")
                  }else{
                    setLoading(true)
                    api.postData("/wallet/withdraw",{amount:number,address:address}).then(x=>{
                      setLoading(false)
                      if(x.status !== 400){
                        alert("提現成功")
                        navigation.goBack()
                      }else{
                        alert(x.data.msg)
                      }
                    })
                  }       
                }}>
             <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>提現</Text>
         </TouchableOpacity>
      </View>
    </Container>
  );
};

export default WithdrawScreen;
