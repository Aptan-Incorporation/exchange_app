import { Text, View, TouchableOpacity, Image,ScrollView } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect,useContext } from "react";
import { PriceContext } from "../../App" 

const Container = styled(ScrollView)`
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

const GrayHeader = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 52px;
  background-color: ${props => props.theme.color.DarkGray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  align-items: center;
  padding-left:16px;
`;

const GrayText = styled(Text)`
  font-size: 13px;
  color: ${props => props.theme.color.ExtraLightGray};
  margin-left:12px;
  font-weight:600;
`;

const PriceText = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

const USDText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top:4px;
`;

const PercentText = styled(Text)`
  font-size: 32px;
  color: ${props => props.theme.color.Secondary};
  font-weight: 700;

`;

const RedPercentText = styled(Text)`
  font-size: 32px;
  color: ${props => props.theme.color.SecondaryLight};
  font-weight: 700;

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

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;


const HomeScreen = ({ navigation }: RootStackScreenProps<"HomeScreen">) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const {btcPrice,btcRate,btcAmt,ethPrice,ethRate,ethAmt,dogePrice,dogeRate,dogeAmt} = useContext(PriceContext)
  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <IconImg source={require("../../assets/images/home/avatar.png")} />
        </TouchableOpacity>
        <HeaderText>首頁</HeaderText>
        <View></View>
      </Header>
      <View style={{ padding: 16 }}>
        <View style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37" }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/btc.png")} />
            <GrayText>比特幣 BTCUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
              <PriceText>{btcPrice}</PriceText>
              <USDText>≈ {btcPrice} USD</USDText>
            </View>
            {parseFloat(btcRate) > 0 ? <PercentText>{"+"+btcRate}%</PercentText> : <RedPercentText>{btcRate}%</RedPercentText>}
          </View>
        </View>
        <View style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37", marginTop: 16 }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/eth.png")} />
            <GrayText>以太坊 ETHUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
              <PriceText>{ethPrice}</PriceText>
              <USDText>≈ {ethPrice} USD</USDText>
            </View>
            {parseFloat(ethRate) > 0 ? <PercentText>{"+"+ethRate}%</PercentText> : <RedPercentText>{ethRate}%</RedPercentText>}
          </View>
        </View>
        <View style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37", marginTop: 16 }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/doge.png")} />
            <GrayText>多吉幣 DOGEUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
               <PriceText>{dogePrice}</PriceText>
              <USDText>≈ {dogePrice} USD</USDText>
            </View>
            {parseFloat(dogeRate) > 0 ? <PercentText>{"+"+dogeRate}%</PercentText> : <RedPercentText>{dogeRate}%</RedPercentText>}
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "100%", height: 33, borderBottomWidth: 1, borderBottomColor: "#242D37", marginTop: 24 }}>
          {index === 0 ?
            <TouchableOpacity style={{ height: 33, borderBottomWidth: 2, borderBottomColor: "#608FBE" }} onPress={()=>{setIndex(0)}}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>漲幅榜</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ height: 33 }}  onPress={()=>{setIndex(0)}}>
              <Text style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}>漲幅榜</Text>
            </TouchableOpacity>}
          {index === 1 ?
            <TouchableOpacity style={{ height: 33, borderBottomWidth: 2, borderBottomColor: "#608FBE",marginLeft:24 }}  onPress={()=>{setIndex(1)}}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>跌幅榜</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ height: 33,marginLeft:24 }}  onPress={()=>{setIndex(1)}}>
              <Text style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}>跌幅榜</Text>
            </TouchableOpacity>}
          {/* {index === 2 ?
            <TouchableOpacity style={{ height: 33, borderBottomWidth: 2, borderBottomColor: "#608FBE" ,marginLeft:24}}  onPress={()=>{setIndex(2)}}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>24H成交量榜</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ height: 33,marginLeft:24 }}  onPress={()=>{setIndex(2)}}>
              <Text style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}>24H成交量榜</Text>
            </TouchableOpacity>} */}
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            <ColumnText>交易對</ColumnText>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <ColumnText style={{ marginRight: 40 }}>價格/24hr交易量</ColumnText>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                <ColumnText>24H漲跌</ColumnText>
              </View>
            </View>
          </View>
          { index === 0 && parseFloat(btcRate) > 0 &&
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>BTCUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{btcPrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{btcAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#2FB364", borderRadius: 4, alignItems: "center" }}>
                <Text style={{ color: "white" }}>+{btcRate}%</Text>
              </View>
            </View>
           </View>
          }
          { index === 1 && parseFloat(btcRate) < 0 &&
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>BTCUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{btcPrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{btcAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#FB4C51", borderRadius: 4, alignItems: "center" }}>
                <Text style={{ color: "white" }}>{btcRate}%</Text>
              </View>
            </View>
           </View>
          }
          { index === 0 && parseFloat(ethRate) > 0 &&
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>ETHUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{ethPrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{ethAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#2FB364", borderRadius: 4, alignItems: "center" }}>
                <Text style={{ color: "white" }}>+{ethRate}%</Text>
              </View>
            </View>
          </View>
          }
          { index === 1 && parseFloat(ethRate) < 0 &&
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>ETHUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{ethPrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{ethAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#FB4C51", borderRadius: 4, alignItems: "center" }}>
                <Text style={{ color: "white" }}>{ethRate}%</Text>
              </View>
            </View>
          </View>
          }
          { index === 0 && parseFloat(dogeRate) > 0 &&
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>DogeUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{dogePrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{dogeAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#2FB364", borderRadius: 4, alignItems: "center" }}>
          <Text style={{ color: "white" }}>+{dogeRate}%</Text>
              </View>
            </View>
          </View>
          }
          { index === 1 && parseFloat(dogeRate) < 0 &&
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}>
            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>DogeUSDT</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{dogePrice}</Text>
                <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{dogeAmt}</Text>
              </View>
              <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#FB4C51", borderRadius: 4, alignItems: "center" }}>
                <Text style={{ color: "white" }}>{dogeRate}%</Text>
              </View>
            </View>
          </View>
          }

        </View>
      </View>
    </Container>
  );
};

export default HomeScreen;
