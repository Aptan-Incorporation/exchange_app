import { Text, View , TouchableOpacity,Image,TextInput,Alert} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import api from "../../common/api"
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


const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  margin-right:30px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`

const ForgotPassword = ({ navigation }: RootStackScreenProps<"ForgotPassword">) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [promoCode, setPromocode] = React.useState("");
  const [loading,setLoading] = useState(false);
  const { t } = useTranslation();
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
      {/* <HeaderText>登入</HeaderText>
      <View></View> */}
    </Header>
    <View style={{ padding: 16 }}>
      {loading && 
        <Spinner visible={true} textContent={''} />
      }
      <View>
        <Text style={{color:"white",fontSize:32,fontWeight:"600"}}>{t("forgetPass")}</Text>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>{t("email")}</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder={t("enterEmail")} onChangeText={setEmail}/>
      </View>
      <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
        if(!email){
          Alert.alert("請輸入信箱")
        }else{
          AsyncStorage.setItem("register",JSON.stringify({
            email:email,
            password:password,
            promoCode:promoCode
          }))
          setLoading(true)
          api.postData("/auth/forgot-password",{account:email}).then(x=>{
            console.log(x)
            if(x.status === "OK"){
              alert("新密碼已寄送至您的信箱")
              navigation.goBack()
            }else{
              setLoading(false)
              alert(x.data.msg)
            }
          })
        }
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>{t("OK")}</Text>
      </TouchableOpacity>
    </View>
  </Container>
  );
};

export default ForgotPassword;
