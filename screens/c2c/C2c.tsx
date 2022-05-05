import * as React from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
`;

//Header Style
const HeaderContainer = styled(View)`
display: flex ;
flex-direction: column;
`;

const HeaderTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const HeaderTitleInlineRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
`;

const HeaderTitleTextClicked = styled(Text)`
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: ${props => props.theme.color.White};
`;

const HeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.Gray};
`;

const HeaderTitleOrderIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderCurrencyPageContainer = styled(View)`
display: flex ;
flex-direction: row;
`;

const HeaderCurrencyButtonClicked = styled(TouchableOpacity)`
height: 32px;
width: 57px;
border-bottom-width: 2px;
border-bottom-color: ${props => props.theme.color.Primary};
`;

const HeaderCurrencyButton = styled(TouchableOpacity)`
height: 32px;
width: 57px;
`;

const HeaderCurrencyButtonTextClicked = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const HeaderCurrencyButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.LightMidGray};
`;


const C2cScreen = ({ navigation }: RootStackScreenProps<"C2cScreen">) => {

    // Screen Top Padding
    const insets = useSafeAreaInsets();

    // Swap Title Buy or Sell
    const [swapBuySell, setSwapBuySell] = useState(0);

    // Swap Buy Currency
    const [swapBuyCurrencyType, setSwapBuyCurrencyType] = useState("USDT");

    return (
        <Container insets={insets.top}>
            <HeaderContainer>
                <HeaderTitleContainer>
                    {
                        swapBuySell === 0 ?
                            <HeaderTitleInlineRowContainer>
                                <TouchableOpacity onPress={() => { setSwapBuySell(0) }}>
                                    <HeaderTitleTextClicked>購買</HeaderTitleTextClicked>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setSwapBuySell(1) }}>
                                    <HeaderTitleText>出售</HeaderTitleText>
                                </TouchableOpacity>
                            </HeaderTitleInlineRowContainer> :
                            <HeaderTitleInlineRowContainer>
                                <TouchableOpacity onPress={() => { setSwapBuySell(0) }}>
                                    <HeaderTitleText>購買</HeaderTitleText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setSwapBuySell(1) }}>
                                    <HeaderTitleTextClicked>出售</HeaderTitleTextClicked>
                                </TouchableOpacity>
                            </HeaderTitleInlineRowContainer>
                    }
                    <TouchableOpacity onPress={() => { }}>
                        <HeaderTitleOrderIcon source={require("../../assets/images/c2c/order.png")} />
                    </TouchableOpacity>
                </HeaderTitleContainer>
                {
                    swapBuyCurrencyType === 'USDT' &&
                    <HeaderCurrencyPageContainer>
                        <HeaderCurrencyButtonClicked onPress={() => { setSwapBuyCurrencyType('USDT') }}>
                            <HeaderCurrencyButtonTextClicked>USDT</HeaderCurrencyButtonTextClicked>
                        </HeaderCurrencyButtonClicked>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('BTC') }}>
                            <HeaderCurrencyButtonText>BTC</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('ETH') }}>
                            <HeaderCurrencyButtonText>ETH</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('DOGE') }}>
                            <HeaderCurrencyButtonText>DOGE</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                    </HeaderCurrencyPageContainer>
                }
                {
                    swapBuyCurrencyType === 'BTC' &&
                    <HeaderCurrencyPageContainer>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('USDT') }}>
                            <HeaderCurrencyButtonText>USDT</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButtonClicked onPress={() => { setSwapBuyCurrencyType('BTC') }}>
                            <HeaderCurrencyButtonTextClicked>BTC</HeaderCurrencyButtonTextClicked>
                        </HeaderCurrencyButtonClicked>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('ETH') }}>
                            <HeaderCurrencyButtonText>ETH</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('DOGE') }}>
                            <HeaderCurrencyButtonText>DOGE</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                    </HeaderCurrencyPageContainer>
                }
                {
                    swapBuyCurrencyType === 'ETH' &&
                    <HeaderCurrencyPageContainer>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('USDT') }}>
                            <HeaderCurrencyButtonText>USDT</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('BTC') }}>
                            <HeaderCurrencyButtonText>BTC</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButtonClicked onPress={() => { setSwapBuyCurrencyType('ETH') }}>
                            <HeaderCurrencyButtonTextClicked>ETH</HeaderCurrencyButtonTextClicked>
                        </HeaderCurrencyButtonClicked>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('DOGE') }}>
                            <HeaderCurrencyButtonText>DOGE</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                    </HeaderCurrencyPageContainer>
                }
                {
                    swapBuyCurrencyType === 'DOGE' &&
                    <HeaderCurrencyPageContainer>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('USDT') }}>
                            <HeaderCurrencyButtonText>USDT</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('BTC') }}>
                            <HeaderCurrencyButtonText>BTC</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButton onPress={() => { setSwapBuyCurrencyType('ETH') }}>
                            <HeaderCurrencyButtonText>ETH</HeaderCurrencyButtonText>
                        </HeaderCurrencyButton>
                        <HeaderCurrencyButtonClicked onPress={() => { setSwapBuyCurrencyType('DOGE') }}>
                            <HeaderCurrencyButtonTextClicked>DOGE</HeaderCurrencyButtonTextClicked>
                        </HeaderCurrencyButtonClicked>
                    </HeaderCurrencyPageContainer>
                }
            </HeaderContainer>
        </Container>
    )
}

export default C2cScreen