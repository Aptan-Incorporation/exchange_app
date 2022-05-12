import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
const DetailContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardTitleContainer = styled(View)`
display: flex;
flex-direction: row;
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
`;

const CardMiddleColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardMiddleRowContainer = styled(View)`
display: flex;
flex-direction: row;
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
`;

const CardMiddleRightBuyPriceText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
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
`;

const CardBottomInRowContainer = styled(View)`
isplay: flex;
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
`;

const CardBottomButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;



const C2cHistoryScreen = ({ navigation, route }: RootStackScreenProps<"C2cHistoryScreen">) => {

    const insets = useSafeAreaInsets();

    // 切換進行中或已完成
    const [swapPage, setSwapPage] = useState(0);

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
                        <SwapRightButton onPress={() => { setSwapPage(0) }}>
                            <SwapButtonText>進行中</SwapButtonText>
                        </SwapRightButton>
                        <SwapRightButtonClicked onPress={() => { setSwapPage(1) }}>
                            <SwapButtonClickedText>已完成</SwapButtonClickedText>
                        </SwapRightButtonClicked>
                    </SwapContainer>
            }

        </Container>
    );
}

export default C2cHistoryScreen