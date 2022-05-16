import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CountdownTimer from "../../components/c2c/CountdownTimer";

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

const SwapContainer = styled(View)`
display: flex;
flex-direction: row;
background-color: #18222D;
padding-top: 25px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 7px;
`;

const SwapLeftButtonClicked = styled(TouchableOpacity)`
width: 50%
height: 30px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
`;

const SwapLeftButton = styled(TouchableOpacity)`
width: 50%
height: 30px;
justify-content: center;
align-items: center;
border: 1px solid #333C47;
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
`;

const SwapRightButtonClicked = styled(TouchableOpacity)`
width: 50%
height: 30px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
`;

const SwapRightButton = styled(TouchableOpacity)`
width: 50%
height: 30px;
justify-content: center;
align-items: center;
border: 1px solid #333C47;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
`;

const SwapButtonClickedText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const SwapButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

// Detail Container
const DetailContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
background-color: #18222D;
padding-top: 26px;
padding-left: 16px;
padding-right: 16px;
`;

const CardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardTitleContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const CardBuyTitleText = styled(Text)`
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: ${props => props.theme.color.Secondary};
`;

const CardBuyTitleCurrencyText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const CardSellTitleText = styled(Text)`
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardSellTitleCurrencyText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardMiddleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 12px;
`;

const CardMiddleColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardMiddleRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const CardMiddleRightRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: baseline;
`;

const CardMiddleLeftTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;



const CardMiddleLeftValueText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
padding-left: 8px;
`;

const CardMiddleRightBuyPriceText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
padding-right: 4px;
`;

const CardMiddleRightBuyCurrencyText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const CardMiddleRightSellPriceText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
padding-right: 4px;
`;

const CardMiddleRightSellCurrencyText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardBottomContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 18px;
`;

const CardBottomInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const CardBottomStatusText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
`;

const CardBottomButton = styled(TouchableOpacity)`
width: 64px;
height: 30px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
border-radius: 4px;
`;

const CardBottomButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const CardLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-top: 16px;
margin-bottom: 16px;
`;

// Empty Card
const EmptyCardContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 60px;
`;

const OrderImage = styled(Image)`
width: 135px;
height: 135px;
`;

const EmptyCardTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
margin-top: 24px;
`;

const EmptyCardDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 8px;
`;

const EmptyCardButton = styled(TouchableOpacity)`
width: 255px;
height: 44px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
border-radius: 4px;
margin-top: 40px;
`;

const EmptyCardButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const TopContainerTimerContainer = styled(View)`
padding-left: 4px;
`;

// Empty Bottom
const BottomPaddingView = styled(View)`
padding-bottom: 200px;
`;

// Array
const HistoryArray = [
    {
        buyType: 'buy',
        type: 'USDT',
        account: 'loo*****@gmail.com',
        price: '1.00',
        buyNumber: '175.730000',
        buyAmount: '165',
        currentStatus: 'NOT_YET_PAID'
    },
    {
        buyType: 'sell',
        type: 'USDT',
        account: 'Qoo*****@gmail.com',
        price: '1.10',
        buyNumber: '312.480000',
        buyAmount: '330',
        currentStatus: 'WAITING_PAYMENT'
    },
    {
        buyType: 'buy',
        type: 'USDT',
        account: 'goo*****@gmail.com',
        price: '1.02',
        buyNumber: '175.230000',
        buyAmount: '455',
        currentStatus: 'WAITING_PASS'
    },
    {
        buyType: 'sell',
        type: 'USDT',
        account: 'ifo*****@gmail.com',
        price: '1.00',
        buyNumber: '32.480000',
        buyAmount: '320',
        currentStatus: 'WAITING_PASS'
    },
];

const HistoryCompleteArray = [
    {
        buyType: 'sell',
        type: 'USDT',
        account: 'gho*****@gmail.com',
        price: '1.12',
        buyNumber: '535.230000',
        buyAmount: '125',
        currentStatus: 'COMPLETE'
    },
    {
        buyType: 'buy',
        type: 'USDT',
        account: 'fho*****@gmail.com',
        price: '1.12',
        buyNumber: '335.230000',
        buyAmount: '135',
        currentStatus: 'COMPLETE'
    },
];


const C2cHistoryScreen = ({ navigation, route }: RootStackScreenProps<"C2cHistoryScreen">) => {

    const insets = useSafeAreaInsets();

    // 切換進行中或已完成
    const [swapPage, setSwapPage] = useState(0);

    // Countdown Timer (Import CountdownTimer)
    const FIFTEENMINUTES = 15 * 60 * 1000;

    return (
        <Container insets={insets.top}>
            <HeaderContainer>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <PreviousIcon source={require("../../assets/images/global/previous.png")} />
                </TouchableOpacity>
                <HeaderTitleText>訂單</HeaderTitleText>
                <HeaderEmptyContainer></HeaderEmptyContainer>
            </HeaderContainer>

            {
                swapPage === 0 ?
                    <SwapContainer>
                        <SwapLeftButtonClicked onPress={() => { setSwapPage(0) }}>
                            <SwapButtonClickedText>進行中</SwapButtonClickedText>
                        </SwapLeftButtonClicked>
                        <SwapRightButton onPress={() => { setSwapPage(1) }}>
                            <SwapButtonText>已完成</SwapButtonText>
                        </SwapRightButton>
                    </SwapContainer> :
                    <SwapContainer>
                        <SwapLeftButton onPress={() => { setSwapPage(0) }}>
                            <SwapButtonText>進行中</SwapButtonText>
                        </SwapLeftButton>
                        <SwapRightButtonClicked onPress={() => { setSwapPage(1) }}>
                            <SwapButtonClickedText>已完成</SwapButtonClickedText>
                        </SwapRightButtonClicked>
                    </SwapContainer>
            }
            <DetailContainer>
                {
                    swapPage === 0 &&
                    (HistoryArray.length > 0 ?
                        HistoryArray.map((x, i) => {
                            return (
                                x.currentStatus !== 'COMPLETE' &&
                                <CardContainer>
                                    {
                                        x.buyType === 'buy' ?
                                            <CardTitleContainer>
                                                <CardBuyTitleText>買</CardBuyTitleText>
                                                <CardBuyTitleCurrencyText>{x.type}/USD</CardBuyTitleCurrencyText>
                                            </CardTitleContainer>
                                            :
                                            <CardTitleContainer>
                                                <CardSellTitleText>賣</CardSellTitleText>
                                                <CardSellTitleCurrencyText>{x.type}/USD</CardSellTitleCurrencyText>
                                            </CardTitleContainer>
                                    }
                                    <CardMiddleContainer>
                                        <CardMiddleColumnContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.account}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>數量</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.buyNumber} {x.type}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>單價</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.price} USD</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                        </CardMiddleColumnContainer>
                                        {
                                            x.buyType === 'buy' ?
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightBuyPriceText>{x.buyAmount}</CardMiddleRightBuyPriceText>
                                                    <CardMiddleRightBuyCurrencyText>USD</CardMiddleRightBuyCurrencyText>
                                                </CardMiddleRightRowContainer> :
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightSellPriceText>{x.buyAmount}</CardMiddleRightSellPriceText>
                                                    <CardMiddleRightSellCurrencyText>USD</CardMiddleRightSellCurrencyText>
                                                </CardMiddleRightRowContainer>
                                        }
                                    </CardMiddleContainer>
                                    {
                                        x.buyType === 'buy' &&
                                        (x.currentStatus === 'NOT_YET_PAID' &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>請付款</CardBottomStatusText>
                                                    <TopContainerTimerContainer>
                                                        <CountdownTimer targetDate={FIFTEENMINUTES} />
                                                    </TopContainerTimerContainer>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.buyType === 'buy' &&
                                        (x.currentStatus === 'WAITING_PASS' &&
                                            <CardBottomContainer>
                                                <CardBottomStatusText>等待放行...</CardBottomStatusText>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.buyType === 'sell' &&
                                        (x.currentStatus === 'WAITING_PAYMENT' &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>等待付款...</CardBottomStatusText>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.buyType === 'sell' &&
                                        (x.currentStatus === 'WAITING_PASS' &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>請放行</CardBottomStatusText>
                                                    <TopContainerTimerContainer>
                                                        <CountdownTimer targetDate={FIFTEENMINUTES} />
                                                    </TopContainerTimerContainer>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        i !== HistoryArray.length - 1 &&
                                        <CardLine></CardLine>
                                    }
                                </CardContainer>
                            );
                        }) :
                        <EmptyCardContainer>
                            <OrderImage source={require("../../assets/images/c2c/illustration.png")} />
                            <EmptyCardTitleText>尚無訂單</EmptyCardTitleText>
                            <EmptyCardDetailText>請於 C2C 購買/出售加密貨幣</EmptyCardDetailText>
                            <EmptyCardButton onPress={() => { navigation.goBack() }}>
                                <EmptyCardButtonText>C2C 總覽</EmptyCardButtonText>
                            </EmptyCardButton>
                        </EmptyCardContainer>)
                }
                {/* ********* */}
                {/* Swap Page */}
                {
                    swapPage === 1 &&
                    (HistoryCompleteArray.length > 0 ?
                        HistoryCompleteArray.map((x, i) => {
                            return (
                                x.currentStatus === 'COMPLETE' &&
                                <CardContainer>
                                    {
                                        x.buyType === 'buy' ?
                                            <CardTitleContainer>
                                                <CardBuyTitleText>買</CardBuyTitleText>
                                                <CardBuyTitleCurrencyText>{x.type}/USD</CardBuyTitleCurrencyText>
                                            </CardTitleContainer>
                                            :
                                            <CardTitleContainer>
                                                <CardSellTitleText>賣</CardSellTitleText>
                                                <CardSellTitleCurrencyText>{x.type}/USD</CardSellTitleCurrencyText>
                                            </CardTitleContainer>
                                    }
                                    <CardMiddleContainer>
                                        <CardMiddleColumnContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.account}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>數量</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.buyNumber} {x.type}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>單價</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.price} USD</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                        </CardMiddleColumnContainer>
                                        {
                                            x.buyType === 'buy' ?
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightBuyPriceText>{x.buyAmount}</CardMiddleRightBuyPriceText>
                                                    <CardMiddleRightBuyCurrencyText>USD</CardMiddleRightBuyCurrencyText>
                                                </CardMiddleRightRowContainer> :
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightSellPriceText>{x.buyAmount}</CardMiddleRightSellPriceText>
                                                    <CardMiddleRightSellCurrencyText>USD</CardMiddleRightSellCurrencyText>
                                                </CardMiddleRightRowContainer>
                                        }
                                    </CardMiddleContainer>
                                    {
                                        x.buyType === 'buy' ?
                                            <CardBottomContainer>
                                                <CardBottomStatusText>訂單完成</CardBottomStatusText>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>詳情</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>
                                            :
                                            <CardBottomContainer>
                                                <CardBottomStatusText>訂單完成</CardBottomStatusText>
                                                <CardBottomButton onPress={() => { }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>
                                    }
                                    {
                                        i !== HistoryCompleteArray.length - 1 &&
                                        <CardLine></CardLine>
                                    }
                                </CardContainer>
                            );
                        }) :
                        <EmptyCardContainer>
                            <OrderImage source={require("../../assets/images/c2c/illustration.png")} />
                            <EmptyCardTitleText>尚無訂單</EmptyCardTitleText>
                            <EmptyCardDetailText>請於 C2C 購買/出售加密貨幣</EmptyCardDetailText>
                            <EmptyCardButton onPress={() => { navigation.goBack() }}>
                                <EmptyCardButtonText>C2C 總覽</EmptyCardButtonText>
                            </EmptyCardButton>
                        </EmptyCardContainer>)
                }
                <BottomPaddingView></BottomPaddingView>
            </DetailContainer>
        </Container>
    );
}

export default C2cHistoryScreen