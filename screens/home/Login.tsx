import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { Drawer } from "react-native-paper";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

const Header = styled(View)<{ insets: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: ${props => props.insets}px;
  padding-bottom: 11px;
`;

const GrayContainer = styled(View)`
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
`;

const PriceText = styled(Text)`
  font-size: 18px;
  color: ${props => props.theme.color.PrimaryRed};
`;
const USDText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.Gray};
`;

const CategoryText = styled(Text)`
  font-size: 13px;
  color: ${props => props.theme.color.LightGray};
`;

const PercentText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.DarkRed};
  margin-left: 5px;
`;

const HeaderText = styled(Text)`
  color: ${props => props.theme.color.ExtraLightGray};
`;

const LoginButton = styled(TouchableOpacity)`
  height:20px;
  background: ${props => props.theme.color.MidGray};
`;


const Login = ({ navigation }: RootStackScreenProps<"Login">) => {
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
          <HeaderText>返回</HeaderText>
        </TouchableOpacity>
      </Header>
      <View style={{display:"flex",flexDirection:"row"}}>
        <Text>請先</Text>
        <LoginButton>
          <Text>登入</Text>
        </LoginButton>
        <Text>或</Text>
        <LoginButton>
          <Text>註冊</Text>
        </LoginButton>
      </View>
    </Container>
  );
};

export default Login;
