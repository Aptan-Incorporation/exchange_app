import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, Alert, AlertType, AlertButton, Dimensions, Pressable } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import Modal from "react-native-modal";
import styled, { StyledComponent } from "styled-components"
import { useState } from "react";

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
    UserPassword: string;
    onValueChangeInputPrice: React.Dispatch<React.SetStateAction<string>>;
    onValueChangeInputNumber: React.Dispatch<React.SetStateAction<string>>;
    onChangeSetSwapPage: React.Dispatch<React.SetStateAction<number>>;
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
        UserPassword,
        onChangeSetSwapPage,
        onValueChangeInputPrice,
        onValueChangeInputNumber
    } = props;

    // Input Price
    const [inputPrice, setInputPrice] = useState("");

    // Input Number
    const [inputNumber, setInputNumber] = useState("");

    const handleOnChangeAllPrice = () => {
        if (parseFloat(MyUSD) < parseFloat(LimitTo)) {
            setInputPrice(parseFloat(MyUSD).toFixed(0))
        } else {
            setInputPrice(parseFloat(LimitTo).toFixed(0))
        }
    };

    const handleOnChangeAllNumber = () => {
        let str = ""
        if (parseFloat(MyUSD) <= parseFloat(LimitTo)) {
            str = (parseFloat(MyUSD) / parseFloat(Price)).toFixed(2);
            setInputNumber(str);
        } else {
            str = (parseFloat(LimitTo) / parseFloat(Price)).toFixed(2);
            setInputNumber(str);
        }
    };

    const handleOnChangeExchange = () => {
        if (inputPrice != "" && parseFloat(inputPrice) <= parseFloat(MyUSD)) {
            setInputNumber((parseFloat(inputPrice) / parseFloat(Price)).toFixed(2));
        } else if (inputNumber != "" && parseFloat(inputNumber) * parseFloat(Price) <= parseFloat(MyUSD)) {
            setInputPrice((parseFloat(inputNumber) * parseFloat(Price)).toFixed(0));
        }
    };


    // 資金密碼Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalVisible = () => {
        if (((parseFloat(inputPrice) / parseFloat(Price)).toFixed(2)) == parseFloat(inputNumber).toFixed(2) && (parseFloat(inputPrice) <= parseFloat(MyUSD))) {
            setIsModalVisible(!isModalVisible);
        }
    };

    const [password, setPassword] = useState("");
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();

    const checkPassword = (psw: string) => {
        if (psw === password) {
            return true;
        } else {
            return false;
        }
    };

    // Submit Form
    const handleSubmitForm = () => {
        if (checkPassword(UserPassword)) {
            onValueChangeInputPrice(inputPrice)
            onValueChangeInputNumber(inputNumber)
            setIsModalVisible(false)
            onChangeSetSwapPage(2)
        }
    };


    return (
        <View style={{backgroundColor: '#131B24'}}>
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
                                keyboardType={"number-pad"}
                                style={{ backgroundColor: '#242D37', width: '70%', height: 46, color: '#F4F5F6', borderTopLeftRadius: 4, paddingLeft: 16, paddingTop: 15, paddingBottom: 15 }}
                            />
                            <TopInputCurrencyTextContainer>
                                <TopInputCurrencyText>USD</TopInputCurrencyText>
                            </TopInputCurrencyTextContainer>
                            <TopInputAllButtonContainer>
                                <TouchableOpacity onPress={() => { handleOnChangeAllPrice() }}>
                                    <TopInputAllButtonText>全部</TopInputAllButtonText>
                                </TouchableOpacity>
                            </TopInputAllButtonContainer>
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
                            <TopInputAllButtonContainer>
                                <TouchableOpacity onPress={() => { handleOnChangeAllNumber() }}>
                                    <TopInputAllButtonText>全部</TopInputAllButtonText>
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
                <TopBuyButton onPress={() => { toggleModalVisible() }}>
                    <TopBuyButtonText>購買</TopBuyButtonText>
                </TopBuyButton>
            </TopContainer>
            <BottomDetailContainer>
                <BottomDetailTopContainer>
                    <PhotoButton onPress={() => { }}>
                        <PhotoButtonText>{Account.charAt(0).toUpperCase()}</PhotoButtonText>
                    </PhotoButton>
                    <EmailText>{Account}</EmailText>
                    <SuccessRateText>({SuccessRate})%</SuccessRateText>
                </BottomDetailTopContainer>
                <BottomDetailSmallTitleText>收款方式</BottomDetailSmallTitleText>
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
                <BottomDetailLine></BottomDetailLine>
                <BottomDetailSmallTitleText>放行時限</BottomDetailSmallTitleText>
                <BottomDetailSmallValueText>5分鐘</BottomDetailSmallValueText>
                <BottomDetailLine></BottomDetailLine>
                <BottomDetailSmallTitleText>備註</BottomDetailSmallTitleText>
                <BottomDetailSmallValueText>請於時限內放行，不要卡單。</BottomDetailSmallValueText>
            </BottomDetailContainer>

            {/* // Modal */}
            <Modal
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
                        <ModalHeaderDetailText>進行出售，請輸入您設定的資金密碼</ModalHeaderDetailText>

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
            </Modal>
        </View>
    )
}

export default C2cSellFirst