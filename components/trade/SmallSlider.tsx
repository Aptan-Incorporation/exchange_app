import * as React from "react";
import { View, TextInput, Text } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import styled from "styled-components"
import { useEffect } from "react";

const Container = styled(View)`
display: flex;
flex-direction: column;

`;

const TradeFunctionNumberInputContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-bottom: 18px;
margin-top:2;

`;

const TradeFunctionNumberInputRightContainer = styled(View)`
height: 36px;
width: 30%;
border-top-right-radius: 4px;
border-bottom-right-radius: 4px;
background-color: #242D37;
justify-content: center;
align-items: center;
`;

const TradeFunctionNumberInputRightText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;


const DEFAULT_VALUE = 0;


const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    positionNum: string;
    onChangeSliderValue: React.Dispatch<React.SetStateAction<number>>;
    swapCurrency: number;
    balance: number;
    trade:string

}) => {
    const { sliderValue, trackMarks, positionNum, swapCurrency, onChangeSliderValue,balance,trade } = props;
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
                        onSlidingComplete: () => { setNewInputNum(positionString) },
                        trackMarks,
                        value,
                    });
                }
                return child;
            },
        )
            ;
    };

    let num = parseInt(value.toString());

    let positionString =  (parseFloat(((parseFloat(positionNum) / 100) * num).toFixed(3))).toString();
    const [newInputNum, setNewInputNum] = React.useState("0");


    const returnValue = (() => {
        onChangeSliderValue(parseFloat(newInputNum))
    });

    useEffect(() => {
        if (parseFloat(newInputNum) > parseFloat(positionNum)) {
            setValue(100)
            setNewInputNum(positionNum)
        }
    },[newInputNum,positionNum])

    return (
        <Container>
            <TradeFunctionNumberInputContainer>
                <TextInput
                    placeholder={"數量"}
                    value={newInputNum}
                    onChangeText={(newInputNum) => { setNewInputNum(newInputNum), setValue(Math.round(parseFloat(newInputNum) / parseFloat(positionNum) * 100)) }}
                    /* onChangeText={(value) => { (value != null&&undefined) && setValue(parseFloat(value))}} */
                    placeholderTextColor={'#8D97A2'}
                    keyboardType={"decimal-pad"}
                    style={{ backgroundColor: '#242D37', width: '70%', height: 36, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                />
                {
                    swapCurrency === 0 ?
                        <TradeFunctionNumberInputRightContainer>
                            <TradeFunctionNumberInputRightText>{trade}</TradeFunctionNumberInputRightText>
                        </TradeFunctionNumberInputRightContainer> :
                        <TradeFunctionNumberInputRightContainer>
                            <TradeFunctionNumberInputRightText>USDT</TradeFunctionNumberInputRightText>
                        </TradeFunctionNumberInputRightContainer>
                }
            </TradeFunctionNumberInputContainer>

            {renderChildren()}
            {returnValue()}
            <View style={{ paddingTop: 10 }}>
            </View>

        </Container>
    );
};

export default SliderContainer