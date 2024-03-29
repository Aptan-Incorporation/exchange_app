import { Text, View, TouchableOpacity, Image,ScrollView,StyleSheet,Dimensions } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect,useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Swiper from "react-native-web-swiper";
import api from "../../common/api"
import Carousel from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';
import useWebSocket from "react-use-websocket";
import _ from "lodash"

const width = Dimensions.get('window').width;

const height = width * 0.8
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
  margin-left:20px;
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
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const { t,i18n } = useTranslation();
  const isFocused = useIsFocused();
  const [socketUrl, setSocketUrl] = useState("wss://ex-api.usefordemo.com/market/ws/latest");
  const [context, setContext] = useState([]);
  const [three,setThree] = useState({
    btcPrice: 0,
    btcRate: 0,
    btcAmt: 0,
    ethPrice: 0,
    ethRate: 0,
    ethAmt: 0,
    dogePrice: 0,
    dogeRate: 0,
    dogeAmt: 0
  })

  const [btcPrice, setBtcPrice] = useState("");
  const [btcRate, setBtcRate] = useState("");
  const [btcAmt, setBtcAmt] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [ethRate, setEthRate] = useState("");
  const [ethAmt, setEthAmt] = useState("");


  const { lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 1000,
  });

  useEffect(()=>{
    // let gfg = context2.sort(function (a:any, b:any) {
    //   return parseFloat(b.P) - parseFloat(a.P);
    // });
   if(lastJsonMessage){
    // let gfg = lastJsonMessage.sort(function (a: any, b: any) {
    //     return parseFloat(a.P) - parseFloat(b.P);
    // });
    const eth = _.find(lastJsonMessage, function (o) { return o.s == "ETH-USDT" })
    const btc = _.find(lastJsonMessage, function (o) { return o.s == "BTC-USDT" })
    setEthPrice((parseFloat(eth.c) < 0.006 && parseFloat(eth.c) > 0) ? eth.c : (parseFloat(eth.c) < 0.1 && parseFloat(eth.c) > 0.006) ? eth.c.slice(0, -1) : (parseFloat(eth.c) < 1 && parseFloat(eth.c) > 0.1) ? eth.c.slice(0, -2) : (parseFloat(eth.c) < 50 && parseFloat(eth.c) > 1) ? eth.c.slice(0, -3) : eth.c.slice(0, -4));
    setEthRate(eth.P);
    setEthAmt(eth.v.split(".")[0]);
    setBtcPrice((parseFloat(btc.c) < 0.006 && parseFloat(btc.c) > 0) ? btc.c : (parseFloat(btc.c) < 0.1 && parseFloat(btc.c) > 0.006) ? btc.c.slice(0, -1) : (parseFloat(btc.c) < 1 && parseFloat(btc.c) > 0.1) ? btc.c.slice(0, -2) : (parseFloat(btc.c) < 50 && parseFloat(btc.c) > 1) ? btc.c.slice(0, -3) : btc.c.slice(0, -4));
    setBtcRate(btc.P);
    setBtcAmt(btc.v.split(".")[0]);
    setArr(_.orderBy(lastJsonMessage,["P"]).reverse())
    setContext(_.orderBy(lastJsonMessage,["P"]))
   }
    
  },[lastJsonMessage])

  useEffect(() => {
    api.get("/info/carousel?lang="+i18n.language).then(x => {
      setImgArr(x.data);
    });
  }, [isFocused]);

  const _renderItem = ({item, index}) => {
    return (
        <TouchableOpacity  onPress={()=>{
          if(item.announcementId){
            navigation.navigate("AnnouncementDetail",{
              id: item.announcementId,
            })
          }
        }}>
            <Image source={{uri:item.imagePath}} style={{width:width - 32,height:160,borderRadius:8}}/>
        </TouchableOpacity>
    );
 }
  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={async () => {
            let token = await AsyncStorage.getItem("token")
            if(token){
              navigation.navigate("Member");
            }else{
              navigation.navigate("Login");
            }
          }}
        >
          <IconImg source={require("../../assets/images/home/avatar.png")} />
        </TouchableOpacity>
        <HeaderText>{t("home")} </HeaderText>
        <View style={{display:"flex",flexDirection:"row"}}>
        <TouchableOpacity
          style={{marginRight:10}}
          onPress={async () => {
            
              navigation.navigate("AllLanguage");
            
          }}
        >
          <IconImg source={require("../../assets/images/home/language.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {   
              navigation.navigate("Consult");        
          }}
        >
          <IconImg source={require("../../assets/images/home/support.png")} />
        </TouchableOpacity>
        </View>
        
      </Header>
      
       <View style={{ padding: 16 }}>
       <View style={{marginBottom:20}}>
      <Carousel
        data={imgArr}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        autoplay
        loop
        style={{flex:0}}
        useScrollView={true}
      />
      </View>
        <TouchableOpacity style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37" }}  onPress={()=>{
                          AsyncStorage.setItem("trade","BTCUSDT")
                          navigation.navigate("Trade")
                          }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/btc.png")} />
            <GrayText>{t("bitcoin")}   BTCUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
              <PriceText>{btcPrice}</PriceText>
              <USDText>≈ {btcPrice} USD</USDText>
            </View>
            {parseFloat(btcRate) > 0 ? <PercentText>{"+"+btcRate}%</PercentText> : <RedPercentText>{btcRate}%</RedPercentText>}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37", marginTop: 16 }}  onPress={()=>{
                          AsyncStorage.setItem("trade","ETHUSDT")
                          navigation.navigate("Trade")
                          }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/eth.png")} />
            <GrayText>{t("ethereum")}   ETHUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
              <PriceText>{ethPrice}</PriceText>
              <USDText>≈ {ethPrice} USD</USDText>
            </View>
            {parseFloat(ethRate) > 0 ? <PercentText>{"+"+ethRate}%</PercentText> : <RedPercentText>{ethRate}%</RedPercentText>}
          </View>
        </TouchableOpacity>

              {/* <TouchableOpacity style={{ width: "100%", borderRadius: 8, backgroundColor: "#242D37", marginTop: 16 }}  onPress={()=>{
                          AsyncStorage.setItem("trade","BNBUSDT")
                          navigation.navigate("Trade")
                          }}>
          <GrayHeader>
            <IconImg source={require("../../assets/images/home/bnb.png")} />
            <GrayText>{t("binance")} BNBUSDT</GrayText>
          </GrayHeader>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
            <View>
               <PriceText>{dogePrice}</PriceText>
              <USDText>≈ {dogePrice} USD</USDText>
            </View>
            {parseFloat(dogeRate) > 0 ? <PercentText>{"+"+dogeRate}%</PercentText> : <RedPercentText>{dogeRate}%</RedPercentText>}
          </View>
        </TouchableOpacity> */}
        <View style={{ display: "flex", flexDirection: "row", width: "100%", height: 33, borderBottomWidth: 1, borderBottomColor: "#242D37", marginTop: 24 }}>
          {index === 0 ?
            <TouchableOpacity style={{ height: 33, borderBottomWidth: 2, borderBottomColor: "#608FBE" }} onPress={()=>{setIndex(0)}}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>{t("gainersList")}</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ height: 33 }}  onPress={()=>{setIndex(0)}}>
              <Text style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}>{t("gainersList")}</Text>
            </TouchableOpacity>}
          {index === 1 ?
            <TouchableOpacity style={{ height: 33, borderBottomWidth: 2, borderBottomColor: "#608FBE",marginLeft:24 }}  onPress={()=>{setIndex(1)}}>
              <Text style={{ fontSize: 14, color: "white", fontWeight: "500" }}>{t("losersList")}</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={{ height: 33,marginLeft:24 }}  onPress={()=>{setIndex(1)}}>
              <Text style={{ fontSize: 14, color: "#BCC2C8", fontWeight: "500" }}>{t("losersList")}</Text>
            </TouchableOpacity>}
          </View>
          <ScrollView contentContainerStyle={{}}>
                  {
                    index === 0 && context && context.map((x:any)=>{
                      return(
                        <>
                        {x.s === "BTCUSDT" && parseFloat(x.P) > 0 &&
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }} onPress={()=>{
                          AsyncStorage.setItem("trade",x.s.split("-")[0]+"USDT")
                          navigation.navigate("Trade")
                          }}>
                        <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{x.s}</Text>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{(parseFloat(x.c) < 0.006 && parseFloat(x.c) > 0) ? x.c : (parseFloat(x.c) < 0.1 && parseFloat(x.c) > 0.006)  ? x.c.slice(0, -1) : (parseFloat(x.c) < 1 && parseFloat(x.c) > 0.1) ?x.c.slice(0, -2): (parseFloat(x.c) < 50 && parseFloat(x.c) > 1) ?x.c.slice(0, -3) : x.c.slice(0, -4)}</Text>
                        <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{x.v}</Text>
                      </View>
                      <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#2FB364", borderRadius: 4, alignItems: "center" }}>
                        <Text style={{ color: "white" }}>+{x.P}%</Text>
                      </View>
                    </View>
                      </TouchableOpacity> }
                      {x.s !== "BTCUSDT" && parseFloat(x.P) > 0 &&
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}  onPress={()=>{
                          AsyncStorage.setItem("trade",x.s.split("-")[0]+"USDT")
                          navigation.navigate("Trade")
                        }}>
                        <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{x.s}</Text>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                          <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{(parseFloat(x.c) < 0.006 && parseFloat(x.c) > 0) ? x.c : (parseFloat(x.c) < 0.1 && parseFloat(x.c) > 0.006)  ? x.c.slice(0, -1) : (parseFloat(x.c) < 1 && parseFloat(x.c) > 0.1) ?x.c.slice(0, -2): (parseFloat(x.c) < 50 && parseFloat(x.c) > 1) ?x.c.slice(0, -3) : x.c.slice(0, -4)}</Text>
                          <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{x.v}</Text>
                        </View>
                        <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#2FB364", borderRadius: 4, alignItems: "center" }}>
                          <Text style={{ color: "white" }}>+{x.P}%</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    }
                </>
              )
            })
          }
                {
                    index === 1 && arr && arr.map((x:any)=>{
                      return(
                        <>
                        {x.s === "BTCUSDT" && parseFloat(x.P) < 0 &&
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 12, alignItems: "center" }}  onPress={()=>{
                          AsyncStorage.setItem("trade",x.s.split("-")[0]+"USDT")
                          navigation.navigate("Trade")
                          }}>
                        <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{x.s}</Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{(parseFloat(x.c) < 0.006 && parseFloat(x.c) > 0) ? x.c : (parseFloat(x.c) < 0.1 && parseFloat(x.c) > 0.006)  ? x.c.slice(0, -1) : (parseFloat(x.c) < 1 && parseFloat(x.c) > 0.1) ?x.c.slice(0, -2): (parseFloat(x.c) < 50 && parseFloat(x.c) > 1) ?x.c.slice(0, -3) : x.c.slice(0, -4)}</Text>
                            <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{x.v}</Text>
                          </View>
                          <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#FB4C51", borderRadius: 4, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        </View>
                       </TouchableOpacity> }
                      {x.s !== "BTCUSDT" && parseFloat(x.P) < 0 &&
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 24, alignItems: "center" }}   onPress={()=>{
                          AsyncStorage.setItem("trade",x.s.split("-")[0]+"USDT")
                          navigation.navigate("Trade")
                          }}>
                        <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{x.s}</Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <View style={{ marginRight: 40, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>{(parseFloat(x.c) < 0.006 && parseFloat(x.c) > 0) ? x.c : (parseFloat(x.c) < 0.1 && parseFloat(x.c) > 0.006)  ? x.c.slice(0, -1) : (parseFloat(x.c) < 1 && parseFloat(x.c) > 0.1) ?x.c.slice(0, -2): (parseFloat(x.c) < 50 && parseFloat(x.c) > 1) ?x.c.slice(0, -3) : x.c.slice(0, -4)}</Text>
                            <Text style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}>{x.v}</Text>
                          </View>
                          <View style={{ width: 88, display: "flex", flexDirection: "row", justifyContent: "center", backgroundColor: "#FB4C51", borderRadius: 4, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    }
                </>
              )
            })
          }
          </ScrollView>

      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default HomeScreen;
