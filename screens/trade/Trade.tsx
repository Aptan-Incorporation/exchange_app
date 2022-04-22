import * as React from "react";
import { Text, TouchableOpacity, TouchableOpacityBase, View, Image, ScrollView, Dimensions } from "react-native"
import { PickerView } from '@ant-design/react-native';
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

const TradeFunctionPriceOption = styled(TouchableOpacity)``; // Input Select

const TradeFunctionPriceInput = styled(TouchableOpacity)``; // Input Text

const TradeFunctionCurrencyButton = styled(TouchableOpacity)``;

const TradeFunctionCurrencyButtonClicked = styled(TouchableOpacity)``;

const TradeFunctionCurrencyButtonText = styled(TouchableOpacity)``;

const TradeFunctionCurrencyuttonClickedText = styled(TouchableOpacity)``;

const TradeFunctionCurrencyInput = styled(TouchableOpacity)``;

const TradeFunctionPositionViewContainer = styled(View)``;

const TradeFunctionPositionViewTitleText = styled(Text)``;

const TradeFunctionPositionViewValueText = styled(Text)``;

const TradeFunctionBuyButton = styled(TouchableOpacity)``;

const TradeFunctionSellButton = styled(TouchableOpacity)``;

const TradeFunctionBuySellButtonText = styled(TouchableOpacity)``;

// Trade Page Position Header Style

const TradePositionHeaderContainer = styled(View)``;

const TradePositionHeaderInlineContainer = styled(View)``;

const TradePositionHeaderSwapButton = styled(TouchableOpacity)``;

const TradePositionHeaderSwapButtonClicked = styled(TouchableOpacity)``;

const TradePositionHeaderSwapButtonText = styled(Text)``;

const TradePositionHeaderSwapButtonTextClicked = styled(Text)``;

const TradePositionHeaderHistoryIcon = styled(Image)``; // Contain with TouchableOpacity

const TradePositionHeaderHistoryText = styled(Text)``; // Contain with TouchableOpacity

// Trade Page Position Style
const TradePositionContainer = styled(View)``;

const TradePositionBackgroundImage = styled(Image)``;




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

const priceOptionArray = [
    [
        {
            label: '限價',
            value: '限價'
        },
        {
            label: '市價',
            value: '市價'
        }
    ]
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
    const [buyType, setBuyType] = useState('Limit');
    const [swapCurrency, setSwapCurrency] = useState(0);
    const [buyNumber, setBuyNumber] = useState('');

    // Position Detail 
    const [swapPositionView, setSwapPositionView] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState();

    const insets = useSafeAreaInsets();
    return (
        <Container>
            {
                swapIndex === 0 ?
                    <SwapContainer insets={insets.top}>
                        <SwapTradeButtonClicked>
                            <SwapButtonClickedText>交易</SwapButtonClickedText>
                        </SwapTradeButtonClicked>
                        <SwapGraphButton>
                            <SwapButtonText>走勢圖</SwapButtonText>
                        </SwapGraphButton>
                    </SwapContainer> :
                    <SwapContainer insets={insets.top}>
                        <SwapTradeButton>
                            <SwapButtonText>交易</SwapButtonText>
                        </SwapTradeButton>
                        <SwapGraphButtonClicked>
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
                                                return (
                                                    <TradeTableRowContainer>
                                                        <TradeTableSellPriceText>{x.price}</TradeTableSellPriceText>
                                                        <TradeTableNumberText>{x.number}</TradeTableNumberText>
                                                    </TradeTableRowContainer>
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
                                                return (
                                                    <TradeTableRowContainer>
                                                        <TradeTableBuyPriceText>{x.price}</TradeTableBuyPriceText>
                                                        <TradeTableNumberText>{x.number}</TradeTableNumberText>
                                                    </TradeTableRowContainer>
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
                                                    <TradeFunctionOpenPositionButtonClicked onPress={() => { }}>
                                                        <TradeFunctionPositionButtonClickedText>開倉</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionOpenPositionButtonClicked>
                                                    <TradeFunctionClosePositionButton onPress={() => { }}>
                                                        <TradeFunctionPositionButtonText>平倉</TradeFunctionPositionButtonText>
                                                    </TradeFunctionClosePositionButton>
                                                </TradeFunctionPositionButtonContainer> :
                                                <TradeFunctionPositionButtonContainer>
                                                    <TradeFunctionOpenPositionButton onPress={() => { }}>
                                                        <TradeFunctionPositionButtonText>開倉</TradeFunctionPositionButtonText>
                                                    </TradeFunctionOpenPositionButton>
                                                    <TradeFunctionClosePositionButtonClicked onPress={() => { }}>
                                                        <TradeFunctionPositionButtonClickedText>平倉</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionClosePositionButtonClicked>
                                                </TradeFunctionPositionButtonContainer>
                                        }
                                        
                                        
                                    </TradeFunctionColumnContainer>
                                </TradeFunctionContainer>
                            </TradeRowContainer>
                        </TradeContainer>
                    </MainSwapPageContainer> :
                    <MainSwapPageContainer>

                    </MainSwapPageContainer>
            }

        </Container>
    )
}

export default TradeScreen