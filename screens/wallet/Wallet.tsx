import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, SafeAreaView, Button, Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";


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
    font-family: 'PingFang TC';
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
    font-family: 'PingFang TC';
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
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.4px; */
    color: #FFFFFF;
`;

const Title1 = styled(Text)`
    font-family: 'PingFang TC';
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
        font-family: 'PingFang TC';
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
    font-family: 'PingFang TC';
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



const WalletScreen = ({
    navigation
}: RootStackScreenProps<"WalletScreen">) => {
    const [index, setIndex] = useState(0)
    const insets = useSafeAreaInsets();

    return (
        <Container insets={insets.top}>
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
                                <Number>159,186.24 </Number>
                                <USDT>USDT</USDT>
                            </USDTcontent>
                        </TopArea>
                    </BG0>

                    <Body>
                        <Content>
                            <Title>現貨</Title>
                            <NumArea>
                                <Num1>107,967.92 </Num1>
                                <Text style={{color:"#F4F5F6",fontSize:12,fontWeight:"400"}}>USDT</Text>
                            </NumArea>
                        </Content>

                        <Content>
                            <Title>合約</Title>
                            <NumArea>
                                <Num1>16,942.65 </Num1>
                                <Text style={{color:"#F4F5F6",fontSize:12,fontWeight:"400"}}>USDT</Text>

                            </NumArea>
                        </Content>

                        <Content>
                            <Title>法幣</Title>
                            <NumArea>
                                <Num1>107,652.28 </Num1>
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
                                <TouchableOpacity>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>107,967.92 </Number001>
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
                            <Num>56,310.25</Num>
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
                                <TouchableOpacity>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>107,967.92 </Number001>
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
                            <Num>56,310.25</Num>
                        </Below1>
                        <Below1  style={{marginTop:30}}>
                            <ImgArea>
                                <View>
                                    <Text1>錢包餘額</Text1>
                                </View>
                            </ImgArea>
                            <Num>56,310.25</Num>
                        </Below1>
                        <Below1  style={{marginTop:30}}>
                            <ImgArea>
                                <View>
                                    <Text1>未實現盈虧</Text1>
                                </View>
                            </ImgArea>
                            <Num>56,310.25</Num>
                        </Below1>
                        
                    </BelowArea1>
                    <TouchableOpacity style={{ backgroundColor: "#3D6A97",borderRadius:4,justifyContent:"center",display:"flex",flexDirection:"row",padding:12,marginTop:30}}>
                        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>資金劃轉</Text>
                    </TouchableOpacity>
                </>
            }
            {index === 3 &&
                <>
                    <Background01>
                        <BG1>
                            <BG001>
                                <Title1>總資產</Title1>
                                <TouchableOpacity>
                                    <Img1 source={require("../../assets/images/wallet/history.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>107,967.92 </Number001>
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
                            <Num>56,310.25</Num>
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