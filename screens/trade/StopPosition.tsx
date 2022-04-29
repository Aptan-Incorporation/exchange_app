import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, Dimensions } from "react-native"
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View)`
display: flex ;
flex-direction: column;
`;

// Stop Position Modal 止盈/止損

const StopPositionRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const StopPositionInRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
width: 48%;
`;

const StopPositionColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 70%;
`;

const StopPositionLabelText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightGray};
padding-left: 6px;
padding-bottom: 4px;
`;

const StopPositionLine = styled(View)`
height: 1px;
margin-top: 24px;
margin-bottom: 24px;
background-color: #242D37;
`;

const StopPositionButtonRightText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const StopPositionSellVolumnButton = styled(TouchableOpacity)`
height: 48px;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #242D37;
border-radius: 4px;
padding: 10px 16px 10px 16px;
`;

const StopPositionSellVolumnButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const StopPositionInputContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const StopPositionInputRightContainer = styled(View)`
height: 48px;
width: 40%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
background-color: #242D37;
justify-content: center;
align-items: center;
`;

const StopPositionSubmitButton = styled(TouchableOpacity)`
height: 44px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
margin-top: 60px;
border-radius: 4px;
`;

const StopPositionDisabledSubmitButton = styled(TouchableOpacity)`
height: 44px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
margin-top: 60px;
border-radius: 4px;
opacity: 0.4;
`;

const StopPositionSubmitButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;


// Modal Style


// Modal Global Style
const ModalHeaderContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: center;
padding-top: 10px;
padding-bottom: 26px;
`;

const ModalHedaerTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px
color: ${props => props.theme.color.White};
`;

const ModalYellowSelectedImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalNextImage = styled(Image)`
width: 28px;
height: 28px;
`;

const ModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
height: 50px;
padding-left: 16px;
padding-right: 16px;
`;

const ModalButtonText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;


const StopPositionScreen = ({
    navigation
}: RootStackScreenProps<"StopPositionScreen">) => {

    const insets = useSafeAreaInsets();

    // Position Detail Button
    const [isStopPositionVisible, setIsStopPositionVisible] = useState(false);
    const [positionStopEarnPrice, setPositionStopEarnPrice] = useState("");
    const [positionStopLostPrice, setPositionStopLostPrice] = useState("");
    const [positionStopEarn_SellPrice, setPositionStopEarn_SellPrice] = useState("");
    const [positionStopLost_SellPrice, setPositionStopLost_SellPrice] = useState("");

    const toggleStopPositionModal = () => {
        setIsStopPositionVisible(!isStopPositionVisible)
    };

    const [isPositionSellVolumnVisible, setIsPositionSellVoiumnVisible] = useState(false);
    const [positionSellVolumn, setPositionSellVolumn] = useState(0.1);

    const togglePositionSellVolumnModal = () => {
        setIsPositionSellVoiumnVisible(!isPositionSellVolumnVisible)
    };


    return (

        <Container>
            <View style={{ backgroundColor: '#18222D', paddingLeft: 16, paddingRight: 16, paddingBottom: 200 }}>
                <StopPositionRowContainer style={{ paddingTop: 16 }}>
                    <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>止盈價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={"價格"}
                                    value={positionStopEarnPrice}
                                    onChangeText={positionStopEarnPrice => setPositionStopEarnPrice(positionStopEarnPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer>
                    <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>賣出價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={"價格"}
                                    value={positionStopEarn_SellPrice}
                                    onChangeText={positionStopEarn_SellPrice => setPositionStopEarn_SellPrice(positionStopEarn_SellPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer>
                </StopPositionRowContainer>
                <StopPositionLine></StopPositionLine>
                <StopPositionRowContainer>
                    <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>止損價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={"價格"}
                                    value={positionStopLostPrice}
                                    onChangeText={positionStopLostPrice => setPositionStopLostPrice(positionStopLostPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer>
                    <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>賣出價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={"價格"}
                                    value={positionStopLost_SellPrice}
                                    onChangeText={positionStopLost_SellPrice => setPositionStopLost_SellPrice(positionStopLost_SellPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer>
                </StopPositionRowContainer>
                <StopPositionLine></StopPositionLine>
                <StopPositionLabelText>賣出量</StopPositionLabelText>
                <StopPositionSellVolumnButton onPress={togglePositionSellVolumnModal}>
                    <StopPositionSellVolumnButtonText>{positionSellVolumn}</StopPositionSellVolumnButtonText>
                    <ModalNextImage source={require("../../assets/images/trade/next.png")} />
                </StopPositionSellVolumnButton>
                {
                    positionStopEarnPrice !== "" &&
                        positionStopEarn_SellPrice !== "" &&
                        positionStopLostPrice !== "" &&
                        positionStopLost_SellPrice !== "" ?
                        <StopPositionSubmitButton onPress={() => { navigation.goBack() }}>
                            <StopPositionSubmitButtonText>送出</StopPositionSubmitButtonText>
                        </StopPositionSubmitButton> :
                        <StopPositionDisabledSubmitButton disabled={true}>
                            <StopPositionSubmitButtonText>送出</StopPositionSubmitButtonText>
                        </StopPositionDisabledSubmitButton>
                }

                {/*Sell Volumn Modal 賣出量 */}
                < Modal
                    isVisible={isPositionSellVolumnVisible}
                    deviceHeight={windowHeight}
                    deviceWidth={windowWidth}
                    animationInTiming={500}
                    animationOutTiming={700}
                    backdropOpacity={0.7}
                    onBackdropPress={() => setIsPositionSellVoiumnVisible(false)}
                    onSwipeComplete={() => setIsPositionSellVoiumnVisible(false)}
                    swipeDirection={['down']}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                    hideModalContentWhileAnimating={true}
                >
                    <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 4, borderTopRightRadius: 4, paddingLeft: 16, paddingRight: 16, paddingBottom: 20 }}>
                        <ModalHeaderContainer>
                            <ModalHedaerTitleText>賣出量</ModalHedaerTitleText>
                        </ModalHeaderContainer>
                        <TouchableOpacity onPress={() => { setPositionSellVolumn(0.1), setIsPositionSellVoiumnVisible(false) }}>
                            <ModalRowContainer>
                                <ModalButtonText>100% (0.1)</ModalButtonText>
                                {
                                    positionSellVolumn === 0.1 &&
                                    <ModalYellowSelectedImage source={require("../../assets/images/trade/YellowSelected.png")} />
                                }
                            </ModalRowContainer>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setPositionSellVolumn(0.075), setIsPositionSellVoiumnVisible(false) }}>
                            <ModalRowContainer>
                                <ModalButtonText>75% (0.075)</ModalButtonText>
                                {
                                    positionSellVolumn === 0.075 &&
                                    <ModalYellowSelectedImage source={require("../../assets/images/trade/YellowSelected.png")} />
                                }
                            </ModalRowContainer>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setPositionSellVolumn(0.05), setIsPositionSellVoiumnVisible(false) }}>
                            <ModalRowContainer>
                                <ModalButtonText>50% (0.05)</ModalButtonText>
                                {
                                    positionSellVolumn === 0.05 &&
                                    <ModalYellowSelectedImage source={require("../../assets/images/trade/YellowSelected.png")} />
                                }
                            </ModalRowContainer>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setPositionSellVolumn(0.025), setIsPositionSellVoiumnVisible(false) }}>
                            <ModalRowContainer>
                                <ModalButtonText>25% (0.025)</ModalButtonText>
                                {
                                    positionSellVolumn === 0.025 &&
                                    <ModalYellowSelectedImage source={require("../../assets/images/trade/YellowSelected.png")} />
                                }
                            </ModalRowContainer>
                        </TouchableOpacity>
                    </View>

                </Modal >
            </View>
        </Container>

    )
}

export default StopPositionScreen