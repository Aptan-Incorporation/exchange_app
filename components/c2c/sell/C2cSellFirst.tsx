import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, Dimensions, Pressable, Alert } from "react-native"
import { Feather } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import Modal from "react-native-modal";
import styled from "styled-components"
import { useState } from "react";
import axios from "axios"
import api from "../../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Top Container
const TopContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
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
color: ${props => props.theme.color.SecondaryLight};
`;

const TopDetailCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.SecondaryLight};
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
width: 90%;
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
width: 10%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
`;

const TopInputCurrencyTextContainer = styled(View)`
flex-direction: row;
height: 46px;
width: 18%;
background-color: #242D37;
justify-content: flex-end;
align-items: center;
padding-right: 8px;
`;

const TopInputCurrencyText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const TopInputAllButtonContainer = styled(View)`
height: 46px;
width: 12%;
font-weight: 500;
font-size: 14px;
line-height: 22px;
background-color: #242D37;
justify-content: center;
align-items: center;

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
margin-bottom: 25px;
`;

const TopBuyButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;


// BottomStyle
const BottomDetailContainer = styled(View)`
display: flex;
flex-direction: column;
background-color: #18222D;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 200px;
`;

const BottomDetailTopContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const BottomDetailPayTypeContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 12px;
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

const BottomDetailSmallTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.MidGray};
margin-top: 16px;
`;

const BottomDetailSmallValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
margin-top: 8px;
`;

const PayTypeView = styled(View)`
width: 53px;
height: 24px;
background-color: ${props => props.theme.color.DarkGray};
align-items: center;
justify-content: center;
margin-right: 12px;
`;

const PayTypeTouchnGoView = styled(View)`
width: 78px;
height: 24px;
background-color: ${props => props.theme.color.DarkGray};
align-items: center;
justify-content: center;
margin-right: 12px;
`;

const PayTypeViewText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.LightMidGray};
`;

const BottomDetailLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-top: 16px;
`;

// Modal Style
const ModalContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const ModalHeaderText = styled(Text)`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.White};
`;

const ModalHeaderDetailText = styled(Text)`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: ${props => props.theme.color.LightGray};
margin-top: 8px;
`;

const ModalRowLine = styled(View)`
height: 1px;
width: 100%;
background-color: #3B393E;
margin-top: 16px;
`;

const ModalButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-right: 16px;
padding-left: 16px;
`;

const ModalCancelButton = styled(TouchableOpacity)`
height: 43px;
width: 45%;
border-bottom-left-radius: 18px;
justify-content: center;
align-items: center;
`;

const ModalCancelButtonText = styled(Text)`
font-weight: 400;
font-size: 16px;
line-height: 20px;
color: #98999A;
`;

const ModalButtonLine = styled(View)`
height: 43px;
width: 1px;
background-color: #3B393E;
`;

const ModalSubmitButton = styled(TouchableOpacity)`
height: 43px;
width: 45%;
border-bottom-right-radius: 18px;
justify-content: center;
align-items: center;
`;

const ModalSubmitButtonText = styled(Text)`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: #0A84FF;
`;


const C2cSellFirst = (props: {
    Id?: string;
    Owner: string;
    Account: string;
    CurrencyType: string;
    FiatCurrency: string;
    SuccessRate: number;
    AvailableNum: string;
    LimitFrom: string;
    LimitTo: string;
    Price: string;
    //PayTypeAccount: boolean;
    //PayTypeTouchnGo: boolean;
    //PayTypePpay: boolean;
    Payments: any[];
    PaymentTimeLimit: number;
    onValueChangeInputAmount: React.Dispatch<React.SetStateAction<string>>;
    onValueChangeInputNumber: React.Dispatch<React.SetStateAction<string>>;
    onChangeSetSwapPage: React.Dispatch<React.SetStateAction<number>>;
    onValueChangeSetBuyId: React.Dispatch<React.SetStateAction<string>>;
    onValueChangeSetBuyTime: React.Dispatch<React.SetStateAction<number>>;
    onValueChangeIsWaitFinish: React.Dispatch<React.SetStateAction<number>>;
    onValueChangePayTimeLimit: React.Dispatch<React.SetStateAction<number>>;
    setOrderId: React.Dispatch<React.SetStateAction<string>>;
    Terms: string;
}) => {

    const {
        Id,
        Account,
        CurrencyType,
        FiatCurrency,
        SuccessRate,
        AvailableNum,
        LimitFrom,
        LimitTo,
        Price,
        //PayTypeAccount,
        //PayTypeTouchnGo,
        //PayTypePpay,
        Payments,
        PaymentTimeLimit,
        onChangeSetSwapPage,
        onValueChangeInputAmount,
        onValueChangeInputNumber,
        onValueChangeSetBuyId,
        onValueChangeSetBuyTime,
        onValueChangeIsWaitFinish,
        onValueChangePayTimeLimit,
        setOrderId,
        Terms
    } = props;

    // Input Price
    const [inputAmount, setInputAmount] = useState("");

    // Input Number
    const [inputNumber, setInputNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const handleOnChangeAllAmount = () => {
        setInputAmount((parseFloat(LimitTo)).toFixed(2));
        setInputNumber("");
    };

    const handleOnChangeAllNumber = () => {
        let num = ((parseFloat(LimitTo) / parseFloat(Price))).toString()
        let index = (num).indexOf('.')
        let slice = num.slice(0, index + 3)
        if ((parseFloat(slice)) <= (parseFloat(AvailableNum))) {
            setInputNumber(slice)
        } else {
            setInputNumber((parseFloat(AvailableNum)).toFixed(2))
        }
        setInputAmount("")
    };

    const handleOnChangeExchange = () => {
        if (inputAmount == "" && inputNumber == "") {
            setInputAmount((parseFloat(LimitTo)).toFixed(2));
            setInputNumber("");
        } else if (inputAmount == "") {
            setInputAmount((parseFloat(inputNumber) * parseFloat(Price)).toFixed(2))
            setInputNumber("")
        } else if (inputNumber == "") {
            setInputNumber((parseFloat(inputAmount) / parseFloat(Price)).toFixed(2))
            setInputAmount("")
        }
    };


    // 資金密碼Modal
    /* const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalVisible = () => {
        if (((parseFloat(inputPrice) / parseFloat(Price)).toFixed(2)) == parseFloat(inputNumber).toFixed(2) && (parseFloat(inputPrice) <= parseFloat(MyCurrency))) {
            setIsModalVisible(!isModalVisible);
        }
    };
    const [checkPassword, setCheckPassword] = useState(false);
    const [password, setPassword] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    // 檢查資金密碼
    const postPasswordCheck = () => {
        api.postData(`/auth/login`, {
            account: Account,
            password: password
        })
            .then((x) => {
                if (x.status != 400 && x.status != 401) {
                    if (x.status === 'OK') {
                        setCheckPassword(true)
                    } else {
                        Alert.alert("密碼錯誤請重新輸入")
                    }
                }
                else {
                    Alert.alert("系統異常，請重新操作")
                }
            })
    }; */

    // 送出訂單
    const firstPostReturn = () => {
        setLoading(true)
        api.postData(`/otc/api/advertisement/${Id}/otcOrder/`, {
            price: Price,
            quantity: (inputNumber == "" ? null : inputNumber),
            amount: (inputAmount == "" ? null : inputAmount),
            payments: Payments // 出售必填
        })
            .then((x) => {
                setLoading(false)
                // console.log(x)
                if (x.status != 400 && x.status != 401 && x.status != 500) {
                    onValueChangeSetBuyId(x.id)
                    setOrderId(x.id)
                    onValueChangeSetBuyTime(x.createdDate)
                    onValueChangeIsWaitFinish(x.status)
                    onValueChangePayTimeLimit(x.paymentTimeLimit)
                    onValueChangeInputAmount((x.amount).toFixed(2))
                    onValueChangeInputNumber((x.quantity).toFixed(2))
                    onChangeSetSwapPage(2)
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch((Error) => {
                // console.log(Error)
            })
    };

    // Buy Button
    const handleBuyButton = () => {
        /* if (((parseFloat(inputPrice) / parseFloat(Price)).toFixed(2)) == parseFloat(inputNumber).toFixed(2) && (parseFloat(inputPrice) <= parseFloat(MyCurrency))) {
            toggleModalVisible()

        } */
        handleSubmitForm()
    }


    // Submit Form
    const handleSubmitForm = () => {

        /* postPasswordCheck();

        if (checkPassword === true) {

            setIsModalVisible(false)
            firstPostReturn()

        } */

        firstPostReturn()
    };


    return (
        <View style={{ backgroundColor: '#131B24' }}>
            {
                loading &&
                <Spinner visible={true} textContent={t("loading")} color={'#FFFFFF'} textStyle={{ color: '#FFFFFF' }} />
            }
            <TopContainer>
                <TopDetailContainer>
                    <TopDetailPriceRowContainer>
                        <TopDetailTitleText>{t("unitPrice")}</TopDetailTitleText>
                        <TopDetailPriceText>{Price}</TopDetailPriceText>
                        <TopDetailCurrencyText>{FiatCurrency}</TopDetailCurrencyText>
                    </TopDetailPriceRowContainer>
                    <TopDetailRowContainer>
                        <TopDetailTitleText>{t("amount")}</TopDetailTitleText>
                        <TopDetailValueText>{AvailableNum} {CurrencyType}</TopDetailValueText>
                    </TopDetailRowContainer>
                    <TopDetailRowContainer>
                        <TopDetailTitleText>{t("limitedAmount")}</TopDetailTitleText>
                        <TopDetailValueText>{LimitFrom} - {LimitTo} {FiatCurrency}</TopDetailValueText>
                    </TopDetailRowContainer>
                </TopDetailContainer>
                <TopInputContainer>
                    <TopInputLeftContainer>
                        <TopInputLeftRowContainer>
                            <TextInput
                                placeholder={t("fiatSellAmount")} 
                                value={inputAmount}
                                onChangeText={inputAmount => setInputAmount(inputAmount)}
                                placeholderTextColor={'#8D97A2'}
                                autoCorrect={false}
                                keyboardType={"number-pad"}
                                style={{ backgroundColor: '#242D37', width: '70%', height: 46, color: '#F4F5F6', borderTopLeftRadius: 4, paddingLeft: 16, paddingTop: 15, paddingBottom: 15 }}
                            />
                            <TopInputCurrencyTextContainer>
                                <TopInputCurrencyText>{FiatCurrency}</TopInputCurrencyText>
                            </TopInputCurrencyTextContainer>
                            <TopInputAllButtonContainer>
                                <TouchableOpacity onPress={() => { handleOnChangeAllAmount() }}>
                                    <TopInputAllButtonText>{t("fiatAll")} </TopInputAllButtonText>
                                </TouchableOpacity>
                            </TopInputAllButtonContainer>
                        </TopInputLeftRowContainer>
                        <TopInputLeftRowContainer>
                            <TextInput
                                placeholder={t("fiatSellQty")}  
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
                            <TopInputAllButtonContainer>
                                <TouchableOpacity onPress={() => { handleOnChangeAllNumber() }}>
                                    <TopInputAllButtonText>{t("fiatAll")} </TopInputAllButtonText>
                                </TouchableOpacity>
                            </TopInputAllButtonContainer>
                        </TopInputLeftRowContainer>
                    </TopInputLeftContainer>
                    <TopInputRightContainer>
                        <TouchableOpacity onPress={() => { handleOnChangeExchange() }}>
                            <TopInputSwapIcon source={require("../../../assets/images/c2c/swap.png")} />
                        </TouchableOpacity>
                    </TopInputRightContainer>
                </TopInputContainer>
                <TopBuyButton onPress={() => { handleBuyButton() }}>
                    <TopBuyButtonText>出售</TopBuyButtonText>
                </TopBuyButton>
            </TopContainer>
            <BottomDetailContainer>
                <BottomDetailTopContainer>
                    <PhotoButton onPress={() => { }}>
                        <PhotoButtonText>{Account.charAt(0).toUpperCase()}</PhotoButtonText>
                    </PhotoButton>
                    <EmailText>{Account}</EmailText>
                    {/* <SuccessRateText>({SuccessRate})%</SuccessRateText> */}
                </BottomDetailTopContainer>
                {/* <BottomDetailSmallTitleText>收款方式</BottomDetailSmallTitleText>
                <BottomDetailPayTypeContainer>
                    {
                        PayTypeAccount == true &&
                        <PayTypeView>
                            <PayTypeViewText>銀行卡</PayTypeViewText>
                        </PayTypeView>
                    }
                    {
                        PayTypeTouchnGo == true &&
                        <PayTypeTouchnGoView>
                            <PayTypeViewText>Touch’n Go</PayTypeViewText>
                        </PayTypeTouchnGoView>
                    }
                    {
                        PayTypePpay == true &&
                        <PayTypeView>
                            <PayTypeViewText>Ppay</PayTypeViewText>
                        </PayTypeView>
                    }
                </BottomDetailPayTypeContainer>
                <BottomDetailLine></BottomDetailLine> */}
                <BottomDetailSmallTitleText>{t("limitedTime")}</BottomDetailSmallTitleText>
                <BottomDetailSmallValueText>{PaymentTimeLimit / 60000}分鐘</BottomDetailSmallValueText>
                <BottomDetailLine></BottomDetailLine>
                <BottomDetailSmallTitleText>{t("fiatMemo")}</BottomDetailSmallTitleText>
             <BottomDetailSmallValueText>{Terms}</BottomDetailSmallValueText>
            </BottomDetailContainer>

            {/* // Modal */}
            {/* <Modal
                isVisible={isModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.9}
                onBackdropPress={() => setIsModalVisible(false)}
                onSwipeComplete={() => setIsModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'center', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{
                    backgroundColor: 'rgba(40, 39, 42, 1)',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                    marginLeft: 53,
                    marginRight: 53,
                }}>
                    <ModalContainer>
                        <ModalHeaderText>輸入資金密碼</ModalHeaderText>
                        <ModalHeaderDetailText>{t("sellingEnterPass")}</ModalHeaderDetailText>

                        <View style={{
                            height: 32,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 14,
                            marginLeft: 16,
                            marginRight: 16,
                            paddingLeft: 12,
                            paddingRight: 12,
                            borderWidth: 1,
                            borderColor: '#3B393E',
                            borderRadius: 4,
                            alignItems: 'center',
                        }}>
                            <TextInput
                                style={{ width: '90%', color: '#FFFFFF' }}
                                placeholder="輸入資金密碼"
                                placeholderTextColor={'#98999A'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                secureTextEntry={passwordVisibility}
                                value={password}
                                enablesReturnKeyAutomatically
                                onChangeText={text => setPassword(text)}
                            />
                            <Pressable onPress={handlePasswordVisibility}>
                                <Feather name={rightIcon} size={16} color="#DBDCDD" />
                            </Pressable>
                        </View>
                    </ModalContainer>
                    <ModalRowLine></ModalRowLine>
                    <ModalButtonContainer>
                        <ModalCancelButton onPress={() => { setIsModalVisible(false) }}>
                            <ModalCancelButtonText>取消</ModalCancelButtonText>
                        </ModalCancelButton>
                        <ModalButtonLine />
                        <ModalSubmitButton onPress={() => { handleSubmitForm() }}>
                            <ModalSubmitButtonText>確定</ModalSubmitButtonText>
                        </ModalSubmitButton>
                    </ModalButtonContainer>
                </View>
            </Modal> */}
        </View>
    )
}

export default C2cSellFirst