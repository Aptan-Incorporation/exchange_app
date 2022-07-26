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

const C2cHelp = ({ navigation }: RootStackScreenProps<"C2cHelp">) => {
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
        <HeaderText>幫助中心</HeaderText>
        <View></View>
      </Header>
      <View style={{display:"flex",flexDirection:"column",padding:16}}>
      <Text style={{color:"white",fontSize:13,fontWeight:"500"}}>1. 進入官網，點擊右上角【註冊】按鈕。</Text>
      <Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>2. 點擊後跳轉至註冊頁面，按照要求輸入電子郵件信箱和密碼。
仔細閱讀《服務條款》後勾選並點擊【註冊】。
安全提示：
為了帳戶安全，設置密碼時，請確保至少 8 位字符。其中必須包含大寫字母和 1 位數字。
若需要填寫推薦人 ID，請與推薦人確認後填入。註冊成功後，推薦關係將無法更改。</Text>
<Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>3. 向右滑動完成拼圖，進行安全驗證。</Text>
      <Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>4. 在彈窗中按提示勾選對應的選項。</Text>
      <Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>5. 選擇對應選項後，系統將發送驗證碼至您的電子郵件信箱。
驗證碼的有效期為 30 分鐘。請登入電子郵件信箱查看驗證碼並及時填寫。</Text>
<Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>6. 輸入驗證碼後，會進入到如下介面表示註冊已成功。</Text>
<Text style={{color:"white",fontSize:13,fontWeight:"500",marginTop:20}}>7. 為了帳戶安全，建議設置 KYC 與 Google 驗證。</Text>
      </View>
    </Container>
  );
};

export default C2cHelp;
