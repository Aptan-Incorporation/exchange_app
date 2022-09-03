import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions, TextInput } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View) <{ insets: number }>`
    display: flex ;
    flex-direction: column;
    padding-top: ${props => props.insets}px;
    justify-content: space-between;
    background-color: #131B24;
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

const PreviousIconContainer = styled(View)`
display: flex;
flex-direction: row;
width: 33%;
align-items: center;
`;

const PreviousIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderTitleTextContainer = styled(View)`
display: flex;
width: 33%;
align-items: center;
`;

const HeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const HeaderEmptyContainer = styled(View)`
display: flex;
width: 33%;
flex-direction: row;
`;

// Body Style
const BodyContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
background-color: #131B24;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 2000px;
`;

const PaymentTypeContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const BodyTitleText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.White};
padding-bottom: 4px;
`;

const PaymentTypeButton = styled(TouchableOpacity)`
height: 48px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #242D37;
padding-top: 10px;
padding-bottom: 10px;
padding-right: 12px;
padding-left: 12px;
border-radius: 4px;
`;

const PaymentTypeButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const PaymentTypeForwardImage = styled(Image)`
width: 28px;
height: 28px;
`;

// Swap Type Style
const SwapContainer = styled(View)`
display: flex;
flex-direction: column;
margin-top: 24px;
`;

const CreateButtonContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 180px;
`;

const CreateButton = styled(TouchableOpacity)`
height: 48px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
border-radius: 4px;
`;

const CreateButtonDisabled = styled(TouchableOpacity)`
height: 48px;
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: rgba(61,106,151,0.2);
border-radius: 4px;
`;

const CreateButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const CreateButtonDisabledText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.DarkGray};
`;

// Modal Style
const ModalTitleBarHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 10px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 10px;
background-color: #18222D;
`;

const ModalCancelImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalHeaderTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const ModalConfirmText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.MidGray};
`;

const ModalPickerContainer = styled(View)``;



const PaymentsCreate = ({ navigation, route }: RootStackScreenProps<"PaymentsCreate">) => {

    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(false);

    // 帳戶類型 Modal
    const [isPaymentTypeModalVisible, setIsPaymentTypeModalVisible] = useState(false);

    // 帳戶類型
    const [inputPaymentType, setInputPaymentType] = useState('BANK')

    // 資料類型
    const [inputBankAccountOwnerName, setInputBankAccountOwnerName] = useState("");
    const [inputBankCode, setInputBankCode] = useState("");
    const [inputBankAccount, setInputBankAccount] = useState("");
    const { t } = useTranslation();
    const handlePaymentType = (payment: string) => {
        if (payment === 'BANK') {
            return '銀行轉帳'
        } else if (payment === 'TOUCHNGO') {
            return 'TouchnGo'
        } else if (payment === 'PPAY') {
            return 'Ppay'
        }
    };

    // 新增帳戶 （ＢＡＮＫ）
    const createBANK = () => {
        setLoading(true)
        api.postData("/user/payment", {
            type: 'BANK',
            name: inputBankAccountOwnerName,
            code: inputBankCode,
            account: inputBankAccount
        })
            .then((x: any) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    createPaymentSuccessAlert();
                } else {
                    Alert.alert(x.data.msg)
                };
            })
            .catch(() => {
                console.log(Error);
            })
    };

    
    const createPaymentSuccessAlert = () => {
        Alert.alert(
            "帳戶新增成功",
            "",
            [
                {
                    text: '確定',
                    onPress: () => {
                        navigation.goBack()
                    }
                }
            ]

        );
    };

    return (
        <Container insets={insets.top}>
            {
                loading &&
                <Spinner visible={true} textContent={'載入中'} color={'#FFFFFF'} textStyle={{ color: '#FFFFFF' }} />
            }
            <HeaderContainer>
                <PreviousIconContainer>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <PreviousIcon source={require("../../assets/images/global/previous.png")} />
                    </TouchableOpacity>
                </PreviousIconContainer>
                <HeaderTitleTextContainer>
                    <HeaderTitleText>{t("addAccount")}</HeaderTitleText>
                </HeaderTitleTextContainer>
                <HeaderEmptyContainer />
            </HeaderContainer>
            <BodyContainer>
                <PaymentTypeContainer>
                    <BodyTitleText>{t("accountType")}</BodyTitleText>
                    <PaymentTypeButton onPress={() => { setIsPaymentTypeModalVisible(true) }} disabled={true}>
                        <PaymentTypeButtonText>{handlePaymentType(inputPaymentType)}</PaymentTypeButtonText>
                        <PaymentTypeForwardImage source={require("../../assets/images/home/next.png")} />
                    </PaymentTypeButton>
                </PaymentTypeContainer>
                {
                    inputPaymentType === 'BANK' &&
                    <SwapContainer>
                        <BodyTitleText>{t("accountName")}</BodyTitleText>
                        <TextInput
                            style={{
                                height: 48,
                                backgroundColor: '#242D37',
                                paddingBottom: 12,
                                paddingTop: 12,
                                paddingLeft: 16,
                                paddingRight: 16,
                                color: '#FFFFFF',
                                borderRadius: 4,
                                marginBottom: 24
                            }}
                            value={inputBankAccountOwnerName}
                            onChangeText={(text) => { setInputBankAccountOwnerName(text) }}
                            placeholder={t("enterAccountName")}
                            placeholderTextColor={'#8D97A2'}
                            keyboardType={"default"}
                        />
                        <BodyTitleText>{t("bankName")}</BodyTitleText>
                        <TextInput
                            style={{
                                height: 48,
                                backgroundColor: '#242D37',
                                paddingBottom: 12,
                                paddingTop: 12,
                                paddingLeft: 16,
                                paddingRight: 16,
                                color: '#FFFFFF',
                                borderRadius: 4,
                                marginBottom: 24
                            }}
                            value={inputBankCode}
                            onChangeText={(text) => { setInputBankCode(text) }}
                            placeholder={t("enterBankName")}
                            placeholderTextColor={'#8D97A2'}
                            keyboardType={"number-pad"}
                            maxLength={3}
                        />
                        <BodyTitleText>{t("accountNum")}</BodyTitleText>
                        <TextInput
                            style={{
                                height: 48,
                                backgroundColor: '#242D37',
                                paddingBottom: 12,
                                paddingTop: 12,
                                paddingLeft: 16,
                                paddingRight: 16,
                                color: '#FFFFFF',
                                borderRadius: 4,
                                marginBottom: 24
                            }}
                            value={inputBankAccount}
                            onChangeText={(text) => { setInputBankAccount(text) }}
                            placeholder={t("enterAccountNum")}
                            placeholderTextColor={'#8D97A2'}
                            keyboardType={"number-pad"}
                        />
                        {
                            inputBankAccountOwnerName !== "" && inputBankCode !== "" && inputBankAccount !== "" ?
                                <CreateButtonContainer>
                                    <CreateButton onPress={() => { createBANK() }}>
                                        <CreateButtonText>{t("add")}</CreateButtonText>
                                    </CreateButton>
                                </CreateButtonContainer> :
                                <CreateButtonContainer>
                                    <CreateButtonDisabled disabled={true}>
                                        <CreateButtonDisabledText>{t("add")}</CreateButtonDisabledText>
                                    </CreateButtonDisabled>
                                </CreateButtonContainer>
                        }
                    </SwapContainer>
                }

            </BodyContainer>

            {/* 帳戶類型 Modal*/}
            {/* <Modal
                isVisible={isPaymentTypeModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsPaymentTypeModalVisible(false)}
                onSwipeComplete={() => setIsPaymentTypeModalVisible(false)}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', paddingBottom: 30 }}>
                    <ModalTitleBarHeaderContainer>
                        <TouchableOpacity onPress={() => { setIsPaymentTypeModalVisible(false) }}>
                            <ModalCancelImage source={require("../../assets/images/c2c/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHeaderTitleText>帳戶類型</ModalHeaderTitleText>
                        <TouchableOpacity onPress={() => { setIsPaymentTypeModalVisible(false) }}>
                            <ModalConfirmText>確定</ModalConfirmText>
                        </TouchableOpacity>
                    </ModalTitleBarHeaderContainer>
                    <ModalPickerContainer>
                        <Picker
                            selectedValue={inputPaymentType}
                            onValueChange={(itemValue: string, itemIndex: number) =>
                                setInputPaymentType(itemValue)
                            }
                            itemStyle={{ color: '#FFFFFF' }}
                        >
                            <Picker.Item label="銀行轉帳" value="BANK" />
                            <Picker.Item label="TouchnGo" value="TOUCHNGO" />
                            <Picker.Item label="Ppay" value="PPAY" />

                        </Picker>
                    </ModalPickerContainer>
                </View>
            </Modal> */}

        </Container>
    )
}

export default PaymentsCreate