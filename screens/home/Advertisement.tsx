import * as React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from "react-native";
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { isLoading } from "expo-font";
import { useLinkTo } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
    justify-content: space-between;
    background-color: #131B24;
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

const PreviousIconContainer = styled(View)`
display: flex;
flex-direction: row;
width: 33%;
align-items: center;
`;

const PreviousIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderTitleTextContainer = styled(View)`
display: flex;
width: 33%;
align-items: center;
`;

const HeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const HeaderFunctionIconContainer = styled(View)`
display: flex;
width: 33%;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const HeaderFunctionIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const SwapContainer = styled(View)`
display: flex;
flex-direction: row;
background-color: #18222D;
padding-top: 12px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 12px;
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
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 500px;
`;

const CardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const CardTitleInlineContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const CardDetailContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 6px;
padding-bottom: 6px;
`;

const CardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 48%;
`;

const CardBuyTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const CardSellTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardPaymentIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const CardSmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
padding-bottom: 2px;
`;

const CardSmallValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.White};
`;

const CardButton = styled(TouchableOpacity)`
width: 48%;
height: 28px;
border-radius: 4px;
background-color: ${props => props.theme.color.DarkGray};
justify-content: center;
align-items: center;
`;

const CardButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const CardLine = styled(View)`
height: 1px;
background-color: #18222D;
margin-top: 16px;
margin-bottom: 16px;
`;

// Empty Bottom
const BottomPaddingView = styled(View)`
padding-bottom: 300px;
`;


const Advertisement = ({ navigation, route }: RootStackScreenProps<"Advertisement">) => {


    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(false);

    const [swapPage, setSwapPage] = useState(0);

    const linkTo = useLinkTo();
    const { t } = useTranslation();

    // 取得廣告單
    const [advertisementList, setAdvertisementList] = useState<any[]>([]);

    const getAdvertisement = () => {
        setLoading(true)
        api.get("/otc/api/advertisement/?my=true")
            .then((x) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setAdvertisementList(x)
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => {
                console.log(Error)
            })
    };

    // 判斷帳戶類型
    const handlePaymentType = (payment: string) => {
        if (payment === 'BANK') {
            return t("bankAccount")
        } else if (payment === 'TOUCHNGO') {
            return 'TouchnGO'
        } else if (payment === 'PPAY') {
            return 'Ppay'
        }
    };

    // 判斷帳戶圖片
    const handlePaymentImage = (payment: string) => {
        if (payment === 'BANK') {
            return require('../../assets/images/home/BANK.png')
        } else if (payment === 'TOUCHNGO') {
            return require('../../assets/images/home/TOUCHNGO.png')
        } else if (payment === 'PPAY') {
            return require('../../assets/images/home/PPAY.png')
        }
        return "../../assets/images/home/account.png"
    };

    // 獲取用戶資訊（費率）
    const [userInfo, setUserInfo] = useState<any[]>([]);
    const [buyFeeRate, setBuyFeeRate] = useState(1);
    const [sellFeeRate, setSellFeeRate] = useState(1);

    const getUserInfo = async () => {
        let user = await AsyncStorage.getItem("user");
        setLoading(true)
        api.get(`/otc/api/user/${JSON.parse(user!).account}`)
            .then((x: any) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setUserInfo(x);
                    setBuyFeeRate(x.buyFeeRate);
                    setSellFeeRate(x.sellFeeRate);
                }
                else {
                    Alert.alert("用戶資訊獲取失敗，請重新操作")
                }
            })
            .catch((Error) => console.log(Error));
    };

    // 下架廣告
    const putAdvertisementOffline = (id: string) => {
        setLoading(true)
        api.put(`/otc/api/advertisement/${id}/offline`)
            .then((x) => {
                // console.log(id)
                if (x.status != 400 && x.status != 401) {
                    Alert.alert(
                        "廣告已下架",
                        "",
                        [
                            {
                                text: '確定',
                                onPress: () => { getAdvertisement() }
                            }
                        ]
                    )
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => console.log(Error))
    };

    // 關閉廣告
    const putAdvertisementClose = (id: string) => {
        setLoading(true)
        api.put(`/otc/api/advertisement/${id}/close`)
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    Alert.alert(
                        "廣告已關閉",
                        "",
                        [
                            {
                                text: '確定',
                                onPress: () => { getAdvertisement() }
                            }
                        ]
                    )
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => console.log(Error))
    };

    // 重新上架廣告
    const putAdvertisementOnline = (id: string) => {
        setLoading(true)
        api.put(`/otc/api/advertisement/${id}/online`)
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    Alert.alert(
                        "廣告已重新上架",
                        "",
                        [
                            {
                                text: '確定',
                                onPress: () => { getAdvertisement() }
                            }
                        ]
                    )
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => console.log(Error))
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

    const addListener = () => {
        navigation.addListener('focus', () => getAdvertisement());
    };

    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        let user = await AsyncStorage.getItem("user")

        if (token) {
            getAdvertisement();
            getUserInfo();
        }

        addListener();
    }, [])

    return (
        <Container insets={insets.top}>
            {
                loading &&
                <Spinner visible={true} textContent={'載入中'} color={'#FFFFFF'} textStyle={{ color: '#FFFFFF' }} />
            }
            <HeaderContainer>
                <PreviousIconContainer>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <PreviousIcon source={require("../../assets/images/global/previous.png")} />
                    </TouchableOpacity>
                </PreviousIconContainer>
                <HeaderTitleTextContainer>
                    <HeaderTitleText>{t("myAds")}</HeaderTitleText>
                </HeaderTitleTextContainer>
                <HeaderFunctionIconContainer>
                    <TouchableOpacity onPress={() => { navigation.navigate("C2cCreateScreen") }}>
                        <HeaderFunctionIcon source={require("../../assets/images/global/add.png")} />
                    </TouchableOpacity>
                </HeaderFunctionIconContainer>
            </HeaderContainer>
            {
                swapPage === 0 ?
                    <SwapContainer>
                        <SwapLeftButtonClicked onPress={() => { setSwapPage(0) }}>
                            <SwapButtonClickedText>{t("online")}</SwapButtonClickedText>
                        </SwapLeftButtonClicked>
                        <SwapRightButton onPress={() => { setSwapPage(1) }}>
                            <SwapButtonText>{t("offline")}</SwapButtonText>
                        </SwapRightButton>
                    </SwapContainer> :
                    <SwapContainer>
                        <SwapLeftButton onPress={() => { setSwapPage(0) }}>
                            <SwapButtonText>{t("online")}</SwapButtonText>
                        </SwapLeftButton>
                        <SwapRightButtonClicked onPress={() => { setSwapPage(1) }}>
                            <SwapButtonClickedText>{t("offline")}</SwapButtonClickedText>
                        </SwapRightButtonClicked>
                    </SwapContainer>
            }
            {
                swapPage === 0 ?
                    <DetailContainer>
                        {
                            advertisementList.map((x: any, i) => {
                                if (x.status === 1) {
                                    return (
                                        <CardContainer>
                                            <CardTitleContainer>
                                                {
                                                    x.type === 0 ?
                                                        <CardBuyTitleText>{t("fiatOrderBuy")} {x.cryptoAsset}/{x.fiatCurrency}</CardBuyTitleText> :
                                                        <CardSellTitleText>{t("fiatOrderSell")} {x.cryptoAsset}/{x.fiatCurrency}</CardSellTitleText>
                                                }
                                                <CardTitleInlineContainer>
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'BANK' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("BANK")} />
                                                    }
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'TOUCHNGO' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("TOUCHNGO")} />
                                                    }
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'PPAY' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("PPAY")} />
                                                    }
                                                </CardTitleInlineContainer>
                                            </CardTitleContainer>
                                            <CardDetailContainer>
                                                <CardDetailRowContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>剩餘數量({x.cryptoAsset})</CardSmallTitleText>
                                                        <CardSmallValueText>{x.totalTradingAmount}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>{t("limitedAmount")}({x.fiatCurrency})</CardSmallTitleText>
                                                        <CardSmallValueText>{x.orderLimitMin} - {x.orderLimitMax}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                </CardDetailRowContainer>
                                                <CardDetailRowContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>廣告手續費</CardSmallTitleText>
                                                        {
                                                            x.type === 0 ?
                                                                <CardSmallValueText>{(x.price * x.totalTradingAmount * buyFeeRate).toFixed(2)}</CardSmallValueText> :
                                                                <CardSmallValueText>{(x.price * x.totalTradingAmount * sellFeeRate).toFixed(2)}</CardSmallValueText>
                                                        }
                                                    </CardDetailColumnContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>創建時間</CardSmallTitleText>
                                                        <CardSmallValueText>{handleCreateTime(x.createdDate)}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                </CardDetailRowContainer>
                                                <CardDetailRowContainer>
                                                    <CardButton onPress={() => { putAdvertisementOffline(x.id) }}>
                                                        <CardButtonText>{t("offline")}</CardButtonText>
                                                    </CardButton>
                                                    <CardButton onPress={() => { putAdvertisementClose(x.id) }}>
                                                        <CardButtonText>關閉</CardButtonText>
                                                    </CardButton>
                                                </CardDetailRowContainer>
                                            </CardDetailContainer>
                                            {
                                                i !== advertisementList.length - 1 &&
                                                <CardLine></CardLine>
                                            }
                                        </CardContainer>
                                    )
                                }
                            })
                        }
                        <BottomPaddingView />
                    </DetailContainer> :
                    <DetailContainer>
                        {
                            advertisementList.map((x: any, i) => {
                                if (x.status === 0) {
                                    return (
                                        <CardContainer>
                                            <CardTitleContainer>
                                                {
                                                    x.type === 0 ?
                                                        <CardBuyTitleText>{t("fiatOrderBuy")} {x.cryptoAsset}/{x.fiatCurrency}</CardBuyTitleText> :
                                                        <CardSellTitleText>{t("fiatOrderSell")} {x.cryptoAsset}/{x.fiatCurrency}</CardSellTitleText>
                                                }
                                                <CardTitleInlineContainer>
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'BANK' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("BANK")} />
                                                    }
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'TOUCHNGO' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("TOUCHNGO")} />
                                                    }
                                                    {
                                                        x.payments.some((m: any) => { return m.type == 'PPAY' }) &&
                                                        <CardPaymentIcon source={handlePaymentImage("PPAY")} />
                                                    }
                                                </CardTitleInlineContainer>
                                            </CardTitleContainer>
                                            <CardDetailContainer>
                                                <CardDetailRowContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>剩餘數量({x.cryptoAsset})</CardSmallTitleText>
                                                        <CardSmallValueText>{x.totalTradingAmount}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>{t("limitedAmount")}({x.fiatCurrency})</CardSmallTitleText>
                                                        <CardSmallValueText>{x.orderLimitMin} - {x.orderLimitMax}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                </CardDetailRowContainer>
                                                <CardDetailRowContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>廣告手續費</CardSmallTitleText>
                                                        {
                                                            x.type === 0 ?
                                                                <CardSmallValueText>{(x.price * x.totalTradingAmount * buyFeeRate).toFixed(2)}</CardSmallValueText> :
                                                                <CardSmallValueText>{(x.price * x.totalTradingAmount * sellFeeRate).toFixed(2)}</CardSmallValueText>
                                                        }
                                                    </CardDetailColumnContainer>
                                                    <CardDetailColumnContainer>
                                                        <CardSmallTitleText>創建時間</CardSmallTitleText>
                                                        <CardSmallValueText>{handleCreateTime(x.createdDate)}</CardSmallValueText>
                                                    </CardDetailColumnContainer>
                                                </CardDetailRowContainer>
                                                <CardDetailRowContainer>
                                                    <CardButton onPress={() => { putAdvertisementOnline(x.id) }}>
                                                        <CardButtonText>重新上架</CardButtonText>
                                                    </CardButton>
                                                    <CardButton onPress={() => {
                                                        navigation.navigate("AdvertisementEdit", {
                                                            ID: x.id,
                                                            createDate: x.createDate,
                                                            type: x.type,
                                                            cryptoAsset: x.cryptoAsset,
                                                            fiatCurrency: x.fiatCurrency,
                                                            priceType: x.priceType,
                                                            price: x.price,
                                                            totalTradingAmount: x.totalTradingAmount,
                                                            orderLimitMin: x.orderLimitMin,
                                                            orderLimitMax: x.orderLimitMax,
                                                            payments: x.payments,
                                                            paymentTimeLimit: x.paymentTimeLimit,
                                                            terms: x.terms,
                                                            conditionRegisteredDays: x.conditionRegisteredDays,
                                                            conditionCompleteOrders: x.conditionCompleteOrders
                                                        } as any)
                                                    }}>
                                                        <CardButtonText>編輯</CardButtonText>
                                                    </CardButton>
                                                </CardDetailRowContainer>
                                            </CardDetailContainer>
                                            {
                                                i !== advertisementList.length - 1 &&
                                                <CardLine></CardLine>
                                            }
                                        </CardContainer>
                                    )
                                }
                            })
                        }
                        <BottomPaddingView />
                    </DetailContainer>
            }
        </Container>
    )

}

export default Advertisement