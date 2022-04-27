import { Text, View, TouchableOpacity, Image } from "react-native"
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


const Member = ({ navigation }: RootStackScreenProps<"Member">) => {
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
        <HeaderText>會員中心</HeaderText>
        <View >
        </View>
      </Header>
      <View style={{ padding: 16 }}>
        <View style={{ display: "flex", flexDirection: "row",alignItems:"center" }}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: "#A8C2DC", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "black", fontSize: 32, fontWeight: "600" }}>N</Text>
          </View>
          <View style={{marginLeft:12}}>
            <Text style={{color:"#F4F5F6",fontSize:16,fontWeight:"700"}}>zxc******@gmail.com</Text>
            <Text style={{color:"#8D97A2",fontSize:13,fontWeight:"600",marginTop:4}}>ID: 01831290</Text>
          </View>
        </View>
        <View style={{marginTop:24}}>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",height:56,alignItems:"center",borderBottomWidth:1,borderBottomColor: "#242D37"}}>
            <IconImg source={require("../../assets/images/home/security.png")} />
            <Text style={{color:"white",fontSize:15,marginLeft:16}}>安全設置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",height:56,alignItems:"center",borderBottomWidth:1,borderBottomColor: "#242D37"}}>
            <IconImg source={require("../../assets/images/home/account.png")} />
            <Text style={{color:"white",fontSize:15,marginLeft:16}}>帳戶設置</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",height:56,alignItems:"center",borderBottomWidth:1,borderBottomColor: "#242D37"}}>
            <IconImg source={require("../../assets/images/home/ad.png")} />
            <Text style={{color:"white",fontSize:15,marginLeft:16}}>我的廣告</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",height:56,alignItems:"center",borderBottomWidth:1,borderBottomColor: "#242D37"}}>
            <IconImg source={require("../../assets/images/home/bonus.png")} />
            <Text style={{color:"white",fontSize:15,marginLeft:16}}>代理返佣</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display:"flex",flexDirection:"row",height:56,alignItems:"center",borderBottomWidth:1,borderBottomColor: "#242D37"}}>
            <IconImg source={require("../../assets/images/home/logout.png")} />
            <Text style={{color:"white",fontSize:15,marginLeft:16}}>登出</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Member;