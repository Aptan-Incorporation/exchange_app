import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, InputAccessoryView } from "react-native"
import styled from "styled-components"
import { useState } from "react";


const Container = styled(View)`
display: flex;
flex-direction: column;
background-color: #18222D;
padding-left: 16px;
padding-right: 16px;
`;


// First Card Style
const FirstCardContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-right: 16px;
padding-left: 16px;
padding-bottom: 20px;
background-color: #242D37;
border-radius: 8px;
`;

const FirstCardRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
margin-top: 8px;
`;

const FirstCardFirstRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
`;

const FirstCardFirstInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: baseline;
`;

const FirstCardTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
`;

const FirstCardPriceText = styled(Text)`
font-weight: 700;
font-size: 24px;
line-height: 30px;
color: ${props => props.theme.color.Secondary};
padding-right: 4px;
`;

const FirstCardPriceCurrencyText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const FirstCardValueText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.ExtraLightGray};
`;


// Second Card Style
const SecondCardContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-right: 16px;
padding-left: 16px;
padding-bottom: 20px;
background-color: #242D37;
border-radius: 8px;
margin-top: 16px;
`;

const SecondCardTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const SecondCardDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 8px;
`;

const SecondCardPayTypeRowContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 24px;
margin-bottom: 12px;
`;

const BankAccountButtonClicked = styled(TouchableOpacity)`
width: 67px;
height: 32px;
background-color: ${props => props.theme.color.PrimaryDark};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const BankAccountButton = styled(TouchableOpacity)`
width: 67px;
height: 32px;
background-color: ${props => props.theme.color.DarkGray};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const TouchnGoButtonClicked = styled(TouchableOpacity)`
width: 104px;
height: 32px;
background-color: ${props => props.theme.color.PrimaryDark};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const TouchnGoButton = styled(TouchableOpacity)`
width: 104px;
height: 32px;
background-color: ${props => props.theme.color.DarkGray};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const PpayButtonClicked = styled(TouchableOpacity)`
width: 59px;
height: 32px;
background-color: ${props => props.theme.color.PrimaryDark};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const PpayButton = styled(TouchableOpacity)`
width: 59px;
height: 32px;
background-color: ${props => props.theme.color.DarkGray};
justify-content: center;
align-items: center;
border-radius: 16px;
margin-right: 8px;
`;

const PayTypeButtonClickedText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const PayTypeButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.MidGray};
`;

const PayBottomContainer = styled(View)``;

const SecondCardPayDetailContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: 8px;
`;

const SecondCardPayDetailInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const SecondCardPayDetailTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
`;

const SecondCardPayDetailValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const DuplicateIcon = styled(Image)`
width: 18px;
height: 18px;
`;

const QRCodeText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.PrimaryLight};
`;



// Array

const PayAccountArray = {
    name: '劉以彤',
    bank: '807 永豐銀行',
    account: '0000194612644252'
};

const PayTouchnGoArray = {
    name: '劉以彤',
    account: '938712386',
    qrcode: ''
}

const PpayArray = {
    name: '劉以彤',
    account: '938712386',
    qrcode: ''
}


const C2cBuySecond = (props: {
    Id?: string;
    MyUSD: string;
    Account: string;
    CurrencyType: string;
    SuccessRate: number;
    AvailableNum: string;
    LimitFrom: string;
    LimitTo: string;
    Price: string;
    PayTypeAccount: boolean;
    PayTypeTouchnGo: boolean;
    PayTypePpay: boolean;
    BuyPrice: string;
    BuyNumber: string;
    onChangeSetSwapPage: React.Dispatch<React.SetStateAction<number>>;
    onChangeSetBuyId: React.Dispatch<React.SetStateAction<string>>;
}) => {

    const {
        Id,
        MyUSD,
        Account,
        CurrencyType,
        SuccessRate,
        AvailableNum,
        LimitFrom,
        LimitTo,
        Price,
        PayTypeAccount,
        PayTypeTouchnGo,
        PayTypePpay,
        BuyPrice,
        BuyNumber,
        onChangeSetSwapPage,
        onChangeSetBuyId
    } = props;

    const getRandom = (x: number) => {
        return (Math.floor(Math.random() * x) + 1).toString();
    };

    //購買單號
    const [buyId, setBuyId] = useState(getRandom(100000000000000));

    //選擇付款方式
    const [choosePayType, setChoosePaytype] = useState("");

    const handleSubmit = () => {
        setChoosePaytype("")
        onChangeSetSwapPage(3)
        onChangeSetBuyId(buyId)
    }

    return (
        <Container>
            <FirstCardContainer>
                <FirstCardFirstRowContainer>
                    <FirstCardTitleText>總價</FirstCardTitleText>
                    <FirstCardFirstInRowContainer>
                        <FirstCardPriceText>{BuyPrice}</FirstCardPriceText>
                        <FirstCardPriceCurrencyText>USD</FirstCardPriceCurrencyText>
                    </FirstCardFirstInRowContainer>
                </FirstCardFirstRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>數量</FirstCardTitleText>
                    <FirstCardValueText>{BuyNumber} {CurrencyType}</FirstCardValueText>
                </FirstCardRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>單價</FirstCardTitleText>
                    <FirstCardValueText>{Price} USD</FirstCardValueText>
                </FirstCardRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>單號</FirstCardTitleText>
                    <FirstCardValueText>{buyId}</FirstCardValueText>
                </FirstCardRowContainer>
            </FirstCardContainer>
            <SecondCardContainer>
                <SecondCardTitleText>付款方式</SecondCardTitleText>
                <SecondCardDetailText>以下為賣方的收款資訊，請您務必使用本人名下的支付方式自行轉帳，戶名需對應至您驗證帳號身份的姓名，平台並不會自動為您轉帳。</SecondCardDetailText>
                <SecondCardPayTypeRowContainer>
                    {
                        PayTypeAccount == true &&
                            choosePayType === 'Account' ?
                            <BankAccountButtonClicked onPress={() => { setChoosePaytype('Account') }}>
                                <PayTypeButtonClickedText>銀行卡</PayTypeButtonClickedText>
                            </BankAccountButtonClicked> :
                            <BankAccountButton onPress={() => { setChoosePaytype('Account') }}>
                                <PayTypeButtonText>銀行卡</PayTypeButtonText>
                            </BankAccountButton>
                    }
                    {
                        PayTypeTouchnGo == true && // 壞掉
                            choosePayType === 'TouchnGo' ?
                            <TouchnGoButtonClicked onPress={() => { setChoosePaytype('TouchnGo') }}>
                                <PayTypeButtonClickedText>Touch'n Go</PayTypeButtonClickedText>
                            </TouchnGoButtonClicked> :
                            <TouchnGoButton onPress={() => { setChoosePaytype('TouchnGo') }}>
                                <PayTypeButtonText>Touch'n Go</PayTypeButtonText>
                            </TouchnGoButton>
                    }
                    {
                        PayTypePpay == true && // 壞掉
                            choosePayType === 'Ppay' ?
                            <PpayButtonClicked onPress={() => { setChoosePaytype('Ppay') }}>
                                <PayTypeButtonClickedText>Ppay</PayTypeButtonClickedText>
                            </PpayButtonClicked> :
                            <PpayButton onPress={() => { setChoosePaytype('Ppay') }}>
                                <PayTypeButtonText>Ppay</PayTypeButtonText>
                            </PpayButton>
                    }
                </SecondCardPayTypeRowContainer>
                {
                    choosePayType === 'Account' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayAccountArray.name}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>銀行名稱</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayAccountArray.bank}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>銀行帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayAccountArray.account}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
                {
                    choosePayType === 'TouchnGo' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayTouchnGoArray.name}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayTouchnGoArray.account}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>二維碼</SecondCardPayDetailTitleText>
                            <TouchableOpacity onPress={() => { }}>
                                <QRCodeText>查看</QRCodeText>
                            </TouchableOpacity>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
                {
                    choosePayType === 'Ppay' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PpayArray.name}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PpayArray.account}</SecondCardPayDetailValueText>
                                <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>二維碼</SecondCardPayDetailTitleText>
                            <TouchableOpacity onPress={() => { }}>
                                <QRCodeText>查看</QRCodeText>
                            </TouchableOpacity>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
            </SecondCardContainer>
        </Container>
    )
}

export default C2cBuySecond