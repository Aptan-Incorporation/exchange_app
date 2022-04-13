import React from "react";
import { Text, View } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";

const Container = styled(View)`
    display: flex ;
    flex-direction: column;
`
const ProfileScreen = ({
    navigation
  }: RootStackScreenProps<"ProfileScreen">) => {
    return (
        <Container>
            <Text>Profile</Text>
        </Container>
    )
}

export default ProfileScreen