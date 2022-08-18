import { Text, View, TouchableOpacity, Image, TextInput,Alert,Dimensions } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect } from "react";
import api from "../../common/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import Modal from "react-native-modal";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`
const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  font-weight:600;
  margin-right:30;
`;

// Password Modal Style
const PasswordModalContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const PasswordModalHeaderText = styled(Text)`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.White};
`;

const PasswordModalHeaderDetailText = styled(Text)`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: ${props => props.theme.color.LightGray};
margin-top: 8px;
`;

const PasswordModalRowLine = styled(View)`
height: 1px;
width: 100%;
background-color: #3B393E;
margin-top: 16px;
`;

const PasswordModalButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-right: 16px;
padding-left: 16px;
`;

const PasswordModalCancelButton = styled(TouchableOpacity)`
height: 43px;
width: 45%;
border-bottom-left-radius: 18px;
justify-content: center;
align-items: center;
`;

const PasswordModalCancelButtonText = styled(Text)`
font-weight: 400;
font-size: 16px;
line-height: 20px;
color: #98999A;
`;

const PasswordModalButtonLine = styled(View)`
height: 43px;
width: 1px;
background-color: #3B393E;
`;

const PasswordModalSubmitButton = styled(TouchableOpacity)`
height: 43px;
width: 45%;
border-bottom-right-radius: 18px;
justify-content: center;
align-items: center;
`;

const PasswordModalSubmitButtonText = styled(Text)`
font-weight: 500;
font-size: 16px;
line-height: 20px;
color: #0A84FF;
`;


const ResetFundPassword = ({ navigation }: RootStackScreenProps<"ResetFundPassword">) => {
  const insets = useSafeAreaInsets();
  const [count,setCount] = useState(180)
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [emailCode, setEmailcode] = React.useState("");
  const [phoneCode, setPhonecode] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [isPassordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isPassordModalVisible2, setIsPasswordModalVisible2] = useState(false);
  const [kyc, setKyc] = React.useState({
    phone: false
  });
  useEffect(async ()=>{
    api.getData("/user/security").then(x => {
      // console.log(x)
      setKyc(x.data);
    });
    setTimeout(()=>{
      if(count > 0){
        setCount(c => c - 1)
      }
    },1000)
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
        <HeaderText>重置資金密碼</HeaderText>
      <View></View>
      </Header>
      <View style={{ padding: 16 }}>
      
      <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginBottom:4}}>密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="請輸入密碼" secureTextEntry onChangeText={setPassword}/>
        
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>信箱驗證碼</Text>

        <TouchableOpacity onPress={()=>{
          setIsPasswordModalVisible(true)
        }}>
          <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24}}>發送信箱驗證碼</Text>
        </TouchableOpacity>
        </View>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="請輸入信箱驗證碼" onChangeText={setEmailcode}/>
        
        {kyc.phone && <>
           <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
           <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>手機驗證碼</Text>

           <TouchableOpacity onPress={()=>{
          setIsPasswordModalVisible2(true)
        }}>
          <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,borderBottomWidth:1,borderBottomColor:"white"}}>發送手機驗證碼</Text>
        </TouchableOpacity>
           </View>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="請輸入手機驗證碼" onChangeText={setPhonecode}/>
        
        </>}   
        <Text style={{color:"#DDE0E3",fontSize:13,fontWeight:"500",marginTop:24,marginBottom:4}}>新資金密碼</Text>
        <TextInput style={{width:"100%",height:48,backgroundColor:"#242D37",borderRadius:4,paddingLeft:16,color:"white",fontSize:15}} placeholder="請輸入新資金密碼" secureTextEntry onChangeText={setPassword2}/>
        <TouchableOpacity style={{display:"flex",flexDirection:"row",backgroundColor:"#3D6A97",borderRadius:4,justifyContent:"center",alignItems:"center",height:44,marginTop:42}} onPress={()=>{
          //  navigation.navigate("Setting")
          if(!password){
            Alert.alert("請輸入密碼")
          }
          else if(!emailCode){
            Alert.alert("請輸入信箱驗證")
          }
          else if(kyc.phone && !phoneCode){
            Alert.alert("請輸入手機驗證碼")
          }
          else if(!password2){
            Alert.alert("請輸入新資金密碼")
          }
          
          else{
            setLoading(true)
            api.patchData("/user/reset/finance-password",{password:password,mailCode:emailCode,phoneCode:kyc.phone ? phoneCode : null,financePassword:password2}).then(x=>{
              setLoading(false)
              if(x.status !== 400){
                navigation.goBack()
              }else{
                alert(x.data.msg)
              }
            })
          }
          
        }}>
        <Text style={{color:"white",fontSize:14,fontWeight:"500"}}>確認</Text>
      </TouchableOpacity>
      </View>
      <Modal
                isVisible={isPassordModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.9}
                onBackdropPress={() => setIsPasswordModalVisible(false)}
                onSwipeComplete={() => setIsPasswordModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'center', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{
                    backgroundColor: 'rgba(40, 39, 42, 1)',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                    marginLeft: 53,
                    marginRight: 53,
                }}>
                    <PasswordModalContainer>
                        <PasswordModalHeaderText>輸入信箱</PasswordModalHeaderText>
                        {/* <PasswordModalHeaderDetailText>進行出售，請輸入您設定的資金密碼</PasswordModalHeaderDetailText> */}

                        <View style={{
                            height: 32,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 14,
                            marginLeft: 16,
                            marginRight: 16,
                            paddingLeft: 12,
                            paddingRight: 12,
                            borderWidth: 1,
                            borderColor: '#3B393E',
                            borderRadius: 4,
                            alignItems: 'center',
                        }}>
                            <TextInput
                                style={{ width: '100%', color: '#FFFFFF' }}
                                placeholder="輸入信箱"
                                placeholderTextColor={'#98999A'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                value={email}
                                enablesReturnKeyAutomatically
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                    </PasswordModalContainer>
                    <PasswordModalRowLine></PasswordModalRowLine>
                    <PasswordModalButtonContainer>
                        <PasswordModalCancelButton onPress={() => { setIsPasswordModalVisible(false) }}>
                            <PasswordModalCancelButtonText>取消</PasswordModalCancelButtonText>
                        </PasswordModalCancelButton>
                        <PasswordModalButtonLine />
                        <PasswordModalSubmitButton onPress={() => { 
                                      setLoading(true)

                          api.postData("/auth/email/verify-code",{email:email}).then(x=>{
                            setLoading(false)

                            if(x.status != 400){
                              alert("發送成功")
                              setIsPasswordModalVisible(false)
                            }else{
                              alert(x.data.msg)
                            }
                          })
                         }}>
                            <PasswordModalSubmitButtonText>確定</PasswordModalSubmitButtonText>
                        </PasswordModalSubmitButton>
                    </PasswordModalButtonContainer>
                </View>
            </Modal>
            <Modal
                isVisible={isPassordModalVisible2}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.9}
                onBackdropPress={() => setIsPasswordModalVisible2(false)}
                onSwipeComplete={() => setIsPasswordModalVisible2(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'center', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{
                    backgroundColor: 'rgba(40, 39, 42, 1)',
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                    marginLeft: 53,
                    marginRight: 53,
                }}>
                    <PasswordModalContainer>
                        <PasswordModalHeaderText>輸入手機</PasswordModalHeaderText>
                        {/* <PasswordModalHeaderDetailText>進行出售，請輸入您設定的資金密碼</PasswordModalHeaderDetailText> */}

                        <View style={{
                            height: 32,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 14,
                            marginLeft: 16,
                            marginRight: 16,
                            paddingLeft: 12,
                            paddingRight: 12,
                            borderWidth: 1,
                            borderColor: '#3B393E',
                            borderRadius: 4,
                            alignItems: 'center',
                        }}>
                            <TextInput
                                style={{ width: '100%', color: '#FFFFFF' }}
                                placeholder="如：886915547875"
                                placeholderTextColor={'#98999A'}
                                autoCapitalize="none"
                                autoCorrect={false}
                                textContentType="newPassword"
                                value={phone}
                                enablesReturnKeyAutomatically
                                onChangeText={text => setPhone(text)}
                            />
                        </View>
                    </PasswordModalContainer>
                    <PasswordModalRowLine></PasswordModalRowLine>
                    <PasswordModalButtonContainer>
                        <PasswordModalCancelButton onPress={() => { setIsPasswordModalVisible2(false) }}>
                            <PasswordModalCancelButtonText>取消</PasswordModalCancelButtonText>
                        </PasswordModalCancelButton>
                        <PasswordModalButtonLine />
                        <PasswordModalSubmitButton onPress={() => {  
                           setLoading(true)

                           api.postData("/user/phone/verify-code",{phone:phone}).then(x=>{
                            setLoading(false)

                            if(x.status != 400){
                              alert("發送成功")
                              setIsPasswordModalVisible2(false)
                            }else{
                              alert(x.data.msg)
                            }
                          })
                        }}>
                            <PasswordModalSubmitButtonText>確定</PasswordModalSubmitButtonText>
                        </PasswordModalSubmitButton>
                    </PasswordModalButtonContainer>
                </View>
            </Modal>
    </Container>
  );
};

export default ResetFundPassword;
