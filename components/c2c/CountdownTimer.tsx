import * as React from "react"
import { Text, TextInput, View, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native"
import { RootStackScreenProps } from "../../types";
import styled from "styled-components"
import { useState, useEffect } from "react";

const useCountdown = (targetDate: any) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime());
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
};





const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <View>
            <Text>{value}</Text>
            <Text>{type}</Text>
        </View>
    );
};


const ExpiredNotice = () => {
    return (
       <View>
            <Text>Expired!!!</Text>
            <Text>Please select a future date and time.</Text>
        </View>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
                <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
                <Text>:</Text>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <Text>:</Text>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <Text>:</Text>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            
        </View>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;
