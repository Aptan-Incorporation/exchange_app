import * as React from "react"
import { Text, View, ScrollView, Image, TouchableOpacity, Dimensions, Alert } from "react-native"
import Modal from "react-native-modal";
import styled from "styled-components"
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "axios"
import api from "../../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from "react-i18next";

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
align-items: center;
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

const SecondCardPaymentContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const SecondCardPayTypeRowContainer = styled(ScrollView)`
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
    Account: string;
    Owner: string;
    CurrencyType: string;
    FiatCurrency: string;
    SuccessRate: number;
    AvailableNum: string;
    LimitFrom: string;
    LimitTo: string;
    Price: string;
    PayTypeAccount: boolean;
    PayTypeTouchnGo: boolean;
    PayTypePpay: boolean;
    BuyAmount: string;
    BuyNumber: string;
    BuyTime: number;
    BuyId: string,
    IsWaitFinish: number;
    onChangeSetSwapPage: React.Dispatch<React.SetStateAction<number>>;
    onChangeSetChoosePayType: React.Dispatch<React.SetStateAction<string>>;
    onValueChangeIsWaitFinish: React.Dispatch<React.SetStateAction<number>>;
    status: number;

}) => {

    const {
        Id,
        Account,
        Owner,
        CurrencyType,
        FiatCurrency,
        SuccessRate,
        AvailableNum,
        LimitFrom,
        LimitTo,
        Price,
        PayTypeAccount,
        PayTypeTouchnGo,
        PayTypePpay,
        BuyAmount,
        BuyNumber,
        BuyTime,
        BuyId,
        IsWaitFinish,
        onChangeSetSwapPage,
        onChangeSetChoosePayType,
        onValueChangeIsWaitFinish,
        status
    } = props;

    //選擇付款方式
    const [choosePayType, setChoosePaytype] = useState("");
    const [choosePayTypeID, setChoosePayTypeID] = useState("");

    //付款資料
    const [accountDetail, setAccountDetail] = useState<any[]>([]);
    const [touchnGoDetail, setTouchnGoDetail] = useState<any[]>([]);
    const [pPayDetail, setPpayDetail] = useState<any[]>([]);


    // QRCode Modal
    const [isQRCodeModalVisible, setIsQRCodeModalVisible] = useState(false);
    const [status2, setStatus2] = useState(0);

    const toggleQRCodeModal = () => {
        setIsQRCodeModalVisible(!isQRCodeModalVisible);
    };

    // 取消訂單

    const navigation = useNavigation();
    const { t } = useTranslation();
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
                { text: "確定", onPress: () => { postCancelRequest() } }
            ]
        );

    const postCancelRequest = () => {
        api.postData(`/otc/api/otcOrder/${BuyId}/cancel`)
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    Alert.alert("訂單已取消")
                    navigation.goBack()
                } else {
                    Alert.alert(x.data.msg)
                }
            })
    }

    // 送出訂單，下一步

    const [submitText, setSubmitText] = useState('確認交易');

    const handleSubmitAlert = () => {
        if(status2 === 3){
            api.postData(`/otc/api/otcOrder/${BuyId}/check`)
            .then((x) => {
              console.log(x)
              if(x.status === 400){
                alert(x.data.msg)
              }
            })
        }else{
            if (choosePayType != "") {
                SubmitAlert()
            } else {
                Alert.alert("請選擇付款方式")
            }
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
                    { text: "確定", onPress: () => { postRequestPaid() } }
                ]
            );
        }
    };

    const postRequestPaid = () => { //送出付款訊息
        api.postData(`/otc/api/otcOrder/${BuyId}/paid`, {
            payment: {
                "id": choosePayTypeID
            }
        })
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    setSubmitText('放行中...')
                    onChangeSetChoosePayType(choosePayType);
                    onValueChangeIsWaitFinish(1)
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => { console.log(Error) })
    };


    // 更改Button Style
    const handleButtonDisabled = () => {
        if (submitText === '已付款，下一步' || submitText === '確認交易') {
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
        if (submitText === '等待賣家確認交易') {
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

    // 獲取付款資訊
    const [paymentList, setPaymentList] = useState<any[]>([]);

    const getPaymentsDetail = () => {
        api.get(`/otc/api/otcOrder/${BuyId}/payments/`)
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    setPaymentList(x)
                    x.map((data: any) => {
                        if (data.type === 'BANK') {
                            setAccountDetail(payment => [...payment, data])
                        } else if (data.type === 'TOUCHNGO') {
                            setTouchnGoDetail(payment => [...payment, data])
                        } else if (data.type === 'PPAY') {
                            setPpayDetail(payment => [...payment, data])
                        }
                    })
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => { console.log(Error) })
    };

    // 更新訂單訊息
    const getBuyStatus = () => { // 按下付款後獲取訂單狀態，用以切換頁面
        /*  api.get(`/otc/api/otcOrder/${BuyId}`)
             .then((x => {
                 if (x.status != 400 && x.status != 401) {
                     if (x.status === 1) {
                         onValueChangeIsWaitFinish(1)
                     } else if (x.status === 2) {
                         onValueChangeIsWaitFinish(2)
                         onChangeSetSwapPage(3)
                     } else {
                         Alert.alert("訂單錯誤，請重新操作")
                     }
                 } else {
                     Alert.alert(x.data.msg)
                 }
             })) */
        onValueChangeIsWaitFinish(2)
        onChangeSetSwapPage(3)
    };

    useEffect(() => {
        getPaymentsDetail();
    }, [])

    /* useEffect(() => { // 每10秒更新訂單狀態

        const interval = setInterval(() => {
            if (submitText === '放行中...') {
                getBuyStatus()
            }

        }, 10000);

        return () => clearInterval(interval);
    }); */
    const getStatus = ()=>{
        api
        .get(`/otc/api/otcOrder/${BuyId}`)
        .then((x: any) => {
          if(x.status){
            console.log(x)
            setStatus2(x.status)
          }
        })
        .catch(Error => console.log(Error));
        
       }

    useEffect(() => {
        console.log(status)
        getStatus()
        const interval = setInterval(() => {
            api
              .get(`/otc/api/otcOrder/${BuyId}`)
              .then((x: any) => {
                // console.log(x.status);
                setStatus2(x.status)
      
              })
              .catch(Error => console.log(Error));
          }, 2000);
        if (status2 === 4) {
          setSubmitText("等待賣家確認交易");
        } else if (status2 === 0){
          setSubmitText("已付款，下一步");
        }else if (status2 === 3){
            setSubmitText("確認交易");
        }
        else if (status2 === 1){
            setSubmitText("放行中...");
          }
        if(status2 === 2 ){
            getBuyStatus()
        }
        if(status2 === -1){
            alert(t("fiatOrderCanceled"))
            navigation.goBack()
        }
        if(status2 === -2){
            alert(t("orderApealing"))
            navigation.goBack()
        }

      }, [status,status2]);

    return (
        <Container>
            <FirstCardContainer>
                <FirstCardFirstRowContainer>
                    <FirstCardTitleText>{t("fiatTotal")}</FirstCardTitleText>
                    <FirstCardFirstInRowContainer>
                        <FirstCardPriceText>{BuyAmount}</FirstCardPriceText>
                        <FirstCardPriceCurrencyText>{FiatCurrency}</FirstCardPriceCurrencyText>
                    </FirstCardFirstInRowContainer>
                </FirstCardFirstRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>{t("amount")}</FirstCardTitleText>
                    <FirstCardValueText>{BuyNumber} {CurrencyType}</FirstCardValueText>
                </FirstCardRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>{t("unitPrice")}</FirstCardTitleText>
                    <FirstCardValueText>{Price} {FiatCurrency}</FirstCardValueText>
                </FirstCardRowContainer>
                <FirstCardRowContainer>
                    <FirstCardTitleText>{t("fiatOrderNumber")}</FirstCardTitleText>
                    <View style={{alignItems: 'flex-end'}}>
                        <FirstCardValueText>{BuyId.slice(0, 28)}</FirstCardValueText>
                        <FirstCardValueText>{BuyId.slice(28)}</FirstCardValueText>
                    </View>
                </FirstCardRowContainer>
            </FirstCardContainer>
            <SecondCardContainer>
                <SecondCardTitleText>{t("payments")}</SecondCardTitleText>
                <SecondCardDetailText>{t("fiatPayMsg")}</SecondCardDetailText>
                <SecondCardPayTypeRowContainer horizontal={true}>
                    {
                        (accountDetail.map((x: any) => {
                            if (choosePayType == 'BANK' && choosePayTypeID == x.id) {
                                return (
                                    <BankAccountButtonClicked onPress={() => { setChoosePaytype('BANK'), setChoosePayTypeID("") }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonClickedText>{t("bankCard")}</PayTypeButtonClickedText>
                                    </BankAccountButtonClicked>
                                )
                            } else {
                                return (
                                    <BankAccountButton onPress={() => { setChoosePaytype('BANK'), setChoosePayTypeID(x.id) }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonText>{t("bankCard")}</PayTypeButtonText>
                                    </BankAccountButton>
                                )
                            }
                        }))
                    }
                    {
                        PayTypeTouchnGo &&
                        (touchnGoDetail.map((x: any) => {
                            if (choosePayType == 'TOUCHNGO' && choosePayTypeID == x.id) {
                                return (
                                    <TouchnGoButtonClicked onPress={() => { setChoosePaytype('TOUCHNGO'), setChoosePayTypeID("") }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonClickedText>Touch'n Go</PayTypeButtonClickedText>
                                    </TouchnGoButtonClicked>
                                )
                            } else {
                                return (
                                    <TouchnGoButton onPress={() => { setChoosePaytype('TOUCHNGO'), setChoosePayTypeID(x.id) }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonText>Touch'n Go</PayTypeButtonText>
                                    </TouchnGoButton>
                                )
                            }
                        }))
                    }
                    {
                        PayTypePpay &&
                        (pPayDetail.map((x: any) => {
                            if (choosePayType == 'PPAY' && choosePayTypeID == x.id) {
                                return (
                                    <PpayButtonClicked onPress={() => { setChoosePaytype('PPAY'), setChoosePayTypeID("") }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonClickedText>Ppay</PayTypeButtonClickedText>
                                    </PpayButtonClicked>
                                )
                            } else {
                                return (
                                    <PpayButton onPress={() => { setChoosePaytype('PPAY'), setChoosePayTypeID(x.id) }} disabled={handleButtonDisabled()}>
                                        <PayTypeButtonText>Ppay</PayTypeButtonText>
                                    </PpayButton>
                                )
                            }
                        }))
                    }
                </SecondCardPayTypeRowContainer>
                {
                    choosePayType === 'BANK' &&
                    accountDetail.map((x: any) => {
                        if (x.id === choosePayTypeID) {
                            return (
                                <PayBottomContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>{t("accountName")}</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.name}</SecondCardPayDetailValueText>
                                            <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                                        </SecondCardPayDetailInRowContainer>
                                    </SecondCardPayDetailContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>{t("bankName")}</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.code}</SecondCardPayDetailValueText>
                                            <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                                        </SecondCardPayDetailInRowContainer>
                                    </SecondCardPayDetailContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>{t("accountNum")}</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.account}</SecondCardPayDetailValueText>
                                            <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                                        </SecondCardPayDetailInRowContainer>
                                    </SecondCardPayDetailContainer>
                                </PayBottomContainer>
                            )
                        }
                    })
                }
                {
                    choosePayType === 'TOUCHNGO' &&
                    touchnGoDetail.map((x: any) => {
                        if (x.id === choosePayTypeID) {
                            return (
                                <PayBottomContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.name}</SecondCardPayDetailValueText>
                                            <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                                        </SecondCardPayDetailInRowContainer>
                                    </SecondCardPayDetailContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.account}</SecondCardPayDetailValueText>
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
                            )
                        }
                    })
                }
                {
                    choosePayType === 'PPAY' &&
                    pPayDetail.map((x: any) => {
                        if (x.id === choosePayTypeID) {
                            return (
                                <PayBottomContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.name}</SecondCardPayDetailValueText>
                                            <DuplicateIcon source={require("../../../assets/images/c2c/copy.png")} />
                                        </SecondCardPayDetailInRowContainer>
                                    </SecondCardPayDetailContainer>
                                    <SecondCardPayDetailContainer>
                                        <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                                        <SecondCardPayDetailInRowContainer>
                                            <SecondCardPayDetailValueText>{x.account}</SecondCardPayDetailValueText>
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
                            )
                        }
                    })
                }
            </SecondCardContainer>
            <BottomButtonContainer>
                <CancelButton onPress={() => { cancelAlert() }} style={{ borderColor: handleCancelButtonStyle() }}>
                    <CancelButtonText style={{ color: handleCancelButtonTextStyle() }}>{t("fiatCancelOrder")}</CancelButtonText>
                </CancelButton>
                <SubmitButton onPress={() => { handleSubmitAlert() }} disabled={handleButtonDisabled()} style={{ backgroundColor: handleSubmitButtonStyle() }}>
                    <SubmitButtonText style={{ color: handleSubmitButtonTextStyle() }}>{submitText === "放行中..." ? t("fiatTransfer") :submitText}</SubmitButtonText>
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
                        choosePayType === 'TOUCHNGO' &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <QRCodeContainer>
                                <QRCodeImage source={require(TouchnGoQRCode)} />
                            </QRCodeContainer>
                            <ModalDetailText>Touch’n Go 用戶掃描此行動條碼後，即可進行付款。</ModalDetailText>
                        </View>
                    }
                    {
                        choosePayType === 'PPAY' &&
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