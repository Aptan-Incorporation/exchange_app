import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CountdownTimer from "../../components/c2c/CountdownTimer";
import Modal from "react-native-modal";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
    background-color: #18222D;
    justify-content: space-between;
    padding-bottom: 500px;
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
padding-bottom: 100px;
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

// Modal Style
const ModalTitleBarHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 10px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
background-color: #18222D;
`;

const ModalCancelImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalHeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const ModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 8px;
padding-bottom: 8px;
`;

const ModalInRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const ModalInlineContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: baseline;
`;

const ModalDetailTitle = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.LightMidGray};
`;

const ModalDetailPricePositiveText = styled(Text)`
font-weight: 700;
font-size: 24px;
line-height: 30px;
color: ${props => props.theme.color.Secondary};
`;

const ModalDetailPriceNegativeText = styled(Text)`
font-weight: 700;
font-size: 24px;
line-height: 30px;
color: ${props => props.theme.color.SecondaryLight};
`;

const ModalDetailPriceCurrencyPositiveText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const ModalDetailPriceCurrencyNegativeText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const ModalDetailSecondText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.White};
`;

const ModalDetailThirdText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.LightMidGray};
`;

const ModalDetailPaymentText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.LightMidGray};
padding-left: 5px;
`;

const ModalLine = styled(View)`
height: 1px;
background-color: #18222D;
margin-top: 8px;
margin-bottom: 8px;
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

    const [loading, setLoading] = useState(false);

    // 獲取進行中訂單
    const [waitingList, setWaitingList] = useState([]);

    const getWaitingList = () => {
        setLoading(true)
        api.get(`/otc/api/otcOrder/?all=false&status=0,1`)
            .then((x) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setWaitingList(x);
                } else {
                    Alert.alert(x.data.msg);
                }
            })
            .catch(() => {
                console.log(Error)
            })
    };


    // 獲取已完成訂單
    const [completeList, setCompleteList] = useState([]);

    const getCompleteList = () => {
        setLoading(true)
        api.get(`/otc/api/otcOrder/?all=false&status=2`)
            .then((x) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setCompleteList(x);
                } else {
                    Alert.alert(x.data.msg);
                }
            })
            .catch(() => {
                console.log(Error)
            })
    };

    // 詳情Modal
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [detailModalInfo, setDetailModalInfo] = useState(
        {
            BuyId: "",
            buyUser: "",
            sellUser: "",
            cryptoAsset: "",
            fiatCurrency: "",
            price: 0,
            quantity: 0,
            amount: 0,
            payments: [],
            payment: { id: "", type: "" },
            createdDate: 0,
            status: 0
        }
    );
    const [modalTitle, setModalTitle] = useState("");

    const handleUpdateModal = (
        Title: string,
        BuyId: string,
        buyUser: string,
        sellUser: string,
        cryptoAsset: string,
        fiatCurrency: string,
        price: number,
        quantity: number,
        amount: number,
        payments: [],
        payment: { id: string, type: string },
        createdDate: number,
        status: number
    ) => {
        setDetailModalInfo(
            {
                BuyId: BuyId,
                buyUser: buyUser,
                sellUser: sellUser,
                cryptoAsset: cryptoAsset,
                fiatCurrency: fiatCurrency,
                price: price,
                quantity: quantity,
                amount: amount,
                payments: payments,
                payment: payment,
                createdDate: createdDate,
                status: status
            }
        )
        setModalTitle(Title)
        setIsDetailModalVisible(true)
    };

    // 轉換日期
    const handleCreateTime = (UnixTime: number) => {
        let unix = new Date(UnixTime);
        let year = unix.getFullYear();
        let month = unix.getMonth() + 1;
        let day = unix.getDate();
        let hours = unix.getHours();
        let minutes = unix.getMinutes();
        let seconds = unix.getSeconds();

        return (`${year}-${month}-${day} ${hours}:${seconds}:${seconds}`)
    };



    const [account, setAccount] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        let user = await AsyncStorage.getItem("user")
        setAccount(JSON.parse(user!).account)
        setUserId(JSON.parse(user!).userId)

        if (token) {
            getWaitingList()
            getCompleteList()

            console.log(completeList)
        } else {
            Alert.alert("請先登入")
        }

    }, [])

    return (
        <Container insets={insets.top}>
            {
                loading &&
                <Spinner visible={true} textContent={'載入中'} color={'#FFFFFF'} textStyle={{ color: '#FFFFFF' }} />
            }
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
                        <SwapLeftButtonClicked onPress={() => { setSwapPage(0), getWaitingList() }}>
                            <SwapButtonClickedText>進行中</SwapButtonClickedText>
                        </SwapLeftButtonClicked>
                        <SwapRightButton onPress={() => { setSwapPage(1), getCompleteList() }}>
                            <SwapButtonText>已完成</SwapButtonText>
                        </SwapRightButton>
                    </SwapContainer> :
                    <SwapContainer>
                        <SwapLeftButton onPress={() => { setSwapPage(0), getWaitingList() }}>
                            <SwapButtonText>進行中</SwapButtonText>
                        </SwapLeftButton>
                        <SwapRightButtonClicked onPress={() => { setSwapPage(1), getCompleteList() }}>
                            <SwapButtonClickedText>已完成</SwapButtonClickedText>
                        </SwapRightButtonClicked>
                    </SwapContainer>
            }
            <DetailContainer>
                {
                    swapPage === 0 &&
                    (waitingList.length > 0 ?
                        waitingList.map((x: any, i) => {
                            return (

                                <CardContainer>
                                    {
                                        x.buyUser === account ?
                                            <CardTitleContainer>
                                                <CardBuyTitleText>買</CardBuyTitleText>
                                                <CardBuyTitleCurrencyText>{x.cryptoAsset}/{x.fiatCurrency}</CardBuyTitleCurrencyText>
                                            </CardTitleContainer>
                                            :
                                            <CardTitleContainer>
                                                <CardSellTitleText>賣</CardSellTitleText>
                                                <CardSellTitleCurrencyText>{x.cryptoAsset}/{x.fiatCurrency}</CardSellTitleCurrencyText>
                                            </CardTitleContainer>
                                    }
                                    <CardMiddleContainer>
                                        <CardMiddleColumnContainer>
                                            {
                                                x.buyUser === account ?
                                                    <CardMiddleRowContainer>
                                                        <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                        <CardMiddleLeftValueText>{x.sellUser}</CardMiddleLeftValueText>
                                                    </CardMiddleRowContainer> :
                                                    <CardMiddleRowContainer>
                                                        <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                        <CardMiddleLeftValueText>{x.buyUser}</CardMiddleLeftValueText>
                                                    </CardMiddleRowContainer>
                                            }
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>數量</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.quantity} {x.cryptoAsset}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>單價</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.price} {x.fiatCurrency}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                        </CardMiddleColumnContainer>
                                        {
                                            x.buyUser === account ?
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightBuyPriceText>{x.amount}</CardMiddleRightBuyPriceText>
                                                    <CardMiddleRightBuyCurrencyText>{x.fiatCurrency}</CardMiddleRightBuyCurrencyText>
                                                </CardMiddleRightRowContainer> :
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightSellPriceText>{x.amount}</CardMiddleRightSellPriceText>
                                                    <CardMiddleRightSellCurrencyText>{x.fiatCurrency}</CardMiddleRightSellCurrencyText>
                                                </CardMiddleRightRowContainer>
                                        }
                                    </CardMiddleContainer>
                                    {
                                        x.buyUser === account &&
                                        (x.status === 0 &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>請付款</CardBottomStatusText>
                                                    <TopContainerTimerContainer>
                                                        <CountdownTimer targetDate={x.paymentTimeLimit} />
                                                    </TopContainerTimerContainer>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "查看",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.buyUser === account &&
                                        (x.status === 1 &&
                                            <CardBottomContainer>
                                                <CardBottomStatusText>等待放行...</CardBottomStatusText>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "查看",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.sellUser === account &&
                                        (x.status === 0 &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>等待付款...</CardBottomStatusText>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "查看",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        x.sellUser === account &&
                                        (x.status === 1 &&
                                            <CardBottomContainer>
                                                <CardBottomInRowContainer>
                                                    <CardBottomStatusText>請放行</CardBottomStatusText>
                                                    <TopContainerTimerContainer>
                                                        <CountdownTimer targetDate={FIFTEENMINUTES} />
                                                    </TopContainerTimerContainer>
                                                </CardBottomInRowContainer>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "查看",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>)
                                    }
                                    {
                                        i !== waitingList.length - 1 &&
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
                    (completeList.length > 0 ?
                        completeList.map((x: any, i) => {
                            return (
                                x.status === 2 &&
                                <CardContainer>
                                    {
                                        x.buyUser === account ?
                                            <CardTitleContainer>
                                                <CardBuyTitleText>買</CardBuyTitleText>
                                                <CardBuyTitleCurrencyText>{x.cryptoAsset}/{x.fiatCurrency}</CardBuyTitleCurrencyText>
                                            </CardTitleContainer>
                                            :
                                            <CardTitleContainer>
                                                <CardSellTitleText>賣</CardSellTitleText>
                                                <CardSellTitleCurrencyText>{x.cryptoAsset}/{x.fiatCurrency}</CardSellTitleCurrencyText>
                                            </CardTitleContainer>
                                    }
                                    <CardMiddleContainer>
                                        <CardMiddleColumnContainer>
                                            {
                                                x.buyUser === account ?
                                                    <CardMiddleRowContainer>
                                                        <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                        <CardMiddleLeftValueText>{x.sellUser}</CardMiddleLeftValueText>
                                                    </CardMiddleRowContainer> :
                                                    <CardMiddleRowContainer>
                                                        <CardMiddleLeftTitleText>交易方</CardMiddleLeftTitleText>
                                                        <CardMiddleLeftValueText>{x.buyUser}</CardMiddleLeftValueText>
                                                    </CardMiddleRowContainer>
                                            }
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>數量</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.quantity} {x.cryptoAsset}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                            <CardMiddleRowContainer>
                                                <CardMiddleLeftTitleText>單價</CardMiddleLeftTitleText>
                                                <CardMiddleLeftValueText>{x.price} {x.fiatCurrency}</CardMiddleLeftValueText>
                                            </CardMiddleRowContainer>
                                        </CardMiddleColumnContainer>
                                        {
                                            x.buyUser === account ?
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightBuyPriceText>{x.amount}</CardMiddleRightBuyPriceText>
                                                    <CardMiddleRightBuyCurrencyText>{x.fiatCurrency}</CardMiddleRightBuyCurrencyText>
                                                </CardMiddleRightRowContainer> :
                                                <CardMiddleRightRowContainer>
                                                    <CardMiddleRightSellPriceText>{x.amount}</CardMiddleRightSellPriceText>
                                                    <CardMiddleRightSellCurrencyText>{x.fiatCurrency}</CardMiddleRightSellCurrencyText>
                                                </CardMiddleRightRowContainer>
                                        }
                                    </CardMiddleContainer>
                                    {
                                        x.buyUser === account ?
                                            <CardBottomContainer>
                                                <CardBottomStatusText>訂單完成</CardBottomStatusText>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "詳情",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>詳情</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>
                                            :
                                            <CardBottomContainer>
                                                <CardBottomStatusText>訂單完成</CardBottomStatusText>
                                                <CardBottomButton onPress={() => {
                                                    handleUpdateModal(
                                                        "查看",
                                                        x.id,
                                                        x.buyUser,
                                                        x.sellUser,
                                                        x.cryptoAsset,
                                                        x.fiatCurrency,
                                                        x.price,
                                                        x.quantity,
                                                        x.amount,
                                                        x.payments,
                                                        {
                                                            id: x.payment.id,
                                                            type: x.payment.type
                                                        },
                                                        x.createdDate,
                                                        x.status
                                                    )
                                                }}>
                                                    <CardBottomButtonText>查看</CardBottomButtonText>
                                                </CardBottomButton>
                                            </CardBottomContainer>
                                    }
                                    {
                                        i !== completeList.length - 1 &&
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

            {/* Time Limit Modal 放行時限*/}
            <Modal
                isVisible={isDetailModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsDetailModalVisible(false)}
                onSwipeComplete={() => setIsDetailModalVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', paddingBottom: 30 }}>
                    <ModalTitleBarHeaderContainer>
                        <View style={{
                            width: 28,
                            height: 28
                        }} />
                        <ModalHeaderTitleText>{modalTitle}</ModalHeaderTitleText>
                        <TouchableOpacity onPress={() => { setIsDetailModalVisible(false) }}>
                            <ModalCancelImage source={require("../../assets/images/c2c/cancel.png")} />
                        </TouchableOpacity>
                    </ModalTitleBarHeaderContainer>
                    <View style={{ paddingTop: 24, paddingLeft: 16, paddingRight: 16 }}>
                        <ModalRowContainer>
                            <ModalDetailTitle>總價</ModalDetailTitle>
                            {
                                detailModalInfo.buyUser === account ?
                                    <ModalInlineContainer>
                                        <ModalDetailPricePositiveText>{detailModalInfo.amount}</ModalDetailPricePositiveText>
                                        <ModalDetailPriceCurrencyPositiveText>{detailModalInfo.fiatCurrency}</ModalDetailPriceCurrencyPositiveText>
                                    </ModalInlineContainer> :
                                    <ModalInlineContainer>
                                        <ModalDetailPriceNegativeText>{detailModalInfo.amount}</ModalDetailPriceNegativeText>
                                        <ModalDetailPriceCurrencyNegativeText>{detailModalInfo.fiatCurrency}</ModalDetailPriceCurrencyNegativeText>
                                    </ModalInlineContainer>
                            }
                        </ModalRowContainer>
                        <ModalRowContainer>
                            <ModalDetailTitle>數量</ModalDetailTitle>
                            <ModalDetailSecondText>{detailModalInfo.quantity} {detailModalInfo.cryptoAsset}</ModalDetailSecondText>
                        </ModalRowContainer>
                        <ModalRowContainer>
                            <ModalDetailTitle>單價</ModalDetailTitle>
                            <ModalDetailSecondText>{detailModalInfo.price} {detailModalInfo.fiatCurrency}</ModalDetailSecondText>
                        </ModalRowContainer>
                        <ModalLine />
                        <ModalRowContainer>
                            <ModalDetailTitle>收款方式</ModalDetailTitle>
                            <ModalInRowContainer>
                                {
                                    detailModalInfo.payments != null &&
                                    (detailModalInfo.payments.some((x: any) => { return x.type == 'BANK' }) &&
                                        <ModalDetailPaymentText>銀行轉帳</ModalDetailPaymentText>)
                                }
                                {
                                    detailModalInfo.payments != null &&
                                    (detailModalInfo.payments.some((x: any) => { return x.type == 'TOUCHNGO' }) &&
                                        <ModalDetailPaymentText>Touch'n Go</ModalDetailPaymentText>)
                                }
                                {
                                    detailModalInfo.payments != null &&
                                    (detailModalInfo.payments.some((x: any) => { return x.type == 'PPAY' }) &&
                                        <ModalDetailPaymentText>Ppay</ModalDetailPaymentText>)
                                }
                            </ModalInRowContainer>
                        </ModalRowContainer>

                        <ModalRowContainer>
                            <ModalDetailTitle>付款方式</ModalDetailTitle>
                            <ModalInRowContainer>
                                {
                                    detailModalInfo.status != 0 ?
                                        detailModalInfo.payment.type == 'BANK' &&
                                        <ModalDetailPaymentText>銀行轉帳</ModalDetailPaymentText>
                                        :
                                        <ModalDetailThirdText>尚未付款</ModalDetailThirdText>
                                }
                            </ModalInRowContainer>
                        </ModalRowContainer>

                        <ModalRowContainer>
                            <ModalDetailTitle>訂單編號</ModalDetailTitle>
                            <View style={{ alignItems: 'flex-end' }}>
                                <ModalDetailThirdText>{((detailModalInfo.BuyId)).slice(0, 28)}</ModalDetailThirdText>
                                <ModalDetailThirdText>{((detailModalInfo.BuyId)).slice(28)}</ModalDetailThirdText>
                            </View>
                        </ModalRowContainer>
                        <ModalRowContainer style={{ paddingBottom: 30 }}>
                            <ModalDetailTitle>訂單時間</ModalDetailTitle>
                            <ModalDetailThirdText>{handleCreateTime(detailModalInfo.createdDate)}</ModalDetailThirdText>
                        </ModalRowContainer>
                    </View>
                </View>
            </Modal>
        </Container>
    );
}

export default C2cHistoryScreen