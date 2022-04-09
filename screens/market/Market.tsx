import { Text, View } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";

const Container = styled(View)`
    display: flex ;
    flex-direction: column;
`
const MarketScreen = ({
    navigation
  }: RootStackScreenProps<"MarketScreen">) => {
    return (
        <Container>
            <Text>Market</Text>
        </Container>
    )
}

export default MarketScreen