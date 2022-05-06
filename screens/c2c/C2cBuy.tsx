import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
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


// Top Container
const TopContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 24px;
`;

const TopDetailContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const TopDetailPriceRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: baseline;
`;

const TopDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const TopDetailTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
padding-right: 8px;
`;

const TopDetailPriceText = styled(Text)`
font-weight: 700;
font-size: 24px;
line-height: 30px;
color: ${props => props.theme.color.Secondary};
`;

const TopDetailCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.Secondary};
margin-left: 4px;
`;

const TopDetailValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TopInputContainer = styled(View)`
display: flex;
flex-direction: row;
padding-top: 26px;
`;

const TopInputLeftContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 85%;
`;

const TopInputLeftRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const TopInputRightContainer = styled(View)`
background-color: #242D37;
justify-content: center;
align-items: center;
width: 15%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
`;

const TopInputCurrencyTextContainer = styled(View)`
flex-direction: row;
height: 46px;
width: 15%;
background-color: #242D37;
justify-content: flex-end;
align-items: center;
`;

const TopInputCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TopInputAllButton = styled(TouchableOpacity)`
height: 46px;
width: 15%;
font-weight: 500;
font-size: 14px;
line-height: 22px;
background-color: #242D37;
justify-content: center;
align-items: flex-end;
`;

const TopInputAllButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.PrimaryLight};
`;

const TopInputSwapIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const TopBuyButton = styled(TouchableOpacity)`
height: 45px;
border-radius: 4px;
background-color: ${props => props.theme.color.PrimaryDark};
justify-content: center;
align-items: center;
margin-top: 24px;
`;

const TopBuyButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const C2cBuyScreen = ({ navigation, route }: RootStackScreenProps<"C2cBuyScreen">) => {

    const insets = useSafeAreaInsets();

    // Props From Previous Screen
    const { Id } = route.params;
    const { Account } = route.params; // Email
    const { CurrencyType } = route.params; // USDT, BTC..
    const { SuccessRate } = route.params;
    const { AvailableNum } = route.params; // 數量
    const { LimitFrom } = route.params; // 限額
    const { LimitTo } = route.params; // 限額
    const { Price } = route.params; // 單價
    const { payTypeAccount } = route.params; // 帳戶付款 Boolean
    const { payTypeTouchnGo } = route.params; // TouchnGo付款 Boolean
    const { payTypePpay } = route.params; // Ppay付款 Boolean

    // Input Price
    const [inputPrice, setInputPrice] = useState("");

    // Input Number
    const [inputNumber, setInputNumber] = useState("");

    return (
        <Container insets={insets.top}>
            <HeaderContainer>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <PreviousIcon source={require("../../assets/images/global/previous.png")} />
                </TouchableOpacity>
                <HeaderTitleText>購買 {CurrencyType}</HeaderTitleText>
                <HeaderEmptyContainer></HeaderEmptyContainer>
            </HeaderContainer>
            <TopContainer>
                <TopDetailContainer>
                    <TopDetailPriceRowContainer>
                        <TopDetailTitleText>單價</TopDetailTitleText>
                        <TopDetailPriceText>{Price}</TopDetailPriceText>
                        <TopDetailCurrencyText>{CurrencyType}</TopDetailCurrencyText>
                    </TopDetailPriceRowContainer>
                    <TopDetailRowContainer>
                        <TopDetailTitleText>數量</TopDetailTitleText>
                        <TopDetailValueText>{AvailableNum} {CurrencyType}</TopDetailValueText>
                    </TopDetailRowContainer>
                    <TopDetailRowContainer>
                        <TopDetailTitleText>限額</TopDetailTitleText>
                        <TopDetailValueText>{LimitFrom} - {LimitTo} USD</TopDetailValueText>
                    </TopDetailRowContainer>
                </TopDetailContainer>
                <TopInputContainer>
                    <TopInputLeftContainer>
                        <TopInputLeftRowContainer>
                            <TextInput
                                placeholder={"請輸入數量"}
                                value={inputPrice}
                                onChangeText={inputPrice => setInputPrice(inputPrice)}
                                placeholderTextColor={'#8D97A2'}
                                autoCorrect={false}
                                keyboardType={"decimal-pad"}
                                style={{ backgroundColor: '#242D37', width: '70%', height: 46, color: '#F4F5F6', borderTopLeftRadius: 4, paddingLeft: 16, paddingTop: 15, paddingBottom: 15 }}
                            />
                            <TopInputCurrencyTextContainer>
                                <TopInputCurrencyText>USD</TopInputCurrencyText>
                            </TopInputCurrencyTextContainer>
                            <TopInputAllButton onPress={() => { }}>
                                <TopInputAllButtonText>全部</TopInputAllButtonText>
                            </TopInputAllButton>
                        </TopInputLeftRowContainer>
                        <TopInputLeftRowContainer>
                            <TextInput
                                placeholder={"請輸入數量"}
                                value={inputNumber}
                                onChangeText={inputNumber => setInputNumber(inputNumber)}
                                placeholderTextColor={'#8D97A2'}
                                autoCorrect={false}
                                keyboardType={"decimal-pad"}
                                style={{ backgroundColor: '#242D37', width: '70%', height: 46, color: '#F4F5F6', borderBottomLeftRadius: 4, paddingLeft: 16, paddingTop: 15, paddingBottom: 15 }}
                            />
                            <TopInputCurrencyTextContainer>
                                <TopInputCurrencyText>{CurrencyType}</TopInputCurrencyText>
                            </TopInputCurrencyTextContainer>
                            <TopInputAllButton onPress={() => { }}>
                                <TopInputAllButtonText>全部</TopInputAllButtonText>
                            </TopInputAllButton>
                        </TopInputLeftRowContainer>
                    </TopInputLeftContainer>
                    <TopInputRightContainer>
                        <TouchableOpacity onPress={() => { }}>
                            <TopInputSwapIcon source={require("../../assets/images/c2c/swap.png")} />
                        </TouchableOpacity>
                    </TopInputRightContainer>
                </TopInputContainer>
                <TopBuyButton onPress={() => { }}>
                    <TopBuyButtonText>購買</TopBuyButtonText>
                </TopBuyButton>
            </TopContainer>
            
        </Container>
    )

}
export default C2cBuyScreen
