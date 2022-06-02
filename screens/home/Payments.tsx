import * as React from "react"
import { Text, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import axios from "axios"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

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

const HeaderFunctionIconContainer = styled(View)`
display: flex;
width: 33%;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const HeaderFunctionIcon = styled(Image)`
width: 28px;
height: 28px;
`;

const HeaderEditComfirmContainer = styled(View)`
display: flex;
width: 33%;
flex-direction: row;
justify-content: flex-end;
align-items: center;
`;

const HeaderEditComfirmText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.MidGray};
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

const CardContainer = styled(View)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center; 
`;

const CardInsideContainer = styled(View)`
height: 75px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const CardLeftRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
width: 10%;
`;

const CardMiddleRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
width: 80%;
`;

const CardRightRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
width: 10%;
`;

const CardColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardPaymentsTitleText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const CardPaymentsDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
`;

const CardPaymentsImage = styled(Image)`
width: 28px;
height: 28px;
`;

const CardRemoveImage = styled(Image)`
height: 28px;
width: 28px;
`;

const DetailCardLine = styled(View)`
height: 1px;
background-color: #18222D;
margin-top: 4px;
margin-bottom: 4px;
`;




const Payments = ({ navigation, route }: RootStackScreenProps<"Payments">) => {


    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(false);

    // 編輯
    const [isEdit, setIsEdit] = useState(false);

    // 帳戶資料
    const [payments, setPayments] = useState<any[]>([])

    const getUserInfoPayments = () => {
        setLoading(true)
        api.get("/user/payment")
            .then((x: any) => {
                setLoading(false)
                if (x.status != 400 && x.status != 401) {
                    setPayments(x.data)
                } else {
                    Alert.alert(x.data.msg)
                };
            })
            .catch(() => {
                console.log(Error)
            })
    };

    // 判斷帳戶類型
    const handlePaymentType = (payment: string) => {
        if (payment === 'BANK') {
            return '銀行帳戶'
        } else if (payment === 'TOUCHNGO') {
            return 'TouchnGO'
        } else if (payment === 'PPAY') {
            return 'Ppay'
        }
    };

    // 判斷帳戶圖片
    const handlePaymentImage = (payment: string) => {
        if (payment === 'BANK') {
            return require('../../assets/images/home/BANK.png')
        } else if (payment === 'TOUCHNGO') {
            return require('../../assets/images/home/TOUCHNGO.png')
        } else if (payment === 'PPAY') {
            return require('../../assets/images/home/PPAY.png')
        }
        return "../../assets/images/home/account.png"
    };

    // 刪除帳戶
    const deletePayment = (paymentID: string) => {
        setLoading(true)
        api.delete(`/user/payment/${paymentID}`)
            .then((x: any) => {
                console.log(x)
                if (x.status != 400 && x.status != 401) {
                    refreshPageAlert();
                } else {
                    Alert.alert(x.data.msg)
                }
            })
            .catch(() => {
                console.log(Error);
            })
    };

    const deletePaymentAlert = (paymentID: string) => {
        Alert.alert(
            "確定移除？",
            "您使用此收款/付款方式的在線廣告將會被暫時中止。",
            [
                {
                    text: '取消',
                    onPress: () => { console.log("Cancel") },
                    style: 'cancel'
                },
                {
                    text: '確定',
                    onPress: () => { deletePayment(paymentID) }
                }
            ]
        )
    };

    const refreshPageAlert = () => {
        Alert.alert(
            "帳戶刪除成功！",
            "",
            [
                {
                    text: '確定',
                    onPress: () => { getUserInfoPayments() }
                }
            ]
        )
    };

    const addListener = () => {
        navigation.addListener('focus', () => getUserInfoPayments());
    };

    useEffect(async () => {
        let token = await AsyncStorage.getItem("token")
        if (token) {
            getUserInfoPayments();
        }

        addListener();
    }, [])


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
                    <HeaderTitleText>帳戶設置</HeaderTitleText>
                </HeaderTitleTextContainer>
                {
                    isEdit ?
                        <HeaderEditComfirmContainer>
                            <TouchableOpacity onPress={() => { setIsEdit(false) }}>
                                <HeaderEditComfirmText>確定</HeaderEditComfirmText>
                            </TouchableOpacity>
                        </HeaderEditComfirmContainer> :
                        <HeaderFunctionIconContainer>
                            <TouchableOpacity onPress={() => { setIsEdit(true) }}>
                                <HeaderFunctionIcon source={require("../../assets/images/global/edit.png")} style={{ marginRight: 20 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("PaymentsCreate")
                            }}>
                                <HeaderFunctionIcon source={require("../../assets/images/global/add.png")} />
                            </TouchableOpacity>
                        </HeaderFunctionIconContainer>
                }
            </HeaderContainer>
            <BodyContainer>
                {
                    payments.map((x: any, i) => {
                        return (
                            <CardContainer>
                                <CardInsideContainer>
                                    <CardLeftRowContainer>
                                        <CardPaymentsImage source={handlePaymentImage(x.type)} />
                                    </CardLeftRowContainer>
                                    <CardMiddleRowContainer>
                                        <CardColumnContainer>
                                            <CardPaymentsTitleText>{handlePaymentType(x.type)}</CardPaymentsTitleText>
                                            <CardPaymentsDetailText>({x.code}) {x.account}</CardPaymentsDetailText>
                                        </CardColumnContainer>
                                    </CardMiddleRowContainer>
                                    <CardRightRowContainer>
                                        {
                                            isEdit &&
                                            <TouchableOpacity onPress={() => { deletePaymentAlert(x.id) }}>
                                                <CardRemoveImage source={require("../../assets/images/home/remove_circle.png")} />
                                            </TouchableOpacity>
                                        }
                                    </CardRightRowContainer>
                                </CardInsideContainer>
                                {
                                    i !== payments.length - 1 &&
                                    <DetailCardLine></DetailCardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
            </BodyContainer>

        </Container>
    )
}
export default Payments