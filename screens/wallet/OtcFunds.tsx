import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image,
  TextInput,
  Alert
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

const FundsScreen = ({ navigation }: RootStackScreenProps<"OtcFunds">) => {
    const [status, setStatus] = useState(0);
    const insets = useSafeAreaInsets();
    const [futuresBalance,setFuturesBalance] = useState(0)
    const [totalBalance,setTotalBalance] = useState(0)
    const [num,setNum] = useState("")
    const [loading,setLoading] = useState(false)
    const [account,setAccount] = useState("")
    const getBalance = async () => {
        api.get("/investor/property").then(x=>{
            setTotalBalance(x.data.spot.equityValue)
        })
        let user = await AsyncStorage.getItem("user");
        setAccount(JSON.parse(user!).account)
        api.get("/otc/api/user/"+JSON.parse(user!).account).then(x=>{
          for(let i =0 ; i < x.wallet.coins.length;i++){
              if(x.wallet.coins[i].symbol === "USDT"){
                setFuturesBalance(x.wallet.coins[i].balance)
              }
          }
      })
    };

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      getBalance()
    }
  }, []);

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
        <HeaderText>資金劃轉</HeaderText>
        <View></View>
      </Header>
      <View style={{padding:16}}>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:"#242D37",borderRadius:4,alignItems:"center"}}>
              <View style={{width:"80%"}}>
                <View style={{display:"flex",flexDirection:"row",width:"100%",padding:12,alignItems:"center",borderBottomWidth:1,borderBottomColor:"#333C47"}}>
                    <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500"}}>從</Text>
                    <Text style={{color:"white",fontSize:15,fontWeight:"400",marginLeft:20}}>{status === 0 ? "現貨資產" :"法幣資產"}</Text>
                </View>
                <View style={{display:"flex",flexDirection:"row",width:"100%",padding:12,alignItems:"center"}}>
                    <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"500"}}>至</Text>
                    <Text style={{color:"white",fontSize:15,fontWeight:"400",marginLeft:20}}>{status === 0 ? "法幣資產" :"現貨資產"}</Text>
                </View>
              </View>
              <TouchableOpacity  style={{marginRight:10}} onPress={()=>{
                  if(status === 0){
                      setStatus(1)
                      setNum("")
                  }else{
                    setStatus(0)
                    setNum("")
                  }
              }}>
                  <Image source={require("../../assets/images/wallet/swap.png")} style={{width:28,height:28}}/>
              </TouchableOpacity>
          </View>
         <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>數量</Text>
         <TextInput style={{backgroundColor:"#242D37",borderRadius:4,padding:12,color:"white",marginTop:5}} placeholder="輸入劃轉數量" keyboardType={"decimal-pad"} returnKeyType={"done"} onChangeText={text => setNum(text)} value={num}/>
         <TouchableOpacity onPress={()=>{
             if(status === 0){
                setNum(totalBalance.toString())
            }else{
                setNum(futuresBalance.toString())
            }
         }}>
            <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:10}}>可用 {status === 0 ? totalBalance : futuresBalance} USDT</Text>
         </TouchableOpacity>
         <TouchableOpacity style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#3D6A97",padding:12,borderRadius:4,marginTop:30}} onPress={async ()=>{
            let token = await AsyncStorage.getItem("token");
            if(!token){
                Alert.alert("請先登入")
            }else if(!num){
                Alert.alert("請輸入數量")
            }else{
                let obj = status === 0 ? {
                  sourceServer: "spot",
                  targetServer:  "otc",
                  sourceUser:account,
                  targetUser:account,
                  symbol:"USDT",
                  value:parseFloat(num).toFixed(2) 
                } : {
                  sourceServer: "otc",
                  targetServer: "spot",
                  sourceUser:account,
                  targetUser:account,
                  symbol:"USDT",
                  value:parseFloat(num).toFixed(2)  
                } 
                setLoading(true)
                if(status == 0){
                  api.postData("/api/transfer/",obj).then(x=>{
                    setLoading(false)
                     if(x.status != 400){
                        Alert.alert("劃轉成功")
                        navigation.goBack()
                     }else{
                        Alert.alert(x.data.msg)
                     }
                 })
                }else{
                  api.postData("/otc/api/transfer/",obj).then(x=>{
                    setLoading(false)
                     if(x.status != 400){
                        Alert.alert("劃轉成功")
                        navigation.goBack()
                     }else{
                        Alert.alert(x.data.msg)
                     }
                 })
                }
                
            }
            
         }}>
             <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>劃轉</Text>
         </TouchableOpacity>
      </View>
    </Container>
  );
};

export default FundsScreen;