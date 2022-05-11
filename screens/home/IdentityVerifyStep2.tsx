import { Text, View, TouchableOpacity, Image, TextInput,Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import * as ImagePicker from 'expo-image-picker';

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

const IdentityVerifyStep2 = ({ navigation }: RootStackScreenProps<"IdentityVerifyStep2">) => {
  const insets = useSafeAreaInsets();
  const [count,setCount] = useState(180)
  const [email, setEmail] = React.useState("");
  const [promoCode, setPromocode] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    name:"",
    address:"",
    birthTime:0
  });
  const [password2, setPassword2] = React.useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage2(result.uri);
    }
  };

  useEffect(async ()=>{
    let identity = await AsyncStorage.getItem("identity")
    let user = JSON.parse(identity!)
    console.log(user)

  },[])
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
        <HeaderText>身份驗證</HeaderText>
      <View></View>
      </Header>
      <View style={{ padding: 16,display:"flex",flexDirection:"column",alignItems:"center"  }}>
        <TouchableOpacity style={{display:"flex",flexDirection:"row",justifyContent:"center"}} onPress={pickImage} >
          <Image source={image ? { uri: image }:require("../../assets/images/home/front.png")} style={{width:311,height:186}}/>
        </TouchableOpacity>
        <Text style={{color:"#BCC2C8",fontSize:13,fontWeight:"500",marginTop:20}}>請上傳身分證正面之照片，照片應清晰且完整。</Text>
        <TouchableOpacity style={{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:20}} onPress={pickImage2}>
          <Image source={image ? { uri: image2 }:require("../../assets/images/home/back.png")} style={{width:311,height:186}}/>
        </TouchableOpacity>
        <Text style={{color:"#BCC2C8",fontSize:13,fontWeight:"500",marginTop:20}}>請上傳身分證反面之照片，照片應清晰且完整。</Text>

        <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42,width:"100%"}} onPress={async()=>{
           if(!image){
            alert("請上傳身分證正面")
          }else if(!image2){
            alert("請上傳身分證反面")
          }
          else{
            setLoading(true)

            const formData:any = new FormData();
            let identity = await AsyncStorage.getItem("identity")
            let user = JSON.parse(identity!)
            
            const data = {
                idCardFront: image,
                idCardBack: image2,
                name:user.name,
                address:user.address,
                birthday:user.birth
            }
            console.log(data)
            for (const [key, value] of Object.entries(data)) {
                formData.append(key, value)
            }

            api.postFormData("/user/kyc",formData).then(x=>{
              setLoading(false)
              console.log(x)
              if(x.status !== 400){
                navigation.navigate("Setting")
              }else{
                alert(x.data.msg)
              }
            })
          }
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>儲存</Text>
      </TouchableOpacity>
      </View>
    </Container>
  );
};

export default IdentityVerifyStep2;
