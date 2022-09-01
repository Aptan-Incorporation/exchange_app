import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Switch
} from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import api from "../../common/api";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const Header = styled(View)<{ insets: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: ${props => props.insets}px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 11px;
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  margin-right: 30px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalHeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 26px;
`;

const ModalLeftCancelButton = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalHedaerTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.White};
`;

const ModalEmptyDiv = styled(View)`
  width: 28px;
  height: 28px;
`;

const C2cNotification = ({ navigation }: RootStackScreenProps<"C2cNotification">) => {
  const insets = useSafeAreaInsets();
  const [active, setActive] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userAccount, setUserAccount] = React.useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const [isEnabled3, setIsEnabled3] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const { t } = useTranslation();
  async function getData(){
    let user = await AsyncStorage.getItem("user");
    
  }
  useEffect(() => {
    getData()
  }, []);

  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconImg
            source={require("../../assets/images/global/previous.png")}
          />
        </TouchableOpacity>
        <HeaderText>C2C 通知設置</HeaderText>
        <View></View>
      </Header>
      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:16,alignItems:"center"}}>
          <Text style={{color:"white",fontSize:15,fontWeight:"400"}}>信箱通知</Text>
          <Switch
        trackColor={{ false: '#767577', true: '#6699CC' }}
        thumbColor={isEnabled ? 'white' : 'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:16,alignItems:"center"}}>
          <Text style={{color:"white",fontSize:15,fontWeight:"400"}}>簡訊通知</Text>
          <Switch
        trackColor={{ false: '#767577', true: '#6699CC' }}
        thumbColor={isEnabled ? 'white' : 'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch2}
        value={isEnabled2}
      />
      </View>
      <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:16,alignItems:"center"}}>
          <Text style={{color:"white",fontSize:15,fontWeight:"400"}}>推播通知</Text>
          <Switch
        trackColor={{ false: '#767577', true: '#6699CC' }}
        thumbColor={isEnabled ? 'white' : 'white'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch3}
        value={isEnabled3}
      />
      </View>
      
     
    </Container>
  );
};

export default C2cNotification;
