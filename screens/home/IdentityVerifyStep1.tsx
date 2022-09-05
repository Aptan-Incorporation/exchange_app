import { Text, View, TouchableOpacity, Image, TextInput,Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
  font-weight:600;
  margin-right:30;

`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`

const IdentityVerifyStep1 = ({ navigation }: RootStackScreenProps<"IdentityVerifyStep1">) => {
  const insets = useSafeAreaInsets();
  const [count,setCount] = useState(180)
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [birth, setBirth] = React.useState("請選擇出生年月日");
  const [birthTime, setBirthTime] = React.useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { t } = useTranslation();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date:any) => {
    console.log(new Date(date).getTime());
    setBirth(new Date(date).getFullYear() + "年" + (new Date(date).getMonth()+1) +"月" + new Date(date).getDate() +"日")
    setBirthTime(new Date(date).getTime())
    hideDatePicker();
  };

  useEffect(async ()=>{
    let register = await AsyncStorage.getItem("register")

  },[count])
  return (
    <Container>
      {loading &&  <Spinner visible={loading} textContent={''} />}
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconImg source={require("../../assets/images/global/previous.png")} />
        </TouchableOpacity>
        <HeaderText>{t("idAuth")}</HeaderText>
      <View></View>
      </Header>
      <View style={{ padding: 16 }}>
      <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginBottom:4}}>{t("UserName")}  </Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder={t("enterUserName")} onChangeText={setName}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>{t("UserAddress")}  </Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder={t("enterUserAddress")} onChangeText={setAddress}/>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>{t("UserBirthday")}  </Text>
        <TouchableOpacity style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center"}} onPress={showDatePicker}>
          <Text style={{color:"#8D97A2",fontSize:15,fontWeight:"400"}}>{birth === "請選擇出生年月日" ? t("enterUserBirthday") :birth}</Text>
          <IconImg source={require("../../assets/images/home/next.png")} />

        </TouchableOpacity>
        <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
           AsyncStorage.setItem("identity",JSON.stringify({
             name:name,
             address:address,
             birth:birthTime
           }))
           navigation.navigate("IdentityVerifyStep2")
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>繼續</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      </View>
    </Container>
  );
};

export default IdentityVerifyStep1;
