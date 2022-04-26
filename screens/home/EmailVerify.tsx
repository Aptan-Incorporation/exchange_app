import { Text, View, TouchableOpacity, Image, TextInput } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState } from "react";

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

const EmailVerify = ({ navigation }: RootStackScreenProps<"EmailVerify">) => {
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
          <IconImg source={require("../../assets/images/global/cancel.png")} />
        </TouchableOpacity>
        {/* <HeaderText>登入</HeaderText>
      <View></View> */}
      </Header>
      <View style={{ padding: 16 }}>
        <View>
          <Text style={{ color: "white", fontSize: 32, fontWeight: "600" }}>信箱驗證</Text>
          <Text style={{ color: "#DDE0E3", fontSize: 15, fontWeight: "400", marginTop: 24, marginBottom: 4 }}>6位數驗證碼已寄送至</Text>
          <Text style={{ color: "#FABD43", fontSize: 20, fontWeight: "700", marginTop: 8, marginBottom: 4 }}>ssss80119@gmail.com</Text>
          <Text style={{ color: "#DDE0E3", fontSize: 12, fontWeight: "500", marginTop: 8, marginBottom: 4 }}>剩餘時間04:59</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",marginTop:40}}>
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1}/>
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1} />
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1}/>
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1}/>
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1}/>
            <TextInput style={{ width: 44, height: 48, backgroundColor: "#242D37", borderRadius: 4,color:"white",fontSize:15,textAlign:"center" }} maxLength={1}/>
          </View>
        </View>
        <TouchableOpacity style={{ display: "flex", flexDirection: "row", borderRadius: 4, justifyContent: "center", alignItems: "center", height: 44, marginTop: 42,borderColor:"#3D6A97",borderWidth:1 }} onPress={()=>{navigation.navigate("Root")}}>
          <Text style={{ color: "#3D6A97", fontSize: 14, fontWeight: "500" }}>重新發送</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default EmailVerify;
