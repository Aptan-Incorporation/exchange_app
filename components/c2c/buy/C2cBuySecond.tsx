import * as React from "react"
import { Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from "react-native"
import Modal from "react-native-modal";
import styled from "styled-components"
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Container = styled(ScrollView)`
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

const BottomButtonContainer = styled(View)`
display: flex;
flex-direction: row
justify-content: space-between;
margin-top: 37px;
padding-bottom: 200px;
`;

const CancelButton = styled(TouchableOpacity)`
width: 25%;
height: 44px;
justify-content: center;
align-items: center;
border: 1px solid ${props => props.theme.color.Primary};
border-radius: 4px;
`;

const CancelButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.Primary};
`;

const SubmitButton = styled(TouchableOpacity)`
height: 44px;
width: 70%;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
border-radius: 4px;
`;

const SubmitButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;


// Modal Style
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
line-height: 24px
color: ${props => props.theme.color.White};
`;

const ModalLeftCancelButton = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalEmptyDiv = styled(View)`
width: 28px;
height: 28px;
`;

const QRCodeContainer = styled(View)`
width: 224px;
height: 224px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.White};
`;

const QRCodeImage = styled(Image)`
width: 137px;
height: 137px;
`;

const ModalDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
margin-top: 24px;

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

const TouchnGoQRCode = '../../../assets/images/c2c/qrcode.png'

const PpayQRCode = '../../../assets/images/c2c/qrcode.png'


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
    onChangeSetChoosePayType: React.Dispatch<React.SetStateAction<string>>;
    onChangeISWaitFinish: React.Dispatch<React.SetStateAction<boolean>>;
    onValueChangeSetBuyTime: React.Dispatch<React.SetStateAction<string>>;
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
        onChangeSetBuyId,
        onChangeSetChoosePayType,
        onChangeISWaitFinish,
        onValueChangeSetBuyTime
    } = props;

    const getRandom = (x: number) => {
        return (Math.floor(Math.random() * x) + 1).toString();
    };

    //購買單號
    const [buyId, setBuyId] = useState(getRandom(100000000000000));

    //選擇付款方式
    const [choosePayType, setChoosePaytype] = useState("");

    // QRCode Modal
    const [isQRCodeModalVisible, setIsQRCodeModalVisible] = useState(false);

    const toggleQRCodeModal = () => {
        setIsQRCodeModalVisible(!isQRCodeModalVisible);
    };

    // 設置訂單日期
    const returnBuyTime = () => {
        let v = new Date();
        return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()} ${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
    }

    // 取消訂單

    const navigation = useNavigation();

    const cancelAlert = () =>
        Alert.alert(
            "確定取消訂單？",
            "惡意取消訂單若達到 3 次或更多，您帳戶的部分功能將暫時禁用。",
            [
                {
                    text: "取消",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "確定", onPress: () => { navigation.goBack() } }
            ]
        );



    // 送出訂單，下一步

    const [submitText, setSubmitText] = useState('已付款，下一步');

    const handleSubmitAlert = () => {
        if (choosePayType != "") {
            setSubmitText('放行中...')
            onChangeISWaitFinish(true);
            onChangeSetChoosePayType(choosePayType);
            onChangeSetBuyId(buyId);
            onValueChangeSetBuyTime(returnBuyTime());
            setTimeout(() => { handleSubmit() }, 5000)
        }
    };

    const SubmitAlert = () => {
        if (choosePayType != "") {
            Alert.alert(
                "已完成付款？",
                "請確定您已向賣方完成付款，惡意點擊系統將直接凍結您的賬戶。",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "確定", onPress: () => { handleSubmitAlert() } }
                ]
            );
        }
    };



    const handleButtonDisabled = () => {
        if (submitText === '已付款，下一步') {
            return false;
        } else {
            return true;
        }
    };


    const handleSubmitButtonStyle = () => {
        if (submitText === '放行中...') {
            return 'rgba(102, 153, 204, 0.3)';
        } else {
            return '#3D6A97';
        }
    };


    const handleSubmitButtonTextStyle = () => {
        if (submitText === '放行中...') {
            return 'rgba(255, 255, 255, 0.3)';
        } else {
            return '#FFFFFF';
        }
    };

    const handleCancelButtonStyle = () => {
        if (submitText === '放行中...') {
            return 'rgba(102, 153, 204, 0.3)';
        } else {
            return '#6699CC';
        }
    };

    const handleCancelButtonTextStyle = () => {
        if (submitText === '放行中...') {
            return 'rgba(102, 153, 204, 0.3)';
        } else {
            return '#6699CC';
        }
    };

    const handleSubmit = () => {
        if (choosePayType != "") {
            onChangeSetSwapPage(3);
        }
    };





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
                        PayTypeAccount &&
                        (choosePayType == 'Account' ?
                            <BankAccountButtonClicked onPress={() => { setChoosePaytype('Account') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonClickedText>銀行卡</PayTypeButtonClickedText>
                            </BankAccountButtonClicked> :
                            <BankAccountButton onPress={() => { setChoosePaytype('Account') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonText>銀行卡</PayTypeButtonText>
                            </BankAccountButton>)
                    }
                    {
                        PayTypeTouchnGo &&
                        (choosePayType == 'TouchnGo' ?
                            <TouchnGoButtonClicked onPress={() => { setChoosePaytype('TouchnGo') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonClickedText>Touch'n Go</PayTypeButtonClickedText>
                            </TouchnGoButtonClicked> :
                            <TouchnGoButton onPress={() => { setChoosePaytype('TouchnGo') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonText>Touch'n Go</PayTypeButtonText>
                            </TouchnGoButton>)
                    }
                    {
                        PayTypePpay &&
                        (choosePayType == 'Ppay' ?
                            <PpayButtonClicked onPress={() => { setChoosePaytype('Ppay') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonClickedText>Ppay</PayTypeButtonClickedText>
                            </PpayButtonClicked> :
                            <PpayButton onPress={() => { setChoosePaytype('Ppay') }} disabled={handleButtonDisabled()}>
                                <PayTypeButtonText>Ppay</PayTypeButtonText>
                            </PpayButton>)
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
                            <TouchableOpacity onPress={() => { toggleQRCodeModal() }}>
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
                            <TouchableOpacity onPress={() => { toggleQRCodeModal() }}>
                                <QRCodeText>查看</QRCodeText>
                            </TouchableOpacity>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
            </SecondCardContainer>
            <BottomButtonContainer>
                <CancelButton onPress={() => { cancelAlert() }} disabled={handleButtonDisabled()} style={{ borderColor: handleCancelButtonStyle() }}>
                    <CancelButtonText style={{ color: handleCancelButtonTextStyle() }}>取消訂單</CancelButtonText>
                </CancelButton>
                <SubmitButton onPress={() => { SubmitAlert() }} disabled={handleButtonDisabled()} style={{ backgroundColor: handleSubmitButtonStyle() }}>
                    <SubmitButtonText style={{ color: handleSubmitButtonTextStyle() }}>{submitText}</SubmitButtonText>
                </SubmitButton>
            </BottomButtonContainer>

            <Modal
                isVisible={isQRCodeModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsQRCodeModalVisible(false)}
                onSwipeComplete={() => setIsQRCodeModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <TouchableOpacity onPress={() => { setIsQRCodeModalVisible(false) }}>
                            <ModalLeftCancelButton source={require("../../../assets/images/trade/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHedaerTitleText>二維碼</ModalHedaerTitleText>
                        <ModalEmptyDiv></ModalEmptyDiv>
                    </ModalHeaderContainer>

                    {
                        choosePayType === 'TouchnGo' &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <QRCodeContainer>
                                <QRCodeImage source={require(TouchnGoQRCode)} />
                            </QRCodeContainer>
                            <ModalDetailText>Touch’n Go 用戶掃描此行動條碼後，即可進行付款。</ModalDetailText>
                        </View>
                    }
                    {
                        choosePayType === 'Ppay' &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <QRCodeContainer>
                                <QRCodeImage source={require(PpayQRCode)} />
                            </QRCodeContainer>
                            <ModalDetailText>Ppay 用戶掃描此行動條碼後，即可進行付款。</ModalDetailText>
                        </View>
                    }

                </View>
            </Modal>

        </Container>
    )
}

export default C2cBuySecond