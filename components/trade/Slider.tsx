import * as React from "react";
import { Text, TouchableOpacity, View, Image, Alert } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import styled from "styled-components"
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled(View)`
display: flex;
flex-direction: column;
`;

//Slider 
const LeverageText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.LightMidGray};
`;

const LeverageViewModalRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
padding: 12px 10px 12px 10px;
margin-bottom: 24px;
`;

const LeverageViewModalRemoveImage = styled(Image)`
width: 24px;
height: 24px;
`;

const LeverageViewModalAddImage = styled(Image)`
width: 24px;
height: 24px;
`;

const LeverageViewModalLeverageText = styled(Text)`
font-weight: 600;
font-size: 14px;
line-height: 18px;
color: ${props => props.theme.color.White};
`;

const LeverageViewModalNotificationImage = styled(Image)`
width: 24px;
height: 24px;
`;

const LeverageViewModalNotificationText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const LeverageViewModalDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
align-items: center;
`;

const LeverageViewModalDetailText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
`;

const ModalConfirmButton = styled(TouchableOpacity)`
height: 44px;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.PrimaryDark};
margin-top: 32px;
`;

const ModalConfirmButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const DEFAULT_VALUE = 1;


const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    positionNum?: String;
    onValueChangeSliderNum: React.Dispatch<React.SetStateAction<number>>;
    isModalVisable: React.Dispatch<React.SetStateAction<boolean>>;
    balance:number
}) => {
    const { sliderValue, trackMarks, positionNum, onValueChangeSliderNum, isModalVisable,balance } = props;
    const [value, setValue] = React.useState(
        sliderValue ? sliderValue : DEFAULT_VALUE,
    );
    let renderTrackMarkComponent: React.ReactNode;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index: number) => {
            const currentMarkValue = trackMarks[index];
            const currentSliderValue =
                value || (Array.isArray(value) && value[0]) || 0;
            const style =
                currentMarkValue > Math.max(currentSliderValue)
                    ? { width: 8, height: 12, backgroundColor: '#333C47' }
                    : { width: 8, height: 12, backgroundColor: '#DEDDE3' }
            return (
                <View style={style} />
            );
        };
    }

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child: React.ReactElement) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                        onValueChange: setValue,
                        renderTrackMarkComponent,
                        trackMarks,
                        value,
                    });
                }
                return child;
            },
        );
    };

    let num = parseInt(value.toString());

    const sendDataLeverageModal = () => {
        isModalVisable(false)
        onValueChangeSliderNum(num)
    }


    return (
        <Container>
            {/* <View>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View> */}
            <LeverageViewModalRowContainer style={{ backgroundColor: '#333C47', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => {
                    value > 1 ?
                        setValue(num - 1) :
                        setValue(1)
                }}>
                    {
                        value == 1 ?
                            <LeverageViewModalRemoveImage source={require("../../assets/images/trade/remove_bottom.png")} /> :
                            <LeverageViewModalRemoveImage source={require("../../assets/images/trade/remove.png")} />
                    }
                </TouchableOpacity>
                <LeverageViewModalLeverageText>{value}X</LeverageViewModalLeverageText>
                <TouchableOpacity onPress={() => {
                    value < 125 ?
                        setValue(num + 1) :
                        setValue(125)
                }}>
                    <LeverageViewModalAddImage source={require("../../assets/images/trade/add.png")} />
                </TouchableOpacity>
            </LeverageViewModalRowContainer>
            {renderChildren()}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <LeverageText>1X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>25X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>50X</LeverageText>
                <LeverageText style={{ paddingLeft: 3 }}>75X</LeverageText>
                <LeverageText>100X</LeverageText>
                <LeverageText>125X</LeverageText>
            </View>
            <LeverageViewModalDetailRowContainer style={{ paddingTop: 26 }}>
                <LeverageViewModalNotificationImage source={require("../../assets/images/trade/notification.png")} />
                <LeverageViewModalNotificationText style={{ paddingLeft: 8 }}>槓桿比例愈高，發生強制平倉的風險愈高。</LeverageViewModalNotificationText>
            </LeverageViewModalDetailRowContainer>
            <LeverageViewModalDetailRowContainer style={{ paddingTop: 10 }}>
                <LeverageViewModalDetailText>調整槓桿後，您的 BTC 永續合約資金將變化為：</LeverageViewModalDetailText>
            </LeverageViewModalDetailRowContainer>
            <LeverageViewModalDetailRowContainer>
                <LeverageViewModalDetailText>{balance} USDT 持倉擔保金額</LeverageViewModalDetailText>
            </LeverageViewModalDetailRowContainer>
            <LeverageViewModalDetailRowContainer>
                <LeverageViewModalDetailText>{positionNum} BTC 可用擔保金額</LeverageViewModalDetailText>
            </LeverageViewModalDetailRowContainer>
            <ModalConfirmButton onPress={() => { 
                var obj = {
                    leverage:value.length ? value[0]:parseInt(value),
                    symbol:"BTC-USDT"
                }
                api.postData("/order/position/adjust-leverage",obj).then(x=>{
                    if(x.status !== 400){
                        AsyncStorage.setItem("leverage",value.length ? value[0].toString():parseInt(value).toString())
                        sendDataLeverageModal() 
                    }else{
                        Alert.alert(x.data.msg)
                    }
                })
            }}>
                <ModalConfirmButtonText>確認</ModalConfirmButtonText>
            </ModalConfirmButton>
        </Container>
    );
};

export default SliderContainer