import { Text, View } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";

const Container = styled(View)`
    display: flex ;
    flex-direction: column;
`
const HomeScreen = ({
    navigation
  }: RootStackScreenProps<"HomeScreen">) => {
    return (
        <Container>
            <Text>Home</Text>
        </Container>
    )
}

export default HomeScreen