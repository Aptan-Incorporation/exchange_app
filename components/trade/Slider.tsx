import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";

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

const DEFAULT_VALUE = 1;


const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    onValueChangeSliderNum?: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { sliderValue, trackMarks, onValueChangeSliderNum } = props;
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

    const [buttonNum, setButtonNum] = useState(0);
    const [sliderNum, setSliderNum] = useState(1);
    const [sliderPlusValue, setSliderPlusValue] = useState(1);

    useEffect(() => {
        if (value == 1) {
            setSliderNum(1)
        } else if (value == 2) {
            setSliderNum(3)
        } else if (value == 3) {
            setSliderNum(10)
        } else if (value == 4) {
            setSliderNum(30)
        } else if (value == 5) {
            setSliderNum(75)
        } else {
            setSliderNum(125)
        };

        // 上面新增一個buttonplusvalue使每次slidernum更新時，button value歸0


        if ((buttonNum + sliderNum) > 125){
            setSliderPlusValue(125)
        } else if ((buttonNum + sliderNum < 1)) {
            setSliderPlusValue(1)
        } else {
            setSliderPlusValue(buttonNum + sliderNum)
        }
    })



    return (
        <Container>
            {/* <View>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View> */}
            <LeverageViewModalRowContainer style={{ backgroundColor: '#333C47', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => {
                    buttonNum + sliderNum > 1 ?
                        setButtonNum(buttonNum - 1) :  // 將此處的變數都更改為sliderplusvalue
                        setButtonNum(0)
                }}>
                    {
                        sliderNum + buttonNum === 1 ?
                            <LeverageViewModalRemoveImage source={require("../../assets/images/trade/remove_bottom.png")} /> :
                            <LeverageViewModalRemoveImage source={require("../../assets/images/trade/remove.png")} />
                    }
                </TouchableOpacity>
                <LeverageViewModalLeverageText>{sliderPlusValue}X</LeverageViewModalLeverageText>
                <TouchableOpacity onPress={() => {
                    buttonNum + sliderNum < 125 ?
                        setButtonNum(buttonNum + 1) :
                        setSliderNum(125)
                }}>
                    <LeverageViewModalAddImage source={require("../../assets/images/trade/add.png")} />
                </TouchableOpacity>
            </LeverageViewModalRowContainer>
            {renderChildren()}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <LeverageText>1X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>3X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>10X</LeverageText>
                <LeverageText style={{ paddingLeft: 3 }}>30X</LeverageText>
                <LeverageText>75X</LeverageText>
                <LeverageText>125X</LeverageText>
            </View>

        </Container>
    );
};

export default SliderContainer