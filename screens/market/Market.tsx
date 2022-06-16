import { Text, View,SafeAreaView,TouchableOpacity,TextInput,Image,Pressable } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { PriceContext } from "../../App" 
import * as React from "react";
import {useContext,useState,useEffect,useRef } from "react";

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
    const [search, setSearch] = useState("");
    const [arr,setArray] = useState([{
      name:"",
      price:"",
      amount:"",
      rate:""
    }])
    const TextEl = useRef<TextInput | null>(null);
    const filterByName = (filteredData:any) => {
      // Avoid filter for null value
      if (!search) {
        return filteredData;
      }
      
      const filteredCars = filteredData.filter(
        (x:any) => x.name.indexOf(search.toUpperCase()) !== -1
      );
      return filteredCars;
    };

    useEffect(()=>{
      setArray([
        {
          name:"BTCUSDT",
          price:btcPrice,
          amount:btcAmt,
          rate:btcRate
        },
        {
          name:"ETHUSDT",
          price:ethPrice,
          amount:ethAmt,
          rate:ethRate
        },
        {
          name:"DOGEUSDT",
          price:dogePrice,
          amount:dogeAmt,
          rate:dogeRate
        }
      ])
      var filteredData = filterByName([
        {
          name:"BTCUSDT",
          price:btcPrice,
          amount:btcAmt,
          rate:btcRate
        },
        {
          name:"ETHUSDT",
          price:ethPrice,
          amount:ethAmt,
          rate:ethRate
        },
        {
          name:"DOGEUSDT",
          price:dogePrice,
          amount:dogeAmt,
          rate:dogeRate
        }
      ]);
      setArray(filteredData);
    },[btcPrice,ethPrice,dogePrice,search])
  return (
    <Container>
      
      <View style={{paddingHorizontal:16}}>
        <View style={{display:"flex",flexDirection:"row",width:"100%"}}>
        <TextInput
            ref={TextEl}
            placeholder={"搜尋"}
            value={search}
            onChangeText={search => setSearch(search)}
            placeholderTextColor={
              '#8D97A2'
            }
            autoCorrect={false}
            style={{ backgroundColor: '#242D37', width: '90%', height: 36, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12,marginBottom:20 }}
        />
        <Pressable style={{backgroundColor: '#242D37',height:36,width: '10%',display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}} onPress={()=>{
          TextEl.current!.blur()
          TextEl.current!.clear()
          setSearch("")
        }}>
            {search.length != 0 && 
              <Image source={require("../../assets/images/trade/cancel.png")} style={{width:25,height:25}}/>

             }
        </Pressable>
        </View>
        
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
        {
          arr.map((x:any)=>{
            return(
              <>
              {
                x.name === "BTCUSDT" ?
                <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 24,
                  alignItems: "center"
                }}
                onPress={()=>{navigation.navigate("Trade")}}
              >
                <Text style={{ color: "#F4F5F6", fontSize: 15, fontWeight: "400" }}>
                  {x.name}
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
                      {x.price}
                    </Text>
                    <Text
                      style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}
                    >
                      {x.amount}
                    </Text>
                  </View>
                  {parseFloat(x.rate) > 0 ? <View
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
                    <Text style={{ color: "white" }}>+{x.rate}%</Text>
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
                    <Text style={{ color: "white" }}>{x.rate}%</Text>
                  </View>}
                </View>
              </TouchableOpacity> :
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
                {x.name}
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
                    {x.price}
                  </Text>
                  <Text
                    style={{ color: "#8D97A2", fontSize: 12, fontWeight: "400" }}
                  >
                    {x.amount}
                  </Text>
                </View>
                {parseFloat(x.rate) > 0 ? <View
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
                  <Text style={{ color: "white" }}>+{x.rate}%</Text>
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
                  <Text style={{ color: "white" }}>{x.rate}%</Text>
                </View>}
              </View>
            </View>
              }
              
              </>
            )
          })
        }
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
