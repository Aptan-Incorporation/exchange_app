import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, SafeAreaView, Button } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

const Container = styled(SafeAreaView)`
    display: flex ;
    flex-direction: column;
    width: 100%;
    background: #18222d;
    flex:1;
`;

const Row = styled(View)`
  display:flex;
  flex-direction: row;
  padding:10px;
`;


const Number = styled(Text)`
    /* font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.004em;
    color: #333C47; */

`;

const ValueText = styled(Text)`
    font-family: 'PingFang TC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.4px;
    color: #18222D;
`;

const TopArea = styled(View)`


`;

const BG = styled(View)`
    background: #6699CC;
    border-radius: 8px;
    padding:20px;
    width:80%;
    margin-left:40px;

`;

const BG2 = styled(View)`
   background: #A8C2DC;
   padding:20px;
   width:100%;
   margin-top:-20px;
   width:113.5%;
   margin-left:-20px;
   /* border-radius: 8px 8px 0px 0px; */
   border-radius: 8px;

`;

const WalletScreen = ({
    navigation
}: RootStackScreenProps<"WalletScreen">) => {

    return (
        <Container>
            <Row>
                <Button
                    title="總覽"
                    color="white"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />

                <Button
                    title="現貨"
                    color="white"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />

                <Button
                    title="合約"
                    color="white"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />

                <Button
                    title="法幣"
                    color="white"
                    onPress={() => Alert.alert('Button with adjusted color pressed')}
                />
            </Row>
            
            <BG>
                <BG2>
                     <Text>總價值</Text>
                </BG2>
                <TopArea>
                    <Number>159,186.24 USDT</Number>
                    <ValueText>總價值</ValueText>
                    <Number>=159,186.24 USD</Number>
                </TopArea>
            </BG>

        </Container>
    )
}

export default WalletScreen