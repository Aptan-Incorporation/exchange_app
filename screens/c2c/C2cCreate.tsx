import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions, TextInput } from "react-native"
import Modal from "react-native-modal";
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import { SearchBar } from "@rneui/themed";
import { Picker } from '@react-native-picker/picker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
    background-color: #131B24;
`;

//Header Style
const HeaderContainer = styled(View)`
display: flex ;
flex-direction: column;
padding-top: 16px;
padding-left: 16px;
padding-right: 12px;
background-color : #18222D;
`;

const HeaderTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-bottom: 18px;
`;

const HeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const HeaderTitlePreviousIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderTitleNextStepGrayText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.Gray};
`;

const HeaderTitleNextStepWhiteText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

// ScrollView Style
const BodyContainer = styled(ScrollView)`
display: flex ;
flex-direction: column;
`;

// Progress Bar Style
const HeaderProgressContainer = styled(View)`
display: flex;
flex-direction: column;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
background-color : #18222D;
`;

const HeaderProgressTopContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-left: 17px;
padding-right: 17px;
padding-bottom: 8px;
`;

const HeaderProgressBottomContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const HeaderProgressLightGrayCircle = styled(View)`
width: 20px;
height: 20px;
border: 4px solid #BCC2C8;
border-radius: 75px;
`;

const HeaderProgressGrayCircle = styled(View)`
width: 20px;
height: 20px;
border: 4px solid #5C6670;
border-radius: 75px;
`;

const HeaderProgressPrimaryCircle = styled(View)`
width: 20px;
height: 20px;
border: 4px solid #6699CC;
border-radius: 75px;
`;

const HeaderProgressGrayText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: #5C6670;
`;

const HeaderProgressLightGrayText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: #BCC2C8;
`;

const HeaderProgressWhiteText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: #FFFFFF;
`;

const HeaderProgressGrayLine = styled(View)`
width: 130px;
height: 2px;
background-color: #5C6670;
`;

const HeaderProgressLightGrayLine = styled(View)`
width: 130px;
height: 2px;
background-color: #BCC2C8;
`;

const SwapPageContainer = styled(ScrollView)``;





// Progress Part 0 Style

// Swap Buy Sell Style
const SwapContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const SwapButtonClicked = styled(TouchableOpacity)`
height: 44px;
width: 50%;
border-bottom-width: 2px;
border-bottom-color: ${props => props.theme.color.Primary};
justify-content: center;
align-items: center;
`;

const SwapButton = styled(TouchableOpacity)`
height: 44px;
width: 50%;
justify-content: center;
align-items: center;
`;

const SwapButtonClickedText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const SwapButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.Gray};
`;

const CurrencyTypeContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 16px;
`;

const CurrencyTypeRowContainer = styled(View)`
display: flex;
flex-direction: row;
`;

const CurrencyTypeLeftColumnContainer = styled(View)`
display: flex;
flex-direction: column;
padding-right: 20px;
width: 50%;
`;

const CurrencyTypeRightColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 50%;
`;

const CurrencyTypeTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
padding-bottom: 4px;
`;

const CurrencyTypeButton = styled(TouchableOpacity)`
height: 48px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #242D37;
padding-top: 10px;
padding-bottom: 10px;
padding-right: 12px;
padding-left: 12px;
`;

const CurrencyTypeButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const CurrencyTypeForwardImage = styled(Image)`
width: 28px;
height: 28px;
`;

// Price Container Style
const PriceContainer = styled(View)`
display: flex;
flex-direction: column;
padding: 16px;
`;

const PriceTypeInputContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 16px;
padding-bottom: 8px;
`;

const PriceRowContainer = styled(View)`
display: flex;
flex-direction: row;
height: 48px;
justify-content: space-between;
align-items: center;
padding-top: 4px;
`;

const PriceBottomRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
padding-top: 8px;
padding-bottom: 8px;
`;

const PriceTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const PriceSmallTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
padding-bottom: 4px;
`;

const PriceButton = styled(TouchableOpacity)`
display: flex;
flex-direction: row;
height: 48px;
justify-content: space-between;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
background-color: #242D37;
`;

const PriceButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const PriceButtonForwardImage = styled(Image)`
width: 28px;
height: 28px;
`;

const PriceInputCurencytTextView = styled(View)`
height: 48px;
width: 20%;
background-color: #242D37;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const PriceInputCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const PriceMarketValueText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.LightMidGray};
`;

const PriceTradeText = styled(Text)`
font-weight: 700;
font-size: 24px;
line-height: 30px;
color: ${props => props.theme.color.White};
`;

const PriceNumberContainer = styled(View)`
display: flex;
flex-direction: row;
height: 48px;
justify-content: space-between;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
background-color: #242D37;
margin
`;

const PriceInputImage = styled(Image)`
width: 24px;
height: 24px;
`;

// Quantity Container Style
const QuantityContainer = styled(View)`
display: flex;
flex-direction: column;
padding: 16px;
`;

const QuantityTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
padding-bottom: 8px;
`;

const QuantityInputContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 8px;
padding-bottom: 8px;
`;

const QuantityInputTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const QuantityTradeQuantityRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const QuantityTradeQuantityCurrencyView = styled(View)`
height: 48px;
width: 20%;
background-color: #242D37;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const QuantityTradeQuantityCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const QuanitityTradeQuantityTitleNegative = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
padding-bottom: 4px;
`;

const QuanitityTradeQuantityDetailNegative = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.SecondaryLight};
padding-top: 4px;
`;

const QuantitySmallTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
padding-bottom: 4px;
`;

const QuantityTradeQuantityCurrentWalletBalanceText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.LightMidGray};
padding-bottom: 4px;
`;

const QuantityPriceLimitRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const QuantityPriceLimitCurrencyView = styled(View)`
height: 48px;
width: 18%;
background-color: #242D37;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
`;

const QuantityPriceLimitCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const QuantityPriceLimitMiddleView = styled(View)`
height: 48px;
width: 4%;
justify-content: center;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
`;

const QuantityPriceLimitMiddleViewText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const QuantityTimeLimitButton = styled(TouchableOpacity)`
display: flex;
flex-direction: row;
height: 48px;
justify-content: space-between;
align-items: center;
padding-top: 12px;
padding-bottom: 12px;
padding-left: 16px;
padding-right: 16px;
background-color: #242D37;
`;

const QuantityTimeLimitButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const QuantityTimeLimitButtonForwardImage = styled(Image)`
width: 28px;
height: 28px;
`;

// Trade Fee Notify View Style
const TradeFeeNotifyContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
border: 1px solid ${props => props.theme.color.Primary};
border-radius: 8px;
padding-top: 20px;
padding-bottom: 20px;
padding-left: 16px;
padding-right: 16px;
margin-left: 16px;
margin-right: 16px;
margin-top: 12px;
margin-bottom: 100px;
`;

const TradeFeeNotifyImage = styled(Image)`
width: 24px;
height: 24px;
`;

const TradeFeeNotifyText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.White};
padding-left: 15px;
`;




// Progress Part 1 Style









// Modal Style

// Global Style
const ModalHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
padding-top: 10px;
padding-bottom: 10px;
`;

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

const ModalFullScreenHeaderContainer = styled(View) <{ insets: number }> `
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: ${props => props.insets}px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 4px;
background-color: #18222D;
`;

const ModalHeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const ModalSelectImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalCancelImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalHeaderRightEmptyView = styled(View)`
width: 28px;
height: 28px;
`;

// CryptoAsset Modal Style
const CryptoAssetModalContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
padding-bottom: 40px;
`;

const CryptoAssetModalCardContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
`;

const CryptoAssetModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
height: 28px;
`;

const CryptoAssetModalInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const CryptoAssetModalImage = styled(Image)`
width: 24px;
height: 24px;
`;

const CryptoAssetModalText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
padding-left: 12px;
`;

const CryptoAssetModalLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-top: 16px;
margin-bottom: 16px;
`;

// FiatCurrency Modal Style
const FiatCurrencyModalContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
background-color: #131B24;
padding-bottom: 16px;
`;

const FiatCurrenctModalSearchbarContainer = styled(View)`
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
background-color: #131B24;
`;

const FiatCurrencyModalCardContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
padding-left: 16px;
padding-right: 16px;
`;

const FiatCurrencyModalInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const FiatCurrencyModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 16px;
height: 58px;
`;

const FiatCurrencyModalIconView = styled(View)`
width: 24px;
height: 24px;
border-radius: 75px;
background-color: #A8C2DC;
align-items: center;
justify-content: center;
`;

const FiatCurrencyModalIconText = styled(Text)`
font-weight: 600;
font-size: 14px;
line-height: 18px;
color: #18222D;
`;

const FiatCurrencyModalText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.White};
padding-left: 12px;
`;

const FiatCurrencyModalLine = styled(View)`
height: 1px;
background-color: #242D37;
`;

// Price Modal Style
const PriceModalContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
padding-top: 16px;
padding-bottom: 30px;
`;

const PriceModalCardContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
`;

const PriceModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
height: 28px;
`;

const PriceModalText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
padding-left: 12px;
`;

const PriceModalLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-top: 16px;
margin-bottom: 16px;
`;

// Time Limit Modal Style
const TimeLimitModalConfirmText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.MidGray};
`;

const TimeLmitPickerContainer = styled(View)``;





const C2cCreateScreen = ({ navigation }: RootStackScreenProps<"C2cCreateScreen">) => {

    const insets = useSafeAreaInsets();

    // 是否可以進行下一步
    const handleNextStep = () => {
        if (true) {
            return false
        } else {
            return true
        }
    };

    // 切換進度條
    const [swapProgress, setSwapProgress] = useState(0);

    // 切換購買/出售頁面
    const [swapPage, setSwapPage] = useState(0);

    // Modal Visible
    const [isCryptoAssetModalVisible, setIsCryptoAssetModalVisible] = useState(false);
    const [isFiatCurrencyModalVisible, setIsFiatCurrencyModalVisible] = useState(false);
    const [isPriceTypeModalVisible, setIsPriceTypeModalVisible] = useState(false);
    const [isTimeLimitModalVisible, setIsTimeLimitModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    // 選擇幣種
    const [cryptoAssetType, setCryptoAssetType] = useState('USDT');

    // 選擇法幣
    const [fiatCurrencyType, setFiatCurrencyType] = useState('USD');

    // 法幣 Search Bar
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: any) => setSearchQuery(query);

    // 定價方式
    const [priceType, setPriceType] = useState(0); // 0 = 固定價格 ; 1 = 浮動價格

    const handlePriceText = () => {
        if (priceType === 0) {
            return '固定價格'
        } else {
            return '浮動價格'
        }
    };

    const [priceProportion, setPriceProportion] = useState(100);

    const handleProportionMinus = () => {
        if (priceProportion > 1) {
            setPriceProportion(priceProportion - 1);
        }
    };

    const handleProportionAdd = () => {
        if (priceProportion < 100) {
            setPriceProportion(priceProportion + 1);
        }
    };

    // 價格 Input
    const [inputPrice, setInputPrice] = useState("");

    // 數量 Input
    const [inputQuantity, setInputQuantity] = useState("");
    const [inputMinLimitPrice, setInputMinLimitPrice] = useState("");
    const [inputMaxLimitPrice, setInputMaxLimitPrice] = useState("");
    const [inputLimitTime, setInputLimitTime] = useState();

    // 獲取廣告單幣種列表
    const [cryptoAssetList, setCryptoAssetList] = useState([]);

    const getCryptoAssetList = () => {
        setLoading(true)
        api.get(`/otc/api/advertisement/support/cryptoAsset/`)
            .then((x) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setCryptoAssetList(x);
                }
                else {
                    Alert.alert("幣種獲取失敗，請重新操作")
                }
            })
            .catch((Error) => console.log(Error))
    };

    const handleCryptoAssetImage = (cryptoAsset: string) => {
        if (cryptoAsset == 'USDT') {
            return require('../../assets/images/wallet/usdt.png');
        } else if (cryptoAsset == 'BTC') {
            return require('../../assets/images/wallet/btc.png');
        } else if (cryptoAsset == 'ETH') {
            return require('../../assets/images/wallet/eth.png');
        } else {
            return require('../../assets/images/home/ad.png');
        }
    };

    // 獲取廣告單法幣列表
    const [fiatCurrencyList, setFiatCurrencyList] = useState([]);

    const getFiatCurrencyList = () => {
        setLoading(true)
        api.get(`/otc/api/advertisement/support/fiatCurrency/`)
            .then((x) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setFiatCurrencyList(x);
                }
                else {
                    Alert.alert(x.data.msg);
                }
            })
            .catch((Error) => console.log(Error))
    };

    const handleFiatCurrencyIconText = (fiatCurrency: string) => {
        if (fiatCurrency === 'CNY') {
            return '¥';
        } else if (fiatCurrency === 'USD') {
            return '$';
        } else if (fiatCurrency === 'TWD') {
            return '$';
        } else {
            return '$';
        }
    };

    // 用戶資訊
    const [account, setAccount] = useState("");
    const [userId, setUserId] = useState("");
    const [buyFeeRate, setBuyFeeRate] = useState();
    const [sellFeeRate, setSellFeeRate] = useState();
    const [userInfo, setUserInfo] = useState([]);
    const [userWalletBalance, setUserWalletBalance] = useState([]);
    const [currentWalletBalance, setCurrentWalletBalance] = useState("");

    // 獲取用戶資訊（幣種餘額）

    const getUserInfo = () => {
        setLoading(true)
        api.get(`/otc/api/user/${account}`)
            .then((x) => {

                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setUserInfo(x);
                    setUserWalletBalance(x.wallet.coins);
                    console.log(userWalletBalance)
                }
                else {
                    Alert.alert("用戶資訊獲取失敗，請重新操作")
                }
            })
            .catch((Error) => console.log(Error));
    };

    const handleWalletCurrency = (cryptoAsset: string) => {
        userWalletBalance.map((x: any, i) => {
            if (x.coins.symbol === cryptoAsset) {
                setCurrentWalletBalance(x.coins.balance)
            }

        })
        return currentWalletBalance;
    };


    useEffect(async () => {
        let token = await AsyncStorage.getItem("token");
        let user = await AsyncStorage.getItem("user");
        setAccount(JSON.parse(user!).account);
        setUserId(JSON.parse(user!).userId);

        if (token) {
            getCryptoAssetList();
            getFiatCurrencyList();
            getUserInfo();
        }


    }, [])


    return (
        <Container insets={insets.top}>
            {
                loading &&
                <Spinner visible={true} textContent={''} color={'#FFFFFF'} textStyle={{ color: '#FFFFFF' }} />
            }
            <HeaderContainer>
                <HeaderTitleContainer>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ paddingRight: 21 }}>
                        <HeaderTitlePreviousIcon source={require("../../assets/images/global/previous.png")} />
                    </TouchableOpacity>
                    <HeaderTitleText>發佈廣告</HeaderTitleText>
                    {
                        handleNextStep() === true ?
                            <TouchableOpacity onPress={() => { }}>
                                <HeaderTitleNextStepWhiteText>下一步</HeaderTitleNextStepWhiteText>
                            </TouchableOpacity> :
                            <TouchableOpacity disabled={true}>
                                <HeaderTitleNextStepGrayText>下一步</HeaderTitleNextStepGrayText>
                            </TouchableOpacity>

                    }
                </HeaderTitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <HeaderProgressContainer>

                    {
                        swapProgress === 0 &&
                        <HeaderProgressTopContainer>
                            <HeaderProgressPrimaryCircle />
                            <HeaderProgressGrayLine />
                            <HeaderProgressGrayCircle />
                            <HeaderProgressGrayLine />
                            <HeaderProgressGrayCircle />
                        </HeaderProgressTopContainer>
                    }
                    {
                        swapProgress === 1 &&
                        <HeaderProgressTopContainer>
                            <HeaderProgressLightGrayCircle />
                            <HeaderProgressLightGrayLine />
                            <HeaderProgressPrimaryCircle />
                            <HeaderProgressGrayLine />
                            <HeaderProgressGrayCircle />
                        </HeaderProgressTopContainer>
                    }
                    {
                        swapProgress === 2 &&
                        <HeaderProgressTopContainer>
                            <HeaderProgressLightGrayCircle />
                            <HeaderProgressLightGrayLine />
                            <HeaderProgressLightGrayCircle />
                            <HeaderProgressLightGrayLine />
                            <HeaderProgressPrimaryCircle />
                        </HeaderProgressTopContainer>
                    }
                    {
                        swapProgress === 0 &&
                        <HeaderProgressBottomContainer>
                            <HeaderProgressWhiteText>價格數量</HeaderProgressWhiteText>
                            <HeaderProgressGrayText>交易方式</HeaderProgressGrayText>
                            <HeaderProgressGrayText>廣告確認</HeaderProgressGrayText>
                        </HeaderProgressBottomContainer>
                    }
                    {
                        swapProgress === 1 &&
                        <HeaderProgressBottomContainer>
                            <HeaderProgressLightGrayText>價格數量</HeaderProgressLightGrayText>
                            <HeaderProgressWhiteText>交易方式</HeaderProgressWhiteText>
                            <HeaderProgressGrayText>廣告確認</HeaderProgressGrayText>
                        </HeaderProgressBottomContainer>
                    }
                    {
                        swapProgress === 2 &&
                        <HeaderProgressBottomContainer>
                            <HeaderProgressLightGrayText>價格數量</HeaderProgressLightGrayText>
                            <HeaderProgressLightGrayText>交易方式</HeaderProgressLightGrayText>
                            <HeaderProgressWhiteText>廣告確認</HeaderProgressWhiteText>
                        </HeaderProgressBottomContainer>
                    }
                </HeaderProgressContainer>

                {
                    swapProgress === 0 &&
                    <SwapPageContainer>
                        {
                            swapPage === 0 ?
                                <SwapContainer>
                                    <SwapButtonClicked onPress={() => { setSwapPage(0) }}>
                                        <SwapButtonClickedText>我想購買</SwapButtonClickedText>
                                    </SwapButtonClicked>
                                    <SwapButton onPress={() => { setSwapPage(1) }}>
                                        <SwapButtonText>我想出售</SwapButtonText>
                                    </SwapButton>
                                </SwapContainer> :
                                <SwapContainer>
                                    <SwapButton onPress={() => { setSwapPage(0) }}>
                                        <SwapButtonText>我想購買</SwapButtonText>
                                    </SwapButton>
                                    <SwapButtonClicked onPress={() => { setSwapPage(1) }}>
                                        <SwapButtonClickedText>我想出售</SwapButtonClickedText>
                                    </SwapButtonClicked>
                                </SwapContainer>
                        }

                        <CurrencyTypeContainer>
                            <CurrencyTypeRowContainer>
                                <CurrencyTypeLeftColumnContainer>
                                    <CurrencyTypeTitleText>幣種</CurrencyTypeTitleText>
                                    <CurrencyTypeButton onPress={() => { setIsCryptoAssetModalVisible(true) }}>
                                        <CurrencyTypeButtonText>{cryptoAssetType}</CurrencyTypeButtonText>
                                        <CurrencyTypeForwardImage source={require("../../assets/images/c2c/next.png")} />
                                    </CurrencyTypeButton>
                                </CurrencyTypeLeftColumnContainer>
                                <CurrencyTypeRightColumnContainer>
                                    <CurrencyTypeTitleText>法幣</CurrencyTypeTitleText>
                                    <CurrencyTypeButton onPress={() => { setIsFiatCurrencyModalVisible(true) }}>
                                        <CurrencyTypeButtonText>{fiatCurrencyType}</CurrencyTypeButtonText>
                                        <CurrencyTypeForwardImage source={require("../../assets/images/c2c/next.png")} />
                                    </CurrencyTypeButton>
                                </CurrencyTypeRightColumnContainer>
                            </CurrencyTypeRowContainer>
                        </CurrencyTypeContainer>

                        <PriceContainer>
                            <PriceTitleText>價格</PriceTitleText>
                            <PriceTypeInputContainer>
                                <PriceSmallTitleText>定價方式</PriceSmallTitleText>
                                <PriceButton onPress={() => { setIsPriceTypeModalVisible(true) }}>
                                    <PriceButtonText>{handlePriceText()}</PriceButtonText>
                                    <PriceButtonForwardImage source={require("../../assets/images/c2c/next.png")} />
                                </PriceButton>
                            </PriceTypeInputContainer>
                            <PriceTypeInputContainer>
                                <PriceSmallTitleText>{handlePriceText()}</PriceSmallTitleText>
                                {
                                    priceType === 0 ?
                                        <PriceRowContainer>
                                            <TextInput
                                                style={{
                                                    height: 48,
                                                    backgroundColor: '#242D37',
                                                    paddingBottom: 12,
                                                    paddingTop: 12,
                                                    paddingLeft: 16,
                                                    paddingRight: 16,
                                                    width: '80%',
                                                    color: '#FFFFFF'
                                                }}
                                                value={inputPrice}
                                                onChangeText={(text) => { setInputPrice(text) }}
                                                placeholder={"輸入固定價格"}
                                                placeholderTextColor={'#8D97A2'}
                                                keyboardType={"decimal-pad"}
                                            />
                                            <PriceInputCurencytTextView>
                                                <PriceInputCurrencyText>{fiatCurrencyType}</PriceInputCurrencyText>
                                            </PriceInputCurencytTextView>
                                        </PriceRowContainer> :
                                        <PriceNumberContainer>
                                            <TouchableOpacity onPress={() => { handleProportionMinus() }}>
                                                <PriceInputImage source={require("../../assets/images/trade/remove.png")} />
                                            </TouchableOpacity>
                                            <PriceButtonText>{priceProportion}</PriceButtonText>
                                            <TouchableOpacity onPress={() => { handleProportionAdd() }}>
                                                <PriceInputImage source={require("../../assets/images/trade/add.png")} />
                                            </TouchableOpacity>
                                        </PriceNumberContainer>
                                }
                            </PriceTypeInputContainer>
                            <PriceBottomRowContainer style={{ paddingTop: 16 }}>
                                <PriceSmallTitleText>市場參考價</PriceSmallTitleText>
                                <PriceMarketValueText>$$$ {fiatCurrencyType} / {cryptoAssetType}</PriceMarketValueText>
                            </PriceBottomRowContainer>
                            <PriceBottomRowContainer>
                                <PriceSmallTitleText>交易價格</PriceSmallTitleText>
                                <PriceTradeText>$$$ {fiatCurrencyType} / {cryptoAssetType}</PriceTradeText>
                            </PriceBottomRowContainer>
                        </PriceContainer>

                        <QuantityContainer>
                            <QuantityTitleText>數量</QuantityTitleText>
                            <QuantityInputContainer>
                                <QuantityInputTitleRowContainer>
                                    {
                                        parseFloat(inputQuantity) > parseFloat(currentWalletBalance) ?
                                            <QuanitityTradeQuantityTitleNegative>交易數量</QuanitityTradeQuantityTitleNegative> :
                                            <QuantitySmallTitleText>交易數量</QuantitySmallTitleText>
                                    }
                                    <QuantityTradeQuantityCurrentWalletBalanceText>
                                        可用資產 {handleWalletCurrency(cryptoAssetType)} {cryptoAssetType}
                                    </QuantityTradeQuantityCurrentWalletBalanceText>
                                </QuantityInputTitleRowContainer>
                                <QuantityTradeQuantityRowContainer>
                                    <TextInput
                                        style={{
                                            height: 48,
                                            backgroundColor: '#242D37',
                                            paddingBottom: 12,
                                            paddingTop: 12,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            width: '80%',
                                            color: '#FFFFFF'
                                        }}
                                        value={inputQuantity}
                                        onChangeText={(text) => { setInputQuantity(text) }}
                                        placeholder={"輸入交易數量"}
                                        placeholderTextColor={'#8D97A2'}
                                        keyboardType={"decimal-pad"}
                                    />
                                    <QuantityTradeQuantityCurrencyView>
                                        <QuantityTradeQuantityCurrencyText>{cryptoAssetType}</QuantityTradeQuantityCurrencyText>
                                    </QuantityTradeQuantityCurrencyView>
                                </QuantityTradeQuantityRowContainer>
                                {
                                    parseFloat(inputQuantity) > parseFloat(currentWalletBalance) &&
                                    <QuanitityTradeQuantityDetailNegative>超過您的可用資產</QuanitityTradeQuantityDetailNegative>
                                }
                            </QuantityInputContainer>
                            <QuantityInputContainer>
                                <QuantitySmallTitleText>單筆限額</QuantitySmallTitleText>
                                <QuantityPriceLimitRowContainer>
                                    <TextInput
                                        style={{
                                            height: 48,
                                            backgroundColor: '#242D37',
                                            paddingBottom: 12,
                                            paddingTop: 12,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            width: '30%',
                                            color: '#FFFFFF'
                                        }}
                                        value={inputMinLimitPrice}
                                        onChangeText={(text) => { setInputMinLimitPrice(text) }}
                                        placeholder={"最小"}
                                        placeholderTextColor={'#8D97A2'}
                                        keyboardType={"decimal-pad"}
                                    />
                                    <QuantityPriceLimitCurrencyView>
                                        <QuantityPriceLimitCurrencyText>{fiatCurrencyType}</QuantityPriceLimitCurrencyText>
                                    </QuantityPriceLimitCurrencyView>
                                    <QuantityPriceLimitMiddleView>
                                        <QuantityPriceLimitMiddleViewText> ~ </QuantityPriceLimitMiddleViewText>
                                    </QuantityPriceLimitMiddleView>
                                    <TextInput
                                        style={{
                                            height: 48,
                                            backgroundColor: '#242D37',
                                            paddingBottom: 12,
                                            paddingTop: 12,
                                            paddingLeft: 16,
                                            paddingRight: 16,
                                            width: '30%',
                                            color: '#FFFFFF'
                                        }}
                                        value={inputMinLimitPrice}
                                        onChangeText={(text) => { setInputMinLimitPrice(text) }}
                                        placeholder={"最小"}
                                        placeholderTextColor={'#8D97A2'}
                                        keyboardType={"decimal-pad"}
                                    />
                                    <QuantityPriceLimitCurrencyView>
                                        <QuantityPriceLimitCurrencyText>{fiatCurrencyType}</QuantityPriceLimitCurrencyText>
                                    </QuantityPriceLimitCurrencyView>
                                </QuantityPriceLimitRowContainer>
                            </QuantityInputContainer>
                            <QuantityInputContainer>
                                {
                                    swapPage === 0 ?
                                        <QuantitySmallTitleText>放行時限</QuantitySmallTitleText> :
                                        <QuantitySmallTitleText>付款時限</QuantitySmallTitleText>
                                }
                                <QuantityTimeLimitButton onPress={() => { setIsTimeLimitModalVisible(true) }}>
                                    <QuantityTimeLimitButtonText>{inputLimitTime} 分鐘</QuantityTimeLimitButtonText>
                                    <QuantityTimeLimitButtonForwardImage source={require("../../assets/images/c2c/next.png")} />
                                </QuantityTimeLimitButton>
                            </QuantityInputContainer>
                        </QuantityContainer>

                        <TradeFeeNotifyContainer>
                            <TradeFeeNotifyImage source={require("../../assets/images/c2c/funds.png")} />
                            <TradeFeeNotifyText>廣告預估手續費 ??? {cryptoAssetType}</TradeFeeNotifyText>
                        </TradeFeeNotifyContainer>

                    </SwapPageContainer>
                }
            </BodyContainer>


            {/* CryptoAsset Modal 幣種*/}
            <Modal
                isVisible={isCryptoAssetModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsCryptoAssetModalVisible(false)}
                onSwipeComplete={() => setIsCryptoAssetModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <ModalHeaderTitleText>幣種</ModalHeaderTitleText>
                    </ModalHeaderContainer>
                    <CryptoAssetModalContainer>
                        {
                            cryptoAssetList.map((x: any, i) => {
                                return (
                                    <CryptoAssetModalCardContainer>
                                        <TouchableOpacity onPress={() => { (setCryptoAssetType((x.name).toUpperCase()), setIsCryptoAssetModalVisible(false)) }}>
                                            <CryptoAssetModalRowContainer>
                                                <CryptoAssetModalInRowContainer>
                                                    <CryptoAssetModalImage source={handleCryptoAssetImage(x.name)} />
                                                    <CryptoAssetModalText>{x.name}</CryptoAssetModalText>
                                                </CryptoAssetModalInRowContainer>
                                                {
                                                    cryptoAssetType === (x.name).toUpperCase() &&
                                                    <ModalSelectImage source={require("../../assets/images/trade/selected.png")} />
                                                }
                                            </CryptoAssetModalRowContainer>
                                        </TouchableOpacity>
                                        {
                                            i !== cryptoAssetList.length - 1 &&
                                            <CryptoAssetModalLine />
                                        }
                                    </CryptoAssetModalCardContainer>
                                )
                            })
                        }
                    </CryptoAssetModalContainer>
                </View>
            </Modal>

            {/* FiatCurrency Modal 法幣*/}
            <Modal
                isVisible={isFiatCurrencyModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsFiatCurrencyModalVisible(false)}
                onSwipeComplete={() => setIsFiatCurrencyModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-start', margin: 0, height: windowHeight, width: windowWidth }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{
                    backgroundColor: '#18222D',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    paddingTop: 16,
                    paddingBottom: 500
                }}>
                    <ModalFullScreenHeaderContainer insets={insets.top} >
                        <TouchableOpacity onPress={() => { setIsFiatCurrencyModalVisible(false) }}>
                            <ModalCancelImage source={require("../../assets/images/c2c/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHeaderTitleText>法幣</ModalHeaderTitleText>
                        <ModalHeaderRightEmptyView />
                    </ModalFullScreenHeaderContainer>
                    <FiatCurrenctModalSearchbarContainer>
                        <SearchBar
                            placeholder="請輸入法幣"
                            onChangeText={onChangeSearch}
                            value={searchQuery}
                            containerStyle={{ height: 48, backgroundColor: '#242D37', borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, marginBottom: 10 }}
                            inputContainerStyle={{ height: 32, backgroundColor: '#242D37' }}
                        />
                    </FiatCurrenctModalSearchbarContainer>
                    <FiatCurrencyModalContainer>
                        {
                            fiatCurrencyList.map((x: any, i) => {
                                return (
                                    <FiatCurrencyModalCardContainer>
                                        <TouchableOpacity onPress={() => (setFiatCurrencyType(x.name), setIsFiatCurrencyModalVisible(false))}>
                                            <FiatCurrencyModalRowContainer>
                                                <FiatCurrencyModalInRowContainer>
                                                    <FiatCurrencyModalIconView>
                                                        <FiatCurrencyModalIconText>{handleFiatCurrencyIconText(x.name)}</FiatCurrencyModalIconText>
                                                    </FiatCurrencyModalIconView>
                                                    <FiatCurrencyModalText>{x.name}</FiatCurrencyModalText>
                                                </FiatCurrencyModalInRowContainer>
                                                {
                                                    fiatCurrencyType === x.name &&
                                                    <ModalSelectImage source={require("../../assets/images/trade/selected.png")} />
                                                }
                                            </FiatCurrencyModalRowContainer>
                                        </TouchableOpacity>
                                        {
                                            i !== fiatCurrencyList.length - 1 &&
                                            <FiatCurrencyModalLine />
                                        }
                                    </FiatCurrencyModalCardContainer>
                                )
                            })
                        }
                    </FiatCurrencyModalContainer>
                </View>
            </Modal>

            {/* Price Type Modal 價格*/}
            <Modal
                isVisible={isPriceTypeModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsPriceTypeModalVisible(false)}
                onSwipeComplete={() => setIsPriceTypeModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <ModalHeaderTitleText>定價方式</ModalHeaderTitleText>
                    </ModalHeaderContainer>
                    <PriceModalContainer>
                        <TouchableOpacity onPress={() => { setPriceType(0), setIsPriceTypeModalVisible(false) }}>
                            <PriceRowContainer>
                                <PriceModalText>固定價格</PriceModalText>
                                {
                                    priceType === 0 &&
                                    <ModalSelectImage source={require("../../assets/images/trade/selected.png")} />
                                }
                            </PriceRowContainer>
                        </TouchableOpacity>
                        <PriceModalLine />
                        <TouchableOpacity onPress={() => { setPriceType(1), setIsPriceTypeModalVisible(false) }}>
                            <PriceRowContainer>
                                <PriceModalText>浮動價格</PriceModalText>
                                {
                                    priceType === 1 &&
                                    <ModalSelectImage source={require("../../assets/images/trade/selected.png")} />
                                }
                            </PriceRowContainer>
                        </TouchableOpacity>
                        <PriceModalLine />
                    </PriceModalContainer>
                </View>
            </Modal>

            {/* Time Limit Modal 放行時限*/}
            <Modal
                isVisible={isTimeLimitModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsTimeLimitModalVisible(false)}
                onSwipeComplete={() => setIsTimeLimitModalVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', paddingBottom: 30 }}>
                    <ModalTitleBarHeaderContainer>
                        <ModalCancelImage source={require("../../assets/images/c2c/cancel.png")} />
                        {
                            swapPage === 0 ?
                                <ModalHeaderTitleText>放行時限</ModalHeaderTitleText> :
                                <ModalHeaderTitleText>付款時限</ModalHeaderTitleText>
                        }
                        <TouchableOpacity onPress={() => { setIsTimeLimitModalVisible(false) }}>
                            <TimeLimitModalConfirmText>確定</TimeLimitModalConfirmText>
                        </TouchableOpacity>
                    </ModalTitleBarHeaderContainer>
                    <TimeLmitPickerContainer>
                        <Picker
                            selectedValue={inputLimitTime}
                            onValueChange={(itemValue, itemIndex) =>
                                setInputLimitTime(itemValue)
                            }
                            itemStyle={{ color: '#FFFFFF' }}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="7" value="7" />
                            <Picker.Item label="8" value="8" />
                            <Picker.Item label="9" value="9" />
                            <Picker.Item label="10" value="10" />
                            <Picker.Item label="11" value="11" />
                            <Picker.Item label="12" value="12" />
                            <Picker.Item label="13" value="13" />
                            <Picker.Item label="14" value="14" />
                            <Picker.Item label="15" value="15" />
                            <Picker.Item label="16" value="16" />
                            <Picker.Item label="17" value="17" />
                            <Picker.Item label="18" value="18" />
                            <Picker.Item label="19" value="19" />
                            <Picker.Item label="20" value="20" />
                            <Picker.Item label="21" value="21" />
                            <Picker.Item label="22" value="22" />
                            <Picker.Item label="23" value="23" />
                            <Picker.Item label="24" value="24" />
                            <Picker.Item label="25" value="25" />
                            <Picker.Item label="26" value="26" />
                            <Picker.Item label="27" value="27" />
                            <Picker.Item label="28" value="28" />
                            <Picker.Item label="29" value="29" />
                            <Picker.Item label="30" value="30" />
                            <Picker.Item label="31" value="31" />
                            <Picker.Item label="32" value="32" />
                            <Picker.Item label="33" value="33" />
                            <Picker.Item label="34" value="34" />
                            <Picker.Item label="35" value="35" />
                        </Picker>
                    </TimeLmitPickerContainer>
                </View>
            </Modal>
        </Container>
    )
}

export default C2cCreateScreen