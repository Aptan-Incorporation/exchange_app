import { Text, View, TouchableOpacity, Image, TextInput,Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

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

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`

const PhoneVerify = ({ navigation }: RootStackScreenProps<"PhoneVerify">) => {
  const insets = useSafeAreaInsets();
  const [count,setCount] = useState(300)
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [promoCode, setPromocode] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [phone, setPhone] = React.useState("");

  useEffect(async ()=>{
    let phone = await AsyncStorage.getItem("phone")
    setPhone(phone)

    setTimeout(()=>{
      if(count > 0){
        setCount(c => c - 1)
      }
    },1000)
  },[count])
  return (
    <Container>
      {loading &&  <Spinner visible={loading} textContent={''} />}
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconImg source={require("../../assets/images/global/previous.png")} />
        </TouchableOpacity>
        {/* <HeaderText>登入</HeaderText>
      <View></View> */}
      </Header>
      <View style={{ padding: 16 }}>
        <View>
          <Text style={{ color: "white", fontSize: 32, fontWeight: "600" }}>手機驗證</Text>
          <Text style={{ color: "#DDE0E3", fontSize: 15, fontWeight: "400", marginTop: 24, marginBottom: 4 }}>6位數驗證碼已寄送至</Text>
    <Text style={{ color: "#FABD43", fontSize: 20, fontWeight: "700", marginTop: 8, marginBottom: 4 }}>{phone}</Text>
          <Text style={{ color: "#DDE0E3", fontSize: 12, fontWeight: "500", marginTop: 8, marginBottom: 4 }}>剩餘時間{Math.floor(count/60)}:{(count - Math.floor(count/60)*60) < 10 ? "0"+(count - Math.floor(count/60)*60) :(count - Math.floor(count/60)*60)} </Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",marginTop:40}}>
            <TextInput style={{ width: "100%", height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,paddingLeft:10 }} maxLength={6} onChangeText={text =>{
             if(text.length === 6){
                setLoading(true)
                api.postData("/user/phone/check-code",{phone:phone,code:text}).then(x=>{
                  setLoading(false)
                  if(x.status !== 400){
                    Alert.alert("驗證成功")
                    navigation.navigate("Setting")       
                  }else{
                    Alert.alert(x.data.msg)
                    
                  }
                })
              }
            }}
          />
          </View>
        </View>
        {count === 0 && 
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", borderRadius: 4, justifyContent: "center", alignItems: "center", height: 44, marginTop: 42,borderColor:"#3D6A97",borderWidth:1 }} onPress={()=>{
            setLoading(true)
            api.postData("/user/phone/verify-code",{ phone:phone }).then(x=>{
              setLoading(false)     
            })
            // navigation.navigate("Root")
          }}
          >
          <Text style={{ color: "#3D6A97", fontSize: 14, fontWeight: "500" }}>重新發送</Text>
        </TouchableOpacity>
        }
        
      </View>
    </Container>
  );
};

export default PhoneVerify;