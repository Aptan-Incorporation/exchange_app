import { Text, View , TouchableOpacity,Image,TextInput,Alert} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import api from "../../common/api"

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

const Register = ({ navigation }: RootStackScreenProps<"Register">) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [promoCode, setPromocode] = React.useState("");
  const [loading,setLoading] = useState(false);
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
        <Text style={{color:"white",fontSize:32,fontWeight:"600"}}>註冊</Text>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>電子信箱</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入電子信箱" onChangeText={setEmail}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="密碼長度至少為8個字元" secureTextEntry onChangeText={setPassword}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>密碼確認</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="再次輸入密碼" secureTextEntry onChangeText={setPassword2}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>推薦碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="選填"  onChangeText={setPromocode}/>
      </View>
      <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
        if(!email){
          Alert.alert("請輸入信箱")
        }else if(email.length < 8){
          Alert.alert("信箱不得小於8碼")
        }else if(!password){
          Alert.alert("請輸入密碼")
        }else if(password.length < 8){
          Alert.alert("密碼不得小於8碼")
        }else if(!password2){
          Alert.alert("請輸入密碼確認")
        }else if(password !== password2){
          Alert.alert("密碼不相同請重新輸入")
        }else{
          AsyncStorage.setItem("register",JSON.stringify({
            email:email,
            password:password,
            promoCode:promoCode
          }))
          setLoading(true)
          api.postData("/auth/account/check",{account:email}).then(x=>{
            console.log(x)
            if(x.status === "OK"){
              api.postData("/auth/email/verify-code",{ email:email }).then(x=>{
                setLoading(false)
                navigation.navigate("EmailVerify")
              })
            }else{
              setLoading(false)
              alert("此信箱已註冊過")
            }
          })
        }
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>繼續</Text>
      </TouchableOpacity>
    </View>
  </Container>
  );
};

export default Register;
