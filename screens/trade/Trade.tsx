import * as React from "react";
import { Text, TextInput, TouchableOpacity, TouchableOpacityBase, View, Image, ScrollView, Dimensions } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";
import { init } from 'klinecharts'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View)`
    display: flex ;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;


// Header Style
const SwapContainer = styled(View) <{ insets: number }>`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-top: ${props => props.insets}px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 11px;
`;

const SwapTradeButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const SwapTradeButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const SwapGraphButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const SwapGraphButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const SwapButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const SwapButtonClickedText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

// Main Swap Page Conatiner

const MainSwapPageContainer = styled(View)`
display: flex;
flex-direction: column;
width: 100%;
`;

//Trade Page Header Style
const TradeHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
margin-top: 24px;
`;

const TradeHeaderLeftContainer = styled(View)`
display: flex;
flex-direction: row;
/* justify-content: flex-start; */
align-items: center;
margin-left: 16px;
`;

const TradeHeaderRightContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-end;
margin-right: 16px;
`;

const TradeHeaderTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const TradeHeaderFluctuationRiseText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
background-color: rgba(47, 178, 100, 0.3);
margin-left: 12px;
`;

const TradeHeaderFluctuationFallText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
background-color: rgba(251, 76, 81, 0.3);
margin-left: 12px;
`;

const TradeHeaderPositionButton = styled(TouchableOpacity)`
width: 51px;
height: 26px;
border-radius: 4px;
background-color: ${props => props.theme.color.DarkGray};
margin-right: 8px;
justify-content: center;
align-items: center;
`;

const TradeHeaderLeverageButton = styled(TouchableOpacity)`
width: 51px;
height: 26px;
border-radius: 4px;
background-color: ${props => props.theme.color.DarkGray};
justify-content: center;
align-items: center;
`;

const TradeHeaderButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.White};
`;

// Trade Page Style
const TradeContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
padding-top: 25px;
padding-left: 16px;
padding-right: 16px;
`;

const TradeRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;

// Trade Page Table Style
const TradeTableContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 50%;
padding-right: 8px;
`;

const TradeTableTopTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const TradeTableTopTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradeTableBuyContainer = styled(View)`
display: flex;
flex-direction: column;
margin-top: 8px;
`;

const TradeTableRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const TradeTableBuyPriceText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const TradeTableNumberText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeTableBottomTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
`;

const TradeTableBottomTitlePriceRiseText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const TradeTableBottomTitlePriceFallText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const TradeTableBottomTitleOwnValueText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeTableSellContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
margin-bottom: 8px;
`;

const TradeTableSellPriceText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

// Trade Page Function Style
const TradeFunctionContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 50%;
padding-left: 8px;
`;


const TradeFunctionColumnContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const TradeFunctionPositionButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
align-items: flex-end;
`;

const TradeFunctionOpenPositionButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionOpenPositionButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionClosePositionButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionClosePositionButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionPositionButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradeFunctionPositionButtonClickedText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const TradeFunctionPriceOption = styled(TouchableOpacity)`
height: 36px;
border-radius: 4px;
background-color: #242D37;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-left: 12px;
padding-right: 8px;
`; // Input Select

const TradeFunctionPriceOptionText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.White};
`;

const TradeFunctionPriceOptionIcon = styled(Image)`
width: 20px;
height: 20px;
`;

const TradeFunctionPriceInputContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const TradeFunctionPriceInputRightContainer = styled(View)`
height: 36px;
width: 30%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
background-color: #242D37;
justify-content: center;
align-items: center;
`;

const TradeFunctionPriceInputRightText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeFunctionCurrencyButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
`;

const TradeFunctionLeftCurrencyButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionLeftCurrencyButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-left-radius: 4px;
border-bottom-left-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionRightCurrencyButton = styled(TouchableOpacity)`
width: 50%;
height: 30px;
border: 1px solid ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionRightCurrencyButtonClicked = styled(TouchableOpacity)`
width: 50%;
height: 30px;
background-color: ${props => props.theme.color.DarkGray};
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
justify-content: center;
align-items: center;
`;

const TradeFunctionCurrencyButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradeFunctionCurrencyButtonClickedText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const TradeFunctionNumberInputContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const TradeFunctionNumberInputRightContainer = styled(View)`
height: 36px;
width: 30%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
background-color: #242D37;
justify-content: center;
align-items: center;
`;

const TradeFunctionNumberInputRightText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeFunctionPositionViewContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const TradeFunctionPositionViewTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradeFunctionPositionViewValueText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.White};
`;


const TradeFunctionBuyButton = styled(TouchableOpacity)`
width: 45%;
height: 38px;
border-radius: 4px;
background-color: ${props => props.theme.color.Secondary};
align-items: center;
justify-content: center;
`;

const TradeFunctionSellButton = styled(TouchableOpacity)`
width: 45%;
height: 38px;
border-radius: 4px;
background-color: ${props => props.theme.color.SecondaryLight};
align-items: center;
justify-content: center;
`;

const TradeFunctionBuySellButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

// Buy Type Picker Modal

const BuyTypeModalPickerButton = styled(TouchableOpacity)`
height: 50px;
justify-content: center;
align-items: center;
`;

const BuyTypeModalPickerButtonText = styled(Text)`
font-weight: 300;
font-size: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const BuyTypeModalLineText = styled(Text)`
background-color: #242D37;
height: 2px;
`;

const BuyTypeModalPickerCancelButton = styled(TouchableOpacity)`
justify-content: center;
align-items: center;
background-color: #242D37;
margin-top: 30px;
padding: 20px;
border-radius: 8px;
`;

// Trade Page Position Header Style
const TradePositionHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
height: 40px;
padding-top: 25px;
`;

const TradePositionHeaderRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: flex-start;
padding-top: 4px;
`;

const TradePositionHeaderColumnContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

const TradePositionHeaderLeftSwapButton = styled(TouchableOpacity)`
height: 32px;
width: 57px;
border: none;
`;

const TradePositionHeaderLeftSwapButtonClicked = styled(TouchableOpacity)`
height: 32px;
width: 57px;
border-bottom-width: 2px;
border-bottom-color: ${props => props.theme.color.Primary};
`;

const TradePositionHeaderRightSwapButton = styled(TouchableOpacity)`
height: 32px;
width: 57px;
border: none;
margin-left: 25px;
`;

const TradePositionHeaderRightSwapButtonClicked = styled(TouchableOpacity)`
height: 32px;
width: 57px;
border-bottom-width: 2px;
border-bottom-color: ${props => props.theme.color.Primary};
margin-left: 25px;
`;

const TradePositionHeaderSwapButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.LightMidGray};
`;

const TradePositionHeaderSwapButtonTextClicked = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const TradePositionLine = styled(Text)`
height: 1px;
background-color: #242D37;
margin-top: 20px;
`;

const TradePositionHeaderHistoryIcon = styled(Image)`
width: 24px;
height: 24px;
`; // Contain with TouchableOpacity

const TradePositionHeaderHistoryButton = styled(TouchableOpacity)`
flex-direction: row;
align-items: center;
height: 32px;
border: none;
`; // Contain with TouchableOpacity

const TradePositionHeaderHistoryText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`; // Contain with TouchableOpacity

// Trade Page Position Style
const TradePositionContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const TradePositionBackgroundImage = styled(Image)`
width: 99px;
height: 135px;
`;




// Graph Page Header Style
const GraphHeaderContainer = styled(View)``;

const GraphHeaderTopRowContainer = styled(View)``;

const GraphHeaderBottomRowContainer = styled(View)``;

const GraphHeaderBigTitleText = styled(Text)``;

const GraphHeaderFluctuationRiseText = styled(Text)``;

const GraphHeaderFluctuationFallText = styled(Text)``;

const GraphHeaderTitlePriceText = styled(Text)``;

const GraphHeaderBottomColumnContainer = styled(View)``;

const GraphHeaderSmallTitleText = styled(Text)``;

const GraphHeaderSmallValueText = styled(Text)``;

// Graph Page Style
const GraphContainer = styled(ScrollView)``;

const GraphContentContainer = styled(View)``;

// Graph Page Detail Buy Style
const GraphDetailContainer = styled(View)``;

const GraphDetailTitleText = styled(Text)``;

const GraphDetailBuyContainer = styled(View)``;

const GraphDetailBuyTitleText = styled(Text)``;

const GraphDetailBuyPriceTitleText = styled(Text)``;

const GraphDetailBuyDetailText = styled(Text)``;

// Graph Detail Price Container Style
const GraphDetailPriceRowContainer = styled(View)``;

const GraphDetailPriceTitleText = styled(Text)``;

const GraphDetailLatestPriceText = styled(Text)``;

const GraphDetailIndexPriceText = styled(Text)``;

// Graph Page Detail Sell Style
const GraphDetailSellContainer = styled(View)``;

const GraphDetailSellPriceText = styled(Text)``;

const GraphDetailSellDetailText = styled(Text)``;

//Graph Detail Button

const GraphButtonContainer = styled(View)``;

const GraphOpenPositionButton = styled(TouchableOpacity)``;

const GraphClosePositionButton = styled(TouchableOpacity)``;

const GraphButtonText = styled(Text)``;


// Trade Page Array
const BuyTable = [
    { id: 0, price: 41254.50, number: 0.104, timeStamp: "" },
    { id: 1, price: 41254.00, number: 0.079, timeStamp: "" },
    { id: 2, price: 41253.50, number: 0.868, timeStamp: "" },
    { id: 3, price: 41253.00, number: 0.260, timeStamp: "" },
    { id: 4, price: 41252.50, number: 0.260, timeStamp: "" },
    { id: 5, price: 41252.00, number: 0.013, timeStamp: "" },
    { id: 6, price: 41251.50, number: 0.295, timeStamp: "" },
    { id: 7, price: 41251.00, number: 0.019, timeStamp: "" }
];

const SellTable = [
    { id: 0, price: 41254.50, number: 0.295, timeStamp: "" },
    { id: 1, price: 41254.25, number: 0.019, timeStamp: "" },
    { id: 2, price: 41254.00, number: 0.323, timeStamp: "" },
    { id: 3, price: 41253.75, number: 0.019, timeStamp: "" },
    { id: 4, price: 41253.50, number: 0.760, timeStamp: "" },
    { id: 5, price: 41253.25, number: 0.656, timeStamp: "" },
    { id: 6, price: 41253.00, number: 0.781, timeStamp: "" },
    { id: 7, price: 41252.75, number: 0.781, timeStamp: "" }
];

const MyPosition = {
    BTC: '0.179',
    USDT: '57649.86'
};

const priceOptionArray = [

    {
        label: '限價',
        value: 'Limit'
    },
    {
        label: '市價',
        value: 'Market'
    }

]


const TradeScreen = ({
    navigation
}: RootStackScreenProps<"TradeScreen">) => {

    // Swap Page
    const [swapIndex, setSwapIndex] = useState(0);

    // Value is Positive
    const [isPositive, setIsPositive] = useState(true);

    // Function Button
    const [positionView, setPositionView] = useState('All');
    const [leverageView, setLeverageView] = useState('1');
    const [swapBuyPosition, setSwapBuyPosition] = useState('Open');
    const [isBuyTypeModalVisible, setIsBuyTypeModalVisible] = useState(false);
    const [buyType, setBuyType] = useState('Limit');
    const [buyPrice, setBuyPrice] = useState('');
    const [swapCurrency, setSwapCurrency] = useState(0);
    const [buyNumber, setBuyNumber] = useState("");
    const [sliderNum, setSliderNum] = useState(0);

    const toggleBuyTypeModal = () => {
        setIsBuyTypeModalVisible(!isBuyTypeModalVisible);
    }

    const buyTypeChange = () => {
        if (buyType === 'Limit') {
            return "限價委託";
        } else if (buyType === 'Market') {
            return "市價委託";
        } else if (buyType === 'Market_Stop') {
            return "市價止損";
        } else if (buyType === 'Limit_Stop') {
            return "限價止損";
        } else if (buyType === 'Market_Value') {
            return "止盈";
        } else {
            return "限價止盈";
        }
    }



    // Position Detail 
    const [swapPositionView, setSwapPositionView] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const insets = useSafeAreaInsets();
    return (
        <Container>
            {
                swapIndex === 0 ?
                    <SwapContainer insets={insets.top}>
                        <SwapTradeButtonClicked onPress={() => { setSwapIndex(0) }}>
                            <SwapButtonClickedText>交易</SwapButtonClickedText>
                        </SwapTradeButtonClicked>
                        <SwapGraphButton onPress={() => { setSwapIndex(1) }}>
                            <SwapButtonText>走勢圖</SwapButtonText>
                        </SwapGraphButton>
                    </SwapContainer> :
                    <SwapContainer insets={insets.top}>
                        <SwapTradeButton onPress={() => { setSwapIndex(0) }}>
                            <SwapButtonText>交易</SwapButtonText>
                        </SwapTradeButton>
                        <SwapGraphButtonClicked onPress={() => { setSwapIndex(1) }}>
                            <SwapButtonClickedText>走勢圖</SwapButtonClickedText>
                        </SwapGraphButtonClicked>
                    </SwapContainer>
            }
            {
                swapIndex === 0 ?
                    <MainSwapPageContainer>
                        <TradeHeaderContainer>
                            <TradeHeaderLeftContainer>
                                <TradeHeaderTitleText>BTCUSDT</TradeHeaderTitleText>
                                {
                                    isPositive === true ?
                                        <TradeHeaderFluctuationRiseText>+2.90%</TradeHeaderFluctuationRiseText>
                                        :
                                        <TradeHeaderFluctuationFallText>-2.90%</TradeHeaderFluctuationFallText>
                                }
                            </TradeHeaderLeftContainer>
                            <TradeHeaderRightContainer>
                                <TradeHeaderPositionButton onPress={() => { positionView }}>
                                    <TradeHeaderButtonText>全倉</TradeHeaderButtonText>
                                </TradeHeaderPositionButton>
                                <TradeHeaderLeverageButton onPress={() => { leverageView }}>
                                    <TradeHeaderButtonText>1X</TradeHeaderButtonText>
                                </TradeHeaderLeverageButton>
                            </TradeHeaderRightContainer>
                        </TradeHeaderContainer>
                        <TradeContainer>
                            <TradeRowContainer>
                                <TradeTableContainer>
                                    <TradeTableTopTitleContainer>
                                        <TradeTableTopTitleText>價格</TradeTableTopTitleText>
                                        <TradeTableTopTitleText>數量</TradeTableTopTitleText>
                                    </TradeTableTopTitleContainer>
                                    <TradeTableTopTitleContainer>
                                        <TradeTableTopTitleText>(USDT)</TradeTableTopTitleText>
                                        <TradeTableTopTitleText>(BTC)</TradeTableTopTitleText>
                                    </TradeTableTopTitleContainer>
                                    <TradeTableSellContainer>
                                        {
                                            SellTable.map((x, i) => {
                                                let percent = Number((1 - (x.number)).toPrecision());
                                                return (
                                                
                                                    <LinearGradient colors={['transparent', 'rgba(251, 76, 81, 0.2)']} start={{x: percent, y: 0.0}} end={{x: percent, y: 0.0}}>
                                                        <TradeTableRowContainer>

                                                            <TradeTableSellPriceText>{x.price}</TradeTableSellPriceText>
                                                            <TradeTableNumberText>{x.number}</TradeTableNumberText>

                                                        </TradeTableRowContainer>
                                                    </LinearGradient>
                                                )
                                            })
                                        }
                                    </TradeTableSellContainer>
                                    <TradeTableBottomTitleContainer>
                                        {
                                            isPositive === true ?
                                                <TradeTableBottomTitlePriceRiseText>41,254.50</TradeTableBottomTitlePriceRiseText> :
                                                <TradeTableBottomTitlePriceFallText>41,254.50</TradeTableBottomTitlePriceFallText>
                                        }
                                    </TradeTableBottomTitleContainer>
                                    <TradeTableBottomTitleContainer>
                                        <TradeTableBottomTitleOwnValueText>57,648.39</TradeTableBottomTitleOwnValueText>
                                    </TradeTableBottomTitleContainer>
                                    <TradeTableBuyContainer>
                                        {
                                            BuyTable.map((x, i) => {
                                                let percent = Number((1 - (x.number)).toPrecision());
                                                return (
                                                    <LinearGradient colors={['transparent', 'rgba(47, 178, 100, 0.2)']} start={{x: percent, y: 0.0}} end={{x: percent, y: 0.0}}>
                                                    <TradeTableRowContainer>
                                                        <TradeTableBuyPriceText>{x.price}</TradeTableBuyPriceText>
                                                        <TradeTableNumberText>{x.number}</TradeTableNumberText>
                                                    </TradeTableRowContainer>
                                                    </LinearGradient>
                                                )
                                            })
                                        }
                                    </TradeTableBuyContainer>
                                </TradeTableContainer>
                                <TradeFunctionContainer>
                                    <TradeFunctionColumnContainer>
                                        {
                                            swapBuyPosition === 'Open' ?
                                                <TradeFunctionPositionButtonContainer>
                                                    <TradeFunctionOpenPositionButtonClicked onPress={() => { setSwapBuyPosition('Open') }}>
                                                        <TradeFunctionPositionButtonClickedText>開倉</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionOpenPositionButtonClicked>
                                                    <TradeFunctionClosePositionButton onPress={() => { setSwapBuyPosition('Close') }}>
                                                        <TradeFunctionPositionButtonText>平倉</TradeFunctionPositionButtonText>
                                                    </TradeFunctionClosePositionButton>
                                                </TradeFunctionPositionButtonContainer> :
                                                <TradeFunctionPositionButtonContainer>
                                                    <TradeFunctionOpenPositionButton onPress={() => { setSwapBuyPosition('Open') }}>
                                                        <TradeFunctionPositionButtonText>開倉</TradeFunctionPositionButtonText>
                                                    </TradeFunctionOpenPositionButton>
                                                    <TradeFunctionClosePositionButtonClicked onPress={() => { setSwapBuyPosition('Close') }}>
                                                        <TradeFunctionPositionButtonClickedText>平倉</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionClosePositionButtonClicked>
                                                </TradeFunctionPositionButtonContainer>
                                        }
                                        <TradeFunctionPriceOption onPress={toggleBuyTypeModal}>
                                            <TradeFunctionPriceOptionText>{buyTypeChange()}</TradeFunctionPriceOptionText>
                                            <TradeFunctionPriceOptionIcon source={require("../../assets/images/trade/dropdown.png")} />
                                        </TradeFunctionPriceOption>
                                        <TradeFunctionPriceInputContainer>
                                            <TextInput
                                                placeholder={"價格"}
                                                value={buyPrice}
                                                onChangeText={buyPrice => setBuyPrice(buyPrice)}
                                                placeholderTextColor={'#8D97A2'}
                                                autoCorrect={false}
                                                keyboardType={"decimal-pad"}
                                                style={{ backgroundColor: '#242D37', width: '70%', height: 36, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                            />
                                            <TradeFunctionPriceInputRightContainer>
                                                <TradeFunctionPriceInputRightText>USDT</TradeFunctionPriceInputRightText>
                                            </TradeFunctionPriceInputRightContainer>
                                        </TradeFunctionPriceInputContainer>
                                        {
                                            swapCurrency === 0 ?
                                                <TradeFunctionCurrencyButtonContainer>
                                                    <TradeFunctionLeftCurrencyButtonClicked onPress={() => { setSwapCurrency(0) }}>
                                                        <TradeFunctionCurrencyButtonClickedText>BTC</TradeFunctionCurrencyButtonClickedText>
                                                    </TradeFunctionLeftCurrencyButtonClicked>
                                                    <TradeFunctionRightCurrencyButton onPress={() => { setSwapCurrency(1) }}>
                                                        <TradeFunctionCurrencyButtonText>USDT</TradeFunctionCurrencyButtonText>
                                                    </TradeFunctionRightCurrencyButton>
                                                </TradeFunctionCurrencyButtonContainer> :
                                                <TradeFunctionCurrencyButtonContainer>
                                                    <TradeFunctionLeftCurrencyButton onPress={() => { setSwapCurrency(0) }}>
                                                        <TradeFunctionCurrencyButtonText>BTC</TradeFunctionCurrencyButtonText>
                                                    </TradeFunctionLeftCurrencyButton>
                                                    <TradeFunctionRightCurrencyButtonClicked onPress={() => { setSwapCurrency(1) }}>
                                                        <TradeFunctionCurrencyButtonClickedText>USDT</TradeFunctionCurrencyButtonClickedText>
                                                    </TradeFunctionRightCurrencyButtonClicked>
                                                </TradeFunctionCurrencyButtonContainer>
                                        }
                                        <TradeFunctionNumberInputContainer>
                                            <TextInput
                                                placeholder={"數量"}
                                                value={buyNumber}
                                                onChangeText={buyNumber => setBuyNumber(buyNumber)}
                                                placeholderTextColor={'#8D97A2'}
                                                autoCorrect={false}
                                                keyboardType={"decimal-pad"}
                                                style={{ backgroundColor: '#242D37', width: '70%', height: 36, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                            />
                                            {
                                                swapCurrency === 0 ?
                                                    <TradeFunctionNumberInputRightContainer>
                                                        <TradeFunctionNumberInputRightText>BTC</TradeFunctionNumberInputRightText>
                                                    </TradeFunctionNumberInputRightContainer> :
                                                    <TradeFunctionNumberInputRightContainer>
                                                        <TradeFunctionNumberInputRightText>USDT</TradeFunctionNumberInputRightText>
                                                    </TradeFunctionNumberInputRightContainer>
                                            }

                                        </TradeFunctionNumberInputContainer>
                                        <Slider
                                            value={sliderNum}
                                            onValueChange={() => setSliderNum(sliderNum)}
                                            minimumValue={0}
                                            maximumValue={100}
                                            minimumTrackTintColor={'#F4F5F6'}
                                            maximumTrackTintColor={'#333C47'}
                                            containerStyle={{ alignContent: 'center', justifyContent: 'center' }}
                                            thumbImage={require("../../assets/images/trade/indicator.png")}
                                            thumbStyle={{ justifyContent: 'center' }}
                                            thumbTouchSize={{ width: 20, height: 20 }}
                                            trackClickable={true}
                                            thumbTintColor={'#F4F5F6'}
                                            trackMarks={[25, 50, 75]}
                                        />
                                        <TradeFunctionPositionViewContainer>
                                            <TradeFunctionPositionViewTitleText>可用</TradeFunctionPositionViewTitleText>
                                            <TradeFunctionPositionViewValueText>{MyPosition.USDT} USDT</TradeFunctionPositionViewValueText>
                                        </TradeFunctionPositionViewContainer>
                                        <TradeFunctionPositionViewContainer>
                                            <TradeFunctionPositionViewTitleText>可用</TradeFunctionPositionViewTitleText>
                                            <TradeFunctionPositionViewValueText>{MyPosition.BTC} BTC</TradeFunctionPositionViewValueText>
                                        </TradeFunctionPositionViewContainer>
                                        <TradeFunctionPositionViewContainer>
                                            <TradeFunctionBuyButton onPress={() => { }}>
                                                <TradeFunctionBuySellButtonText>開倉買入</TradeFunctionBuySellButtonText>
                                            </TradeFunctionBuyButton>
                                            <TradeFunctionSellButton onPress={() => { }}>
                                                <TradeFunctionBuySellButtonText>開倉賣出</TradeFunctionBuySellButtonText>
                                            </TradeFunctionSellButton>
                                        </TradeFunctionPositionViewContainer>
                                    </TradeFunctionColumnContainer>
                                </TradeFunctionContainer>
                            </TradeRowContainer>
                            {
                                swapPositionView === 0 ?
                                    <TradePositionHeaderContainer>
                                        <TradePositionHeaderRowContainer>
                                            <TradePositionHeaderLeftSwapButtonClicked onPress={() => { setSwapPositionView(0) }}>
                                                <TradePositionHeaderSwapButtonTextClicked>當前持倉</TradePositionHeaderSwapButtonTextClicked>
                                            </TradePositionHeaderLeftSwapButtonClicked>
                                            <TradePositionHeaderRightSwapButton onPress={() => { setSwapPositionView(1) }}>
                                                <TradePositionHeaderSwapButtonText>當前委託</TradePositionHeaderSwapButtonText>
                                            </TradePositionHeaderRightSwapButton>
                                        </TradePositionHeaderRowContainer>
                                        <TradePositionHeaderHistoryButton>
                                            <TradePositionHeaderHistoryIcon source={require("../../assets/images/trade/order.png")} />
                                            <TradePositionHeaderHistoryText>歷史訂單</TradePositionHeaderHistoryText>
                                        </TradePositionHeaderHistoryButton>
                                    </TradePositionHeaderContainer> :
                                    <TradePositionHeaderContainer>
                                        <TradePositionHeaderRowContainer>
                                            <TradePositionHeaderLeftSwapButton onPress={() => { setSwapPositionView(0) }}>
                                                <TradePositionHeaderSwapButtonText>當前持倉</TradePositionHeaderSwapButtonText>
                                            </TradePositionHeaderLeftSwapButton>
                                            <TradePositionHeaderRightSwapButtonClicked onPress={() => { setSwapPositionView(1) }}>
                                                <TradePositionHeaderSwapButtonTextClicked>當前委託</TradePositionHeaderSwapButtonTextClicked>
                                            </TradePositionHeaderRightSwapButtonClicked>
                                        </TradePositionHeaderRowContainer>
                                        <TradePositionHeaderHistoryButton>
                                            <TradePositionHeaderHistoryIcon source={require("../../assets/images/trade/order.png")} />
                                            <TradePositionHeaderHistoryText>歷史訂單</TradePositionHeaderHistoryText>
                                        </TradePositionHeaderHistoryButton>
                                    </TradePositionHeaderContainer>
                            }
                            <TradePositionLine></TradePositionLine>
                            {
                                swapPositionView === 0 ?
                                    <TradePositionContainer>
                                        <TradePositionBackgroundImage source={require("../../assets/images/trade/norecord.png")} />
                                    </TradePositionContainer> :
                                    <TradePositionContainer>
                                        <TradePositionBackgroundImage source={require("../../assets/images/trade/norecord.png")} />
                                    </TradePositionContainer>
                            }

                        </TradeContainer>

                        {/* Buy Type Modal */}
                        <Modal
                            isVisible={isBuyTypeModalVisible}
                            deviceHeight={windowHeight}
                            deviceWidth={windowWidth}
                            animationInTiming={500}
                            animationOutTiming={700}
                            backdropOpacity={0.7}
                            onBackdropPress={() => setIsBuyTypeModalVisible(false)}
                            onSwipeComplete={() => setIsBuyTypeModalVisible(false)}
                            swipeDirection={['down']}
                            style={{ margin: 40, justifyContent: 'center' }}
                            hideModalContentWhileAnimating={true}
                        >
                            <View style={{ backgroundColor: '#18222D', borderRadius: 15, padding: 40 }}>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Limit'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>限價委託</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalLineText></BuyTypeModalLineText>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Market'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>市價委託</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalLineText></BuyTypeModalLineText>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Market_Stop'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>市價止損</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalLineText></BuyTypeModalLineText>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Limit_Stop'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>限價止損</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalLineText></BuyTypeModalLineText>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Market_Value'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>止盈</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalLineText></BuyTypeModalLineText>
                                <BuyTypeModalPickerButton onPress={() => { setBuyType('Limit_Value'), setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>限價止盈</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerButton>
                                <BuyTypeModalPickerCancelButton onPress={() => { setIsBuyTypeModalVisible(false) }}>
                                    <BuyTypeModalPickerButtonText>取消</BuyTypeModalPickerButtonText>
                                </BuyTypeModalPickerCancelButton>
                            </View>
                        </Modal>
                    </MainSwapPageContainer> :
                    <MainSwapPageContainer>

                    </MainSwapPageContainer>
            }

        </Container>
    )
}

export default TradeScreen