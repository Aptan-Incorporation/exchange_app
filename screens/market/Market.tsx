import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { ThreePriceContext,PriceContext } from "../../App";
import * as React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;

const HeaderTitleTextClicked = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: ${props => props.theme.color.White};
`;

const HeaderTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.Gray};
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

const MarketScreen = ({ navigation }: RootStackScreenProps<"MarketScreen">) => {
  const {
    btcPrice,
    btcRate,
    btcAmt,
    ethPrice,
    ethRate,
    ethAmt,
    dogePrice,
    dogeRate,
    dogeAmt
  } = useContext(ThreePriceContext);
  const [search, setSearch] = useState("");
  const [btc, setBtc] = useState(false);
  const [eth, setEth] = useState(false);
  const [doge, setDoge] = useState(false);
  const [index, setIndex] = useState(0);
  const [favorite, setFavorite] = useState([""]);
  const insets = useSafeAreaInsets();

  const [favorite2, setFavorite2] = useState([
    {
      E: "",
      P: "",
      c: "",
      e: "",
      p: "",
      s: "",
      v: "",
      w: ""
    }
  ]);
  const [favorite3, setFavorite3] = useState([
    {
      E: "",
      P: "",
      c: "",
      e: "",
      p: "",
      s: "",
      v: "",
      w: ""
    }
  ]);
  const context = useContext(PriceContext)
  const [checkedState, setCheckedState] = useState(new Array(context.length).fill(false));

  const [arr, setArray] = useState([
    {
      E: "",
      P: "",
      c: "",
      e: "",
      p: "",
      s: "",
      v: "",
      w: ""
    }
  ]);
  const TextEl = useRef<TextInput | null>(null);
  const filterByName = (filteredData: any) => {
    // Avoid filter for null value
    if (!search) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (x: any) => x.s.indexOf(search.toUpperCase()) !== -1
    );
    return filteredCars;
  };

  const getFavorite = () => {
    api.get("/investor/favorite").then(x => {
      if(x.status != 401 && x.status != 400){
        setFavorite(x.data);
        let a = [];
        for(let i = 0;i < x.data.length;i++){
          for(let j = 0;j<context.length;j++){
            if(x.data[i].split("-")[0]+x.data[i].split("-")[1] == context[j].s){
              a.push(context[j])
            }
          }
        }
        setFavorite2(a)
        setFavorite3(a)
      }else if(x.status == 401){
        AsyncStorage.removeItem("token")
      }else{
        alert(x.data.msg)
      }
      
      
    });
  };

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");  
    if (token) {
      getFavorite();
    }
    if(context){
      setArray(context);
    }
  }, []);

  useEffect(async () => {
    if(search == ""){
      if(context){
        setArray(context);
        let a = [];
        for(let i = 0;i < favorite.length;i++){
          for(let j = 0;j<context.length;j++){
            if(favorite[i].split("-")[0]+favorite[i].split("-")[1] == context[j].s){
              a.push(context[j])
            }
          }
        }
        setFavorite2(a)
      }
    }
  }, [context]);


  useEffect(() => {
    let a = [];
    for(let i = 0;i < favorite.length;i++){
      for(let j = 0;j<context.length;j++){
        if(favorite[i].split("-")[0]+favorite[i].split("-")[1] == context[j].s){
          a.push(context[j])
        }
      }
    }
    setFavorite2(a)
    if (index === 1) {
      setArray(context);
      var filteredData = filterByName(context);
      setArray(filteredData);
    } else {
      var filteredData = filterByName(favorite3);
      setFavorite2(filteredData);
    }


  }, [btcPrice, ethPrice, dogePrice, search]);

  return (
    <Container>
      <Header insets={insets.top}>
      </Header>
      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIndex(0);
            }}
            style={{ marginRight: 10 }}
          >
            {index === 0 ? (
              <HeaderTitleTextClicked>自選</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>自選</HeaderTitleText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIndex(1);
            }}
          >
            {index === 1 ? (
              <HeaderTitleTextClicked>合約</HeaderTitleTextClicked>
            ) : (
              <HeaderTitleText>合約</HeaderTitleText>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <TextInput
            ref={TextEl}
            placeholder={"搜尋"}
            value={search}
            onChangeText={search => setSearch(search)}
            placeholderTextColor={"#8D97A2"}
            autoCorrect={false}
            style={{
              backgroundColor: "#242D37",
              width: "90%",
              height: 36,
              color: "#F4F5F6",
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
              paddingLeft: 12,
              marginBottom: 20
            }}
          />
          <Pressable
            style={{
              backgroundColor: "#242D37",
              height: 36,
              width: "10%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              TextEl.current!.blur();
              TextEl.current!.clear();
              setSearch("");
            }}
          >
            {search.length != 0 && (
              <Image
                source={require("../../assets/images/trade/cancel.png")}
                style={{ width: 25, height: 25 }}
              />
            )}
          </Pressable>
        </View>
        {index === 0 ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
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
            {(favorite[0] == "" || favorite.length === 0) && (
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: 18,
                  marginTop: 20
                }}
              >
                尚未加入自選
              </Text>
            )}
            {favorite[0] != "" && favorite2.map((x: any) => {
              return (
                <>
                  {x.s === "BTCUSDT" ? (
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                        alignItems: "center"
                      }}
                      onPress={() => {
                        navigation.navigate("Trade");
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <TouchableOpacity
                          onPress={async () => {
                            let token = await AsyncStorage.getItem("token")
                            if(token){
                              if (favorite.includes("BTC-USDT")) {
                                api
                                  .deleteData("/investor/favorite", {
                                    symbol: "BTC-USDT"
                                  })
                                  .then(x => {
                                    if (x.status != 400) {
                                      getFavorite();
                                    } else if (x.status != 401) {
                                      alert("登入過期請重新登入")
                                      AsyncStorage.removeItem("token")
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  });
                              } else {
                                api
                                  .postData("/investor/favorite", {
                                    symbol: "BTC-USDT"
                                  })
                                  .then(x => {
                                    if (x.status != 400) {
                                      getFavorite();
                                    } else if (x.status != 401) {
                                      alert("登入過期請重新登入")
                                      AsyncStorage.removeItem("token")
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  });
                              }
                            }
                            
                          }}
                        >
                          <Image
                            source={require("../../assets/images/market/star-y.png")}
                            style={{ width: 24, height: 24, marginRight: 5 }}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: "#F4F5F6",
                            fontSize: 15,
                            fontWeight: "400"
                          }}
                        >
                          {x.s}
                        </Text>
                      </View>

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
                            style={{
                              color: "#F4F5F6",
                              fontSize: 15,
                              fontWeight: "400"
                            }}
                          >
                            {x.c}
                          </Text>
                          <Text
                            style={{
                              color: "#8D97A2",
                              fontSize: 12,
                              fontWeight: "400"
                            }}
                          >
                            {x.v}
                          </Text>
                        </View>
                        {parseFloat(x.P) > 0 ? (
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
                            <Text style={{ color: "white" }}>+{x.P}%</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 88,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              backgroundColor: "#FB4C51",
                              borderRadius: 4,
                              alignItems: "center"
                            }}
                          >
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
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
                        <TouchableOpacity
                          onPress={() => {
                            if (favorite.includes(x.s.split("USDT")[0]+"-USDT")) {
                              api
                                .deleteData("/investor/favorite", {
                                  symbol: x.s.split("USDT")[0]+"-USDT"
                                })
                                .then(x => {
                                  if (x.status != 400) {
                                    getFavorite();
                                  } else {
                                    alert(x.data.msg);
                                  }
                                });
                            } else {
                              api
                                .postData("/investor/favorite", {
                                  symbol: x.s.split("USDT")[0]+"-USDT"
                                })
                                .then(x => {
                                  if (x.status != 400) {
                                    getFavorite();
                                  } else {
                                    alert(x.data.msg);
                                  }
                                });
                            }
                          }}
                        >
                          <Image
                            source={require("../../assets/images/market/star-y.png")}
                            style={{ width: 24, height: 24, marginRight: 5 }}
                          />
                          {/* {x.name === "DOGEUSDT" && doge && <Image
                        source={require("../../assets/images/market/star-y.png")}
                        style={{ width: 24, height: 24,marginRight:5 }}
                      />}
                    {x.name === "DOGEUSDT" && !doge && <Image
                      source={require("../../assets/images/market/star.png")}
                      style={{ width: 24, height: 24,marginRight:5 }}
                    />} */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: "#F4F5F6",
                            fontSize: 15,
                            fontWeight: "400"
                          }}
                        >
                          {x.s}
                        </Text>
                      </View>
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
                            style={{
                              color: "#F4F5F6",
                              fontSize: 15,
                              fontWeight: "400"
                            }}
                          >
                            {x.c}
                          </Text>
                          <Text
                            style={{
                              color: "#8D97A2",
                              fontSize: 12,
                              fontWeight: "400"
                            }}
                          >
                            {x.v}
                          </Text>
                        </View>
                        {parseFloat(x.P) > 0 ? (
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
                            <Text style={{ color: "white" }}>+{x.P}%</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 88,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              backgroundColor: "#FB4C51",
                              borderRadius: 4,
                              alignItems: "center"
                            }}
                          >
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
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
            <ScrollView contentContainerStyle={{paddingBottom:150}}>
            {arr.map((x: any) => {
              return (
                <>
                  {x.s === "BTCUSDT" ? (
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                        alignItems: "center"
                      }}
                      onPress={() => {
                        navigation.navigate("Trade");
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <TouchableOpacity
                          onPress={async () => {
                            let token = await AsyncStorage.getItem("token")
                            if(token){
                              if (favorite.includes(x.s.split("USDT")[0]+"-USDT")) {
                                api
                                  .deleteData("/investor/favorite", {
                                    symbol: "BTC-USDT"
                                  })
                                  .then(x => {
                                    if (x.status != 400) {
                                      getFavorite();
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  });
                              } else {
                                api
                                  .postData("/investor/favorite", {
                                    symbol: "BTC-USDT"
                                  })
                                  .then(x => {
                                    if (x.status != 400) {
                                      getFavorite();
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  });
                              }
                            }else{
                              alert("請先登入")
                            }
                            
                          }}
                        >
                          {favorite.includes(x.s.split("USDT")[0]+"-USDT") ? (
                            <Image
                              source={require("../../assets/images/market/star-y.png")}
                              style={{ width: 24, height: 24, marginRight: 5 }}
                            />
                          ) : (
                            <Image
                              source={require("../../assets/images/market/star.png")}
                              style={{ width: 24, height: 24, marginRight: 5 }}
                            />
                          )}
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: "#F4F5F6",
                            fontSize: 15,
                            fontWeight: "400"
                          }}
                        >
                          {x.s}
                        </Text>
                      </View>

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
                            style={{
                              color: "#F4F5F6",
                              fontSize: 15,
                              fontWeight: "400"
                            }}
                          >
                            {x.c}
                          </Text>
                          <Text
                            style={{
                              color: "#8D97A2",
                              fontSize: 12,
                              fontWeight: "400"
                            }}
                          >
                            {x.v}
                          </Text>
                        </View>
                        {parseFloat(x.P) > 0 ? (
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
                            <Text style={{ color: "white" }}>+{x.P}%</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 88,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              backgroundColor: "#FB4C51",
                              borderRadius: 4,
                              alignItems: "center"
                            }}
                          >
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
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
                        <TouchableOpacity
                          onPress={async () => {
                            let token = await AsyncStorage.getItem("token")
                            if(token){
                            if (favorite.includes(x.s.split("USDT")[0]+"-USDT")) {
                              api
                                .deleteData("/investor/favorite", {
                                  symbol: x.s.split("USDT")[0]+"-USDT"
                                })
                                .then(x => {
                                  if (x.status != 400) {
                                    getFavorite();
                                  } else {
                                    alert(x.data.msg);
                                  }
                                });
                            } else {
                              console.log(x.s.split("USDT")[0]+"-USDT")
                              api
                                .postData("/investor/favorite", {
                                  symbol: x.s.split("USDT")[0]+"-USDT"
                                })
                                .then(x => {
                                  if (x.status != 400) {
                                    getFavorite();
                                  } else {
                                    alert(x.data.msg);
                                  }
                                });
                            }
                          }else{
                            alert("請先登入")
                          }
                          }}
                        >
                          {favorite.includes(x.s.split("USDT")[0]+"-USDT") ? (
                            <Image
                              source={require("../../assets/images/market/star-y.png")}
                              style={{ width: 24, height: 24, marginRight: 5 }}
                            />
                          ) : (
                            <Image
                              source={require("../../assets/images/market/star.png")}
                              style={{ width: 24, height: 24, marginRight: 5 }}
                            />
                          )}
                          {/* {x.name === "DOGEUSDT" && doge && <Image
                        source={require("../../assets/images/market/star-y.png")}
                        style={{ width: 24, height: 24,marginRight:5 }}
                      />}
                    {x.name === "DOGEUSDT" && !doge && <Image
                      source={require("../../assets/images/market/star.png")}
                      style={{ width: 24, height: 24,marginRight:5 }}
                    />} */}
                        </TouchableOpacity>
                        <Text
                          style={{
                            color: "#F4F5F6",
                            fontSize: 15,
                            fontWeight: "400"
                          }}
                        >
                          {x.s}
                        </Text>
                      </View>
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
                            style={{
                              color: "#F4F5F6",
                              fontSize: 15,
                              fontWeight: "400"
                            }}
                          >
                            {x.c}
                          </Text>
                          <Text
                            style={{
                              color: "#8D97A2",
                              fontSize: 12,
                              fontWeight: "400"
                            }}
                          >
                            {x.v}
                          </Text>
                        </View>
                        {parseFloat(x.P) > 0 ? (
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
                            <Text style={{ color: "white" }}>+{x.P}%</Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 88,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              backgroundColor: "#FB4C51",
                              borderRadius: 4,
                              alignItems: "center"
                            }}
                          >
                            <Text style={{ color: "white" }}>{x.P}%</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </>
              );
            })}
            </ScrollView>
          </>
        )}
        

        {/* <TouchableOpacity
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
            {parseFloat(btcRate) > 0 ? <View
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
            </View>:<View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FB4C51",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>{btcRate}%</Text>
            </View>}
            
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
            {parseFloat(ethRate) > 0 ? <View
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
            </View>:<View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FB4C51",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>{ethRate}%</Text>
            </View>}
          </View>
        </View>
        <View */}
        {/* style={{
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
            {parseFloat(dogeRate) > 0 ? <View
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
            </View>:<View
              style={{
                width: 88,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FB4C51",
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>{dogeRate}%</Text>
            </View>}
          </View>
        </View> */}
      </View>
    </Container>
  );
};

export default MarketScreen;
