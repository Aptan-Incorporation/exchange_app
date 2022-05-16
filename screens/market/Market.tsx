import { Text, View,SafeAreaView,TouchableOpacity } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { PriceContext } from "../../App" 
import * as React from "react";
import {useContext } from "react";

const Container = styled(SafeAreaView)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;

const MarketScreen = ({ navigation }: RootStackScreenProps<"MarketScreen">) => {
    const {btcPrice,btcRate,btcAmt,ethPrice,ethRate,ethAmt,dogePrice,dogeRate,dogeAmt} = useContext(PriceContext)

  return (
    <Container>
      <View style={{paddingHorizontal:16}}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ColumnText>交易對</ColumnText>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <ColumnText style={{ marginRight: 40 }}>價格/交易量</ColumnText>
            <View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            >
              <ColumnText>24H漲跌</ColumnText>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            alignItems: "center"
          }}
          onPress={()=>{navigation.navigate("Trade")}}
        >
          <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>
            BTCUSDT
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                marginRight: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}
              >
                {btcPrice}
              </Text>
              <Text
                style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}
              >
                {btcAmt}
              </Text>
            </View>
            <View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#2FB364",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>+{btcRate}%</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>
            ETHUSDT
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                marginRight: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}
              >
                {ethPrice}
              </Text>
              <Text
                style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}
              >
                {ethAmt}
              </Text>
            </View>
            <View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#2FB364",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>+{ethRate}%</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>
            BTCUSDT
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View
              style={{
                marginRight: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <Text
                style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}
              >
                {dogePrice}
              </Text>
              <Text
                style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}
              >
                {dogeAmt}
              </Text>
            </View>
            <View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#2FB364",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>+{dogeRate}%</Text>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default MarketScreen;
