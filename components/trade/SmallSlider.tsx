import * as React from "react";
import { View } from "react-native"
import { Slider } from '@miblanchard/react-native-slider';
import styled from "styled-components"

const Container = styled(View)`
display: flex;
flex-direction: column;
`;

const DEFAULT_VALUE = 0;


const SliderContainer = (props: {
    children: React.ReactElement;
    sliderValue?: Array<number>;
    trackMarks?: Array<number>;
    positionNum: string;
    buyNumber: string;
    onValueChangeSliderNum: React.Dispatch<React.SetStateAction<number>>;
    onValueChangeBuyNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { sliderValue, trackMarks, positionNum, buyNumber, onValueChangeSliderNum, onValueChangeBuyNumber } = props;
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
        )
            ;
    };

    let num = parseInt(value.toString());
    

    const returnValue = () => {
        let newPositionNum = parseFloat(((parseFloat(positionNum) / 100) * num).toFixed(3));
        onValueChangeSliderNum(newPositionNum);
        onValueChangeBuyNumber(newPositionNum.toString());
    };




    return (
        <Container>
            <View style={{ paddingTop: 10 }}>
                {/* <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text> */}
            </View>
            {renderChildren()}
            {returnValue()}
            <View style={{ paddingTop: 10 }}>
            </View>

        </Container>
    );
};

export default SliderContainer