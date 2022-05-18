import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'

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
    const [swapProgress, setSwapProgress] = useState(1);

    // 切換購買/出售頁面
    const [swapPage, setSwapPage] = useState(0);

    return (
        <Container insets={insets.top}>
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

            </BodyContainer>
        </Container>
    )
}

export default C2cCreateScreen