import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import Modal from "react-native-modal";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

//Slider 
const LeverageText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.LightMidGray};
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


    return (
        <View>
            {/* <View>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View> */}
            {renderChildren()}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <LeverageText>1X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>3X</LeverageText>
                <LeverageText style={{ paddingLeft: 5 }}>10X</LeverageText>
                <LeverageText style={{ paddingLeft: 3 }}>30X</LeverageText>
                <LeverageText>75X</LeverageText>
                <LeverageText>125X</LeverageText>
            </View>

        </View>
    );
};

export default SliderContainer