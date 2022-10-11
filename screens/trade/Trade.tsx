import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  StyleSheet,
  Modal as Modal2
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets
} from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect, useContext } from "react";
import GraphPage from "../../components/trade/GraphPage";
import SliderContainer from "../../components/trade/Slider";
import SmallSliderContainer from "../../components/trade/SmallSlider";
import axios from "axios";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useIsFocused } from "@react-navigation/native";
import { Context } from "../../App";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Dropdown2 = styled(Dropdown)`
  background-color: black;
`;

const Container = styled(View) <{ insets: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${props => props.insets}px;
  background-color: #18222d;
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
  margin-bottom: 5px;
  align-items: center;
  padding-top: 2px;
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
  background-color: #242d37;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 8px;
  margin-top: 2;
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
  margin-top: 2;
`;

const TradeFunctionPriceInputRightContainer = styled(View)`
  height: 36px;
  width: 30%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #242d37;
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
  margin-top: 2;
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
  margin-top: 5;
`;

const TradeFunctionSellButton = styled(TouchableOpacity)`
  width: 100%;
  height: 38px;
  border-radius: 4px;
  background-color: ${props => props.theme.color.SecondaryLight};
  align-items: center;
  justify-content: center;
  margin-top: 5;
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
  border: none;
`;

const TradePositionHeaderLeftSwapButtonClicked = styled(TouchableOpacity)`
  height: 32px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.theme.color.Primary};
`;

const TradePositionHeaderRightSwapButton = styled(TouchableOpacity)`
  height: 32px;
  border: none;
  margin-left: 25px;
`;

const TradePositionHeaderRightSwapButtonClicked = styled(TouchableOpacity)`
  height: 32px;
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
  background-color: #242d37;
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
  color: ${props => props.theme.color.Secondary};
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

const LeverageViewModalSliderContainer = styled(View)``;

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
  background-color: #242d37;
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
const ThumbImage = styled(Image)`
  width: 20px;
  height: 20px;
`;
const RenderAboveThumbImage = styled(Image)`
  position: relative;
  width: 32px;
  height: 22px;
  alignitems: center;
  justifycontent: center;
  right: 6;
`;
const RenderAboveThumbText = styled(Text)`
  font-size: 10px;
  font-weight: 400;
  position: absolute;
  text-align: center;
  right: 8px;
  top: 2.5px;
`;

const IconImg = styled(Image)`
  width: 24px;
  height: 24px;
`;

const CommitStopPositionArray = [
  {
    type: "StopEarn",
    progress: 0,
    time: "2021-10-16 20:55:10",
    condition: ">=20,000.0",
    volumnNum: "0.075",
    volumnPrice: "17,980.0"
  },
  {
    type: "StopLost",
    progress: 0,
    time: "2021-10-16 20:55:10",
    condition: "<=16,000.0",
    volumnNum: "0.075",
    volumnPrice: "16,780.0"
  }
];

const TradeScreen = ({ navigation }: RootStackScreenProps<"TradeScreen">) => {
  const insets = useSafeAreaInsets();

  // Swap Page
  const [swapIndex, setSwapIndex] = useState(0);

  // Value is Positive
  const [isPositive, setIsPositive] = useState(true);
  const { t } = useTranslation();
  // Function Button
  const [positionView, setPositionView] = useState("Full");
  const [leverageViewNum, setLeverageViewNum] = useState(1);
  const [swapBuyPosition, setSwapBuyPosition] = useState("Open");
  const [isPositionViewVisible, setIsPositionViewVisible] = useState(false);
  const [isLeverageViewVisible, setIsLeverageViewVisible] = useState(false);
  const [isBuyTypeModalVisible, setIsBuyTypeModalVisible] = useState(false);
  const [buyType, setBuyType] = useState("Limit");
  const [buyPrice, setBuyPrice] = useState("");
  const [stopPrice, setStopPrice] = useState("");
  const [swapCurrency, setSwapCurrency] = useState(0);
  const [sliderNum, setSliderNum] = useState(0);
  // const [entrustArray, setEntrustArray] = useState([]);
  // const [positionArray, setPositionArray] = useState([]);
  const [bidsArray, setBidsArray] = useState([]);
  const [asksArray, setAsksArray] = useState([]);
  const [price, setPrice] = useState("");
  const [position, setPosition] = useState(false);
  const [future, setFuture] = useState(false);
  const [balance, setBalance] = useState(0);
  const [canOpen, setCanOpen] = useState(0);
  const [remarkPrice, setRemarkPrice] = useState("");
  const [wareHousedPrice, setWareHousedPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const { market: context, position: positionArray, future: entrustArray } = useContext(Context);
  const [slideValue, setSlideValue] = useState(0)
  //   const positionArray = useContext(PositionContext);
  //   const entrustArray = useContext(FutureContext);
  const toggleBuyTypeModal = () => {
    setIsBuyTypeModalVisible(!isBuyTypeModalVisible);
  };

  const togglePositionViewModal = () => {
    setIsPositionViewVisible(!isPositionViewVisible);
  };

  const toggleLeverageViewModal = () => {
    setIsLeverageViewVisible(!isLeverageViewVisible);
  };

  const buyTypeChange = () => {
    if (buyType === "Limit") {
      return t("limitedOrder");
    } else if (buyType === "Market") {
      return t("marketOrder");
    } else if (buyType === "Plan_Limit") {
      return t("stopLimitOrder");
    } else if (buyType === "Plan_Market") {
      return t("stopMarketOrder");
    } else {
      return "";
    }
  };

  const buyTypeInputPlaceHolder = () => {
    if (buyType === "Limit" || buyType === "Plan_Limit") {
      return "價格";
    } else if (buyType === "Market" || buyType === "Plan_Market") {
      return t("marketOrder");
    } else {
      return "";
    }
  };

  const positionViewChange = () => {
    if (positionView === "Full") {
      return t("crossPosition");
    } else if (positionView === "Each") {
      return t("isolatedPosition");
    } else {
      return "";
    }
  };

  const CustomThumb = () => {
    return (
      <View>
        <ThumbImage
          source={require("../../assets/images/trade/indicator.png")}
        />
      </View>
    );
  };

  const RenderAboveThumbComponent = (x: any) => {
    let PercentageNum =
      balance === 0
        ? Math.round(
          (sliderNum /
            parseFloat(
              ((balance * leverageViewNum) / parseFloat(wareHousedPrice))
                .toString()
                .substring(
                  0,
                  ((balance * leverageViewNum) / parseFloat(wareHousedPrice))
                    .toString()
                    .indexOf(".") + 3
                )
            )) *
          100
        )
        : 0;
    return (
      <View>
        {PercentageNum != 0 && !isNaN(PercentageNum) && (
          <View>
            <RenderAboveThumbImage
              source={require("../../assets/images/trade/sliderFloat.png")}
            />
            <RenderAboveThumbText>{PercentageNum}%</RenderAboveThumbText>
          </View>
        )}
      </View>
    );
  };

  // Position Detail
  const [swapPositionView, setSwapPositionView] = useState(0);

  // Commit Stop Button Modal 當前委託止盈/止損價
  const [isCommitStopVisible, setIsCommitStopVisible] = useState(false);
  const [trade, setTrade] = useState([
    {
      label: "",
      value: ""
    }
  ]);
  const [nowTrade, setNowTrade] = useState("BTC-USDT");
  const [newTrade, setNewTrade] = useState("");
  const [lev, setLev] = useState([]);
  const [fund, setFund] = useState(0);

  const toggleCommitStopModal = () => {
    setIsCommitStopVisible(!isCommitStopVisible);
  };

  const cancelCommitAlert = (id: any) =>
    Alert.alert("撤銷委託單？", "確定撤銷後將無法再次回復該筆委託單內容。", [
      {
        text: "取消",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "確定",
        onPress: () => {
          setLoading(true);
          api
            .postData("/order/futures/cancel-order", { orderId: id })
            .then(x => {
              setLoading(false);
              if (x.status !== 400) {
                getPosition();
                getEntrust();
              } else {
                Alert.alert(x.data.msg);
              }
            });
        }
      }
    ]);

  const getEntrust = () => {
    // api.get("/investor/future?status=CREATE").then((x) => {
    //     if (x.status != 400 && x.status != 401) {
    //         setEntrustArray(x.data);
    //         for (let i = 0; i < x.data.length; i++) {
    //             if (x.data[i].status !== "CANCEL") {
    //                 setFuture(true);
    //                 return;
    //             }
    //         }
    //     }
    // })
  };
  const getPosition = () => {
    // api.get("/investor/position").then((x) => {
    //     if (x.status != 400 && x.status != 401) {
    //         // setPositionArray(x.data);
    //         for (let i = 0; i < x.data.length; i++) {
    //             if (x.data[i].status !== "CLOSE") {
    //                 setPosition(true);
    //                 return;
    //             }
    //         }
    //     }
    // })
  };

  const getDepth = (trade: string) => {
    axios
      .get(
        `https://api1.binance.com/api/v3/depth?symbol=${trade.split("-")[0]
        }USDT&limit=12`
      )
      .then(x => {
        setAsksArray(x.data.asks.reverse());
        setBidsArray(x.data.bids);
      });
  };

  const getPrice = (trade: string) => {
    // axios
    //     .get(`https://api1.binance.com/api/v3/ticker/price?symbol=${trade.split("-")[0]}USDT`)
    //     .then((x) => {
    //         setWareHousedPrice(x.data.price.slice(0, -6));
    //         setBuyPrice(x.data.price.slice(0, -6))
    //     });
  };

  const getBalance = (symbol: string, side: string) => {
    api
      .get(`/investor/margin-balance?symbol=${symbol}&side=${side}`)
      .then(x => {
        if (x.status != 400 && x.status != 401) {
          setBalance(x.data);
        }
      });
    api
      .get(`/investor/available-quantity?symbol=${symbol}&side=${side}`)
      .then(x => {
        if (x.status != 400 && x.status != 401) {
          setCanOpen(x.data);
        }
      });
  };

  const getleverage = (symbol: string) => {
    api.get(`/investor/leverage/${symbol}`).then(x => {
      if (x.status != 400 && x.status != 401) {
        setLeverageViewNum(x.data);
      }
    });
  };

  const getfund = (symbol: string) => {
    api.get(`/market/funding-rate?${symbol}`).then(x => {
      setFund(x[symbol]);
    });
  };

  const isFocused = useIsFocused();

  const getRemark = (s: string) => {
    const remark = _.find(context, function (o) {
      return o.s == s;
    });
    return remark ? remark.m : "";
  };

  // useEffect(() => {
  //   let isApiSubscribed = true;
  //   (async () => {
  //     if (context && isApiSubscribed) {
  //       let a = [];
  //       for (let i = 0; i < context.length; i++) {
  //         let obj = {
  //           label: context[i].s.split("USDT")[0] + "-USDT",
  //           value: context[i].s.split("USDT")[0] + "-USDT"
  //         };
  //         a.push(obj);
  //       }
  //       setTrade(a);

  //       let trade = await AsyncStorage.getItem("trade");
  //       let token = await AsyncStorage.getItem("token");
  //       const t = trade ? trade.split("USDT")[0] + "-USDT" : nowTrade;
  //       const remark = _.find(context, function (o) {
  //         return o.s == t;
  //       });
  //       setRemarkPrice(remark!.m);
  //       // setWareHousedPrice(remark!.c);
  //       // setBuyPrice(remark!.c)
  //       setPrice(remark!.c);
  //       getDepth(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade);
  //       if (token) {
  //         getBalance(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade, swapBuyPosition === "Open" ? "BUY" : "SELL")
  //       }
  //     }
  //   })()
  //   return () => {
  //     // cancel the subscription
  //     isApiSubscribed = false;
  //   };
  // }, [context]);

  // useEffect(() => {
  //   (async () => {
  //     if (context) {
  //       let trade = await AsyncStorage.getItem("trade");
  //       const t = trade ? trade.split("USDT")[0] + "-USDT" : nowTrade;
  //       const remark = _.find(context, function (o) {
  //         return o.s == t;
  //       });
  //       setWareHousedPrice(
  //         parseFloat(remark!.c) < 0.006 && parseFloat(remark!.c) > 0
  //           ? remark!.c
  //           : parseFloat(remark!.c) < 0.1 && parseFloat(remark!.c) > 0.006
  //             ? remark!.c.slice(0, -1)
  //             : parseFloat(remark!.c) < 1 && parseFloat(remark!.c) > 0.1
  //               ? remark!.c.slice(0, -2)
  //               : parseFloat(remark!.c) < 50 && parseFloat(remark!.c) > 1
  //                 ? remark!.c.slice(0, -3)
  //                 : remark!.c.slice(0, -4)
  //       );
  //       setBuyPrice(
  //         parseFloat(remark!.c) < 0.006 && parseFloat(remark!.c) > 0
  //           ? remark!.c
  //           : parseFloat(remark!.c) < 0.1 && parseFloat(remark!.c) > 0.006
  //             ? remark!.c.slice(0, -1)
  //             : parseFloat(remark!.c) < 1 && parseFloat(remark!.c) > 0.1
  //               ? remark!.c.slice(0, -2)
  //               : parseFloat(remark!.c) < 50 && parseFloat(remark!.c) > 1
  //                 ? remark!.c.slice(0, -3)
  //                 : remark!.c.slice(0, -4)
  //       );
  //     }
  //   })()

  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     let trade = await AsyncStorage.getItem("trade");
  //     getfund(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade)
  //   })()
  // }, [isFocused, nowTrade])

  // useEffect(() => {
  //   (async () => {
  //     if (isFocused) {
  //       // let inter = await AsyncStorage.getItem("interval");
  //       // clearInterval(parseInt(inter!));
  //       let token = await AsyncStorage.getItem("token");
  //       let trade = await AsyncStorage.getItem("trade");
  //       setNewTrade(trade);
  //       if (!token) {
  //         // setEntrustArray([])
  //         // setPositionArray([])
  //         setBalance(0);
  //       }
  //       getfund(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade);
  //       if (token) {
  //         getEntrust();
  //         getPosition();
  //         getBalance(
  //           trade ? trade.split("USDT")[0] + "-USDT" : nowTrade,
  //           swapBuyPosition === "Open" ? "BUY" : "SELL"
  //         );
  //         getleverage(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade);
  //       }
  //       const t = trade ? trade.split("USDT")[0] + "-USDT" : nowTrade;
  //       const remark = _.find(context, function (o) {
  //         return o.s == t;
  //       });
  //       setWareHousedPrice(
  //         parseFloat(remark!.c) < 0.006 && parseFloat(remark!.c) > 0
  //           ? remark!.c
  //           : parseFloat(remark!.c) < 0.1 && parseFloat(remark!.c) > 0.006
  //             ? remark!.c.slice(0, -1)
  //             : parseFloat(remark!.c) < 1 && parseFloat(remark!.c) > 0.1
  //               ? remark!.c.slice(0, -2)
  //               : parseFloat(remark!.c) < 50 && parseFloat(remark!.c) > 1
  //                 ? remark!.c.slice(0, -3)
  //                 : remark!.c.slice(0, -4)
  //       );
  //       setBuyPrice(
  //         parseFloat(remark!.c) < 0.006 && parseFloat(remark!.c) > 0
  //           ? remark!.c
  //           : parseFloat(remark!.c) < 0.1 && parseFloat(remark!.c) > 0.006
  //             ? remark!.c.slice(0, -1)
  //             : parseFloat(remark!.c) < 1 && parseFloat(remark!.c) > 0.1
  //               ? remark!.c.slice(0, -2)
  //               : parseFloat(remark!.c) < 50 && parseFloat(remark!.c) > 1
  //                 ? remark!.c.slice(0, -3)
  //                 : remark!.c.slice(0, -4)
  //       );
  //       // let leverage = await AsyncStorage.getItem("leverage")
  //       // if (leverage) {
  //       //     setLeverageViewNum(parseInt(leverage))
  //       // }
  //       if (trade) {
  //         setValue(trade.split("USDT")[0] + "-USDT");
  //       }
  //       // getDepth(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade);
  //       getPrice(trade ? trade.split("USDT")[0] + "-USDT" : nowTrade);

  //       // AsyncStorage.setItem("interval", interval.toString())
  //       // return () => clearInterval(interval);
  //     } else {
  //       AsyncStorage.removeItem("trade");
  //       setValue("BTC-USDT");
  //       setNowTrade("BTC-USDT");
  //     }
  //   })()
  // }, [isFocused, nowTrade, swapBuyPosition]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container insets={insets.top}>
      {loading && <Spinner visible={true} textContent={""} />}
      {swapIndex === 0 ? (
        <SwapContainer>
          <SwapTradeButtonClicked
            onPress={() => {
              setSwapIndex(0);
            }}
          >
            <SwapButtonClickedText>{t("trade")} </SwapButtonClickedText>
          </SwapTradeButtonClicked>
          <SwapGraphButton
            onPress={() => {
              setSwapIndex(1);
            }}
          >
            <SwapButtonText>{t("charts")}</SwapButtonText>
          </SwapGraphButton>
        </SwapContainer>
      ) : (
        <SwapContainer>
          <SwapTradeButton
            onPress={() => {
              setSwapIndex(0);
            }}
          >
            <SwapButtonText>{t("trade")} </SwapButtonText>
          </SwapTradeButton>
          <SwapGraphButtonClicked
            onPress={() => {
              setSwapIndex(1);
            }}
          >
            <SwapButtonClickedText>{t("charts")}</SwapButtonClickedText>
          </SwapGraphButtonClicked>
        </SwapContainer>
      )}
      {swapIndex === 0 ? (
        <MainSwapPageContainer>
          <TradeHeaderContainer>
            <TradeHeaderLeftContainer>
              {/* <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    iconStyle={styles.iconStyle}
                                    data={trade}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    containerStyle={styles.containerStyle}
                                    placeholder={!isFocus ? 'BTC-USDT' : '...'}
                                    activeColor="#18222D"
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    renderItem={(item) => (
                                        <View style={{ padding: 8 }}>
                                            <Text style={{ color: "white" }}>{item.label}</Text>
                                        </View>
                                    )}
                                    onChange={item => {
                                        AsyncStorage.removeItem("trade")
                                        setNewTrade("")
                                        setValue(item.value);
                                        setNowTrade(item.value)
                                        setIsFocus(false);
                                    }}
                                /> */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AllTradeScreen");
                }}
              >
                <IconImg
                  source={require("../../assets/images/trade/search.png")}
                />
              </TouchableOpacity>

              <TradeHeaderTitleText>
                {newTrade ? newTrade.split("USDT")[0] + "-USDT" : nowTrade}
              </TradeHeaderTitleText>
              {/* {
                                    isPositive === true ?
                                        <TradeHeaderFluctuationRiseText>+2.90%</TradeHeaderFluctuationRiseText>
                                        :
                                        <TradeHeaderFluctuationFallText>-2.90%</TradeHeaderFluctuationFallText>
                                } */}
            </TradeHeaderLeftContainer>
            <TradeHeaderRightContainer>
              {/* <TradeHeaderPositionButton onPress={() => { navigation.navigate("AllTradeScreen")}}>
                                    <TradeHeaderButtonText>搜尋</TradeHeaderButtonText>
                                </TradeHeaderPositionButton> */}
              <TradeHeaderPositionButton
                onPress={() => {
                  togglePositionViewModal();
                }}
              >
                <TradeHeaderButtonText>
                  {positionViewChange()}
                </TradeHeaderButtonText>
              </TradeHeaderPositionButton>
              <TradeHeaderLeverageButton
                onPress={() => {
                  toggleLeverageViewModal();
                }}
              >
                <TradeHeaderButtonText>
                  {leverageViewNum}X
                </TradeHeaderButtonText>
              </TradeHeaderLeverageButton>
            </TradeHeaderRightContainer>
          </TradeHeaderContainer>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "flex-end",
              paddingRight: 16
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              {t("fundingRate")} {fund != 0 ? (fund * 100).toFixed(4) : fund} %
            </Text>
          </View>
          <TradeContainer>
            <TradeRowContainer>
              <TradeTableContainer>
                <TradeTableTopTitleContainer>
                  <TradeTableTopTitleText>{t("price")}</TradeTableTopTitleText>
                  <TradeTableTopTitleText>{t("amount")}</TradeTableTopTitleText>
                </TradeTableTopTitleContainer>
                <TradeTableTopTitleContainer>
                  <TradeTableTopTitleText>(USDT)</TradeTableTopTitleText>
                  <TradeTableTopTitleText>
                    (
                    {newTrade
                      ? newTrade.split("USDT")[0]
                      : nowTrade.split("-")[0]}
                    )
                  </TradeTableTopTitleText>
                </TradeTableTopTitleContainer>
                <TradeTableSellContainer>
                  {asksArray.map((x: string, i) => {
                    let percent = Number((1 - parseFloat(x[1])).toPrecision());
                    if (
                      parseInt(
                        (
                          parseFloat(x[0].slice(0, 2) + x[0].slice(2, -9)) *
                          parseFloat(x[1].slice(0, -5)) +
                          20
                        )
                          .toString()
                          .slice(-2)
                      )
                    ) {
                      percent =
                        parseInt(
                          (
                            parseFloat(x[0].slice(0, 2) + x[0].slice(2, -9)) *
                            parseFloat(x[1].slice(0, -5)) +
                            20
                          )
                            .toString()
                            .slice(-2)
                        ) / 100;
                    }
                    return (
                      <>
                        {i < 6 && (
                          <LinearGradient
                            colors={["transparent", "rgba(251, 76, 81, 0.2)"]}
                            start={{ x: 0, y: 0.0 }}
                            end={{ x: percent, y: 0.0 }}
                          >
                            <TradeTableRowContainer>
                              <TradeTableSellPriceText>
                                {parseFloat(x[0]) < 0.006 &&
                                  parseFloat(x[0]) > 0
                                  ? price.slice(0, -2)
                                  : parseFloat(x[0]) < 0.1 &&
                                    parseFloat(x[0]) > 0.006
                                    ? x[0].slice(0, -3)
                                    : parseFloat(x[0]) < 1 &&
                                      parseFloat(x[0]) > 0.1
                                      ? x[0].slice(0, -4)
                                      : parseFloat(x[0]) < 50 &&
                                        parseFloat(x[0]) > 1
                                        ? x[0].slice(0, -5)
                                        : x[0].slice(0, -6)}
                              </TradeTableSellPriceText>
                              <TradeTableNumberText>
                                {x[1].slice(0, -5)}
                              </TradeTableNumberText>
                            </TradeTableRowContainer>
                          </LinearGradient>
                        )}
                      </>
                    );
                  })}
                </TradeTableSellContainer>
                <TradeTableBottomTitleContainer>
                  {isPositive === true ? (
                    <TradeTableBottomTitlePriceRiseText>
                      {parseFloat(price) < 0.006 && parseFloat(price) > 0
                        ? price
                        : parseFloat(price) < 0.1 && parseFloat(price) > 0.006
                          ? price.slice(0, -1)
                          : parseFloat(price) < 1 && parseFloat(price) > 0.1
                            ? price.slice(0, -2)
                            : parseFloat(price) < 50 && parseFloat(price) > 1
                              ? price.slice(0, -3)
                              : price.slice(0, -4)}
                    </TradeTableBottomTitlePriceRiseText>
                  ) : (
                    <TradeTableBottomTitlePriceFallText>
                      {parseFloat(price) < 0.006 && parseFloat(price) > 0
                        ? price
                        : parseFloat(price) < 0.1 && parseFloat(price) > 0.006
                          ? price.slice(0, -1)
                          : parseFloat(price) < 1 && parseFloat(price) > 0.1
                            ? price.slice(0, -2)
                            : parseFloat(price) < 50 && parseFloat(price) > 1
                              ? price.slice(0, -3)
                              : price.slice(0, -4)}
                    </TradeTableBottomTitlePriceFallText>
                  )}
                </TradeTableBottomTitleContainer>
                <TradeTableBottomTitleContainer>
                  <TradeTableBottomTitleOwnValueText>
                    {parseFloat(remarkPrice) < 0.006 &&
                      parseFloat(remarkPrice) > 0
                      ? remarkPrice
                      : parseFloat(remarkPrice) < 0.1 &&
                        parseFloat(remarkPrice) > 0.006
                        ? remarkPrice.slice(0, -1)
                        : parseFloat(remarkPrice) < 1 &&
                          parseFloat(remarkPrice) > 0.1
                          ? remarkPrice.slice(0, -2)
                          : parseFloat(remarkPrice) < 50 &&
                            parseFloat(remarkPrice) > 1
                            ? remarkPrice.slice(0, -3)
                            : remarkPrice.slice(0, -4)}
                  </TradeTableBottomTitleOwnValueText>
                </TradeTableBottomTitleContainer>
                <TradeTableBuyContainer>
                  {bidsArray.map((x: string, i) => {
                    let percent = Number((1 - parseFloat(x[1])).toPrecision());
                    if (
                      parseInt(
                        (
                          parseFloat(x[0].slice(0, 2) + x[0].slice(2, -9)) *
                          parseFloat(x[1].slice(0, -5)) +
                          20
                        )
                          .toString()
                          .slice(-2)
                      )
                    ) {
                      percent =
                        parseInt(
                          (
                            parseFloat(x[0].slice(0, 2) + x[0].slice(2, -9)) *
                            parseFloat(x[1].slice(0, -5)) +
                            20
                          )
                            .toString()
                            .slice(-2)
                        ) / 100;
                    }
                    return (
                      <>
                        {i < 6 && (
                          <LinearGradient
                            colors={["transparent", "rgba(47, 178, 100, 0.2)"]}
                            start={{ x: 0, y: 0.0 }}
                            end={{ x: percent, y: 0.0 }}
                          >
                            <TradeTableRowContainer>
                              <TradeTableBuyPriceText>
                                {parseFloat(x[0]) < 0.006 &&
                                  parseFloat(x[0]) > 0
                                  ? price.slice(0, -2)
                                  : parseFloat(x[0]) < 0.1 &&
                                    parseFloat(x[0]) > 0.006
                                    ? x[0].slice(0, -3)
                                    : parseFloat(x[0]) < 1 &&
                                      parseFloat(x[0]) > 0.1
                                      ? x[0].slice(0, -4)
                                      : parseFloat(x[0]) < 50 &&
                                        parseFloat(x[0]) > 1
                                        ? x[0].slice(0, -5)
                                        : x[0].slice(0, -6)}
                              </TradeTableBuyPriceText>
                              <TradeTableNumberText>
                                {x[1].slice(0, -5)}
                              </TradeTableNumberText>
                            </TradeTableRowContainer>
                          </LinearGradient>
                        )}
                      </>
                    );
                  })}
                </TradeTableBuyContainer>
              </TradeTableContainer>
              <TradeFunctionContainer>
                <TradeFunctionColumnContainer>
                  {swapBuyPosition === "Open" ? (
                    <TradeFunctionPositionButtonContainer>
                      <TradeFunctionOpenPositionButtonClicked
                        onPress={() => {
                          setSwapBuyPosition("Open");
                        }}
                      >
                        <TradeFunctionPositionButtonClickedText>
                          {t("buyOrder")}
                        </TradeFunctionPositionButtonClickedText>
                      </TradeFunctionOpenPositionButtonClicked>
                      <TradeFunctionClosePositionButton
                        onPress={() => {
                          setSwapBuyPosition("Close");
                        }}
                      >
                        <TradeFunctionPositionButtonText>
                          {t("sellOrder")}
                        </TradeFunctionPositionButtonText>
                      </TradeFunctionClosePositionButton>
                    </TradeFunctionPositionButtonContainer>
                  ) : (
                    <TradeFunctionPositionButtonContainer>
                      <TradeFunctionOpenPositionButton
                        onPress={() => {
                          setSwapBuyPosition("Open");
                        }}
                      >
                        <TradeFunctionPositionButtonText>
                          {t("buyOrder")}
                        </TradeFunctionPositionButtonText>
                      </TradeFunctionOpenPositionButton>
                      <TradeFunctionClosePositionButtonClicked
                        onPress={() => {
                          setSwapBuyPosition("Close");
                        }}
                      >
                        <TradeFunctionPositionButtonClickedText>
                          {t("sellOrder")}
                        </TradeFunctionPositionButtonClickedText>
                      </TradeFunctionClosePositionButtonClicked>
                    </TradeFunctionPositionButtonContainer>
                  )}
                  <TradeFunctionPriceOption onPress={toggleBuyTypeModal}>
                    <TradeFunctionPriceOptionText>
                      {buyTypeChange()}
                    </TradeFunctionPriceOptionText>
                    <TradeFunctionPriceOptionIcon
                      source={require("../../assets/images/trade/dropdown.png")}
                    />
                  </TradeFunctionPriceOption>
                  {(buyType === "Plan_Limit" || buyType === "Plan_Market") && (
                    <TradeFunctionPriceInputContainer>
                      <TextInput
                        placeholder={t("conditionPrice")}
                        value={stopPrice}
                        onChangeText={stopPrice => setStopPrice(stopPrice)}
                        placeholderTextColor={"#8D97A2"}
                        autoCorrect={false}
                        keyboardType={"decimal-pad"}
                        style={{
                          backgroundColor: "#242D37",
                          width: "70%",
                          height: 36,
                          color: "#F4F5F6",
                          borderTopLeftRadius: 4,
                          borderBottomLeftRadius: 4,
                          paddingLeft: 12
                        }}
                      />
                      <TradeFunctionPriceInputRightContainer>
                        <TradeFunctionPriceInputRightText>
                          USDT
                        </TradeFunctionPriceInputRightText>
                      </TradeFunctionPriceInputRightContainer>
                    </TradeFunctionPriceInputContainer>
                  )}
                  <TradeFunctionPriceInputContainer>
                    <TextInput
                      placeholder={buyTypeInputPlaceHolder()}
                      value={
                        buyType === "Market" || buyType === "Plan_Market"
                          ? ""
                          : buyPrice
                      }
                      onChangeText={buyPrice => setBuyPrice(buyPrice)}
                      placeholderTextColor={
                        buyType === "Market" ? "#FFFFFF" : "#8D97A2"
                      }
                      editable={
                        buyType === "Market" || buyType === "Plan_Market"
                          ? false
                          : true
                      }
                      autoCorrect={false}
                      keyboardType={"decimal-pad"}
                      style={{
                        backgroundColor: "#242D37",
                        width: "70%",
                        height: 36,
                        color: "#F4F5F6",
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                        paddingLeft: 12
                      }}
                    />
                    <TradeFunctionPriceInputRightContainer>
                      <TradeFunctionPriceInputRightText>
                        USDT
                      </TradeFunctionPriceInputRightText>
                    </TradeFunctionPriceInputRightContainer>
                  </TradeFunctionPriceInputContainer>
                  {swapCurrency === 0 ? (
                    <TradeFunctionCurrencyButtonContainer>
                      <TradeFunctionLeftCurrencyButtonClicked
                        onPress={() => {
                          setSwapCurrency(0);
                        }}
                      >
                        <TradeFunctionCurrencyButtonClickedText>
                          {newTrade
                            ? newTrade.split("USDT")[0]
                            : nowTrade.split("-")[0]}
                        </TradeFunctionCurrencyButtonClickedText>
                      </TradeFunctionLeftCurrencyButtonClicked>
                      <TradeFunctionRightCurrencyButton
                        onPress={() => {
                          setSwapCurrency(1);
                        }}
                      >
                        <TradeFunctionCurrencyButtonText>
                          USDT
                        </TradeFunctionCurrencyButtonText>
                      </TradeFunctionRightCurrencyButton>
                    </TradeFunctionCurrencyButtonContainer>
                  ) : (
                    <TradeFunctionCurrencyButtonContainer>
                      <TradeFunctionLeftCurrencyButton
                        onPress={() => {
                          setSwapCurrency(0);
                        }}
                      >
                        <TradeFunctionCurrencyButtonText>
                          {newTrade
                            ? newTrade.split("USDT")[0]
                            : nowTrade.split("-")[0]}
                        </TradeFunctionCurrencyButtonText>
                      </TradeFunctionLeftCurrencyButton>
                      <TradeFunctionRightCurrencyButtonClicked
                        onPress={() => {
                          setSwapCurrency(1);
                        }}
                      >
                        <TradeFunctionCurrencyButtonClickedText>
                          USDT
                        </TradeFunctionCurrencyButtonClickedText>
                      </TradeFunctionRightCurrencyButtonClicked>
                    </TradeFunctionCurrencyButtonContainer>
                  )}
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
                    positionNum={
                      balance === 0
                        ? "0"
                        : swapCurrency === 1
                          ? balance.toString()
                          : canOpen.toString()
                    }
                    onChangeSliderValue={setSliderNum}
                    swapCurrency={swapCurrency}
                    balance={balance}
                    trade={
                      newTrade
                        ? newTrade.split("USDT")[0]
                        : nowTrade.split("-")[0]
                    }
                  >
                    {/* <Slider
                      // renderAboveThumbComponent={RenderAboveThumbComponent}
                      renderThumbComponent={CustomThumb}
                      // minimumTrackTintColor={"#F4F5F6"}
                      // maximumTrackTintColor={"#333C47"}
                      // containerStyle={{
                      //   alignContent: "space-between",
                      //   justifyContent: "center"
                      // }}
                      // trackStyle={{
                      //   justifyContent: "space-between",
                      //   alignContent: "space-between"
                      // }}
                      // maximumValue={100}
                      // minimumValue={0}
                      // step={1}
                      // trackClickable={true}
                      // trackMarks={[0, 25, 50, 75, 100]}
                      onValueChange={(x)=>{setSlideValue(x[0])}}
                      value={slideValue}
                    /> */}
                    {/* <Slider2
                      style={{ height: 40}}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor="#F4F5F6"
                      maximumTrackTintColor="#333C47"
                      thumbImage={require("../../assets/images/trade/indicator2.png")}
                    /> */}
                  </SmallSliderContainer>
                  <TradeFunctionPositionViewContainer>
                    <TradeFunctionPositionViewTitleText>
                      {t("availableU")}
                    </TradeFunctionPositionViewTitleText>
                    <TradeFunctionPositionViewValueText>
                      {balance} USDT
                    </TradeFunctionPositionViewValueText>
                  </TradeFunctionPositionViewContainer>
                  <TradeFunctionPositionViewContainer>
                    <TradeFunctionPositionViewTitleText>
                      {t("availableQ")}
                    </TradeFunctionPositionViewTitleText>
                    <TradeFunctionPositionViewValueText>
                      {canOpen}{" "}
                      {newTrade
                        ? newTrade.split("USDT")[0]
                        : nowTrade.split("-")[0]}
                    </TradeFunctionPositionViewValueText>
                  </TradeFunctionPositionViewContainer>
                  <TradeFunctionPositionViewContainer>
                    {swapBuyPosition === "Open" ? (
                      <TradeFunctionBuyButton
                        onPress={async () => {
                          let token = await AsyncStorage.getItem("token");
                          if (token) {
                            if (
                              !buyPrice &&
                              (buyType === "Limit" || buyType === "Plan_Limit")
                            ) {
                              Alert.alert("請輸入價格");
                            } else if (
                              !stopPrice &&
                              (buyType === "Plan_Market" ||
                                buyType === "Plan_Limit")
                            ) {
                              Alert.alert("請輸入觸發價");
                            } else if (!sliderNum) {
                              Alert.alert(t("fiatSellQty"));
                            } else {
                              var obj =
                                buyType === "Limit"
                                  ? {
                                    price: parseFloat(buyPrice),
                                    origQty:
                                      swapCurrency === 0
                                        ? sliderNum
                                        : (
                                          (sliderNum * leverageViewNum) /
                                          parseFloat(wareHousedPrice)
                                        ).toFixed(2),
                                    side: "BUY",
                                    symbol: newTrade
                                      ? newTrade.split("USDT")[0] + "-USDT"
                                      : nowTrade,
                                    leverage: leverageViewNum,
                                    type: "LIMIT"
                                  }
                                  : buyType === "Market"
                                    ? {
                                      origQty:
                                        swapCurrency === 0
                                          ? sliderNum
                                          : (
                                            (sliderNum * leverageViewNum) /
                                            parseFloat(wareHousedPrice)
                                          ).toFixed(2),
                                      side: "BUY",
                                      symbol: newTrade
                                        ? newTrade.split("USDT")[0] + "-USDT"
                                        : nowTrade,
                                      leverage: leverageViewNum,
                                      type: "MARKET"
                                    }
                                    : buyType === "Plan_Limit"
                                      ? {
                                        price: parseFloat(buyPrice),
                                        origQty:
                                          swapCurrency === 0
                                            ? sliderNum
                                            : (
                                              (sliderNum * leverageViewNum) /
                                              parseFloat(wareHousedPrice)
                                            ).toFixed(2),
                                        side: "BUY",
                                        symbol: newTrade
                                          ? newTrade.split("USDT")[0] + "-USDT"
                                          : nowTrade,
                                        leverage: leverageViewNum,
                                        type: "STOP_LIMIT",
                                        stopPrice: stopPrice
                                      }
                                      : {
                                        origQty:
                                          swapCurrency === 0
                                            ? sliderNum
                                            : (
                                              (sliderNum * leverageViewNum) /
                                              parseFloat(wareHousedPrice)
                                            ).toFixed(2),
                                        side: "BUY",
                                        symbol: newTrade
                                          ? newTrade.split("USDT")[0] + "-USDT"
                                          : nowTrade,
                                        leverage: leverageViewNum,
                                        type: "STOP_MARKET",
                                        stopPrice: stopPrice
                                      };
                              setLoading(true);
                              api
                                .postData("/order/futures/open-order", obj)
                                .then(x => {
                                  setLoading(false);
                                  if (x.status != 400) {
                                    setStopPrice("");
                                    setSliderNum(0);
                                    getEntrust();
                                    getPosition();
                                  } else {

                                    if (
                                      x.data.msg.includes("未達最低開單數量")
                                    ) {
                                      alert(
                                        t("lessQtyMin") +
                                        x.data.msg.split(
                                          "未達最低開單數量"
                                        )[1]
                                      );
                                    } else if (
                                      x.data.msg.includes(
                                        "超過合約最大持倉價值"
                                      )
                                    ) {
                                      alert(
                                        t("overPositionValue") +
                                        x.data.msg.split(
                                          "超過合約最大持倉價值"
                                        )[1]
                                      );
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  }
                                });
                            }
                          } else {
                            alert("請先登入");
                          }
                        }}
                      >
                        <TradeFunctionBuySellButtonText>
                          {t("futuresBuy")}
                        </TradeFunctionBuySellButtonText>
                      </TradeFunctionBuyButton>
                    ) : (
                      <TradeFunctionSellButton
                        onPress={async () => {
                          let token = await AsyncStorage.getItem("token");
                          if (token) {
                            if (
                              !buyPrice &&
                              (buyType === "Limit" || buyType === "Plan_Limit")
                            ) {
                              Alert.alert("請輸入價格");
                            } else if (
                              !stopPrice &&
                              (buyType === "Plan_Market" ||
                                buyType === "Plan_Limit")
                            ) {
                              Alert.alert("請輸入觸發價");
                            } else if (!sliderNum) {
                              Alert.alert(t("fiatSellQty"));
                            } else {
                              var obj =
                                buyType === "Limit"
                                  ? {
                                    price: parseFloat(buyPrice),
                                    origQty:
                                      swapCurrency === 0
                                        ? sliderNum
                                        : (
                                          (sliderNum * leverageViewNum) /
                                          parseFloat(wareHousedPrice)
                                        ).toFixed(2),
                                    side: "SELL",
                                    symbol: newTrade
                                      ? newTrade.split("USDT")[0] + "-USDT"
                                      : nowTrade,
                                    leverage: leverageViewNum,
                                    type: "LIMIT"
                                  }
                                  : buyType === "Market"
                                    ? {
                                      origQty:
                                        swapCurrency === 0
                                          ? sliderNum
                                          : (
                                            (sliderNum * leverageViewNum) /
                                            parseFloat(wareHousedPrice)
                                          ).toFixed(2),
                                      side: "SELL",
                                      symbol: newTrade
                                        ? newTrade.split("USDT")[0] + "-USDT"
                                        : nowTrade,
                                      leverage: leverageViewNum,
                                      type: "MARKET"
                                    }
                                    : buyType === "Plan_Limit"
                                      ? {
                                        price: parseFloat(buyPrice),
                                        origQty:
                                          swapCurrency === 0
                                            ? sliderNum
                                            : (
                                              (sliderNum * leverageViewNum) /
                                              parseFloat(wareHousedPrice)
                                            ).toFixed(2),
                                        side: "SELL",
                                        symbol: newTrade
                                          ? newTrade.split("USDT")[0] + "-USDT"
                                          : nowTrade,
                                        leverage: leverageViewNum,
                                        type: "STOP_LIMIT",
                                        stopPrice: stopPrice
                                      }
                                      : {
                                        origQty:
                                          swapCurrency === 0
                                            ? sliderNum
                                            : (
                                              (sliderNum * leverageViewNum) /
                                              parseFloat(wareHousedPrice)
                                            ).toFixed(2),
                                        side: "SELL",
                                        symbol: newTrade
                                          ? newTrade.split("USDT")[0] + "-USDT"
                                          : nowTrade,
                                        leverage: leverageViewNum,
                                        type: "STOP_MARKET",
                                        stopPrice: stopPrice
                                      };
                              setLoading(true);
                              api
                                .postData("/order/futures/open-order", obj)
                                .then(x => {
                                  setLoading(false);
                                  if (x.status != 400) {
                                    setBuyPrice("");
                                    setStopPrice("");
                                    setSliderNum(0);
                                    getEntrust();
                                    getPosition();
                                  } else {
                                    if (
                                      x.data.msg.includes("未達最低開單數量")
                                    ) {
                                      alert(
                                        t("lessQtyMin") +
                                        x.data.msg.split(
                                          "未達最低開單數量"
                                        )[1]
                                      );
                                    } else if (
                                      x.data.msg.includes(
                                        "超過合約最大持倉價值"
                                      )
                                    ) {
                                      alert(
                                        t("overPositionValue") +
                                        x.data.msg.split(
                                          "超過合約最大持倉價值"
                                        )[1]
                                      );
                                    } else {
                                      alert(x.data.msg);
                                    }
                                  }
                                });
                            }
                          } else {
                            alert("請先登入");
                          }
                        }}
                      >
                        <TradeFunctionBuySellButtonText>
                          {t("futuresSell")}
                        </TradeFunctionBuySellButtonText>
                      </TradeFunctionSellButton>
                    )}
                  </TradeFunctionPositionViewContainer>
                </TradeFunctionColumnContainer>
              </TradeFunctionContainer>
            </TradeRowContainer>
            {swapPositionView === 0 ? (
              <TradePositionHeaderContainer>
                <TradePositionHeaderRowContainer>
                  <TradePositionHeaderLeftSwapButtonClicked
                    onPress={() => {
                      setSwapPositionView(0);
                    }}
                  >
                    <TradePositionHeaderSwapButtonTextClicked>
                      {t("activePosition")}
                    </TradePositionHeaderSwapButtonTextClicked>
                  </TradePositionHeaderLeftSwapButtonClicked>
                  <TradePositionHeaderRightSwapButton
                    onPress={() => {
                      setSwapPositionView(1);
                    }}
                  >
                    <TradePositionHeaderSwapButtonText>
                      {t("activeOrder")}
                    </TradePositionHeaderSwapButtonText>
                  </TradePositionHeaderRightSwapButton>
                </TradePositionHeaderRowContainer>
                <TradePositionHeaderHistoryButton
                  onPress={() => {
                    navigation.navigate("HistoryScreen");
                  }}
                >
                  <TradePositionHeaderHistoryIcon
                    source={require("../../assets/images/trade/order.png")}
                  />
                  <TradePositionHeaderHistoryText>
                    {t("orderHistory")}
                  </TradePositionHeaderHistoryText>
                </TradePositionHeaderHistoryButton>
              </TradePositionHeaderContainer>
            ) : (
              <TradePositionHeaderContainer>
                <TradePositionHeaderRowContainer>
                  <TradePositionHeaderLeftSwapButton
                    onPress={() => {
                      setSwapPositionView(0);
                    }}
                  >
                    <TradePositionHeaderSwapButtonText>
                      {t("activePosition")}
                    </TradePositionHeaderSwapButtonText>
                  </TradePositionHeaderLeftSwapButton>
                  <TradePositionHeaderRightSwapButtonClicked
                    onPress={() => {
                      setSwapPositionView(1);
                    }}
                  >
                    <TradePositionHeaderSwapButtonTextClicked>
                      {t("activeOrder")}
                    </TradePositionHeaderSwapButtonTextClicked>
                  </TradePositionHeaderRightSwapButtonClicked>
                </TradePositionHeaderRowContainer>
                <TradePositionHeaderHistoryButton
                  onPress={() => {
                    navigation.navigate("HistoryScreen");
                  }}
                >
                  <TradePositionHeaderHistoryIcon
                    source={require("../../assets/images/trade/order.png")}
                  />
                  <TradePositionHeaderHistoryText>
                    {t("orderHistory")}
                  </TradePositionHeaderHistoryText>
                </TradePositionHeaderHistoryButton>
              </TradePositionHeaderContainer>
            )}
            <TradePositionLine></TradePositionLine>
            {swapPositionView === 0 ? (
              positionArray.length !== 0 ? (
                <TradePositionContainer>
                  {positionArray.map((x: any, i) => {
                    return (
                      <TradePositionCardContainer>
                        <TradePositionCardTitleContainer>
                          <TradePositionCardTitleRowContainer>
                            {x.side === "BUY" ? (
                              <TradePositionCardTitleText>
                                {t("long")} {x.symbol}
                              </TradePositionCardTitleText>
                            ) : (
                              <TradePositionCardTitleText
                                style={{ color: "#FB4C51" }}
                              >
                                {t("short")} {x.symbol}
                              </TradePositionCardTitleText>
                            )}
                            <TradePositionCardSmallTitleText>
                              {t("pnlU")}
                            </TradePositionCardSmallTitleText>
                          </TradePositionCardTitleRowContainer>
                          <TradePositionCardTitleRowContainer>
                            <TradePositionCardTitleValueText>
                              {x.type === "FULL" ? t("crossPosition") : "逐倉"}{" "}
                              {x.leverage}X
                            </TradePositionCardTitleValueText>
                            {x.profitAndLoss > 0 ? (
                              <TradePositionCardBigValueText>
                                {x.profitAndLoss}
                              </TradePositionCardBigValueText>
                            ) : (
                              <TradePositionCardBigValueText
                                style={{ color: "#FB4C51" }}
                              >
                                {x.profitAndLoss}
                              </TradePositionCardBigValueText>
                            )}
                          </TradePositionCardTitleRowContainer>
                        </TradePositionCardTitleContainer>
                        <TradePositionCardDetailRowContainer>
                          <TradePositionCardDetailColumnContainer>
                            <TradePositionCardSmallTitleText>
                              {t("positionSize")}
                            </TradePositionCardSmallTitleText>
                            <TradePositionCardSmallValueText>
                              {x.quantity}
                            </TradePositionCardSmallValueText>
                          </TradePositionCardDetailColumnContainer>
                          <TradePositionCardDetailColumnContainer>
                            <TradePositionCardSmallTitleText>
                              {t("entryPrice")}
                            </TradePositionCardSmallTitleText>
                            <TradePositionCardSmallValueText>
                              {parseFloat(x.avgPrice.toFixed(6)) < 0.006 &&
                                parseFloat(x.avgPrice.toFixed(6)) > 0
                                ? x.avgPrice.toFixed(6)
                                : parseFloat(x.avgPrice.toFixed(6)) < 0.1 &&
                                  parseFloat(x.avgPrice.toFixed(6)) > 0.006
                                  ? x.avgPrice.toFixed(6).toString().slice(0, -1)
                                  : parseFloat(x.avgPrice.toFixed(6)) < 1 &&
                                    parseFloat(x.avgPrice.toFixed(6)) > 0.1
                                    ? x.avgPrice.toFixed(6).toString().slice(0, -2)
                                    : parseFloat(x.avgPrice.toFixed(6)) < 50 &&
                                      parseFloat(x.avgPrice.toFixed(6)) > 1
                                      ? x.avgPrice.toFixed(6).toString().slice(0, -3)
                                      : x.avgPrice.toFixed(6).toString().slice(0, -4)}
                            </TradePositionCardSmallValueText>
                          </TradePositionCardDetailColumnContainer>
                        </TradePositionCardDetailRowContainer>
                        <TradePositionCardDetailRowContainer>
                          <TradePositionCardDetailColumnContainer>
                            <TradePositionCardSmallTitleText>
                              {t("marketPrice")}
                            </TradePositionCardSmallTitleText>
                            <TradePositionCardSmallValueText>
                              {parseFloat(getRemark(x.symbol)) < 0.006 &&
                                parseFloat(getRemark(x.symbol)) > 0
                                ? getRemark(x.symbol)
                                : parseFloat(getRemark(x.symbol)) < 0.1 &&
                                  parseFloat(getRemark(x.symbol)) > 0.006
                                  ? getRemark(x.symbol)
                                    .toString()
                                    .slice(0, -1)
                                  : parseFloat(getRemark(x.symbol)) < 1 &&
                                    parseFloat(getRemark(x.symbol)) > 0.1
                                    ? getRemark(x.symbol)
                                      .toString()
                                      .slice(0, -2)
                                    : parseFloat(getRemark(x.symbol)) < 50 &&
                                      parseFloat(getRemark(x.symbol)) > 1
                                      ? getRemark(x.symbol)
                                        .toString()
                                        .slice(0, -3)
                                      : getRemark(x.symbol)
                                        .toString()
                                        .slice(0, -4)}
                            </TradePositionCardSmallValueText>
                          </TradePositionCardDetailColumnContainer>
                          <TradePositionCardDetailColumnContainer>
                            <TradePositionCardSmallTitleText>
                              {t("liqPrice")}
                            </TradePositionCardSmallTitleText>
                            <TradePositionCardSmallValueText>
                              {x.forceClose}
                            </TradePositionCardSmallValueText>
                          </TradePositionCardDetailColumnContainer>
                        </TradePositionCardDetailRowContainer>
                        <TradePositionCardButtonContainer>
                          <TradePositionCardButton
                            onPress={() => {
                              AsyncStorage.setItem(
                                "position",
                                JSON.stringify({ position: x })
                              );

                              navigation.navigate("StopPositionScreen", {
                                remarkPrice: getRemark(x.symbol)
                              });
                            }}
                          >
                            <TradePositionCardButtonText>
                              {t("stopProfitLoss")}
                            </TradePositionCardButtonText>
                          </TradePositionCardButton>
                          <TradePositionCardButton
                            disabled={isFocus}
                            onPress={() => {
                              setLoading(true);
                              setIsFocus(true);
                              api
                                .postData("/order/position/close-position", {
                                  positionId: x.positionId
                                })
                                .then(x => {
                                  if (x.status !== 400) {
                                    getPosition();
                                    setLoading(false);
                                    setIsFocus(false);
                                  } else {
                                    Alert.alert(x.data.msg);
                                  }
                                });
                            }}
                          >
                            <TradePositionCardButtonText>
                              {t("closePostion")}
                            </TradePositionCardButtonText>
                          </TradePositionCardButton>
                        </TradePositionCardButtonContainer>
                      </TradePositionCardContainer>
                    );
                  })}
                </TradePositionContainer>
              ) : (
                <TradePositionContainer>
                  <TradePositionBackgroundImage
                    source={require("../../assets/images/trade/norecord.png")}
                  />
                </TradePositionContainer>
              )
            ) : entrustArray.length !== 0 ? (
              <TradeCommitContainer>
                {entrustArray.map((x: any, i) => {
                  return (
                    <TradeCommitCardContainer>
                      <TradeCommitCardTitleContainer>
                        <TradeCommitCardTitleText>
                          {x.symbol}
                        </TradeCommitCardTitleText>
                        {/* <TradeCommitCardTitleTimeText>{x.time}</TradeCommitCardTitleTimeText> */}
                      </TradeCommitCardTitleContainer>
                      <TradeCommitCardDetailRowContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("tradeType")}
                          </TradeCommitCardSmallTitleText>
                          {x.type === "LIMIT" && (
                            <TradeCommitCardSmallValueText>
                              {t("limitedOrder")}
                            </TradeCommitCardSmallValueText>
                          )}
                          {x.type === "MARKET" && (
                            <TradeCommitCardSmallValueText>
                              {t("marketOrder")}
                            </TradeCommitCardSmallValueText>
                          )}
                          {x.type === "STOP_MARKET" && (
                            <TradeCommitCardSmallValueText>
                              {t("stopMarketOrder")}
                            </TradeCommitCardSmallValueText>
                          )}
                          {x.type === "STOP_LIMIT" && (
                            <TradeCommitCardSmallValueText>
                              {t("stopLimitOrder")}
                            </TradeCommitCardSmallValueText>
                          )}
                        </TradeCommitCardDetailColumnContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("orderType")}
                          </TradeCommitCardSmallTitleText>
                          {x.side === "BUY" && (
                            <TradeCommitCardBuyDirectionLongText>
                              {t("buyOrder")}
                            </TradeCommitCardBuyDirectionLongText>
                          )}
                          {x.side === "SELL" && (
                            <TradeCommitCardBuyDirectionShortText>
                              {t("sellOrder")}
                            </TradeCommitCardBuyDirectionShortText>
                          )}
                        </TradeCommitCardDetailColumnContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("orderStatus")}
                          </TradeCommitCardSmallTitleText>
                          <TradeCommitCardSmallValueText>
                            {x.status}
                          </TradeCommitCardSmallValueText>
                        </TradeCommitCardDetailColumnContainer>
                      </TradeCommitCardDetailRowContainer>
                      <TradeCommitCardDetailRowContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("orderSize")}
                          </TradeCommitCardSmallTitleText>
                          <TradeCommitCardSmallValueText>
                            {x.origQty}
                          </TradeCommitCardSmallValueText>
                        </TradeCommitCardDetailColumnContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("orderPrice")}
                          </TradeCommitCardSmallTitleText>
                          <TradeCommitCardSmallValueText>
                            {x.type == "STOP_MARKET"
                              ? t("marketOrder")
                              : x.price}
                          </TradeCommitCardSmallValueText>
                        </TradeCommitCardDetailColumnContainer>
                        <TradeCommitCardDetailColumnContainer>
                          <TradeCommitCardSmallTitleText>
                            {t("conditionPrice")}
                          </TradeCommitCardSmallTitleText>
                          <TradeCommitCardSmallValueText>
                            {x.stopPrice}
                          </TradeCommitCardSmallValueText>
                        </TradeCommitCardDetailColumnContainer>
                      </TradeCommitCardDetailRowContainer>
                      {/* <TradeCommitCardDetailRowContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>手續費</TradeCommitCardSmallTitleText>
                                                                <TradeCommitCardSmallValueText>{x.handlingFee && x.handlingFee.toFixed(2) + " USDT"} </TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    <TradeCommitCardSmallTitleText>實現盈虧</TradeCommitCardSmallTitleText>
                                                                    <TradeCommitCardSmallValueText>{x.profitAndLoss && x.profitAndLoss.toFixed(2) + " USDT"} </TradeCommitCardSmallValueText>
                                                                </TradeCommitCardDetailColumnContainer>
                                                                <TradeCommitCardDetailColumnContainer>
                                                                    
                                                                </TradeCommitCardDetailColumnContainer>
                                                            </TradeCommitCardDetailRowContainer> */}
                      <TradeCommitCardButtonContainer>
                        <TradeCommitCardButton
                          onPress={() => {
                            toggleCommitStopModal();
                          }}
                        >
                          <TradeCommitCardButtonText>
                            {t("stopProfitLoss")}
                          </TradeCommitCardButtonText>
                        </TradeCommitCardButton>
                        <TradeCommitCardButton
                          onPress={() => {
                            cancelCommitAlert(x.orderId);
                          }}
                        >
                          <TradeCommitCardButtonText>
                            {t("cancelOrder")}
                          </TradeCommitCardButtonText>
                        </TradeCommitCardButton>
                      </TradeCommitCardButtonContainer>
                    </TradeCommitCardContainer>
                  );
                })}
              </TradeCommitContainer>
            ) : (
              <TradeCommitContainer>
                <TradeCommitBackgroundImage
                  source={require("../../assets/images/trade/norecord.png")}
                />
              </TradeCommitContainer>
            )}
          </TradeContainer>
        </MainSwapPageContainer>
      ) : (
        <GraphPage
          trade={newTrade ? newTrade.split("USDT")[0] + "-USDT" : nowTrade}
          asksArray={asksArray}
          bidsArray={bidsArray}
          wareHousedPrice={wareHousedPrice}
          price={price}
          remarkPrice={remarkPrice}
        />
      )}

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
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            backgroundColor: "#242D37",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 30
          }}
        >
          <ModalHeaderContainer>
            <TouchableOpacity
              onPress={() => {
                setIsPositionViewVisible(false);
              }}
            >
              <ModalLeftCancelButton
                source={require("../../assets/images/trade/cancel.png")}
              />
            </TouchableOpacity>
            <ModalHedaerTitleText>{t("marginMode")}</ModalHedaerTitleText>
            <ModalEmptyDiv></ModalEmptyDiv>
          </ModalHeaderContainer>
          <PositionViewModalButton
            onPress={() => {
              setPositionView("Full"), setIsPositionViewVisible(false);
            }}
          >
            <PositionViewModalButtonText>
              {t("crossPosition")}
            </PositionViewModalButtonText>
            {positionView === "Full" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
          </PositionViewModalButton>
          <PositionViewModalDetailText>
            {t("crossMsg")}。
          </PositionViewModalDetailText>
          <PositionViewModalButton
            onPress={() => {
              setPositionView("Each"), setIsPositionViewVisible(false);
            }}
          >
            <PositionViewModalButtonText>
              {t("isolatedPosition")}
            </PositionViewModalButtonText>
            {positionView === "Each" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
          </PositionViewModalButton>
          <PositionViewModalDetailText>
            {t("isolatedMsg")}。
          </PositionViewModalDetailText>
          <ModalConfirmButton>
            <ModalConfirmButtonText>{t("OK")}</ModalConfirmButtonText>
          </ModalConfirmButton>
        </View>
      </Modal>

      {/* Leverage View Modal 槓桿比例 */}
      <Modal
        isVisible={false}
        deviceHeight={windowHeight}
        deviceWidth={windowWidth}
        animationInTiming={500}
        animationOutTiming={700}
        backdropOpacity={0.7}
        onBackdropPress={() => setIsLeverageViewVisible(false)}
        onSwipeComplete={() => setIsLeverageViewVisible(false)}
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            backgroundColor: "#242D37",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 30
          }}
        >
          <ModalHeaderContainer>
            <TouchableOpacity
              onPress={() => {
                setIsLeverageViewVisible(false);
              }}
            >
              <ModalLeftCancelButton
                source={require("../../assets/images/trade/cancel.png")}
              />
            </TouchableOpacity>
            <ModalHedaerTitleText>{t("leverage")}</ModalHedaerTitleText>
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
              positionNum={balance === 0 ? "0" : canOpen.toString()}
              balance={balance}
            >
              {/* <Slider
                renderThumbComponent={CustomThumb}
                minimumTrackTintColor={"#F4F5F6"}
                maximumTrackTintColor={"#333C47"}
                containerStyle={{
                  alignContent: "space-between",
                  justifyContent: "center"
                }}
                trackStyle={{
                  justifyContent: "space-between",
                  alignContent: "space-between"
                }}
                maximumValue={125}
                minimumValue={1}
                step={1}
              /> */}
            </SliderContainer>
            {/* <ModalHedaerTitleText>{sliderNum}</ModalHedaerTitleText> */}
          </LeverageViewModalSliderContainer>
        </View>
      </Modal>

      {/* Buy Type Modal 下單類型*/}
      <Modal
        isVisible={false}
        deviceHeight={windowHeight}
        deviceWidth={windowWidth}
        // animationInTiming={500}
        // animationOutTiming={700}
        backdropOpacity={0.7}
        onBackdropPress={() => setIsBuyTypeModalVisible(false)}
        onSwipeComplete={() => setIsBuyTypeModalVisible(false)}
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            backgroundColor: "#242D37",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 50
          }}
        >
          <BuyTypeTitleContainer>
            <BuyTypeModalTitleText>{t("orderType")}</BuyTypeModalTitleText>
          </BuyTypeTitleContainer>
          <BuyTypeModalPickerButton
            onPress={() => {
              setBuyType("Limit"), setIsBuyTypeModalVisible(false);
            }}
          >
            <BuyTypeModalPickerButtonText>
              {t("limitedOrder")}
            </BuyTypeModalPickerButtonText>
            {buyType === "Limit" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
          </BuyTypeModalPickerButton>
          <BuyTypeModalLineText></BuyTypeModalLineText>
          <BuyTypeModalPickerButton
            onPress={() => {
              setBuyType("Market"), setIsBuyTypeModalVisible(false);
            }}
          >
            <BuyTypeModalPickerButtonText>
              {t("marketOrder")}
            </BuyTypeModalPickerButtonText>
            {buyType === "Market" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
          </BuyTypeModalPickerButton>
          <BuyTypeModalLineText></BuyTypeModalLineText>
          <BuyTypeModalPickerButton
            onPress={() => {
              setBuyType("Plan_Limit"), setIsBuyTypeModalVisible(false);
            }}
          >
            <BuyTypeModalPickerButtonText>
              {t("stopLimitOrder")}
            </BuyTypeModalPickerButtonText>
            {buyType === "Plan_Limit" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
          </BuyTypeModalPickerButton>
          <BuyTypeModalLineText></BuyTypeModalLineText>
          <BuyTypeModalPickerButton
            onPress={() => {
              setBuyType("Plan_Market"), setIsBuyTypeModalVisible(false);
            }}
          >
            <BuyTypeModalPickerButtonText>
              {t("stopMarketOrder")}
            </BuyTypeModalPickerButtonText>
            {buyType === "Plan_Market" && (
              <ModalSelectedImage
                source={require("../../assets/images/trade/selected.png")}
              />
            )}
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
        swipeDirection={["down"]}
        style={{ justifyContent: "flex-end", margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <View
          style={{
            backgroundColor: "#242D37",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 50
          }}
        >
          <ModalHeaderContainer style={{ paddingBottom: 0 }}>
            <TouchableOpacity
              onPress={() => {
                setIsCommitStopVisible(false);
              }}
            >
              <ModalLeftCancelButton
                source={require("../../assets/images/trade/cancel.png")}
              />
            </TouchableOpacity>
            <ModalHedaerTitleText>{t("stopProfitLoss")}</ModalHedaerTitleText>
            <ModalEmptyDiv></ModalEmptyDiv>
          </ModalHeaderContainer>
          {CommitStopPositionArray.map((x, i) => {
            return (
              <CommitStopModalCardContainer>
                <CommitStopModalCardTitleColumnContainer>
                  <CommitStopModalCardTitleRowContainer>
                    {x.type === "StopEarn" ? (
                      <CommitStopModalCardTitleStopEarnText>
                        止盈平多
                      </CommitStopModalCardTitleStopEarnText>
                    ) : (
                      <CommitStopModalCardTitleStopLostText>
                        止損平多
                      </CommitStopModalCardTitleStopLostText>
                    )}
                    {x.progress === 0 ? (
                      <CommitStopModalCardTitleProgressText>
                        未生效
                      </CommitStopModalCardTitleProgressText>
                    ) : (
                      <CommitStopModalCardTitleProgressText>
                        已生效
                      </CommitStopModalCardTitleProgressText>
                    )}
                  </CommitStopModalCardTitleRowContainer>
                  <CommitStopModalCardTitleTimeText>
                    {x.time}
                  </CommitStopModalCardTitleTimeText>
                </CommitStopModalCardTitleColumnContainer>
                <CommitStopModalCardDetailContainer>
                  <CommitStopModalCardDetailColumnContainer>
                    <CommitStopModalCardDetailTitleText>
                      觸發條件
                    </CommitStopModalCardDetailTitleText>
                    <CommitStopModalCardDetailValueText>
                      {x.condition}
                    </CommitStopModalCardDetailValueText>
                  </CommitStopModalCardDetailColumnContainer>
                  <CommitStopModalCardDetailColumnContainer>
                    <CommitStopModalCardDetailTitleText>
                      {t("orderSize")}
                    </CommitStopModalCardDetailTitleText>
                    <CommitStopModalCardDetailValueText>
                      {x.volumnNum}
                    </CommitStopModalCardDetailValueText>
                  </CommitStopModalCardDetailColumnContainer>
                  <CommitStopModalCardDetailColumnContainer>
                    <CommitStopModalCardDetailTitleText>
                      {t("orderPrice")}
                    </CommitStopModalCardDetailTitleText>
                    <CommitStopModalCardDetailValueText>
                      {x.volumnPrice}
                    </CommitStopModalCardDetailValueText>
                  </CommitStopModalCardDetailColumnContainer>
                </CommitStopModalCardDetailContainer>
                {i !== CommitStopPositionArray.length - 1 && (
                  <CommitStopModalLine></CommitStopModalLine>
                )}
              </CommitStopModalCardContainer>
            );
          })}
        </View>
      </Modal>
      <View style={styles.centeredView}>
        <Modal2
          animationType="slide"
          transparent={true}
          visible={isLeverageViewVisible}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: "#242D37",
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                // paddingLeft: 16,
                // paddingRight: 16,
                // paddingBottom: 30
              }}
            >
              <ModalHeaderContainer>
                <TouchableOpacity
                  onPress={() => {
                    setIsLeverageViewVisible(false);
                  }}
                >
                  <ModalLeftCancelButton
                    source={require("../../assets/images/trade/cancel.png")}
                  />
                </TouchableOpacity>
                <ModalHedaerTitleText>{t("leverage")}</ModalHedaerTitleText>
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
                  positionNum={balance === 0 ? "0" : canOpen.toString()}
                  balance={balance}
                >
                  {/* <Slider
                renderThumbComponent={CustomThumb}
                minimumTrackTintColor={"#F4F5F6"}
                maximumTrackTintColor={"#333C47"}
                containerStyle={{
                  alignContent: "space-between",
                  justifyContent: "center"
                }}
                trackStyle={{
                  justifyContent: "space-between",
                  alignContent: "space-between"
                }}
                maximumValue={125}
                minimumValue={1}
                step={1}
              /> */}
                </SliderContainer>
                {/* <ModalHedaerTitleText>{sliderNum}</ModalHedaerTitleText> */}
              </LeverageViewModalSliderContainer>
            </View>
          </View>

        </Modal2>
        <Modal2
          animationType="slide"
          transparent={true}
          visible={isBuyTypeModalVisible}>
          <View style={styles.modalView}>
            <BuyTypeTitleContainer>
              <BuyTypeModalTitleText>{t("orderType")}</BuyTypeModalTitleText>
            </BuyTypeTitleContainer>
            <BuyTypeModalPickerButton
              onPress={() => {
                setBuyType("Limit"), setIsBuyTypeModalVisible(false);
              }}
            >
              <BuyTypeModalPickerButtonText>
                {t("limitedOrder")}
              </BuyTypeModalPickerButtonText>
              {buyType === "Limit" && (
                <ModalSelectedImage
                  source={require("../../assets/images/trade/selected.png")}
                />
              )}
            </BuyTypeModalPickerButton>
            <BuyTypeModalLineText></BuyTypeModalLineText>
            <BuyTypeModalPickerButton
              onPress={() => {
                setBuyType("Market"), setIsBuyTypeModalVisible(false);
              }}
            >
              <BuyTypeModalPickerButtonText>
                {t("marketOrder")}
              </BuyTypeModalPickerButtonText>
              {buyType === "Market" && (
                <ModalSelectedImage
                  source={require("../../assets/images/trade/selected.png")}
                />
              )}
            </BuyTypeModalPickerButton>
            <BuyTypeModalLineText></BuyTypeModalLineText>
            <BuyTypeModalPickerButton
              onPress={() => {
                setBuyType("Plan_Limit"), setIsBuyTypeModalVisible(false);
              }}
            >
              <BuyTypeModalPickerButtonText>
                {t("stopLimitOrder")}
              </BuyTypeModalPickerButtonText>
              {buyType === "Plan_Limit" && (
                <ModalSelectedImage
                  source={require("../../assets/images/trade/selected.png")}
                />
              )}
            </BuyTypeModalPickerButton>
            <BuyTypeModalLineText></BuyTypeModalLineText>
            <BuyTypeModalPickerButton
              onPress={() => {
                setBuyType("Plan_Market"), setIsBuyTypeModalVisible(false);
              }}
            >
              <BuyTypeModalPickerButtonText>
                {t("stopMarketOrder")}
              </BuyTypeModalPickerButtonText>
              {buyType === "Plan_Market" && (
                <ModalSelectedImage
                  source={require("../../assets/images/trade/selected.png")}
                />
              )}
            </BuyTypeModalPickerButton>
          </View>
        </Modal2>
      </View>

    </Container>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // display:"flex",
    // justifyContent:"space-between",
    // marginTop: 22,
    backgroundColor: "black"
  },
  modalView: {
    width: "100%",
    backgroundColor: "#242D37",
    position: "absolute",
    bottom: 0,
    // display:"flex",
    // justifyContent:"space-between",
    // alignItems:"center",
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20
  },
  container: {
    backgroundColor: "#18222D",
    color: "white"
  },
  containerStyle: {
    backgroundColor: "#18222D",
    color: "white"
  },
  dropdown: {
    width: 130,
    height: 30,
    color: "white",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#18222D"
  },
  icon: {
    marginRight: 5
  },
  // label: {
  //   position: 'absolute',
  //   backgroundColor: 'white',
  //   left: 22,
  //   top: 8,
  //   zIndex: 999,
  //   paddingHorizontal: 8,
  //   fontSize: 14,
  // },
  placeholderStyle: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#18222D"
  },
  selectedTextStyle: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#18222D"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
});

export default TradeScreen;
