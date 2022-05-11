import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions, Alert } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState,useEffect } from "react";
import GraphPage from "../../components/trade/GraphPage"
import SliderContainer from "../../components/trade/Slider";
import SmallSliderContainer from "../../components/trade/SmallSlider";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View) <{ insets: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: ${props => props.insets}px;
    background-color: #18222D;
`;


// Header Style
const SwapContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding-top: 10px;
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
padding-left: 16px;
padding-right: 16px;
padding-bottom: 12px;
`;

const TradeHeaderLeftContainer = styled(View)`
display: flex;
flex-direction: row;
/* justify-content: flex-start; */
align-items: center;
`;

const TradeHeaderRightContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-end;
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
padding-top: 12px;
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
margin-top:2;
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
margin-top:2;
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
margin-top:2;

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
width: 100%;
height: 38px;
border-radius: 4px;
background-color: ${props => props.theme.color.Secondary};
align-items: center;
justify-content: center;
margin-top:5;
`;

const TradeFunctionSellButton = styled(TouchableOpacity)`
width: 100%;
height: 38px;
border-radius: 4px;
background-color: ${props => props.theme.color.SecondaryLight};
align-items: center;
justify-content: center;
margin-top:5;

`;

const TradeFunctionBuySellButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
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
`;

const TradePositionHeaderHistoryButton = styled(TouchableOpacity)`
flex-direction: row;
align-items: center;
height: 32px;
border: none;
`;

const TradePositionHeaderHistoryText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

// Trade Page Position Style
const TradePositionContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 280px;
`;

const TradePositionBackgroundImage = styled(Image)`
width: 99px;
height: 135px;
`;

const TradePositionCardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const TradePositionCardTitleContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
`;

const TradePositionCardTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const TradePositionCardTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const TradePositionCardTitleValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradePositionCardDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
padding-top: 12px;
`;

const TradePositionCardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 50%;
`;

const TradePositionCardSmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradePositionCardBigValueText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradePositionCardSmallValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradePositionCardButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 12px;
`;

const TradePositionCardButton = styled(TouchableOpacity)`
height: 26px;
width: 48%;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
`;

const TradePositionCardButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;


// Trade Page Commit Style
const TradeCommitContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding-bottom: 280px;
`;

const TradeCommitBackgroundImage = styled(Image)`
width: 99px;
height: 135px;
`;

const TradeCommitCardContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
`;

const TradeCommitCardTitleContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
padding-top: 20px;
`;

const TradeCommitCardTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const TradeCommitCardTitleTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeCommitCardDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 12px;
`;

const TradeCommitCardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 30%;
`;

const TradeCommitCardSmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const TradeCommitCardBuyDirectionLongText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const TradeCommitCardBuyDirectionShortText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const TradeCommitCardSmallValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TradeCommitCardButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 12px;
`;

const TradeCommitCardButton = styled(TouchableOpacity)`
height: 26px;
width: 48%;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
`;

const TradeCommitCardButtonText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;


// Modal Style


// Modal Global Style
const ModalHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 10px;
padding-bottom: 26px;
`;

const ModalHedaerTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const ModalSelectedImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalYellowSelectedImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalNextImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalLeftCancelButton = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalEmptyDiv = styled(View)`
width: 28px;
height: 28px;
`;

const ModalConfirmButton = styled(TouchableOpacity)`
height: 44px;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
margin-top: 32px;
`;

const ModalConfirmButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;


// Position View Modal 擔保資產模式
const PositionViewModalButton = styled(TouchableOpacity)`
height: 44px;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: ${props => props.theme.color.DarkGray};
margin-top: 24px;
padding-left: 16px;
padding-right: 16px;
`;

const PositionViewModalButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const PositionViewModalDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 8px;
`;


// Leverage View Modal 槓桿比例

const LeverageViewModalSliderContainer = styled(View)`
`;



// Buy Type Modal 下單類型
const BuyTypeTitleContainer = styled(View)`
justify-content: center;
align-items: center;
padding-top: 10px;
padding-bottom: 10px;
`;

const BuyTypeModalTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const BuyTypeModalPickerButton = styled(TouchableOpacity)`
height: 55px;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 16px;
padding-bottom: 16px;
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


// Commit Stop Button Modal 當前委託止盈/止損價
const CommitStopModalCardContainer = styled(View)`
display: flex;
flex-direction: column;
margin-top: 24px;
`;

const CommitStopModalCardTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const CommitStopModalCardTitleColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CommitStopModalCardDetailContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 13px;
`;

const CommitStopModalCardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 38%;
`;

const CommitStopModalCardTitleStopEarnText = styled(Text)`
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CommitStopModalCardTitleStopLostText = styled(Text)`
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: ${props => props.theme.color.Secondary};
`;

const CommitStopModalCardTitleTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
padding-top: 1px;
`;

const CommitStopModalCardTitleProgressText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const CommitStopModalCardDetailTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const CommitStopModalCardDetailValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.ExtraLightGray};
padding-top: 2px;
`;

const CommitStopModalLine = styled(View)`
height: 1px;
background-color: ${props => props.theme.color.DarkGray};
margin-top: 24px;
`;
// Slider Style
const ThumbImage = styled(Image)`width: 20px; height: 20px;`;
const RenderAboveThumbImage = styled(Image)` position: relative; width: 32px; height: 22px; alignItems: center; justifyContent: center; right: 6;`;
const RenderAboveThumbText = styled(Text)`
    font-size: 10px;
    font-weight: 400;
    position: absolute;
    text-align: center;
    right: 8px;
    top: 2.5px;
`;


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

// My Position Array

const PositionArray = [
    {
        title: 'BTCUSDT',
        positionType: 'Full',
        value: '0',
        positionNum: '0.1',
        inPrice: '17,000.00',
        labelPrice: '17,000.00',
        stopPrice: '17,000.00',
        leverage: 20
    },
    {
        title: 'BTCUSDT',
        positionType: 'Full',
        value: '0',
        positionNum: '0.1',
        inPrice: '17,000.00',
        labelPrice: '17,000.00',
        stopPrice: '17,000.00',
        leverage: 20
    }
];

const CommitArray = [
    {
        title: 'BTCUSDT',
        time: '2021-10-19 13:24:30',
        butType: 'Limit',
        buyDirection: 'Long',
        CommitNumber: '0.1',
        DealRate: 0,
        DealNumber: 0,
        CommitPrice: '17,000.0'
    },
    {
        title: 'BTCUSDT',
        time: '2021-10-19 15:45:30',
        butType: 'Limit',
        buyDirection: 'Short',
        CommitNumber: '0.8',
        DealRate: 0,
        DealNumber: 0,
        CommitPrice: '18,000.0'
    },
];

const CommitStopPositionArray = [
    {
        type: 'StopEarn',
        progress: 0,
        time: '2021-10-16 20:55:10',
        condition: '>=20,000.0',
        volumnNum: '0.075',
        volumnPrice: '17,980.0'
    },
    {
        type: 'StopLost',
        progress: 0,
        time: '2021-10-16 20:55:10',
        condition: '<=16,000.0',
        volumnNum: '0.075',
        volumnPrice: '16,780.0'
    }
]






const TradeScreen = ({
    navigation
}: RootStackScreenProps<"TradeScreen">) => {

    const insets = useSafeAreaInsets();

    // Swap Page
    const [swapIndex, setSwapIndex] = useState(0);

    // Value is Positive
    const [isPositive, setIsPositive] = useState(true);

    // Function Button
    const [positionView, setPositionView] = useState('Full');
    const [leverageViewNum, setLeverageViewNum] = useState(1);
    const [swapBuyPosition, setSwapBuyPosition] = useState('Open');
    const [isPositionViewVisible, setIsPositionViewVisible] = useState(false);
    const [isLeverageViewVisible, setIsLeverageViewVisible] = useState(false);
    const [isBuyTypeModalVisible, setIsBuyTypeModalVisible] = useState(false);
    const [buyType, setBuyType] = useState('Limit');
    const [buyPrice, setBuyPrice] = useState('');
    const [stopPrice, setStopPrice] = useState('');
    const [swapCurrency, setSwapCurrency] = useState(0);
    const [sliderNum, setSliderNum] = useState(0);
    const [entrustArray, setEntrustArray] = useState([]);
    const [positionArray, setPositionArray] = useState([]);
    const [bidsArray, setBidsArray] = useState([]);
    const [asksArray, setAsksArray] = useState([]);
    const [price, setPrice] = useState("");
    const [position, setPosition] = useState(false);
    const [future, setFuture] = useState(false);
    const [balance, setBalance] = useState(0);
    const [wareHousedPrice, setWareHousedPrice] = useState("");
    const [loading,setLoading] = useState(false);

    const toggleBuyTypeModal = () => {
        setIsBuyTypeModalVisible(!isBuyTypeModalVisible);
    }

    const togglePositionViewModal = () => {
        setIsPositionViewVisible(!isPositionViewVisible);
    }

    const toggleLeverageViewModal = () => {
        setIsLeverageViewVisible(!isLeverageViewVisible);
    };


    const buyTypeChange = () => {
        if (buyType === 'Limit') {
            return "限價";
        } else if (buyType === 'Market') {
            return "市價";
        } else if (buyType === 'Plan_Limit') {
            return "計畫限價";
        } else if (buyType === 'Plan_Market') {
            return "計畫市價";
        } else {
            return "";
        }
    };

    const buyTypeInputPlaceHolder = () => {
        if (buyType === 'Limit' || buyType === 'Plan_Limit' ) {
            return "價格";
        } else if (buyType === 'Market' || buyType === 'Plan_Market') {
            return "市價";
        }else {
            return "";
        }
    };

    const positionViewChange = () => {
        if (positionView === 'Full') {
            return "全倉";
        } else if (positionView === 'Each') {
            return "逐倉";
        } else {
            return "";
        }
    };



    

    const CustomThumb = (() => {
        return (
            <View>
                <ThumbImage source={require("../../assets/images/trade/indicator.png")} />
            </View>
        );
    });

    const RenderAboveThumbComponent = (() => {

        let PercentageNum = balance === 0 ? Math.round(sliderNum / parseFloat(((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().substring(0,((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().indexOf(".")+3)) * 100) : 0;

        return (
            <View>
                {(PercentageNum != 0) && (!isNaN(PercentageNum)) &&
                    <View>
                        <RenderAboveThumbImage source={require("../../assets/images/trade/sliderFloat.png")} />
                        <RenderAboveThumbText>{PercentageNum}%</RenderAboveThumbText>
                    </View>
                }
            </View>
        );
    });

    // Position Detail 
    const [swapPositionView, setSwapPositionView] = useState(0);


    // Commit Stop Button Modal 當前委託止盈/止損價
    const [isCommitStopVisible, setIsCommitStopVisible] = useState(false);

    const toggleCommitStopModal = () => {
        setIsCommitStopVisible(!isCommitStopVisible)
    };

    const cancelCommitAlert = () =>
        Alert.alert(
            "撤銷委託單？",
            "確定撤銷後將無法再次回復該筆委託單內容。",
            [
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "確定", onPress: () => console.log("OK Pressed") }
            ]
        );


    const getEntrust = () => {
        api.get("/investor/future?status=CREATE").then((x) => {
            setEntrustArray(x.data);
            for (let i = 0; i < x.data.length; i++) {
            if (x.data[i].status !== "CANCEL") {
                setFuture(true);
                return;
            }
            }
        })
        // setInterval(() => {
        // api.get("/investor/future?status=CREATE").then((x) => {
        //     setEntrustArray(x.data);
        //     // console.log(x.data);
        //     for (let i = 0; i < x.data.length; i++) {
        //     if (x.data[i].status !== "CANCEL") {
        //         setFuture(true);
        //         return;
        //     }
        //     }
        // })},3000)
    };
    const getPosition = () => {
        api.get("/investor/position").then((x) => {
            setPositionArray(x.data.sort(function (a:any, b:any) {
            return a.positionId > b.positionId ? 1 : -1;
            }));
            for (let i = 0; i < x.data.length; i++) {
            if (x.data[i].status !== "CLOSE") {
                setPosition(true);
                return;
            }
            }
        })
        // setInterval(() => {
        // api.get("/investor/position").then((x) => {
        //     setPositionArray(x.data.sort(function (a:any, b:any) {
        //     return a.positionId > b.positionId ? 1 : -1;
        //     }));
    
        //     for (let i = 0; i < x.data.length; i++) {
        //     if (x.data[i].status !== "CLOSE") {
        //         setPosition(true);
        //         return;
        //     }
        //     }
        // })},3000)
        };
    const getDepth = () => {
        axios
            .get("https://api1.binance.com/api/v3/depth?symbol=BTCUSDT&limit=8")
            .then((x) => {
                setAsksArray(x.data.asks.reverse());
                setBidsArray(x.data.bids);
            });
            axios
            .get("https://api1.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
            .then((x) => {
                setPrice(x.data.price);
            });
        //     setInterval(() => {
        //     axios
        //     .get("https://api1.binance.com/api/v3/depth?symbol=BTCUSDT&limit=8")
        //     .then((x) => {
        //         setAsksArray(x.data.asks.reverse());
        //         setBidsArray(x.data.bids);
        //     });
        //     axios
        //     .get("https://api1.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
        //     .then((x) => {
        //         setPrice(x.data.price);
        //     });
        // }, 2000);
    };
    
    const getPrice = () => {
        axios
            .get("https://api1.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
            .then((x) => {
              setWareHousedPrice(x.data.price.slice(0, -6));
              setBuyPrice(x.data.price.slice(0, -6))
            });
    };
    
    const getBalance = () => {
        api.get("/investor/margin-balance").then((x) => {
            setBalance(x.data);
        });
    };

    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        let leverage = await AsyncStorage.getItem("leverage")
        if (token) {
            getEntrust();
            getPosition();
            getBalance();
        }
        if(leverage){
            setLeverageViewNum(parseInt(leverage))
        }
        // if(localStorage.getItem("leverRatio")){
        //   setLeverRatio(parseInt(localStorage.getItem("leverRatio")!))
        //   setTempLeverRatio(parseInt(localStorage.getItem("leverRatio")!))
        // }
        getDepth();
        getPrice();
    }, []);


    return (
        <Container insets={insets.top}>
            {loading && 
        <Spinner visible={true} textContent={''} />
      }
            {
                swapIndex === 0 ?
                    <SwapContainer>
                        <SwapTradeButtonClicked onPress={() => { setSwapIndex(0) }}>
                            <SwapButtonClickedText>交易</SwapButtonClickedText>
                        </SwapTradeButtonClicked>
                        <SwapGraphButton onPress={() => { setSwapIndex(1) }}>
                            <SwapButtonText>走勢圖</SwapButtonText>
                        </SwapGraphButton>
                    </SwapContainer> :
                    <SwapContainer>
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
                                {/* {
                                    isPositive === true ?
                                        <TradeHeaderFluctuationRiseText>+2.90%</TradeHeaderFluctuationRiseText>
                                        :
                                        <TradeHeaderFluctuationFallText>-2.90%</TradeHeaderFluctuationFallText>
                                } */}
                            </TradeHeaderLeftContainer>
                            <TradeHeaderRightContainer>
                                <TradeHeaderPositionButton onPress={() => { togglePositionViewModal() }}>
                                    <TradeHeaderButtonText>{positionViewChange()}</TradeHeaderButtonText>
                                </TradeHeaderPositionButton>
                                <TradeHeaderLeverageButton onPress={() => { toggleLeverageViewModal() }}>
                                    <TradeHeaderButtonText>{leverageViewNum}X</TradeHeaderButtonText>
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
                                            asksArray.map((x:string, i) => {
                                                let percent = Number((1 - parseFloat(x[1])).toPrecision());
                                                if(parseInt((parseFloat(x[0].slice(0, 2) + "," + x[0].slice(2, -9))*parseFloat(x[1].slice(0, -5))+20).toString().slice(-2))){
                                                    percent = parseInt((parseFloat(x[0].slice(0, 2) + "," + x[0].slice(2, -9))*parseFloat(x[1].slice(0, -5))+20).toString().slice(-2))/100
                                                }
                                                return (

                                                    <LinearGradient colors={['transparent', 'rgba(251, 76, 81, 0.2)']} start={{ x: percent, y: 0.0 }} end={{ x: percent, y: 0.0 }}>
                                                        <TradeTableRowContainer>

                                                            <TradeTableSellPriceText>{x[0].slice(0, 2) + "," + x[0].slice(2, -6)}</TradeTableSellPriceText>
                                                            <TradeTableNumberText>{x[1].slice(0, -5)}</TradeTableNumberText>

                                                        </TradeTableRowContainer>
                                                    </LinearGradient>
                                                )
                                            })
                                        }
                                    </TradeTableSellContainer>
                                    <TradeTableBottomTitleContainer>
                                        {
                                            isPositive === true ?
                                                <TradeTableBottomTitlePriceRiseText>{wareHousedPrice}</TradeTableBottomTitlePriceRiseText> :
                                                <TradeTableBottomTitlePriceFallText>{wareHousedPrice}</TradeTableBottomTitlePriceFallText>
                                        }
                                    </TradeTableBottomTitleContainer>
                                    <TradeTableBottomTitleContainer>
                                    <TradeTableBottomTitleOwnValueText>{wareHousedPrice}</TradeTableBottomTitleOwnValueText>
                                    </TradeTableBottomTitleContainer>
                                    <TradeTableBuyContainer>
                                        {
                                            bidsArray.map((x:string, i) => {
                                                let percent = Number((1 - parseFloat(x[1])).toPrecision());
                                                if(parseInt((parseFloat(x[0].slice(0, 2) + "," + x[0].slice(2, -9))*parseFloat(x[1].slice(0, -5))+20).toString().slice(-2))){
                                                    percent = parseInt((parseFloat(x[0].slice(0, 2) + "," + x[0].slice(2, -9))*parseFloat(x[1].slice(0, -5))+20).toString().slice(-2))/100
                                                }
                                                return (
                                                    <LinearGradient colors={['transparent', 'rgba(47, 178, 100, 0.2)']} start={{ x: percent, y: 0.0 }} end={{ x: percent, y: 0.0 }}>
                                                        <TradeTableRowContainer>
                                                            <TradeTableBuyPriceText>{x[0].slice(0, 2) + "," + x[0].slice(2, -6)}</TradeTableBuyPriceText>
                                                            <TradeTableNumberText>{x[1].slice(0, -5)}</TradeTableNumberText>
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
                                                        <TradeFunctionPositionButtonClickedText>買入</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionOpenPositionButtonClicked>
                                                    <TradeFunctionClosePositionButton onPress={() => { setSwapBuyPosition('Close') }}>
                                                        <TradeFunctionPositionButtonText>賣出</TradeFunctionPositionButtonText>
                                                    </TradeFunctionClosePositionButton>
                                                </TradeFunctionPositionButtonContainer> :
                                                <TradeFunctionPositionButtonContainer>
                                                    <TradeFunctionOpenPositionButton onPress={() => { setSwapBuyPosition('Open') }}>
                                                        <TradeFunctionPositionButtonText>買入</TradeFunctionPositionButtonText>
                                                    </TradeFunctionOpenPositionButton>
                                                    <TradeFunctionClosePositionButtonClicked onPress={() => { setSwapBuyPosition('Close') }}>
                                                        <TradeFunctionPositionButtonClickedText>賣出</TradeFunctionPositionButtonClickedText>
                                                    </TradeFunctionClosePositionButtonClicked>
                                                </TradeFunctionPositionButtonContainer>
                                        }
                                        <TradeFunctionPriceOption onPress={toggleBuyTypeModal}>
                                            <TradeFunctionPriceOptionText>{buyTypeChange()}</TradeFunctionPriceOptionText>
                                            <TradeFunctionPriceOptionIcon source={require("../../assets/images/trade/dropdown.png")} />
                                        </TradeFunctionPriceOption>
                                        {(buyType === "Plan_Limit" || buyType === "Plan_Market") && 
                                            <TradeFunctionPriceInputContainer>
                                            <TextInput
                                                placeholder={"觸發價"}
                                                value={stopPrice}
                                                onChangeText={stopPrice => setStopPrice(stopPrice)}
                                                placeholderTextColor={
                                                  '#8D97A2'
                                                }
                                                autoCorrect={false}
                                                keyboardType={"decimal-pad"}
                                                style={{ backgroundColor: '#242D37', width: '70%', height: 36, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                            />
                                            <TradeFunctionPriceInputRightContainer>
                                                <TradeFunctionPriceInputRightText>USDT</TradeFunctionPriceInputRightText>
                                            </TradeFunctionPriceInputRightContainer>
                                            </TradeFunctionPriceInputContainer>
                                        }      
                                        <TradeFunctionPriceInputContainer>
                                            <TextInput
                                                placeholder={buyTypeInputPlaceHolder()}
                                                value={(buyType === "Market" || buyType === "Plan_Market") ? "":buyPrice}
                                                onChangeText={buyPrice => setBuyPrice(buyPrice)}
                                                placeholderTextColor={
                                                    buyType === 'Market' ?
                                                        '#FFFFFF' : '#8D97A2'
                                                }
                                                editable={(buyType === "Market" || buyType === "Plan_Market") ? false : true}
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
                                        {/* <TradeFunctionNumberInputContainer>
                                            <TextInput
                                                placeholder={"數量"}
                                                value={buyNumberSliderNumber}
                                                onChangeText={buyNumber => setBuyNumber(buyNumber)}
                                                placeholderTextColor={'#8D97A2'}
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
                                        </TradeFunctionNumberInputContainer> */}
                                        <SmallSliderContainer
                                            trackMarks={[0, 25, 50, 75, 100]}
                                            sliderValue={[0]}
                                            positionNum={balance === 0
                                                ? "0"
                                                : (((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().substring(0,((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().indexOf(".")+3)).toString()}
                                            onChangeSliderValue={setSliderNum}
                                            swapCurrency={swapCurrency}
                                        >
                                            <Slider
                                                renderAboveThumbComponent={RenderAboveThumbComponent}
                                                renderThumbComponent={CustomThumb}
                                                minimumTrackTintColor={'#F4F5F6'}
                                                maximumTrackTintColor={'#333C47'}
                                                containerStyle={{ alignContent: 'space-between', justifyContent: 'center' }}
                                                trackStyle={{ justifyContent: "space-between", alignContent: 'space-between' }}
                                                maximumValue={100}
                                                minimumValue={0}
                                                step={1}
                                            />
                                        </SmallSliderContainer>
                                        <TradeFunctionPositionViewContainer>
                                            <TradeFunctionPositionViewTitleText>可用</TradeFunctionPositionViewTitleText>
                                            <TradeFunctionPositionViewValueText>{balance} USDT</TradeFunctionPositionViewValueText>
                                        </TradeFunctionPositionViewContainer>
                                        <TradeFunctionPositionViewContainer>
                                            <TradeFunctionPositionViewTitleText>可開</TradeFunctionPositionViewTitleText>
                                            <TradeFunctionPositionViewValueText>{balance === 0
                        ? 0
                        : ((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().substring(0,((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().indexOf(".")+3)}{" "} BTC</TradeFunctionPositionViewValueText>
                                        </TradeFunctionPositionViewContainer>
                                        <TradeFunctionPositionViewContainer>
                                            {swapBuyPosition === "Open" ?
                                            <TradeFunctionBuyButton onPress={async() => {
                                                let token = await AsyncStorage.getItem("token")
                                                if (token) {
                                                    if (!buyPrice && (buyType === "Limit" || buyType === "Plan_Limit")) {
                                                      Alert.alert("請輸入價格");
                                                    } else if (!stopPrice && (buyType === "Plan_Market" || buyType === "Plan_Limit")) {
                                                        Alert.alert("請輸入觸發價");
                                                    }else if (!sliderNum) {
                                                        Alert.alert("請輸入數量");
                                                    } else {
                                                      var obj = buyType === "Limit" ?
                                                      {
                                                          price: parseFloat(buyPrice),
                                                          origQty: sliderNum,
                                                          side: "BUY",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"LIMIT"
                                                      } : buyType === "Market" ? {
                                                          origQty: sliderNum,
                                                          side: "BUY",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"MARKET"
                                                        } : buyType === "Plan_Limit" ? {
                                                          price: parseFloat(buyPrice),
                                                          origQty: sliderNum,
                                                          side: "BUY",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"STOP_LIMIT",
                                                          stopPrice:stopPrice
                                                        } : {
                                                          origQty: sliderNum,
                                                          side: "BUY",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"STOP_MARKET",
                                                          stopPrice:stopPrice
                                                        }
                                                        setLoading(true)
                                                      api
                                                        .post("/order/futures/open-order", obj)
                                                        .then((x) => {
                                                          setLoading(false)
                                                          setBuyPrice("")
                                                          setStopPrice("")
                                                          setSliderNum(0)
                                                          getEntrust();
                                                          getPosition();
                                                          getBalance()
                                                        });
                                                    }
                                                  } else {
                                                    alert("請先登入");
                                                  } 
                                            }}>
                                                <TradeFunctionBuySellButtonText>開倉買入</TradeFunctionBuySellButtonText>
                                            </TradeFunctionBuyButton> 
                                            :
                                            <TradeFunctionSellButton onPress={async () => { 
                                                let token = await AsyncStorage.getItem("token")
                                                if (token) {
                                                    if (!buyPrice && (buyType === "Limit" || buyType === "Plan_Limit")) {
                                                        Alert.alert("請輸入價格");
                                                    } else if (!stopPrice && (buyType === "Plan_Market" || buyType === "Plan_Limit")) {
                                                        Alert.alert("請輸入觸發價");
                                                    }else if (!sliderNum) {
                                                        Alert.alert("請輸入數量");
                                                    } else {
                                                      var obj = buyType === "Limit" ?
                                                      {
                                                          price: parseFloat(buyPrice),
                                                          origQty: sliderNum,
                                                          side: "SELL",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"LIMIT"
                                                      } : buyType === "Market" ? {
                                                          origQty: sliderNum,
                                                          side: "SELL",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"MARKET"
                                                        } : buyType === "Plan_Limit" ? {
                                                          price: parseFloat(buyPrice),
                                                          origQty: sliderNum,
                                                          side: "SELL",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"STOP_LIMIT",
                                                          stopPrice:stopPrice
                                                        } : {
                                                          origQty: sliderNum,
                                                          side: "SELL",
                                                          symbol: "BTC-USDT",
                                                          leverage: leverageViewNum,
                                                          type:"STOP_MARKET",
                                                          stopPrice:stopPrice
                                                        }
                                                        setLoading(true)
                                                      api
                                                        .post("/order/futures/open-order", obj)
                                                        .then((x) => {
                                                          setLoading(false)
                                                          setBuyPrice("")
                                                          setStopPrice("")
                                                          setSliderNum(0)
                                                          getEntrust();
                                                          getPosition();
                                                          getBalance()
                                                        });
                                                    }
                                                  } else {
                                                    alert("請先登入");
                                                  }
                                            }}>
                                                <TradeFunctionBuySellButtonText>開倉賣出</TradeFunctionBuySellButtonText>
                                            </TradeFunctionSellButton>
                                            }
                                            
                                            
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
                                        <TradePositionHeaderHistoryButton onPress={() => { navigation.navigate('HistoryScreen') }}>
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
                                        <TradePositionHeaderHistoryButton onPress={() => { navigation.navigate('HistoryScreen') }}>
                                            <TradePositionHeaderHistoryIcon source={require("../../assets/images/trade/order.png")} />
                                            <TradePositionHeaderHistoryText>歷史訂單</TradePositionHeaderHistoryText>
                                        </TradePositionHeaderHistoryButton>
                                    </TradePositionHeaderContainer>
                            }
                            <TradePositionLine></TradePositionLine>
                            {
                                swapPositionView === 0 ?
                                     positionArray .length !== 0 ?
                                        <TradePositionContainer>
                                            {
                                                positionArray.map((x:any, i) => {
                                                    return (
                                                        <TradePositionCardContainer>
                                                            <TradePositionCardTitleContainer>
                                                                <TradePositionCardTitleRowContainer>
                                                                    <TradePositionCardTitleText>{x.profitAndLoss}</TradePositionCardTitleText>
                                                                    <TradePositionCardSmallTitleText>未實現盈虧</TradePositionCardSmallTitleText>
                                                                </TradePositionCardTitleRowContainer>
                                                                <TradePositionCardTitleRowContainer>
                                                                    <TradePositionCardTitleValueText>{x.type === 'FULL' ? '全倉' : '逐倉'} {x.leverage}X</TradePositionCardTitleValueText>
                                                                    <TradePositionCardBigValueText>{x.value} USDT</TradePositionCardBigValueText>
                                                                </TradePositionCardTitleRowContainer>
                                                            </TradePositionCardTitleContainer>
                                                            <TradePositionCardDetailRowContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>持倉量</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.quantity}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>入場價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.avgPrice}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                            </TradePositionCardDetailRowContainer>
                                                            <TradePositionCardDetailRowContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>標記價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.avgPrice}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                                <TradePositionCardDetailColumnContainer>
                                                                    <TradePositionCardSmallTitleText>強平價</TradePositionCardSmallTitleText>
                                                                    <TradePositionCardSmallValueText>{x.forceClose}</TradePositionCardSmallValueText>
                                                                </TradePositionCardDetailColumnContainer>
                                                            </TradePositionCardDetailRowContainer>
                                                            <TradePositionCardButtonContainer>
                                                                <TradePositionCardButton onPress={() => { navigation.push("StopPositionScreen") }}>
                                                                    <TradePositionCardButtonText>止盈/止損</TradePositionCardButtonText>
                                                                </TradePositionCardButton>
                                                                <TradePositionCardButton>
                                                                    <TradePositionCardButtonText>平倉</TradePositionCardButtonText>
                                                                </TradePositionCardButton>
                                                            </TradePositionCardButtonContainer>
                                                        </TradePositionCardContainer>
                                                    )
                                                })
                                            }
                                        </TradePositionContainer>
                                        :
                                        <TradePositionContainer>
                                            <TradePositionBackgroundImage source={require("../../assets/images/trade/norecord.png")} />
                                        </TradePositionContainer> :
                                    entrustArray.length !== 0 ?
                                        <TradeCommitContainer>
                                            {
                                                entrustArray.map((x:any, i) => {
                                                    return (
                                                        <TradeCommitCardContainer>
                                                            <TradeCommitCardTitleContainer>
                                                                <TradeCommitCardTitleText>BTCUSDT</TradeCommitCardTitleText>
                                                                <TradeCommitCardTitleTimeText>{x.time}</TradeCommitCardTitleTimeText>
                                                            </TradeCommitCardTitleContainer>
                                                            <TradeCommitCardDetailRowContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>交易類型</TradeCommitCardSmallTitleText>
                                                                    {
                                                                        x.type === 'LIMIT' &&
                                                                        <TradeCommitCardSmallValueText>限價</TradeCommitCardSmallValueText>
                                                                    }
                                                                    {
                                                                        x.type === 'MARKET' &&
                                                                        <TradeCommitCardSmallValueText>市價</TradeCommitCardSmallValueText>
                                                                    }
                                                                    {
                                                                        x.type === 'STOP_MARKET' &&
                                                                        <TradeCommitCardSmallValueText>計畫市價</TradeCommitCardSmallValueText>
                                                                    }
                                                                    {
                                                                        x.type === 'STOP_LIMIT' &&
                                                                        <TradeCommitCardSmallValueText>計畫限價</TradeCommitCardSmallValueText>
                                                                    }
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>下單方向</TradeCommitCardSmallTitleText>
                                                                    {
                                                                        x.side === 'BUY' &&
                                                                        <TradeCommitCardBuyDirectionLongText>買入</TradeCommitCardBuyDirectionLongText>
                                                                    }
                                                                    {
                                                                        x.side === 'SELL' &&
                                                                        <TradeCommitCardBuyDirectionShortText>賣出</TradeCommitCardBuyDirectionShortText>
                                                                    }
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>委託單</TradeCommitCardSmallTitleText>
                                                                    <TradeCommitCardSmallValueText>{x.origQty}</TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                            </TradeCommitCardDetailRowContainer>
                                                            <TradeCommitCardDetailRowContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>成交率</TradeCommitCardSmallTitleText>
                                                                    <TradeCommitCardSmallValueText>0</TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>觸發價</TradeCommitCardSmallTitleText>
                                                                    <TradeCommitCardSmallValueText>{x.stopPrice}</TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>委託價</TradeCommitCardSmallTitleText>
                                                                    <TradeCommitCardSmallValueText>{x.price}</TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                            </TradeCommitCardDetailRowContainer>
                                                            <TradeCommitCardButtonContainer>
                                                                <TradeCommitCardButton onPress={() => { toggleCommitStopModal() }}>
                                                                    <TradeCommitCardButtonText>止盈/止損</TradeCommitCardButtonText>
                                                                </TradeCommitCardButton>
                                                                <TradeCommitCardButton onPress={() => { cancelCommitAlert() }}>
                                                                    <TradeCommitCardButtonText>撤銷</TradeCommitCardButtonText>
                                                                </TradeCommitCardButton>
                                                            </TradeCommitCardButtonContainer>
                                                        </TradeCommitCardContainer>
                                                    )
                                                })
                                            }
                                        </TradeCommitContainer> :
                                        <TradeCommitContainer>
                                            <TradeCommitBackgroundImage source={require("../../assets/images/trade/norecord.png")} />
                                        </TradeCommitContainer>
                            }
                        </TradeContainer>
                    </MainSwapPageContainer> :
                    <GraphPage />
            }

            {/* Modal Page */}

            {/* Position View Modal 擔保資產模式*/}
            <Modal
                isVisible={isPositionViewVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsPositionViewVisible(false)}
                onSwipeComplete={() => setIsPositionViewVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <TouchableOpacity onPress={() => { setIsPositionViewVisible(false) }}>
                            <ModalLeftCancelButton source={require("../../assets/images/trade/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHedaerTitleText>擔保資產模式</ModalHedaerTitleText>
                        <ModalEmptyDiv></ModalEmptyDiv>
                    </ModalHeaderContainer>
                    <PositionViewModalButton onPress={() => { setPositionView("Full"), setIsPositionViewVisible(false) }}>
                        <PositionViewModalButtonText>全倉</PositionViewModalButtonText>
                        {
                            positionView === 'Full' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </PositionViewModalButton>
                    <PositionViewModalDetailText>
                        所有品種合約的倉位共用一個帳戶權益，合約帳戶中的擔保資產合併計算。
                    </PositionViewModalDetailText>
                    <PositionViewModalButton onPress={() => { setPositionView("Each"), setIsPositionViewVisible(false) }}>
                        <PositionViewModalButtonText>逐倉</PositionViewModalButtonText>
                        {
                            positionView === 'Each' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </PositionViewModalButton>
                    <PositionViewModalDetailText>
                        每個品種合約對應一個合約帳戶，不同品種合約帳戶擔保資產相互獨立。
                    </PositionViewModalDetailText>
                    <ModalConfirmButton>
                        <ModalConfirmButtonText>確認</ModalConfirmButtonText>
                    </ModalConfirmButton>
                </View>
            </Modal>


            {/* Leverage View Modal 槓桿比例 */}
            <Modal
                isVisible={isLeverageViewVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsLeverageViewVisible(false)}
                onSwipeComplete={() => setIsLeverageViewVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <TouchableOpacity onPress={() => { setIsLeverageViewVisible(false) }}>
                            <ModalLeftCancelButton source={require("../../assets/images/trade/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHedaerTitleText>槓桿比例</ModalHedaerTitleText>
                        <ModalEmptyDiv></ModalEmptyDiv>
                    </ModalHeaderContainer>

                    <LeverageViewModalSliderContainer>
                        {/* <Slider
                            value={sliderNum}
                            onValueChange={() => setSliderNum(sliderNum)}
                            minimumValue={0}
                            maximumValue={6}
                            minimumTrackTintColor={'#F4F5F6'}
                            maximumTrackTintColor={'#333C47'}
                            containerStyle={{ alignContent: 'center', justifyContent: 'center' }}
                            thumbImage={require("../../assets/images/trade/indicator.png")}
                            thumbStyle={{ justifyContent: 'center' }}
                            thumbTouchSize={{ width: 20, height: 20 }}
                            trackClickable={true}
                            thumbTintColor={'#F4F5F6'}
                            trackMarks={[1, 2, 3, 4, 5, 6]}
                            step={1}
                        /> */}
                        <SliderContainer
                            trackMarks={[1, 25, 50, 75, 100, 125]}
                            sliderValue={[leverageViewNum]}
                            onValueChangeSliderNum={setLeverageViewNum}
                            isModalVisable={setIsLeverageViewVisible}
                            positionNum={balance === 0 ? "0" :(((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().substring(0,((balance * leverageViewNum) / parseFloat(wareHousedPrice)).toString().indexOf(".")+3)).toString()}
                            balance={balance}
                        >
                            <Slider

                                renderThumbComponent={CustomThumb}
                                minimumTrackTintColor={'#F4F5F6'}
                                maximumTrackTintColor={'#333C47'}
                                containerStyle={{ alignContent: 'space-between', justifyContent: 'center' }}
                                trackStyle={{ justifyContent: "space-between", alignContent: 'space-between' }}
                                maximumValue={125}
                                minimumValue={1}
                                step={1}
                            />
                        </SliderContainer>
                        {/* <ModalHedaerTitleText>{sliderNum}</ModalHedaerTitleText> */}

                    </LeverageViewModalSliderContainer>
                </View>
            </Modal>


            {/* Buy Type Modal 下單類型*/}
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
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 50 }}>
                    <BuyTypeTitleContainer>
                        <BuyTypeModalTitleText>下單類型</BuyTypeModalTitleText>
                    </BuyTypeTitleContainer>
                    <BuyTypeModalPickerButton onPress={() => { setBuyType('Limit'), setIsBuyTypeModalVisible(false) }}>
                        <BuyTypeModalPickerButtonText>限價</BuyTypeModalPickerButtonText>
                        {
                            buyType === 'Limit' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </BuyTypeModalPickerButton>
                    <BuyTypeModalLineText></BuyTypeModalLineText>
                    <BuyTypeModalPickerButton onPress={() => { setBuyType('Market'), setIsBuyTypeModalVisible(false) }}>
                        <BuyTypeModalPickerButtonText>市價</BuyTypeModalPickerButtonText>
                        {
                            buyType === 'Market' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </BuyTypeModalPickerButton>
                    <BuyTypeModalLineText></BuyTypeModalLineText>
                    <BuyTypeModalPickerButton onPress={() => { setBuyType('Plan_Limit'), setIsBuyTypeModalVisible(false) }}>
                        <BuyTypeModalPickerButtonText>計畫限價</BuyTypeModalPickerButtonText>
                        {
                            buyType === 'Plan_Limit' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </BuyTypeModalPickerButton>
                    <BuyTypeModalLineText></BuyTypeModalLineText>
                    <BuyTypeModalPickerButton onPress={() => { setBuyType('Plan_Market'), setIsBuyTypeModalVisible(false) }}>
                        <BuyTypeModalPickerButtonText>計畫市價</BuyTypeModalPickerButtonText>
                        {
                            buyType === 'Plan_Market' &&
                            <ModalSelectedImage source={require("../../assets/images/trade/selected.png")} />
                        }
                    </BuyTypeModalPickerButton>
                </View>
            </Modal>


            {/*Commit Stop Button Modal 當前委託止盈/止損價 */}
            <Modal
                isVisible={isCommitStopVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsCommitStopVisible(false)}
                onSwipeComplete={() => setIsCommitStopVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 50 }}>
                    <ModalHeaderContainer style={{ paddingBottom: 0 }}>
                        <TouchableOpacity onPress={() => { setIsCommitStopVisible(false) }}>
                            <ModalLeftCancelButton source={require("../../assets/images/trade/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHedaerTitleText>止盈/止損</ModalHedaerTitleText>
                        <ModalEmptyDiv></ModalEmptyDiv>
                    </ModalHeaderContainer>
                    {
                        CommitStopPositionArray.map((x, i) => {
                            return (
                                <CommitStopModalCardContainer>
                                    <CommitStopModalCardTitleColumnContainer>
                                        <CommitStopModalCardTitleRowContainer>
                                            {
                                                x.type === 'StopEarn' ?
                                                    <CommitStopModalCardTitleStopEarnText>止盈平多</CommitStopModalCardTitleStopEarnText> :
                                                    <CommitStopModalCardTitleStopLostText>止損平多</CommitStopModalCardTitleStopLostText>
                                            }
                                            {
                                                x.progress === 0 ?
                                                    <CommitStopModalCardTitleProgressText>未生效</CommitStopModalCardTitleProgressText> :
                                                    <CommitStopModalCardTitleProgressText>已生效</CommitStopModalCardTitleProgressText>
                                            }
                                        </CommitStopModalCardTitleRowContainer>
                                        <CommitStopModalCardTitleTimeText>{x.time}</CommitStopModalCardTitleTimeText>
                                    </CommitStopModalCardTitleColumnContainer>
                                    <CommitStopModalCardDetailContainer>
                                        <CommitStopModalCardDetailColumnContainer>
                                            <CommitStopModalCardDetailTitleText>觸發條件</CommitStopModalCardDetailTitleText>
                                            <CommitStopModalCardDetailValueText>{x.condition}</CommitStopModalCardDetailValueText>
                                        </CommitStopModalCardDetailColumnContainer>
                                        <CommitStopModalCardDetailColumnContainer>
                                            <CommitStopModalCardDetailTitleText>委託量</CommitStopModalCardDetailTitleText>
                                            <CommitStopModalCardDetailValueText>{x.volumnNum}</CommitStopModalCardDetailValueText>
                                        </CommitStopModalCardDetailColumnContainer>
                                        <CommitStopModalCardDetailColumnContainer>
                                            <CommitStopModalCardDetailTitleText>委託價</CommitStopModalCardDetailTitleText>
                                            <CommitStopModalCardDetailValueText>{x.volumnPrice}</CommitStopModalCardDetailValueText>
                                        </CommitStopModalCardDetailColumnContainer>
                                    </CommitStopModalCardDetailContainer>
                                    {
                                        i !== CommitStopPositionArray.length - 1 &&
                                        <CommitStopModalLine></CommitStopModalLine>
                                    }
                                </CommitStopModalCardContainer>
                            )
                        })
                    }
                </View>
            </Modal>




        </Container>


    )
}

export default TradeScreen