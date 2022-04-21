import * as React from "react";
import { Text, TouchableOpacity, TouchableOpacityBase, View, Image, ScrollView } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

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
margin-left: 16px;
margin-right: 16px;
margin-top: 24px;
`;

const TradeHeaderLeftContainer = styled(View)`
display: flex;
flex-direction: row;
width: 60%;
justify-content: flex-start;
`;

const TradeHeaderRightContainer = styled(View)`
display: flex;
flex-direction: row;
width: 60%;
justify-content: flex-end;
`;

const TradeHeaderTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const TradeHeaderFluctuationRiseContainer = styled(View)`
width: 53px;
height: 20px;
background-color: ${props => props.theme.color.Secondary};
opacity: 0.16;
border-radius: 2px;
`;

const TradeHeaderFluctuationRiseText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const TradeHeaderFluctuationFallContainer = styled(View)`
width: 53px;
height: 20px;
background-color: ${props => props.theme.color.SecondaryLight};
opacity: 0.16;
border-radius: 2px;
`;

const TradeHeaderFluctuationFallText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const TradeHeaderPositionButton = styled(TouchableOpacity)``; // Input Select

const TradeHeaderLeverageButton = styled(TouchableOpacity)``; // Input Select

const TradeHeaderLButtonText = styled(Text)``; // Input Select

// Trade Page Style
const TradeContainer = styled(ScrollView)``;

// Trade Page Function Style
const TradeFunctionContainer = styled(View)``;

const TradeFunctionDetailColumnContainer = styled(View)``;

const TradeFunctionColumnContainer = styled(View)``;

const TradeFunctionPositionButtonContainer = styled(View)``;

const TradeFunctionPositionButton = styled(TouchableOpacity)``;

const TradeFunctionPositionButtonClicked = styled(TouchableOpacity)``;

const TradeFunctionPositionButtonText = styled(Text)``;

const TradeFunctionPositionButtonClickedText = styled(Text)``;

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

// array


const TradeScreen = ({
    navigation
}: RootStackScreenProps<"TradeScreen">) => {

    const [swapIndex, setSwapIndex] = useState(0);
    const [isPositive, setIsPositive] = useState(true);

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
                                        <TradeHeaderFluctuationRiseContainer>
                                            <TradeHeaderFluctuationRiseText>+2.90%</TradeHeaderFluctuationRiseText>
                                        </TradeHeaderFluctuationRiseContainer> :
                                        <TradeHeaderFluctuationRiseContainer>
                                            <TradeHeaderFluctuationFallText>-2.90%</TradeHeaderFluctuationFallText>
                                        </TradeHeaderFluctuationRiseContainer>
                                }
                            </TradeHeaderLeftContainer>
                            <TradeHeaderRightContainer>
                                <TradeHeaderPositionButton>
                                    <TradeHeaderLButtonText>全倉</TradeHeaderLButtonText>
                                </TradeHeaderPositionButton>
                                <TradeHeaderLeverageButton>
                                    <TradeHeaderLButtonText>1X</TradeHeaderLButtonText>
                                </TradeHeaderLeverageButton>
                            </TradeHeaderRightContainer>
                        </TradeHeaderContainer>
                    </MainSwapPageContainer> :
                    <MainSwapPageContainer>

                    </MainSwapPageContainer>
            }

        </Container>
    )
}

export default TradeScreen