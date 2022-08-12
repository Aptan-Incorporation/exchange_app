import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, SafeAreaView, Button, Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState,useEffect,useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay'
import { PositionContext } from "../../App"

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    width: 100%;
    background-color: #18222D;
    flex:1;
    padding-top: ${props => props.insets}px;
    padding-left:16px;
    padding-right:16px;
`;

const Row = styled(View)`
  display:flex;
  flex-direction: row;
  align-items:center;
  /* padding:16px; */
  padding-top:16px;
  padding-bottom:16px;
`;

const TitleTitle = styled(Text)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.4px;
    color: #18222D;
`;

const Number = styled(Text)`
   /* font-family: 'SF Pro Display'; */
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: #18222D;
`;

const ValueText = styled(Text)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.4px;
    color: #18222D;
`;

const TopArea = styled(View)`
  /* margin-top:20px; */
  margin:16px;
`;

const BG0 = styled(View)`
    /* background: linear-gradient(90deg, #A8C2DC 0%, #6699CC 100%); */
    background: #6699CC; 
    border-radius: 8px;
    margin-top:20px;

`;

const BG000 = styled(View)`
   background: #A8C2DC;
   padding:20px;
   width:100%;
   border-top-left-radius: 8px;
   border-top-right-radius: 8px;

`;

const Body = styled(View)`
 margin-top:30px;
 
`;

const NumArea = styled(View)`
  display:flex;
  flex-direction:row;
  align-items:baseline;
`;



const Content = styled(View)`
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    margin-top:30px;
`;

const Num1 = styled(Text)`
    /* font-family: 'SF Pro Display'; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    /* letter-spacing: 0.002em; */
    color: #F4F5F6;
`;

const BG1 = styled(View)`
    /* gradient(97.81deg, #333C47 0%, #242D37 100%); */
    background:#242D37;
    border-radius: 8px;
    /* padding:20px; */
    width:100%;
`;

const BG001 = styled(View)`
   background: #333C47;
   border-top-left-radius: 8px;
   border-top-right-radius: 8px;
   padding:20px;
   width:100%;
   display:flex;
   flex-direction:row;
   justify-content:space-between;


`;

const Title = styled(Text)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.4px; */
    color: #FFFFFF;
`;

const Title1 = styled(Text)`
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    /* letter-spacing: 0.4px; */
    color: #FFFFFF;

`;


const Number0 = styled(Number)`
    /* font-family: 'SF Pro Display'; */
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: #18222D;
`;

const Number01 = styled(Number)`
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    /* letter-spacing: 0.004em; */
    color: #333C47;

`;

const USDT = styled(Text)`
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    /* letter-spacing: 0.004em; */
    color: #18222D;
    margin-top:13px;
`;

const USDTcontent = styled(View)`
  display:flex;
  flex-direction: row;
`;

const Number001 = styled(Number)`
    /* font-family: 'SF Pro Display'; */
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    color: #F4F5F6;

`;

const USDT1 = styled(Text)`
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    /* letter-spacing: 0.004em; */
    color: #F4F5F6;
    margin-top:13px;
`;

const Number1 = styled(Text)`
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    /* letter-spacing: 0.004em; */
    color: rgb(141, 151, 162);
`;

const Img1 = styled(Image)`
  width:28px;
  height:28px;
`;

const Background01 = styled(View)`
 background: #18222D;
 margin-top:20px;
 /* height:200px; */
`;

const ButtonArea = styled(View)`
    display:flex;
    justify-content: space-between;
    flex-direction:row;
`;

const Withdraw = styled(TouchableOpacity)`
    
    background: #3D6A97;
   border-radius: 4px;
   width:30%;
   height:38px;
   margin-top:20px;
`;

const Recharge = styled(TouchableOpacity)`
    border: 1px solid #6699CC;
    /* box-sizing: border-box; */
    border-radius: 4px;
    width:30%;
    height:38px;
    align-items: center;
    display:flex;
    justify-content: center;
    margin-top:20px;

`;

const WithdrawText = styled(Text)`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    /* letter-spacing: 0.012em; */
    color: #FFFFFF;
`;

const RechargeText = styled(Text)`
    
    line-height:38px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    /* letter-spacing: 0.012em; */
    color: #6699CC;

`;

const BelowArea1 = styled(View)`
  margin-top:30px;
`;


const Img2 = styled(Image)`
  width: 28px;
  height:28px;
  margin-top:3px;

`;

const Below1 = styled(View)`
  margin-top:10px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
`;
const Below = styled(View)`
  margin-top:40px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;

 
`;

const Text1 = styled(Text)`
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    /* line-height: 18px; */
    /* letter-spacing: 0.004em; */
    color: #FFFFFF;
`;

const Text01 = styled(Text)`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    /* line-height: 15px; */
    /* letter-spacing: 0.004em; */
    color: #8D97A2;
`;

const Num = styled(Text)`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    /* letter-spacing: 0.004em; */
    color: #F4F5F6;
    /* margin-left:180px; */
`;

const ImgArea = styled(View)`
  display:flex;
  justify-content: space-between;
  flex-direction:row;

`;



const TextContener = styled(View)`
   margin-left:20px; 

`;

// Trade Page Position Style
const TradePositionContainer = styled(ScrollView)`
/* display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 280px; */
`;

const TradePositionBackgroundImage = styled(Image)`
width: 99px;
height: 135px;
`;

const TradePositionCardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const TradePositionCardTitleContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
`;

const TradePositionCardTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const TradePositionCardTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const TradePositionCardTitleValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradePositionCardDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
padding-top: 12px;
`;

const TradePositionCardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 50%;
`;

const TradePositionCardSmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradePositionCardBigValueText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const TradePositionCardSmallValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradePositionCardButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 12px;
`;

const TradePositionCardButton = styled(TouchableOpacity)`
height: 26px;
width: 48%;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
`;

const TradePositionCardButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;


const WalletScreen = ({
    navigation
}: RootStackScreenProps<"WalletScreen">) => {
    const [index, setIndex] = useState(0)
    const insets = useSafeAreaInsets();
    const [futuresBalance,setFuturesBalance] = useState(0)
    const [spotBalance,setSpotBalance] = useState(0)
    const [totalBalance,setTotalBalance] = useState(0)
    const [position,setPosition] = useState(0)
    // const [positionArray,setPositionArray] = useState([])
    const [loading,setLoading] = useState(false);
    const [balance,setBalance] = useState(0)
    const [total,setTotal] = useState(0)
    const positionArray = useContext(PositionContext)

    const getBalance = async () => {
        api.get("/investor/property").then(x=>{
            if(x.status != 400 && x.status != 401){
                setFuturesBalance(x.data.futures.balance)
                setTotalBalance(x.data.spot.equityValue)
                for(let i = 0 ;i<x.data.spot.coins.length ; i++){
                    if(x.data.spot.coins[i].symbol === "USDT"){
                        setSpotBalance(x.data.spot.coins[i].balance)
                    } 
                }
            }
        })
        let user = await AsyncStorage.getItem("user");
        api.get("/otc/api/user/"+JSON.parse(user!).account).then(x=>{
            console.log(x.wallet.coins)
            for(let i =0 ; i < x.wallet.coins.length;i++){
                if(x.wallet.coins[i].symbol === "USDT"){
                    setBalance(x.wallet.coins[i].balance)
                }
            }
        })
        
    };

    const getPosition = () => {
        api.get("/investor/position").then((x) => {
            // setPositionArray(x.data)
            if(x.status != 400 && x.status != 401){
                if(x.data.length != 0){
                    setPosition(x.data[0].profitAndLoss)                
                }
            }
        })
    }
    const isFocused = useIsFocused();

    useEffect(async ()=>{
        if(isFocused){
            let token = await AsyncStorage.getItem("token")
            if(!token){
                setFuturesBalance(0)
                setTotalBalance(0)
                setSpotBalance(0)
                setPosition(0)
                // setPositionArray([])
            }
            if(token){
                getBalance()
                getPosition()
            }

            const interval = setInterval(() => {
                if(token){
                    getBalance()
                    getPosition()
                }
            }, 2000);
            return () => clearInterval(interval); 

        }
        
        
    },[isFocused])
    return (
        <Container insets={insets.top}>
            {loading && 
                <Spinner visible={true} textContent={''} />
            }
            <Row>
                <TouchableOpacity onPress={() => setIndex(0)} style={{marginRight:24}}>
                    <Text style={index === 0 ? {color:"white",fontSize:20,fontWeight:"600"} : {color:"#5C6670",fontSize:16,fontWeight:"600"}}>總覽</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(1)} style={{marginRight:24}}>
                    <Text style={index === 1 ? {color:"white",fontSize:20,fontWeight:"600"} : {color:"#5C6670",fontSize:16,fontWeight:"600"}}>現貨</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(2)} style={{marginRight:24}}>
                    <Text style={index ===2 ? {color:"white",fontSize:20,fontWeight:"600"} : {color:"#5C6670",fontSize:16,fontWeight:"600"}}>合約</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIndex(3)}>
                    <Text style={index === 3 ? {color:"white",fontSize:20,fontWeight:"600"} : {color:"#5C6670",fontSize:16,fontWeight:"600"}}>法幣</Text>
                </TouchableOpacity>
            </Row>
            {index === 0 &&
                <>
                    <BG0>
                        <BG000>
                            <TitleTitle>總價值</TitleTitle>
                        </BG000>
                        <TopArea>
                            <USDTcontent>
                                <Number>{totalBalance} </Number>
                                <USDT>USDT</USDT>
                            </USDTcontent>
                        </TopArea>
                    </BG0>

                    <Body>
                        <Content>
                            <Title>現貨</Title>
                            <NumArea>
                                <Num1>{totalBalance} </Num1>
                                <Text style={{color:"#F4F5F6",fontSize:12,fontWeight:"400"}}>USDT</Text>
                            </NumArea>
                        </Content>

                        <Content>
                            <Title>合約</Title>
                            <NumArea>
                                <Num1>{futuresBalance} </Num1>
                                <Text style={{color:"#F4F5F6",fontSize:12,fontWeight:"400"}}>USDT</Text>

                            </NumArea>
                        </Content>

                        <Content>
                            <Title>法幣</Title>
                            <NumArea>
                                <Num1>0 </Num1>
                                <Text style={{color:"#F4F5F6",fontSize:12,fontWeight:"400"}}>USDT</Text>
                            </NumArea>
                        </Content>
                    </Body>
                </>
            }
            {index === 1 &&
                <>
                    <Background01>
                        <BG1>
                            <BG001>
                                <Title1>總估價</Title1>
                                <TouchableOpacity onPress={()=>{navigation.navigate("History")}}>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>{totalBalance} </Number001>
                                    <USDT1>USDT</USDT1>
                                </USDTcontent>
                            </TopArea>
                        </BG1>

                        <ButtonArea>

                            <Withdraw onPress={()=>{
                                navigation.navigate("Recharge")
                            }}>
                                <WithdrawText>充值</WithdrawText>
                            </Withdraw>


                            <Recharge onPress={()=>{
                                navigation.navigate("Withdraw")
                            }}>
                                <RechargeText>提現</RechargeText>
                            </Recharge>

                            <Recharge onPress={()=>{
                                navigation.navigate("Funds")
                            }}>
                                <RechargeText>劃轉</RechargeText>
                            </Recharge>

                        </ButtonArea>
                    </Background01>

                    <BelowArea1>
                        <Below1>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/usdt.png")} />
                                <TextContener>
                                    <Text1>USDT</Text1>
                                    <Text01>TetherUS</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>{spotBalance}</Num>
                        </Below1>
                        {/* <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/btc.png")} />
                                <TextContener>
                                    <Text1>BTC</Text1>
                                    <Text01>Bitcoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>33,720.87</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/eth.png")} />
                                <TextContener>
                                    <Text1>ETH</Text1>
                                    <Text01>Ethereum</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>25,000.00</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/doge.png")} />
                                <TextContener>
                                    <Text1>DOGE</Text1>
                                    <Text01>Dogecoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>14,000.00</Num>
                        </Below> */}
                    </BelowArea1>
                    {/* <TouchableOpacity style={{ backgroundColor: "#3D6A97",borderRadius:4,justifyContent:"center",display:"flex",flexDirection:"row",padding:12,marginTop:20}}>
                        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>資金劃轉</Text>
                    </TouchableOpacity> */}
                </>
            }
            {index === 2 &&
                <>
                    <Background01>
                        <BG1>
                            <BG001>
                                <Title1>總資產</Title1>
                                <TouchableOpacity  onPress={()=>{navigation.navigate("History")}}>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>{futuresBalance} </Number001>
                                    <USDT1>USDT</USDT1>
                                </USDTcontent>
                            </TopArea>
                        </BG1>
                    </Background01>

                    <BelowArea1>
                        <Below1>
                            <ImgArea>
                                <View>
                                    <Text1>保證金餘額</Text1>
                                </View>
                            </ImgArea>
                            <Num>{futuresBalance}</Num>
                        </Below1>
                        <Below1  style={{marginTop:30}}>
                            <ImgArea>
                                <View>
                                    <Text1>錢包餘額</Text1>
                                </View>
                            </ImgArea>
                            <Num>{futuresBalance}</Num>
                        </Below1>
                        <Below1  style={{marginTop:30}}>
                            <ImgArea>
                                <View>
                                    <Text1>未實現盈虧</Text1>
                                </View>
                            </ImgArea>
                            <Num>{position}</Num>
                        </Below1>
                        
                    </BelowArea1>
                    <TouchableOpacity style={{ backgroundColor: "#3D6A97",borderRadius:4,justifyContent:"center",display:"flex",flexDirection:"row",padding:12,marginTop:30}}  onPress={()=>{
                                navigation.navigate("Funds")
                            }}>
                        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>資金劃轉</Text>
                    </TouchableOpacity>
                    <TradePositionContainer contentContainerStyle={{paddingBottom:20}}>
                                            {
                                                positionArray.map((x:any, i) => {
                                                    return (
                                                        <TradePositionCardContainer>
                                                            <TradePositionCardTitleContainer>
                                                                <TradePositionCardTitleRowContainer>
                                                                    {x.side === "BUY" ?                                                                    <TradePositionCardTitleText>多 {x.symbol}</TradePositionCardTitleText>
 :                                                                    <TradePositionCardTitleText style={{color:"#FB4C51"}}>空 {x.symbol}</TradePositionCardTitleText>
}
                                                                    <TradePositionCardSmallTitleText>未實現盈虧</TradePositionCardSmallTitleText>
                                                                </TradePositionCardTitleRowContainer>
                                                                <TradePositionCardTitleRowContainer>
                                                                    <TradePositionCardTitleValueText>{x.type === 'FULL' ? '全倉' : '逐倉'} {x.leverage}X</TradePositionCardTitleValueText>
                                                                    {x.profitAndLoss > 0 ? <TradePositionCardBigValueText>{x.profitAndLoss}</TradePositionCardBigValueText>:<TradePositionCardBigValueText style={{color:"#FB4C51"}}>{x.profitAndLoss}</TradePositionCardBigValueText>} 
                                                                </TradePositionCardTitleRowContainer>
                                                            </TradePositionCardTitleContainer>
                                                            <TradePositionCardDetailRowContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>持倉量</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.quantity}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>入場價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.avgPrice}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                            </TradePositionCardDetailRowContainer>
                                                            <TradePositionCardDetailRowContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>標記價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.avgPrice}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>強平價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.forceClose}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                            </TradePositionCardDetailRowContainer>
                                                            <TradePositionCardButtonContainer>
                                                                <TradePositionCardButton onPress={() => { 
                                                                    AsyncStorage.setItem("position",JSON.stringify({position:x}))
                                                                    navigation.push("StopPositionScreen") }}>
                                                                    <TradePositionCardButtonText>止盈/止損</TradePositionCardButtonText>
                                                                </TradePositionCardButton>
                                                                <TradePositionCardButton onPress={()=>{
                                                                    setLoading(true)
                                                                    api.postData("/order/position/close-position",{positionId:x.positionId}).then(x=>{
                                                                        setLoading(false)
                                                                        if(x.status !== 400){
                                                                           getPosition()
                                                                           getBalance() 
                                                                        }else{
                                                                            Alert.alert(x.data.msg)
                                                                        }
                                                                    })
                                                                }}>
                                                                    <TradePositionCardButtonText>平倉</TradePositionCardButtonText>
                                                                </TradePositionCardButton>
                                                            </TradePositionCardButtonContainer>
                                                        </TradePositionCardContainer>
                                                    )
                                                })
                                            }
                                        </TradePositionContainer>
                </>
            }
            {index === 3 &&
                <>
                    <Background01>
                        <BG1>
                            <BG001>
                                <Title1>總資產</Title1>
                                <TouchableOpacity  onPress={()=>{navigation.navigate("C2cHistoryScreen")}}>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>{balance} </Number001>
                                    <USDT1>USDT</USDT1>
                                </USDTcontent>
                            </TopArea>
                        </BG1>

                        <ButtonArea>

                            <Withdraw style={{width:"45%"}}>
                                <WithdrawText>充值</WithdrawText>
                            </Withdraw>


                            <Recharge style={{width:"45%"}}>
                                <RechargeText>提現</RechargeText>
                            </Recharge>

                        </ButtonArea>
                    </Background01>

                    <BelowArea1>
                        <Below1>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/usdt.png")} />
                                <TextContener>
                                    <Text1>USDT</Text1>
                                    <Text01>TetherUS</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>{balance}</Num>
                        </Below1>
                        {/* <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/btc.png")} />
                                <TextContener>
                                    <Text1>BTC</Text1>
                                    <Text01>Bitcoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>33,720.87</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/eth.png")} />
                                <TextContener>
                                    <Text1>ETH</Text1>
                                    <Text01>Ethereum</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>25,000.00</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/images/wallet/doge.png")} />
                                <TextContener>
                                    <Text1>DOGE</Text1>
                                    <Text01>Dogecoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>14,000.00</Num>
                        </Below> */}
                    </BelowArea1>
                    {/* <TouchableOpacity style={{ backgroundColor: "#3D6A97",borderRadius:4,justifyContent:"center",display:"flex",flexDirection:"row",padding:12,marginTop:20}}>
                        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>資金劃轉</Text>
                    </TouchableOpacity> */}
                </>
            }



        </Container>
    )
}

export default WalletScreen