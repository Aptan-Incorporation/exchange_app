import { Text, View , TouchableOpacity,Image,TextInput} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";

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
  const [active, setActive] = React.useState("");

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
      <View>
        <Text style={{color:"white",fontSize:32,fontWeight:"600"}}>註冊</Text>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>電子信箱</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入電子信箱"/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="密碼長度至少為8個字元" secureTextEntry/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>密碼確認</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="再次輸入密碼" secureTextEntry/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>推薦碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="選填" secureTextEntry/>
      </View>
      <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{navigation.navigate("EmailVerify")}}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>繼續</Text>
      </TouchableOpacity>
    </View>
  </Container>
  );
};

export default Register;