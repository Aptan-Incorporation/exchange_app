import { Text, View , TouchableOpacity,Image} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState } from "react";
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

const ProfileScreen = ({
    navigation
  }: RootStackScreenProps<"ProfileScreen">) => {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    return (
        <Container>
        <Header insets={insets.top}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <IconImg source={require("../../assets/images/global/previous.png")} />
          </TouchableOpacity>
          <HeaderText>{t("home")} </HeaderText>
          <View></View>
        </Header>
        <View style={{ padding: 16 }}>
     
        </View>
      </Container>
    )
}

export default ProfileScreen