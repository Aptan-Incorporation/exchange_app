import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
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
padding-bottom: 23px;
`;

const HeaderTitleInlineRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100px;
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
display: flex;
flex-direction: row;
justify-content: space-between;
padding-right: 150px;
`;

const HeaderCurrencyButtonClicked = styled(TouchableOpacity)`
height: 30px;
width: 39px;
border-bottom-width: 2px;
border-bottom-color: ${props => props.theme.color.Primary};
justify-content: center;
align-items: center;
`;

const HeaderCurrencyButton = styled(TouchableOpacity)`
height: 30px;
width: 39px;
justify-content: center;
align-items: center;
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


// Detail Container
const DetailContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-left: 16px;
padding-right: 12px;
`;

const DetailCardContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const DeatilCardTopContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const DetailCardMiddleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 12px;
`;

const DetailCardMiddleLeftColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const DetailCardMiddleLeftRowContainer = styled(View)`
display: flex;
flex-direction: row;
`;

const DetailCardMiddleRightRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: baseline;
`;

const DetailCardBottomContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 25px;
`;

const DetailCardBottomRowContainer = styled(View)`
display: flex;
flex-direction: row;
`;

const PhotoButton = styled(TouchableOpacity)`
width: 20px;
height: 20px;
background-color: ${props => props.theme.color.PrimaryLight};
border-radius: 75px;
align-items: center;
justify-content: center;
`;

const PhotoButtonText = styled(Text)`
font-weight: 600;
font-size: 14px;
line-height: 18px;
`;

const EmailText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
padding-left: 12px;
`;

const SuccessRateText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.MidGray};
padding-left: 4px;
`;

const SmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const SmallValueText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.White};
padding-left: 8px;
`;

const BuyPriceText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
padding-right: 4px;
`;

const BuyCurrencyText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const SellPriceText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
`;

const SellCurrencyText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const AccountIcon = styled(Image)`
width: 28px;
height: 28px;
margin-right: 12px;
`;

const TouchnGoIcon = styled(Image)`
width: 28px;
height: 28px;
margin-right: 12px;
`;

const PpayIcon = styled(Image)`
width: 28px;
height: 28px;
margin-right: 12px;
`;

const BuyButton = styled(TouchableOpacity)`
width: 64px;
height: 30px;
background-color: ${props => props.theme.color.Secondary};
border-radius: 4px;
justify-content: center;
align-items: center;
`;

const BuyButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const SellButton = styled(TouchableOpacity)`
width: 64px;
height: 30px;
background-color: ${props => props.theme.color.SecondaryLight};
border-radius: 4px;
justify-content: center;
align-items: center;
`;

const SellButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const DetailCardLine = styled(View)`
height: 1px;
background-color: #18222D;
margin-top: 16px;
margin-bottom: 16px;
`;

const EmptyDiv = styled(View)`
height: 200px;
`;


// Buy Array

// Buy Array USDT
const BuyArrayUSDT = [
    {
        type: 'USDT',
        account: 'loo*****@gmail.com',
        successRate: 88,
        number: '5,415.722041',
        limitFrom: '100.00',
        limitTo: '500.00',
        price: '1.00',
        payType: {
            account: true,
            touchnGo: true,
            ppay: false
        }
    },
    {
        type: 'USDT',
        account: 'bes*****@gmail.com',
        successRate: 100,
        number: '4,192.746299',
        limitFrom: '101.00',
        limitTo: '800.00',
        price: '1.01',
        payType: {
            account: true,
            touchnGo: false,
            ppay: false
        }
    },
    {
        type: 'USDT',
        account: 'mon*****@gmail.com',
        successRate: 71,
        number: '2,973.691232',
        limitFrom: '101.00',
        limitTo: '800.00',
        price: '1.01',
        payType: {
            account: true,
            touchnGo: false,
            ppay: false
        }
    },
    {
        type: 'USDT',
        account: 'hms*****@gmail.com',
        successRate: 98,
        number: '5,100.962615',
        limitFrom: '100.00',
        limitTo: '5,202.00',
        price: '1.02',
        payType: {
            account: false,
            touchnGo: false,
            ppay: true
        }
    }
]


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
            <DetailContainer>
                {
                    swapBuyCurrencyType === 'USDT' &&
                    BuyArrayUSDT.map((x, i) => {
                        return (
                            x.type === 'USDT' &&
                            <DetailCardContainer>
                                <DeatilCardTopContainer>
                                    <PhotoButton onPress={() => { }}>
                                        <PhotoButtonText>{(x.account).charAt(0).toUpperCase()}</PhotoButtonText>
                                    </PhotoButton>
                                    <EmailText>{x.account}</EmailText>
                                    <SuccessRateText>({x.successRate}%)</SuccessRateText>
                                </DeatilCardTopContainer>
                                <DetailCardMiddleContainer>
                                    <DetailCardMiddleLeftColumnContainer>
                                        <DetailCardMiddleLeftRowContainer>
                                            <SmallTitleText>數量</SmallTitleText>
                                            <SmallValueText>{x.number} USDT</SmallValueText>
                                        </DetailCardMiddleLeftRowContainer>
                                        <DetailCardMiddleLeftRowContainer>
                                            <SmallTitleText>限額</SmallTitleText>
                                            <SmallValueText>{x.limitFrom} - {x.limitTo} USD</SmallValueText>
                                        </DetailCardMiddleLeftRowContainer>
                                    </DetailCardMiddleLeftColumnContainer>
                                    <DetailCardMiddleRightRowContainer>
                                        <BuyPriceText>{x.price}</BuyPriceText>
                                        <BuyCurrencyText>USDT</BuyCurrencyText>
                                    </DetailCardMiddleRightRowContainer>
                                </DetailCardMiddleContainer>
                                <DetailCardBottomContainer>
                                    <DetailCardBottomRowContainer>
                                        {
                                            x.payType.account === true &&
                                            <AccountIcon source={require("../../assets/images/c2c/account.png")} />
                                        }
                                        {
                                            x.payType.touchnGo === true &&
                                            <TouchnGoIcon source={require("../../assets/images/c2c/touchn_go.png")} />
                                        }

                                        {
                                            x.payType.ppay === true &&
                                            <PpayIcon source={require("../../assets/images/c2c/p_pay.png")} />
                                        }
                                    </DetailCardBottomRowContainer>
                                    <BuyButton onPress={() => { }}>
                                        <BuyButtonText>購買</BuyButtonText>
                                    </BuyButton>
                                </DetailCardBottomContainer>
                                {
                                    i !== BuyArrayUSDT.length - 1 &&
                                    <DetailCardLine></DetailCardLine>
                                }
                            </DetailCardContainer>
                        )
                    })

                }
                <EmptyDiv></EmptyDiv>
            </DetailContainer>
        </Container>
    )
}

export default C2cScreen