import { Text, View , TouchableOpacity,Image,TextInput,Alert} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState } from "react";
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
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`


const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading,setLoading] = useState(false);

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
            <IconImg source={require("../../assets/images/global/cancel.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              navigation.navigate("Register");
            }}>
             <HeaderText>註冊</HeaderText>
          </TouchableOpacity>
        </Header>
        <View style={{ padding: 16 }}>
          <View>
            <Text style={{color:"white",fontSize:32,fontWeight:"600"}}>登入</Text>
            <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>電子信箱</Text>
            <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入電子信箱" onChangeText={setEmail}/>
            <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>密碼</Text>
            <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入密碼" secureTextEntry  onChangeText={setPassword}/>
          </View>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
            <Text style={{color:"#A8C2DC",fontSize:14,fontWeight:"500",marginTop:16}}>忘記密碼</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
            setLoading(true)
            api.postData("/auth/login",{account:email,password:password}).then(x=>{
              setLoading(false)
              if(x.status === 401){
                Alert.alert("帳號密碼錯誤")
              }else if(x.status !== 400){
                AsyncStorage.setItem("token",x.data.token)
                AsyncStorage.setItem("user",JSON.stringify(x.data.user))
                navigation.goBack()
              }else{
                Alert.alert(x.data.msg)
              }
              
            })
          }}>
            <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>登入</Text>
          </TouchableOpacity>
        </View>
      </Container>
  );
};

export default Login;
