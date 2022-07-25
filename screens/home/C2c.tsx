import { Text, View, TouchableOpacity, Image } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

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


const Member = ({ navigation }: RootStackScreenProps<"C2c">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userId, setUserId] = React.useState("");

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
        <HeaderText>C2C管理</HeaderText>
        <View >
        </View>
      </Header>
      <View style={{ padding: 16 }}>
        <View style={{}}>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", height: 56, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"space-between" }} onPress={() => { navigation.navigate("C2cMember") }}>
            <Text style={{ color: "white", fontSize: 15 }}>用戶中心</Text>
            <IconImg source={require("../../assets/images/home/next.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", height: 56, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"space-between" }} onPress={() => { navigation.navigate("Payments") }}>
            <Text style={{ color: "white", fontSize: 15 }}>帳戶設置</Text>
            <IconImg source={require("../../assets/images/home/next.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", height: 56, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"space-between" }} onPress={() => { navigation.navigate("C2cApply") }}>
            <Text style={{ color: "white", fontSize: 15 }}>申請商家質押</Text>
            <IconImg source={require("../../assets/images/home/next.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", height: 56, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"space-between" }}>
            <Text style={{ color: "white", fontSize: 15}}>C2C 通知設置</Text>
            <IconImg source={require("../../assets/images/home/next.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={{ display: "flex", flexDirection: "row", height: 56, alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#242D37",justifyContent:"space-between" }}>
            <Text style={{ color: "white", fontSize: 15}}>幫助中心</Text>
            <IconImg source={require("../../assets/images/home/next.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Member;
