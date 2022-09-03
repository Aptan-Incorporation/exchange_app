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

const ResetPassword = ({ navigation }: RootStackScreenProps<"ResetPassword">) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [password3, setPassword3] = React.useState("");
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
      <HeaderText>登入密碼重置</HeaderText>
      <View></View>
    </Header>
    <View style={{ padding: 16 }}>
      {loading && 
        <Spinner visible={true} textContent={''} />
      }
      <View>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginBottom:4}}>舊密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入舊密碼" secureTextEntry onChangeText={setPassword}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>新密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入新密碼，長度至少為8個字元" secureTextEntry onChangeText={setPassword2}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>確認新密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="再次輸入新密碼" secureTextEntry onChangeText={setPassword3}/>

      </View>
      <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
        if(!password){
          Alert.alert("請輸入舊密碼")
        }else if(password2.length < 8){
          Alert.alert("密碼不得小於8碼")
        }else if(!password2){
          Alert.alert("請輸入新密碼")
        }else if(password2 != password3){
          Alert.alert("確認新密碼與新密碼不相同，請重新輸入")
        }else{
          setLoading(true)
          api.postData("/user/reset/password",{current:password,changed:password2}).then(x=>{
            console.log(x)
            if(x.status === "OK"){
                setLoading(false)
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

export default ResetPassword;
