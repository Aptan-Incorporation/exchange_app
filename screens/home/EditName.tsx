import { Text, View , TouchableOpacity,Image,TextInput,Alert} from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import api from "../../common/api"
import { useTranslation } from "react-i18next";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const Header = styled(View) <{ insets: number }>`
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
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`


const EditName = ({ navigation }: RootStackScreenProps<"EditName">) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading,setLoading] = useState(false);
  const { t } = useTranslation();
  return (
    <Container>
      {loading && 
        <Spinner visible={true} textContent={''} />
      }
        <Header insets={insets.top}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconImg source={require("../../assets/images/global/previous.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              navigation.goBack();
            }}>
             <HeaderText>完成</HeaderText>
          </TouchableOpacity>
        </Header>
        <View style={{ padding: 16 }}>
          <View>
            <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginBottom:4}}>名稱</Text>
            <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="輸入名稱" onChangeText={setEmail}/>
          </View>
          <Text style={{marginTop:30,color:"#BCC2C8",fontSize:13,fontWeight:"500"}}>進行 C2C 交易使用的名稱，例如用戶全名、暱稱或商家名稱。</Text>
        </View>
      </Container>
  );
};

export default EditName;
