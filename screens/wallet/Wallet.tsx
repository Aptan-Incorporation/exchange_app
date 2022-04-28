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
        </Container>
    )
}

export default WalletScreen