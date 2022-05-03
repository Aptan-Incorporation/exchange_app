import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, SafeAreaView, Button, Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";


const Container = styled(SafeAreaView)`
    display: flex ;
    flex-direction: column;
    width: 100%;
    background: black;
    flex:1;
`;

const Row = styled(View)`
  display:flex;
  flex-direction: row;
  padding:10px;
`;

const TitleTitle = styled(Text)`
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
  margin-top:20px;

`;

const BG0 = styled(View)`
    /* background: linear-gradient(90deg, #A8C2DC 0%, #6699CC 100%); */
    background: #6699CC; 
    border-radius: 8px;
    padding:20px;
    width:90%;
    margin-left:20px;

`;

const BG000 = styled(View)`
   background: #A8C2DC;
   padding:20px;
   margin-top:-20px;
   width:112%;
   margin-left:-20px;
   border-top-left-radius: 8px;
   border-top-right-radius: 8px;

`;

const BG02 = styled(View)`
    /* background: linear-gradient(90deg, #A8C2DC 0%, #6699CC 100%); */
    background: #6699CC; 
    border-radius: 8px;
    padding:20px;
    width:90%;
    margin-left:20px;

`;

const Body = styled(View)`
 margin-top:30px;
 
`;

const NumArea = styled(View)`
  display:flex;
  flex-direction:column;
  margin-right:26px;
`;



const Content = styled(View)`
 display:flex;
 flex-direction: row;
 justify-content:space-between;
 margin-top:20px;
`;

const Num1 = styled(Text)`
    /* font-family: 'SF Pro Display'; */
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 40px;
    text-align: right;
    /* letter-spacing: 0.002em; */
    color: #F4F5F6;
`;

const Num2 = styled(Text)`
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    /* letter-spacing: 0.004em; */
    color: #8D97A2;

`;

const BG1 = styled(View)`
    /* gradient(97.81deg, #333C47 0%, #242D37 100%); */
    background:#242D37;
    border-radius: 8px;
    padding:20px;
    width:90%;
    height:70%;
    margin-left:20px;

`;

const BG001 = styled(View)`
   background: #333C47;
   border-top-left-radius: 8px;
   border-top-right-radius: 8px;
   padding:20px;
   margin-top:-20px;
   width:112%;
   margin-left:-20px;
   display:flex;
   flex-direction:row;
   justify-content:space-between;


`;

const BG2 = styled(View)`
    

`;

const BG002 = styled(View)`
    

`;


const BG3 = styled(View)`
    

`;

const BG003 = styled(View)`
    

`;

const Title = styled(Text)`
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.4px; */
    color: #FFFFFF;
    margin-top:15px;
    margin-left:30px;
`;

const Title1 = styled(Text)`
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.4px; */
    color: #FFFFFF;

`;
const Title2 = styled(Text)`

`;
const Title3 = styled(Text)`

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
  width:16px;
  height:20px;
`;

const Background01 = styled(View)`
 height:40%;
 background: #18222D;
`;

const ButtonArea = styled(View)`
    display:flex;
    justify-content: space-between;
    flex-direction:row;
  
`;

const Withdraw = styled(TouchableOpacity)`
    border: 1px solid #6699CC;
    /* box-sizing: border-box; */
    border-radius: 4px;
    width:178px;
    height:38px;
    align-items: center;
    display:flex;
    justify-content: center;
    margin-left:20px;
    margin-top:20px;


`;

const Recharge = styled(TouchableOpacity)`
   background: #3D6A97;
   border-radius: 4px;
   width:178px;
   height:38px;
   margin-top:20px;
   margin-right:20px;

`;

const WithdrawText = styled(Text)`
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

const RechargeText = styled(Text)`
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 38px;
    text-align: center;
    /* letter-spacing: 0.012em; */
    color: #FFFFFF;

`;

const BelowArea1 = styled(View)`
  margin-top:30px;
  margin-left:25px;

`;


const Img2 = styled(Image)`
  width: 28px;
  height:28px;


`;

const Below1 = styled(View)`
  margin-top:10px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right:20px;
`;
const Below = styled(View)`
  margin-top:40px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right:20px;
 
`;

const Text1 = styled(Text)`
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.004em; */
    color: #FFFFFF;
`;

const Text01 = styled(Text)`
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    /* letter-spacing: 0.004em; */
    color: #8D97A2;
`;

const Num = styled(Text)`
    font-family: 'SF Pro Text';
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
    return (
        <Container>
            <Row>
                <Button
                    title="總覽"
                    color="white"
                    onPress={() => setIndex(0)}
                />

                <Button
                    title="現貨"
                    color="white"
                    onPress={() => setIndex(1)}
                />

                <Button
                    title="合約"
                    color="white"
                    onPress={() => setIndex(2)}
                />

                <Button
                    title="法幣"
                    color="white"
                    onPress={() => setIndex(3)}
                />
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
                            <ValueText>總價值</ValueText>
                            <Number01>≈ 107,967.92 USD</Number01>
                        </TopArea>
                    </BG0>

                    <Body>
                        <Content>
                            <Title>現貨</Title>
                            <NumArea>
                                <Num1>107,967.92 USDT</Num1>
                                <Num2>≈ 16,942.65 USD</Num2>
                            </NumArea>
                        </Content>

                        <Content>
                            <Title>合約</Title>
                            <NumArea>
                                <Num1>16,942.65 USDT</Num1>
                                <Num2>≈ 107,652.28 USD</Num2>
                            </NumArea>
                        </Content>

                        <Content>
                            <Title>法幣</Title>
                            <NumArea>
                                <Num1>107,652.28 USDT</Num1>
                                <Num2>≈ 107,652.28 USD</Num2>
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
                                    <Img1 source={require("../../assets/wellet/img1.png")} />
                                </TouchableOpacity>
                            </BG001>
                            <TopArea>
                                <USDTcontent>
                                    <Number001>107,967.92 </Number001>
                                    <USDT1>USDT</USDT1>
                                </USDTcontent>
                                <Number1>≈ 107,967.92 USD</Number1>
                            </TopArea>
                        </BG1>

                        <ButtonArea>

                            <Withdraw>
                                <WithdrawText>提現</WithdrawText>
                            </Withdraw>


                            <Recharge>
                                <RechargeText>充值</RechargeText>
                            </Recharge>

                        </ButtonArea>
                    </Background01>

                    <BelowArea1>
                        <Below1>
                            <ImgArea>
                                <Img2 source={require("../../assets/wellet/p1.png")} />
                                <TextContener>
                                    <Text1>USDT</Text1>
                                    <Text01>TetherUS</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>56,310.25</Num>
                        </Below1>
                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/wellet/p2.png")} />
                                <TextContener>
                                    <Text1>BTC</Text1>
                                    <Text01>Bitcoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>33,720.87</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/wellet/p3.png")} />
                                <TextContener>
                                    <Text1>ETH</Text1>
                                    <Text01>Ethereum</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>25,000.00</Num>
                        </Below>

                        <Below>
                            <ImgArea>
                                <Img2 source={require("../../assets/wellet/p4.png")} />
                                <TextContener>
                                    <Text1>DOGE</Text1>
                                    <Text01>Dogecoin</Text01>
                                </TextContener>
                            </ImgArea>
                            <Num>14,000.00</Num>
                        </Below>
                    </BelowArea1>
                </>
            }



        </Container>
    )
}

export default WalletScreen