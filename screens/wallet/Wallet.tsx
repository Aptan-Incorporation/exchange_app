import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView, SafeAreaView } from "react-native"
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


const WalletScreen = ({
    navigation
}: RootStackScreenProps<"WalletScreen">) => {
   
    return (
        <Container>
            <Text style={{color:"white"}}>123</Text>
        </Container>
    )
}

export default WalletScreen