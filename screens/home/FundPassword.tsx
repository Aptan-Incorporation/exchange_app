import { Text, View, TouchableOpacity, Image, TextInput,Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import { useTranslation } from "react-i18next";

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
const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  font-weight:600;
  margin-right:30;
`;

const FundPassword = ({ navigation }: RootStackScreenProps<"FundPassword">) => {
  const insets = useSafeAreaInsets();
  const [count,setCount] = useState(180)
  const [email, setEmail] = React.useState("");
  const [promoCode, setPromocode] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const { t } = useTranslation();
  useEffect(async ()=>{
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
        <HeaderText>資金密碼</HeaderText>
      <View></View>
      </Header>
      <View style={{ padding: 16 }}>
      <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginBottom:4}}>資金密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="密碼長度至少為8個字元" secureTextEntry onChangeText={setPassword}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>資金密碼確認</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="再次輸入密碼" secureTextEntry onChangeText={setPassword2}/>
        <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
          //  navigation.navigate("Setting")
          if(!password){
            Alert.alert("請輸入資金密碼")
          }
          else if(!password2){
            Alert.alert("請輸入資金密碼確認")
          }
          else if(password !== password2){
            Alert.alert("資金密碼不相同請確認後重新輸入")
          }
          else{
            setLoading(true)
            api.postData("/user/finance-password",{originPassword:password,password:password2}).then(x=>{
              setLoading(false)
              if(x.status !== 400){
                navigation.goBack()
              }else{
                alert(x.data.msg)
              }
            })
          }
          
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>儲存</Text>
      </TouchableOpacity>
      </View>
    </Container>
  );
};

export default FundPassword;
