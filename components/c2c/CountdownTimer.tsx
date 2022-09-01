import * as React from "react"
import { Text, View } from "react-native"
import styled from "styled-components"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const TopContainerTimerText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: #FABD43;
`;

const TopContainerTimerMiddleText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.LightMidGray};
`;

const useCountdown = (targetDate: number) => {

    const [countDown, setCountDown] = useState(
        targetDate
    );
    const { t } = useTranslation();
    
    useEffect(() => {
        
            const interval = setInterval(() => {
                setCountDown((targetDate) => targetDate - 1000);
            }, 1000);

            if (countDown <= 0) {
                clearInterval(interval);
              }

            return () => clearInterval(interval);
            
    }, [targetDate, countDown]);

    

    return getReturnValues(countDown);

};

const getReturnValues = (countDown: number) => {
    // calculate time left
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [minutes, seconds];
};





const DateTimeDisplay = ({ value }) => {
    return (
        <View>
            <TopContainerTimerText>{value}</TopContainerTimerText>
        </View>
    );
};


const ShowCounter = ({ minutes, seconds }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>

            <DateTimeDisplay value={minutes} />
            <TopContainerTimerMiddleText> : </TopContainerTimerMiddleText>
            <DateTimeDisplay value={seconds} />

        </View>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [minutes, seconds] = useCountdown(targetDate);

    return (
        <ShowCounter
            minutes={minutes}
            seconds={seconds}
        />
    );
};

export default CountdownTimer;
