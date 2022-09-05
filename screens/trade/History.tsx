import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Image, } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState,useEffect,useContext } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FutureContext } from "../../App"
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View) <{ insets: number }>`
    display: flex;
    flex-direction: column;
    background-color: #18222D;
    padding-top: ${props => props.insets}px;
    border: none;
`;

// Main Header Container
const MainHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const PreviousButton = styled(Image)`
width: 28px;
height: 28px;
`;

const MainHeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
margin-right: 25px;
`;

const EmptyDiv = styled(View)``;

// Header Container Style

const HeaderContainer = styled(View)`
display: flex;
flex-direction: row;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const BottomContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
padding-bottom: 1000px;
`;

const SwapButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.LightMidGray};
`;

const SwapButtonClickedText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const SwapContainerLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-bottom: 11px;
`;


// Bottom Container Style

// Global Style
const CardContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-left: 16px;
padding-right: 16px;
`;

const CardTitleContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const CardDetailContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 3px;
`;

const CardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 38%;
`;

const CardDetailInColumnContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 10px;
`;

const CardTitleTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
margin-top: 4px;
`;

const CardTitleSecondaryText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const CardTitleSecondaryLightText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardDetailTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const CardDetailValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const CardDetailValueDirectionShort = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardDetailValueDirectionLong = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const CardLine = styled(View)`
height: 2px;
background-color: #242D37;
margin-top: 20px;
`;

// History Commit Style
const HistoryCommitCardTitleProgressCommitText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.SecondaryLight};
`;

const HistoryCommitCardTitleProgressCancelText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

// Assets Record Style
const AssetsRecordTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const AssetsRecordDetailContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 5px;
`;

const AssetsRecordTitleText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const AssetsRecordTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.MidGray};
`;

const AssetsRecordAmountText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const AssetsRecordTypeLeverageTextSecondary = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const AssetsRecordTypeLeverageTextSecondaryLight = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const AssetsRecordEarnRatePositiveText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.Secondary};
`;

const AssetsRecordEarnRateNegativeText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.SecondaryLight};
`;


// Array

const HistoryCommitArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        progress: 1,
        type: '限價',
        direction: '賣出平多',
        directionType: 'Long',
        commitNum: '0.1',
        successRate: 3,
        successNum: '0.1',
        commitPrice: '17,000.0',
        successAverage: '20,000.0'
    },
    {
        title: 'ETHUSDT',
        buyType: 'buy',
        leverage: 10,
        time: '2021-10-19 17:11:45',
        progress: 0,
        type: '限價',
        direction: '賣出做空',
        directionType: 'Short',
        commitNum: '0.1',
        successRate: 0,
        successNum: '0.1',
        commitPrice: '17,000.0',
        successAverage: '20,000.0'
    }
];

const SubmitRecordArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 5,
        time: '2021-10-19 13:35:08',
        type: '限價',
        direction: '賣出平多',
        directionType: 'Long',
        successRate: 3,
        successNum: '0.1',
        successPrice: '20,000.0',
        EarnLost: '6,000.0'
    },
    {
        title: 'ETHUSDT',
        buyType: 'buy',
        leverage: 1,
        time: '2021-10-19 13:14:22',
        type: '限價',
        direction: '買入平空',
        directionType: 'Short',
        successRate: 2,
        successNum: '0.1',
        successPrice: '14,000.0',
        EarnLost: '3,000.0'
    }
];

const AssetsRecordArray = [
    {
        title: '手續費',
        typeName: 'ETHUSDT',
        leverage: 10,
        time: '2021-10-19 13:35:08',
        amount: '-5.0000',
        amountCurrency: 'USDT',
        type: 'buy'
    },
    {
        title: '開倉',
        typeName: 'ETHUSDT',
        leverage: 10,
        time: '2021-10-19 13:35:08',
        amount: '',
        amountCurrency: '',
        type: 'buy'
    },
    {
        title: '手續費',
        typeName: 'BTCUSDT',
        leverage: 20,
        time: '2021-10-19 13:14:22',
        amount: '-5.0000',
        amountCurrency: 'USDT',
        type: 'sell'
    },
    {
        title: '開倉',
        typeName: 'BTCUSDT',
        leverage: 20,
        time: '2021-10-19 13:14:22',
        amount: '',
        amountCurrency: '',
        type: 'sell'
    },
    {
        title: '平倉盈虧',
        typeName: 'DOGEUSDT',
        leverage: 5,
        time: '2021-10-18 21:21:56',
        amount: '6,000.00',
        amountCurrency: 'USDT',
        type: 'buy'
    },
    {
        title: '平倉盈虧',
        typeName: 'DOGEUSDT',
        leverage: 1,
        time: '2021-10-17 17:26:45',
        amount: '3,000.00',
        amountCurrency: 'USDT',
        type: 'sell'
    },
    {
        title: '強平',
        typeName: 'BTCUSDT',
        leverage: 15,
        time: '2021-10-16 12:38:09',
        amount: '-2,000.00',
        amountCurrency: 'USDT',
        type: 'buy'
    },
];

const PositionArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        openPositionAveragePrice: '17,000.0000',
        holdPositionAveragePrice: '17,000.0000',
        assetsNum: '170.00000',
        earnLost: '10.94000',
        earn: '+10.94000',
        earnRate: '+5.61',
        earnRatePositive: true,
        positionNum: '0.1',
        assetsRate: '0.33',
        estimateCancelValue: '24,000.0000',
        price: '20,000.0000',
        number: '0.9'
    },
    {
        title: 'BTCUSDT',
        buyType: 'buy',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        openPositionAveragePrice: '17,000.0000',
        holdPositionAveragePrice: '17,000.0000',
        assetsNum: '170.00000',
        earnLost: '10.94000',
        earn: '+10.94000',
        earnRate: '-5.61',
        earnRatePositive: false,
        positionNum: '0.1',
        assetsRate: '0.33',
        estimateCancelValue: '13,000.0000',
        price: '20,000.0000',
        number: '0.9'
    }
];



const HistoryScreen = ({
    navigation
}: RootStackScreenProps<"HistoryScreen">) => {

    const insets = useSafeAreaInsets();

    const [swapView, setSwapView] = useState('HistoryCommit');
    const [entrustArray, setEntrustArray] = useState([]);
    const [dealEntrustArray, setDealEntrustArray] = useState([]);
    const [positionArray, setPositionArray] = useState([]);
    const [recordArray, setRecord] = useState([]);
    // const entrustArray = useContext(FutureContext)
    const { t } = useTranslation();
    const getPosition = () => {
        // api.get("/investor/position").then((x) => {
        //     if(x.status != 400 && x.status != 401){
        //         setPositionArray(x.data);
        //     }
        // })
    };

    const getDealEntrust = () => {
        api.get("/investor/future?status=DEAL").then((x) => {
            if(x.status != 400 && x.status != 401){
                setDealEntrustArray(x.data);
            }
        })
    };

    const getRecord = () =>{
        api.get("/investor/finance?type=20").then(x => {
            setRecord(x.data);
        });
    }

    const getHistoryEntrust = () => {
        api.get("/investor/future").then((x) => {
            console.log(x)
            if(x.status != 400 && x.status != 401){
            setEntrustArray(x.data);
            }
        })

    };

    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        if (token) {
            getHistoryEntrust();
            getDealEntrust()
            getPosition();
            getRecord()
        }

    }, []);

    return (
        <Container insets={insets.top}>
            <MainHeaderContainer>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <PreviousButton source={require("../../assets/images/global/previous.png")} />
                </TouchableOpacity>
                <MainHeaderTitleText>{t("orderHistory")}</MainHeaderTitleText>
                <EmptyDiv></EmptyDiv>
            </MainHeaderContainer>
            <HeaderContainer>
                {
                    swapView === 'HistoryCommit' ?
                        <TouchableOpacity onPress={() => { setSwapView('HistoryCommit') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24, paddingRight: 1, paddingLeft: 1 }}>
                            <SwapButtonClickedText>{t("historyOrder")}</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('HistoryCommit') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>{t("historyOrder")}</SwapButtonText>
                        </TouchableOpacity>
                }
                {/* {
                    swapView === 'SubmitRecord' ?
                        <TouchableOpacity onPress={() => { setSwapView('SubmitRecord') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24, paddingRight: 1, paddingLeft: 1 }}>
                            <SwapButtonClickedText>成交紀錄</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('SubmitRecord') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>成交紀錄</SwapButtonText>
                        </TouchableOpacity>
                } */}
                {
                    swapView === 'AssetsRecord' ?
                        <TouchableOpacity onPress={() => { setSwapView('AssetsRecord') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24, paddingRight: 1, paddingLeft: 1 }}>
                            <SwapButtonClickedText>{t("transactionHistory")} </SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('AssetsRecord') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>{t("transactionHistory")} </SwapButtonText>
                        </TouchableOpacity>
                }
                {/* {
                    swapView === 'Position' ?
                        <TouchableOpacity onPress={() => { setSwapView('Position') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24, paddingRight: 1, paddingLeft: 1 }}>
                            <SwapButtonClickedText>所有持倉</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('Position') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>所有持倉</SwapButtonText>
                        </TouchableOpacity>
                } */}

            </HeaderContainer>
            <SwapContainerLine></SwapContainerLine>
            <BottomContainer contentContainerStyle={{paddingBottom:420}}>
                {
                    swapView === 'HistoryCommit' &&

                    entrustArray.map((x:any, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    <CardTitleRowContainer>
                                        {
                                            x.side === 'SELL' ?
                                                <CardTitleSecondaryLightText>{x.symbol}</CardTitleSecondaryLightText> :
                                                <CardTitleSecondaryText>{x.symbol}</CardTitleSecondaryText>
                                        }
                                        {
                                            x.status === "CREATE"?
                                                <HistoryCommitCardTitleProgressCancelText>已建立</HistoryCommitCardTitleProgressCancelText> :x.status === "DEAL"?
                                                <HistoryCommitCardTitleProgressCancelText>{t("orderFilled")}    </HistoryCommitCardTitleProgressCancelText>:
                                                <HistoryCommitCardTitleProgressCancelText>{t("orderCanceled")} </HistoryCommitCardTitleProgressCancelText>
                                        }
                                    </CardTitleRowContainer>
                                    <CardTitleTimeText>{new Date(x.createdDate).getFullYear()}-{new Date(x.createdDate).getMonth()+1 < 10 ? "0"+(new Date(x.createdDate).getMonth()+1) : new Date(x.createdDate).getMonth()+1}-{new Date(x.createdDate).getDate() < 10 ? "0"+(new Date(x.createdDate).getDate()) : new Date(x.createdDate).getDate()} {new Date(x.createdDate).getHours() < 10 ? "0"+(new Date(x.createdDate).getHours()) : new Date(x.createdDate).getHours()}:{new Date(x.createdDate).getMinutes() < 10 ? "0"+(new Date(x.createdDate).getMinutes()) : new Date(x.createdDate).getMinutes()}</CardTitleTimeText>
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("tradeType")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.type === "LIMIT" ? "限價" : x.type === "MARKET" ? "市價" : x.type === "STOP_LIMIT" ? "計畫限價":"計畫市價"}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("orderSize")}</CardDetailTitleText>
                                        <CardDetailValueText>{x.origQty}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("withdrawFee")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.handlingFee && x.handlingFee.toFixed(2) + " USDT"}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>下單方向</CardDetailTitleText>
                                            {
                                                x.side === 'BUY' ?
                                                    <CardDetailValueDirectionLong>{t("buyOrder")}</CardDetailValueDirectionLong> :
                                                    <CardDetailValueDirectionShort>{t("sellOrder")}</CardDetailValueDirectionShort>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("dealPrice")}  </CardDetailTitleText>
                                            <CardDetailValueText>{x.type == "STOP_MARKET" ? "市價":x.price}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("realizedPNL")}   </CardDetailTitleText>
                                            <CardDetailValueText>{x.profitAndLoss && x.profitAndLoss.toFixed(2) + " USDT"}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>止盈/止損</CardDetailTitleText>
                                            <TouchableOpacity onPress={() => { }}>
                                                <CardDetailValueText>查看</CardDetailValueText>
                                            </TouchableOpacity>
                                        </CardDetailInColumnContainer> */}
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("orderStatus")} </CardDetailTitleText>
                                    <CardDetailValueText>{x.status}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("conditionPrice")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.stopPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>觸發價</CardDetailTitleText>
                                            <CardDetailValueText>{x.stopPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer> */}
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== entrustArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'SubmitRecord' &&

                    dealEntrustArray.map((x:any, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    {
                                        x.side === 'SELL' ?
                                    <CardTitleSecondaryLightText>{x.symbol} {x.leverage}X</CardTitleSecondaryLightText> :
                                            <CardTitleSecondaryText>{x.symbol} {x.leverage}X</CardTitleSecondaryText>
                                    }
                                    <CardTitleTimeText>{new Date(x.createdDate).getFullYear()}-{new Date(x.createdDate).getMonth()+1 < 10 ? "0"+(new Date(x.createdDate).getMonth()+1) : new Date(x.createdDate).getMonth()+1}-{new Date(x.createdDate).getDate() < 10 ? "0"+(new Date(x.createdDate).getDate()) : new Date(x.createdDate).getDate()} {new Date(x.createdDate).getHours() < 10 ? "0"+(new Date(x.createdDate).getHours()) : new Date(x.createdDate).getHours()}:{new Date(x.createdDate).getMinutes() < 10 ? "0"+(new Date(x.createdDate).getMinutes()) : new Date(x.createdDate).getMinutes()}</CardTitleTimeText>
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("tradeType")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.type === "LIMIT" ? "限價" : x.type === "MARKET" ? "市價" : x.type === "STOP_LIMIT" ? "計畫限價":"計畫市價"}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("orderSize")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.origQty}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>下單方向</CardDetailTitleText>
                                            {
                                                x.side === 'BUY' ?
                                                    <CardDetailValueDirectionLong>{t("buyOrder")}</CardDetailValueDirectionLong> :
                                                    <CardDetailValueDirectionShort>{t("sellOrder")}</CardDetailValueDirectionShort>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("orderPrice")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.price}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("dealRate")}</CardDetailTitleText>
                                            <CardDetailValueText>0</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>{t("conditionPrice")}</CardDetailTitleText>
                                            <CardDetailValueText>{x.stopPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== dealEntrustArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'AssetsRecord' &&

                    recordArray.map((x:any, i) => {
                        return (
                            <CardContainer>
                                <AssetsRecordTitleContainer>
                                    <AssetsRecordTitleText>{x.remark}</AssetsRecordTitleText>
                                    {
                                        x.payment !== '' ?
                                            <AssetsRecordAmountText>{x.payment} {x.coin}</AssetsRecordAmountText> :
                                            <AssetsRecordAmountText>--</AssetsRecordAmountText>

                                    }
                                </AssetsRecordTitleContainer>
                                <AssetsRecordDetailContainer>
                                    <AssetsRecordTimeText>{new Date(x.createdDate).toISOString().split("T")[0]} {new Date(x.createdDate).toISOString().split("T")[1].split(".")[0]}</AssetsRecordTimeText>
                                    {/* {
                                        x.type === 'buy' ?
                                            <AssetsRecordTypeLeverageTextSecondary>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondary> :
                                            <AssetsRecordTypeLeverageTextSecondaryLight>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondaryLight>
                                    } */}
                                </AssetsRecordDetailContainer>
                                {
                                    i !== AssetsRecordArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'Position' &&

                    positionArray.map((x:any, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    {
                                        x.side === 'BUY' ?
                                            <CardTitleSecondaryText>{x.symbol}・全倉{x.leverage}X</CardTitleSecondaryText> :
                                            <CardTitleSecondaryLightText>{x.symbol}・全倉{x.leverage}X</CardTitleSecondaryLightText>
                                    }
                                    {/* <CardTitleTimeText>{new Date(x.createdDate).getFullYear()}-{new Date(x.createdDate).getMonth()+1 < 10 ? "0"+(new Date(x.createdDate).getMonth()+1) : new Date(x.createdDate).getMonth()+1}-{new Date(x.createdDate).getDate() < 10 ? "0"+(new Date(x.createdDate).getDate()) : new Date(x.createdDate).getDate()} {new Date(x.createdDate).getHours() < 10 ? "0"+(new Date(x.createdDate).getHours()) : new Date(x.createdDate).getHours()}:{new Date(x.createdDate).getMinutes() < 10 ? "0"+(new Date(x.createdDate).getMinutes()) : new Date(x.createdDate).getMinutes()}</CardTitleTimeText> */}
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>開倉均價</CardDetailTitleText>
                                            <CardDetailValueText>{x.avgPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer> */}
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>未實現盈虧</CardDetailTitleText>
                                            <CardDetailValueText>{x.profitAndLoss}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>強平價格</CardDetailTitleText>
                                            <CardDetailValueText>{x.forceClose}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>入場價格</CardDetailTitleText>
                                            <CardDetailValueText>{x.avgPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer> */}
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>標記價格</CardDetailTitleText>
                                            <CardDetailValueText>{x.avgPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>持倉量</CardDetailTitleText>
                                            <CardDetailValueText>{x.quantity}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>擔保資產率</CardDetailTitleText>
                                            <CardDetailValueText>{x.assetsRate}%</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>數量</CardDetailTitleText>
                                            <CardDetailValueText>{x.quantity}</CardDetailValueText>
                                        </CardDetailInColumnContainer> */}
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>入場價格</CardDetailTitleText>
                                            <CardDetailValueText>{x.margin}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        {/* <CardDetailInColumnContainer>
                                            <CardDetailTitleText>收益率</CardDetailTitleText>
                                            {
                                                x.earnRatePositive === true ?
                                                    <AssetsRecordEarnRatePositiveText>{x.earnRate}%</AssetsRecordEarnRatePositiveText> :
                                                    <AssetsRecordEarnRateNegativeText>{x.earnRate}%</AssetsRecordEarnRateNegativeText>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>預估強平</CardDetailTitleText>
                                            <CardDetailValueText>{x.estimateCancelValue}</CardDetailValueText>
                                        </CardDetailInColumnContainer> */}
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== positionArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
            </BottomContainer>
        </Container>

    )
}

export default HistoryScreen