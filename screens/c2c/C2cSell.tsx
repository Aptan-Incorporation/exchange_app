import * as React from "react"
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import C2cSellFirst from "../../components/c2c/sell/C2cSellFirst";
import C2cSellSecond from "../../components/c2c/sell/C2cSellSecond";
import C2cSellLast from "../../components/c2c/sell/C2cSellLast";
import CountdownTimer from "../../components/c2c/CountdownTimer";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage'

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
    justify-content: space-between;
`;

const HeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #18222D;
padding-top: 12px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
`;

const PreviousIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const HeaderEmptyContainer = styled(View)`
width: 28px;
height: 28px;
`;

const ProgressBarContainer = styled(View)`
display: flex;
flex-direction: row;
`;

const ProgressBarElseLine = styled(View)`
height: 4px;
background-color: ${props => props.theme.color.DarkGray};
`;

const TopContainer = styled(View)`
display: flex;
flex-direction: column;
background-color: #18222D;
`;

const TopInColumnContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const TopContainerTitleText = styled(Text)`
font-weight: 600;
font-size: 24px;
line-height: 36px;
color: ${props => props.theme.color.White};
`;

const TopContainerTimerContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 4px;
`;

const TopContainerTimerText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: #FABD43;
`;

const TopContainerTimerMiddleText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
`;

const TopContainerDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 4px;
`;



const C2cSellScreen = ({ navigation, route }: RootStackScreenProps<"C2cSellScreen">) => {

    const insets = useSafeAreaInsets();

    // Props From Previous Screen
    const { Id } = route.params; // 購買商品ID
    const { MyUSD } = route.params; //帳戶剩餘資產
    const { Owner } = route.params; // 售出者
    const { CryptoAsset } = route.params; // USDT, BTC..
    const { FiatCurrency } = route.params; //法幣
    const { SuccessRate } = route.params; // 成功率
    const { AvailableNum } = route.params; // 數量
    const { LimitFrom } = route.params; // 限額
    const { LimitTo } = route.params; // 限額
    const { Price } = route.params; // 單價
    const { Payments } = route.params; // 付款方式Array

    // 先用假資料等之後再將Payments Array內容轉成以下
    const payTypeAccount = true; // 帳戶付款 Boolean
    const payTypeTouchnGo = true; // TouchnGo付款 Boolean
    const payTypePpay = true; // Ppay付款 Boolean

    // Input Price
    const [inputPrice, setInputPrice] = useState("");

    // Input Number
    const [inputNumber, setInputNumber] = useState("");

    // 購買流程
    const [swapPage, setSwapPage] = useState(1);

    // 購買單號
    const [buyId, setBuyId] = useState("");

    // 選擇付款方式
    const [choosePayType, setChoosePaytype] = useState("Account");

    // 訂單時間
    const [buyTime, setBuyTime] = useState(Number);

    // Countdown Timer (Import CountdownTimer)
    const FIVEMINUTES = 15 * 60 * 1000;

    // USER INFO
    const [account, setAccount] = useState("");
    const [userId, setUserId] = useState("");
    const [buyFeeRate, setBuyFeeRate] = useState();
    const [sellFeeRate, setSellFeeRate] = useState();
    const [userWalletBalance, setUserWalletBalance] = useState(Object);

    // 付款確認 等待放行
    const [isWaitFinish, setIsWaitFinish] = useState(0);
    // Countdown Timer (Import CountdownTimer) ms
    const [payTimeLimit, setPayTimeLimit] = useState(Number);



    const getUserInfo = () => {
        api.get(`/otc/api/user/${account}`).then((x) => {

            if (x.status != 400 && x.status != 401) {
                setBuyFeeRate(x.buyFeeRate);
                setSellFeeRate(x.sellFeeRate);
                /* setUserWalletBalance(x.wallet.coins.find((x: any) => x.symbol === CryptoAsset).balance); */
                setUserWalletBalance('500');
            }
        })
    };

    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        let user = await AsyncStorage.getItem("user")
        setAccount(JSON.parse(user!).account)
        setUserId(JSON.parse(user!).userId)

        if (token) {
            getUserInfo()
        }
    }, [])



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container insets={insets.top}>
                <HeaderContainer>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <PreviousIcon source={require("../../assets/images/global/previous.png")} />
                    </TouchableOpacity>
                    <HeaderTitleText>出售 {CryptoAsset}</HeaderTitleText>
                    <HeaderEmptyContainer></HeaderEmptyContainer>
                </HeaderContainer>
                {
                    swapPage === 1 &&
                    <C2cSellFirst
                        Id={Id}
                        MyCurrency={userWalletBalance}
                        Owner={Owner}
                        Account={account}
                        CurrencyType={CryptoAsset}
                        FiatCurrency={FiatCurrency}
                        SuccessRate={SuccessRate}
                        AvailableNum={AvailableNum}
                        LimitFrom={LimitFrom}
                        LimitTo={LimitTo}
                        Price={Price}
                        PayTypeAccount={payTypeAccount}
                        PayTypeTouchnGo={payTypeTouchnGo}
                        PayTypePpay={payTypePpay}
                        Payments={Payments}
                        onValueChangeInputPrice={setInputPrice}
                        onValueChangeInputNumber={setInputNumber}
                        onChangeSetSwapPage={setSwapPage}
                        onValueChangeSetBuyId={setBuyId}
                        onValueChangeSetBuyTime={setBuyTime}
                        onValueChangeIsWaitFinish={setIsWaitFinish}
                        onValueChangePayTimeLimit={setPayTimeLimit}
                    />
                }
                {
                    swapPage === 2 &&
                    (isWaitFinish === 0 &&
                        <TopContainer>
                            <ProgressBarContainer>
                                <LinearGradient colors={['#A8C2DC', '#6699CC']} style={{
                                    height: 4,
                                    width: '33%'
                                }}>
                                </LinearGradient>
                                <ProgressBarElseLine style={{ width: '67%' }}></ProgressBarElseLine>
                            </ProgressBarContainer>
                            <TopInColumnContainer>
                                <TopContainerTitleText>等待付款</TopContainerTitleText>
                                <TopContainerTimerContainer>
                                    <CountdownTimer targetDate={payTimeLimit} />
                                </TopContainerTimerContainer>
                            </TopInColumnContainer>
                        </TopContainer>)
                }
                {
                    swapPage === 2 &&
                    (isWaitFinish === 1 &&
                        <TopContainer>
                            <ProgressBarContainer>
                                <LinearGradient colors={['#A8C2DC', '#6699CC']} style={{
                                    height: 4,
                                    width: '66%'
                                }}>
                                </LinearGradient>
                                <ProgressBarElseLine style={{ width: '34%' }}></ProgressBarElseLine>
                            </ProgressBarContainer>
                            <TopInColumnContainer>
                                <TopContainerTitleText>買方已付款，請放行</TopContainerTitleText>
                                <TopContainerTimerContainer>
                                    <CountdownTimer targetDate={payTimeLimit} />
                                </TopContainerTimerContainer>
                            </TopInColumnContainer>
                        </TopContainer>)
                }
                {
                    swapPage === 3 &&
                    (isWaitFinish === 2 &&
                        <TopContainer>
                            <ProgressBarContainer>
                                <LinearGradient colors={['#A8C2DC', '#6699CC']} style={{
                                    height: 4,
                                    width: '100%'
                                }}>
                                </LinearGradient>
                                <ProgressBarElseLine style={{ width: '0%' }}></ProgressBarElseLine>
                            </ProgressBarContainer>
                            <TopInColumnContainer>
                                <TopContainerTitleText>訂單已完成</TopContainerTitleText>
                                <TopContainerDetailText>出售的加密貨幣已從您的現貨資產扣除</TopContainerDetailText>
                            </TopInColumnContainer>
                        </TopContainer>)
                }
                {
                    swapPage === 2 &&
                    <C2cSellSecond
                        Id={Id}
                        MyUSD={MyUSD}
                        Account={Account}
                        CurrencyType={CurrencyType}
                        SuccessRate={SuccessRate}
                        AvailableNum={AvailableNum}
                        LimitFrom={LimitFrom}
                        LimitTo={LimitTo}
                        Price={Price}
                        PayTypeAccount={payTypeAccount}
                        PayTypeTouchnGo={payTypeTouchnGo}
                        PayTypePpay={payTypePpay}
                        BuyPrice={inputPrice}
                        BuyNumber={inputNumber}
                        ChosenPayType={choosePayType}
                        BuyId={buyId}
                        onChangeSetSwapPage={setSwapPage}
                        onChangeISWaitFinish={setIsWaitFinish}
                    />
                }
                {
                    swapPage === 3 &&
                    <C2cSellLast
                        Id={Id}
                        MyUSD={MyUSD}
                        CurrencyType={CurrencyType}
                        Price={Price}
                        BuyPrice={inputPrice}
                        BuyNumber={inputNumber}
                        BuyID={buyId}
                        ChosenPayType={choosePayType}
                        BuyTime={buyTime}
                    />
                }
            </Container>
        </TouchableWithoutFeedback>
    )

}
export default C2cSellScreen
