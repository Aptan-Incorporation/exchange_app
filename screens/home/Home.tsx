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
`;

const Header = styled(View)<{ insets: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: ${props => props.insets}px;
  padding-left: 16px;
  padding-right: 16px;
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

const HomeScreen = ({ navigation }: RootStackScreenProps<"HomeScreen">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");

  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <HeaderText>會員</HeaderText>
        </TouchableOpacity>
      </Header>
      <View style={{padding:16}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <CategoryText>BTC/USDT</CategoryText>
            <PercentText>-0.05%</PercentText>
          </View>
          <PriceText>40,106.45</PriceText>
          <USDText>= 40,106.45</USDText>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <CategoryText>BTC/USDT</CategoryText>
            <PercentText>-0.05%</PercentText>
          </View>
          <PriceText>40,106.45</PriceText>
          <USDText>= 40,106.45</USDText>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            alignItems: "center"
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <CategoryText>BTC/USDT</CategoryText>
            <PercentText>-0.05%</PercentText>
          </View>
          <PriceText>40,106.45</PriceText>
          <USDText>= 40,106.45</USDText>
        </View>
      </View>
      <View>
        <View style={{display:"flex",flexDirection:"row",marginTop:20}}>
          <TouchableOpacity>
            <Text>漲幅榜</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>跌幅榜</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>24h成交量</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:20}}>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <Text>交易對</Text>
          <View style={{display:"flex",flexDirection:"row"}}>
          <Text>最新價</Text>
          <Text>24小時漲跌</Text>
          </View>
          
          </View>
        </View>
      </View>
      </View>
      <GrayContainer />
    </Container>
  );
};

export default HomeScreen;
