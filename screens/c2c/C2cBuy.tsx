import * as React from "react"
import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import C2cBuyFirst from "../../components/c2c/buy/C2cBuyFirst";
import C2cBuySecond from "../../components/c2c/buy/C2cBuySecond";
import C2cBuyLast from "../../components/c2c/buy/C2cBuyLast";
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

const TopContainerDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 4px;
`;



const C2cBuyScreen = ({ navigation, route }: RootStackScreenProps<"C2cBuyScreen">) => {

    const insets = useSafeAreaInsets();

    // Props From Previous Screen
    const { Id } = route.params; // 購買商品ID
    const { Owner } = route.params;
    const { CryptoAsset } = route.params; // USDT, BTC..
    const { SuccessRate } = route.params; // 成功率
    const { AvailableNum } = route.params; // 數量
    const { LimitFrom } = route.params; // 限額
    const { LimitTo } = route.params; // 限額
    const { Price } = route.params; // 單價
    const { payTypeAccount } = route.params; // 帳戶付款 Boolean
    const { payTypeTouchnGo } = route.params; // TouchnGo付款 Boolean
    const { payTypePpay } = route.params; // Ppay付款 Boolean

    // Input Price
    const [inputPrice, setInputPrice] = useState("");

    // Input Number
    const [inputNumber, setInputNumber] = useState("");

    // 購買流程
    const [swapPage, setSwapPage] = useState(1);

    // 選擇付款方式
    const [choosePayType, setChoosePaytype] = useState("");


    // USER INFO
    const [account, setAccount] = useState("");
    const [userId, setUserId] = useState("");
    const [buyFeeRate, setBuyFeeRate] = useState();
    const [sellFeeRate, setSellFeeRate] = useState();
    const [userWalletBalance, setUserWalletBalance] = useState(Object);

    // Sent Buy Response
    const [buyId, setBuyId] = useState("");
    const [buyTime, setBuyTime] = useState(Number);
    // 付款確認 等待放行
    const [isWaitFinish, setIsWaitFinish] = useState(0);
    // Countdown Timer (Import CountdownTimer) ms
    const [payTimeLimit, setPayTimeLimit] = useState(Number);



    const getUserInfo = () => {
        api.get(`/otc/api/user/${account}`).then((x) => {

            if (x.status != 400 && x.status != 401) {
                setAccount(x.account);
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
                    <HeaderTitleText>購買 {CryptoAsset}</HeaderTitleText>
                    <HeaderEmptyContainer></HeaderEmptyContainer>
                </HeaderContainer>
                {
                    swapPage === 1 &&
                    <C2cBuyFirst
                        Id={Id}
                        MyCurrency={userWalletBalance}
                        Account={account}
                        Owner={Owner}
                        CurrencyType={CryptoAsset}
                        SuccessRate={SuccessRate}
                        AvailableNum={AvailableNum}
                        LimitFrom={LimitFrom}
                        LimitTo={LimitTo}
                        Price={Price}
                        PayTypeAccount={payTypeAccount}
                        PayTypeTouchnGo={payTypeTouchnGo}
                        PayTypePpay={payTypePpay}
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
                                <TopContainerTitleText>請付款</TopContainerTitleText>
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
                            <TopContainerTitleText>等待放行</TopContainerTitleText>
                            <TopContainerTimerContainer>
                                <CountdownTimer targetDate={payTimeLimit} />
                            </TopContainerTimerContainer>
                        </TopInColumnContainer>
                    </TopContainer>)
                }
                {
                    isWaitFinish === 2 &&
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
                            <TopContainerDetailText>購買的加密貨幣已發放至您的現貨資產</TopContainerDetailText>
                        </TopInColumnContainer>
                    </TopContainer>
                }
                {
                    swapPage === 2 &&
                    <C2cBuySecond
                        Id={Id}
                        MyCurrency={userWalletBalance}
                        Account={account}
                        Owner={Owner}
                        CurrencyType={CryptoAsset}
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
                        onChangeSetSwapPage={setSwapPage}
                        onChangeSetChoosePayType={setChoosePaytype}
                        BuyTime={buyTime}
                        BuyId={buyId}
                        IsWaitFinish={isWaitFinish}
                    />
                }
                {
                    swapPage === 3 &&
                    (isWaitFinish === 2 &&
                    <C2cBuyLast
                        Id={Id}
                        CurrencyType={CryptoAsset}
                        Price={Price}
                        BuyPrice={inputPrice}
                        BuyNumber={inputNumber}
                        BuyID={buyId}
                        ChosenPayType={choosePayType}
                        BuyTime={buyTime}
                    />)
                }
            </Container>
        </TouchableWithoutFeedback>
    )

}
export default C2cBuyScreen
