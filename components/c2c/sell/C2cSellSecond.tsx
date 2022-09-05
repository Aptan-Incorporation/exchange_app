import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Container = styled(ScrollView)`
  display: flex;
  flex-direction: column;
  background-color: #18222d;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 200px;
`;

// First Card Style
const FirstCardContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 20px;
  background-color: #242d37;
  border-radius: 8px;
`;

const FirstCardRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const FirstCardFirstRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const FirstCardFirstInRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const FirstCardTitleText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.MidGray};
`;

const FirstCardPriceText = styled(Text)`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: ${props => props.theme.color.SecondaryLight};
  padding-right: 4px;
`;

const FirstCardPriceCurrencyText = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.color.SecondaryLight};
`;

const FirstCardValueText = styled(Text)`
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: ${props => props.theme.color.ExtraLightGray};
`;

// Second Card Style
const SecondCardContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 20px;
  background-color: #242d37;
  border-radius: 8px;
  margin-top: 16px;
`;

const SecondCardTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.White};
`;

const SecondCardDetailText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top: 8px;
`;

const SecondCardPayTypeRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const BankAccountButtonClicked = styled(TouchableOpacity)`
  width: 67px;
  height: 32px;
  background-color: ${props => props.theme.color.PrimaryDark};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const BankAccountButton = styled(TouchableOpacity)`
  width: 67px;
  height: 32px;
  background-color: ${props => props.theme.color.DarkGray};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const TouchnGoButtonClicked = styled(TouchableOpacity)`
  width: 104px;
  height: 32px;
  background-color: ${props => props.theme.color.PrimaryDark};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const TouchnGoButton = styled(TouchableOpacity)`
  width: 104px;
  height: 32px;
  background-color: ${props => props.theme.color.DarkGray};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const PpayButtonClicked = styled(TouchableOpacity)`
  width: 59px;
  height: 32px;
  background-color: ${props => props.theme.color.PrimaryDark};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const PpayButton = styled(TouchableOpacity)`
  width: 59px;
  height: 32px;
  background-color: ${props => props.theme.color.DarkGray};
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-right: 8px;
`;

const PayTypeButtonClickedText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.White};
`;

const PayTypeButtonText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.MidGray};
`;

const PayBottomContainer = styled(View)``;

const SecondCardPayDetailContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const SecondCardPayDetailInRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SecondCardPayDetailTitleText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.MidGray};
`;

const SecondCardPayDetailValueText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.ExtraLightGray};
`;

const DuplicateIcon = styled(Image)`
  width: 18px;
  height: 18px;
`;

const QRCodeText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.PrimaryLight};
`;

const BottomButtonContainer = styled(View)`
display: flex;
flex-direction: row
justify-content: space-between;
margin-top: 37px;
padding-bottom: 200px;
`;

const CancelButton = styled(TouchableOpacity)`
  width: 25%;
  height: 44px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.color.Primary};
  border-radius: 4px;
`;

const CancelButtonText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.Primary};
`;

const SubmitButton = styled(TouchableOpacity)`
  padding: 12px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.PrimaryDark};
  border-radius: 4px;
`;

const SubmitButtonText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.White};
`;

// Modal Style
const ModalHeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 26px;
`;

const ModalHedaerTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px
color: ${props => props.theme.color.White};
`;

const ModalLeftCancelButton = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalEmptyDiv = styled(View)`
  width: 28px;
  height: 28px;
`;

const QRCodeContainer = styled(View)`
  width: 224px;
  height: 224px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.White};
`;

const QRCodeImage = styled(Image)`
  width: 137px;
  height: 137px;
`;

const ModalDetailText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top: 24px;
`;

// Array

const PayAccountArray = {
  name: "劉以彤",
  bank: "807 永豐銀行",
  account: "0000194612644252"
};

const PayTouchnGoArray = {
  name: "劉以彤",
  account: "938712386",
  qrcode: ""
};

const PpayArray = {
  name: "劉以彤",
  account: "938712386",
  qrcode: ""
};

const TouchnGoQRCode = "../../../assets/images/c2c/qrcode.png";

const PpayQRCode = "../../../assets/images/c2c/qrcode.png";

const C2cSellSecond = (props: {
  Id?: string;
  Account: string;
  Owner: string;
  CurrencyType: string;
  FiatCurrency: string;
  SuccessRate: number;
  AvailableNum: string;
  LimitFrom: string;
  LimitTo: string;
  Price: string;
  //PayTypeAccount: boolean;
  //PayTypeTouchnGo: boolean;
  //PayTypePpay: boolean;
  BuyAmount: string;
  BuyNumber: string;
  ChosenPayType: string;
  BuyId: string;
  IsWaitFinish: number;
  onChangeSetSwapPage: React.Dispatch<React.SetStateAction<number>>;
  onChangeISWaitFinish: React.Dispatch<React.SetStateAction<number>>;
  status: number;
}) => {
  const {
    Id,
    Account,
    Owner,
    CurrencyType,
    FiatCurrency,
    SuccessRate,
    AvailableNum,
    LimitFrom,
    LimitTo,
    Price,
    //PayTypeAccount,
    //PayTypeTouchnGo,
    //PayTypePpay,
    BuyAmount,
    BuyNumber,
    ChosenPayType,
    BuyId,
    IsWaitFinish,
    onChangeSetSwapPage,
    onChangeISWaitFinish,
    status
  } = props;

  const getRandom = (x: number) => {
    return (Math.floor(Math.random() * x) + 1).toString();
  };

  //選擇付款方式
  const [choosePayType, setChoosePaytype] = useState(ChosenPayType);
  const [status2, setStatus2] = useState(0);
  const { t } = useTranslation();
  // QRCode Modal
  const [isQRCodeModalVisible, setIsQRCodeModalVisible] = useState(false);

  const toggleQRCodeModal = () => {
    setIsQRCodeModalVisible(!isQRCodeModalVisible);
  };

  const navigation = useNavigation();

  // 送出訂單，下一步

  const [submitText, setSubmitText] = useState("付款中...");

  const SubmitAlert = () => {

    if(status === 4){
      api.postData(`/otc/api/otcOrder/${BuyId}/check`)
      .then((x) => {
        console.log(x)
        if(x.status === 400){
          alert(x.data.msg)
        }else{
          getStatus()
        }
      })
    }else{
      Alert.alert(
        "確定放行？",
        "請核對收到的款項無誤，點擊確定後系統將放行您的資金給買方。",
        [
          {
            text: "取消",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "確定",
            onPress: () => {
              handleConfirm();
            }
          }
        ]
      );
    }
    
  };

  // 驗證是否已放行 （暫時不驗證）
  const handleConfirm = () => {
    api.postData(`/otc/api/otcOrder/${BuyId}/confirm`)
             .then((x) => {
                 if (x.status != 400 && x.status != 401) {
                     onChangeISWaitFinish(2)
                     onChangeSetSwapPage(3)
                 } else {
                     Alert.alert(x.data.msg)
                 }
    })
    // onChangeISWaitFinish(2);
    // onChangeSetSwapPage(3);
  };

  // Button Style
  const handleButtonDisabled = () => {
    if (submitText === "確認收款並放行" || submitText === "確認交易") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmitButtonStyle = () => {
    if (submitText === "確認收款並放行" || submitText === "確認交易") {
      return "#3D6A97";
    } else {
      return "rgba(102, 153, 204, 0.3)";
    }
  };

  const handleSubmitButtonTextStyle = () => {
    if (submitText === "確認收款並放行" || submitText === "確認交易") {
      return "#FFFFFF";
    } else {
      return "rgba(255, 255, 255, 0.3)";
    }
  };

  // 獲取付款資訊

  //付款資料
  /* const [accountDetail, setAccountDetail] = useState([]);
    const [touchnGoDetail, setTouchnGoDetail] = useState([]);
    const [pPayDetail, setPpayDetail] = useState([]);

    const getPaymentsDetail = () => {
        api.get(`/otc/api/otcOrder/${BuyId}/payments/`)
            .then((x => {
                if (x.status != 400 && x.status != 401) {
                    x.map((data: any) => {
                        if (data.type === 'BANK') {
                            setAccountDetail(data)
                        } else if (data.type === 'TOUCHNGO') {
                            setTouchnGoDetail(data)
                        } else if (data.type === 'PPAY') {
                            setPpayDetail(data)
                        }
                    })
                } else {
                    Alert.alert(x.data.msg)
                }
            }))
    }; */

  // 更新訂單訊息
  const getPaidStatus = () => {
    // 按下付款後獲取訂單狀態，用以切換頁面
    /* api.get(`/otc/api/otcOrder/${BuyId}`)
            .then((x => {
                if (x.status != 400 && x.status != 401) {
                    if (x.status === 0) {
                        onChangeISWaitFinish(0)
                    } else if (x.status === 1) {
                        onChangeISWaitFinish(1)
                        setSubmitText('確認收款並放行')
                    } else {
                        Alert.alert("訂單錯誤，請重新操作")
                    }
                } else {
                    Alert.alert(x.data.msg)
                }
            })) */
    onChangeISWaitFinish(1);
    setSubmitText("確認收款並放行");
  };

  /* useEffect(() => { // 每10秒更新訂單狀態

        //getPaymentsDetail();

        const interval = setInterval(() => {
            if (submitText === '付款中...') {
                getPaidStatus()
            }

        }, 10000);

        return () => clearInterval(interval);
    });

 */
 const getStatus = ()=>{
  api
  .get(`/otc/api/otcOrder/${BuyId}`)
  .then((x: any) => {
    if(x.status){
      console.log(x)
      setStatus2(x.status)
    }
  })
  .catch(Error => console.log(Error));
  
 }

  useEffect(() => {
    if (submitText === "付款中...") {
      getPaidStatus();
    }
  }, []);

  useEffect(() => {
    getStatus()
    const interval = setInterval(() => {
      api
        .get(`/otc/api/otcOrder/${BuyId}`)
        .then((x: any) => {
          // console.log(x.status);
          setStatus2(x.status)

        })
        .catch(Error => console.log(Error));
    }, 2000);
    console.log(status2)
    if (status2 === 3) {
      setSubmitText("等待買家確認交易");
    }else if(status2 === 4) {
      setSubmitText("確認交易");
    } else if(status2 ===0){
      setSubmitText("確認收款並放行");
    }else if(status2 ===1){
      setSubmitText("確認收款並放行");
    }
    if(status === -1){
        alert(t("fiatOrderCanceled"))
        navigation.goBack()
    }
  }, [status,status2]);

  return (
    <Container>
      <FirstCardContainer>
        <FirstCardFirstRowContainer>
          <FirstCardTitleText>{t("fiatTotal")}</FirstCardTitleText>
          <FirstCardFirstInRowContainer>
            <FirstCardPriceText>{BuyAmount}</FirstCardPriceText>
            <FirstCardPriceCurrencyText>
              {FiatCurrency}
            </FirstCardPriceCurrencyText>
          </FirstCardFirstInRowContainer>
        </FirstCardFirstRowContainer>
        <FirstCardRowContainer>
          <FirstCardTitleText>{t("amount")}</FirstCardTitleText>
          <FirstCardValueText>
            {BuyNumber} {CurrencyType}
          </FirstCardValueText>
        </FirstCardRowContainer>
        <FirstCardRowContainer>
          <FirstCardTitleText>{t("unitPrice")}</FirstCardTitleText>
          <FirstCardValueText>
            {Price} {FiatCurrency}
          </FirstCardValueText>
        </FirstCardRowContainer>
        <FirstCardRowContainer>
          <FirstCardTitleText>{t("fiatOrderNumber")}</FirstCardTitleText>
          <View style={{ alignItems: "flex-end" }}>
            <FirstCardValueText>{BuyId.slice(0, 28)}</FirstCardValueText>
            <FirstCardValueText>{BuyId.slice(28)}</FirstCardValueText>
          </View>
        </FirstCardRowContainer>
      </FirstCardContainer>
      {/*  <SecondCardContainer>
                <SecondCardTitleText>收款方式</SecondCardTitleText>
                <SecondCardDetailText>等待買方選擇欲付款方式並完成付款</SecondCardDetailText>
                <SecondCardPayTypeRowContainer>
                    {
                        PayTypeAccount &&
                        (choosePayType == 'Account' ?
                            <BankAccountButtonClicked onPress={() => { setChoosePaytype('Account') }} disabled={true}>
                                <PayTypeButtonClickedText>銀行卡</PayTypeButtonClickedText>
                            </BankAccountButtonClicked> :
                            <BankAccountButton onPress={() => { setChoosePaytype('Account') }} disabled={true}>
                                <PayTypeButtonText>銀行卡</PayTypeButtonText>
                            </BankAccountButton>)
                    }
                    {
                        PayTypeTouchnGo &&
                        (choosePayType == 'TouchnGo' ?
                            <TouchnGoButtonClicked onPress={() => { setChoosePaytype('TouchnGo') }} disabled={true}>
                                <PayTypeButtonClickedText>Touch'n Go</PayTypeButtonClickedText>
                            </TouchnGoButtonClicked> :
                            <TouchnGoButton onPress={() => { setChoosePaytype('TouchnGo') }} disabled={true}>
                                <PayTypeButtonText>Touch'n Go</PayTypeButtonText>
                            </TouchnGoButton>)
                    }
                    {
                        PayTypePpay &&
                        (choosePayType == 'Ppay' ?
                            <PpayButtonClicked onPress={() => { setChoosePaytype('Ppay') }} disabled={true}>
                                <PayTypeButtonClickedText>Ppay</PayTypeButtonClickedText>
                            </PpayButtonClicked> :
                            <PpayButton onPress={() => { setChoosePaytype('Ppay') }} disabled={true}>
                                <PayTypeButtonText>Ppay</PayTypeButtonText>
                            </PpayButton>)
                    }
                </SecondCardPayTypeRowContainer>
                {
                    choosePayType === 'Account' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{accountDetail.name}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>銀行名稱</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{accountDetail.code}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>銀行帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{accountDetail.account}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
                {
                    choosePayType === 'TouchnGo' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayTouchnGoArray.name}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PayTouchnGoArray.account}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>二維碼</SecondCardPayDetailTitleText>
                            <TouchableOpacity onPress={() => { toggleQRCodeModal() }}>
                                <QRCodeText>查看</QRCodeText>
                            </TouchableOpacity>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
                {
                    choosePayType === 'Ppay' &&
                    <PayBottomContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>帳戶姓名</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PpayArray.name}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>支付帳號</SecondCardPayDetailTitleText>
                            <SecondCardPayDetailInRowContainer>
                                <SecondCardPayDetailValueText>{PpayArray.account}</SecondCardPayDetailValueText>
                            </SecondCardPayDetailInRowContainer>
                        </SecondCardPayDetailContainer>
                        <SecondCardPayDetailContainer>
                            <SecondCardPayDetailTitleText>二維碼</SecondCardPayDetailTitleText>
                            <TouchableOpacity onPress={() => { toggleQRCodeModal() }}>
                                <QRCodeText>查看</QRCodeText>
                            </TouchableOpacity>
                        </SecondCardPayDetailContainer>
                    </PayBottomContainer>
                }
            </SecondCardContainer> */}
      <BottomButtonContainer>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
                "確定取消訂單？",
                "惡意取消訂單若達到 3 次或更多，您帳戶的部分功能將暫時禁用。",
                [
                    {
                        text: "取消",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "確定", onPress: () => { 
                        api.postData(`/otc/api/otcOrder/${BuyId}/cancel`, {}).then(x => {
                          console.log(x)
                      if (x.status != 400) {
                        alert(t("fiatOrderCanceled"));
                        navigation.goBack()
                      }else{
                          alert(x.data.msg)
                      }
                    }); } }
                ]
            );
            
          }}
          style={{
            borderWidth: 1,
            borderColor: "#6699CC",
            borderRadius: 4,
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
            width:"25%"
          }}
          disabled={(status === 1 || status === 0) ? true : false}
        >
          <SubmitButtonText style={{ color: "#6699CC" }}>
            取消訂單
          </SubmitButtonText>
        </TouchableOpacity>
        {status === 1 && 
        <TouchableOpacity
        onPress={() => {
          Alert.alert(
            t("sureApeal"),
            t("appealMsg"),
              [
                  {
                      text: t("cancel"),
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                  },
                  { text: t("OK"), onPress: () => { 
                      api.postData(`/otc/api/otcOrder/${BuyId}/appeal`, {}).then(x => {
                      console.log(x.data)
                  //   if (x.status != 400) {
                  //     alert("訂單申訴成功");
                  //     navigation.goBack()
                  //   }else{
                  //       alert(x.data.msg)
                  //   }
                  }); } }
              ]
          );
        }}
        style={{
          borderWidth: 1,
          borderColor: "#FB4C51",
          borderRadius: 4,
          padding: 12,
          justifyContent: "center",
          alignItems: "center",
          width:"25%"

        }}
      >
<SubmitButtonText style={{ color: "#FB4C51" }}>{t("apeal")}</SubmitButtonText>
      </TouchableOpacity>}
        
        <SubmitButton
          onPress={() => {
            SubmitAlert();
          }}
          disabled={handleButtonDisabled()}
          style={{ backgroundColor: handleSubmitButtonStyle() }}
        >
          <SubmitButtonText style={{ color: handleSubmitButtonTextStyle() }}>
            {submitText === "等待買家確認交易" ? t("fiatBuyerCheck2") : submitText}
          </SubmitButtonText>
        </SubmitButton>
      </BottomButtonContainer>

      {/* <Modal
                isVisible={isQRCodeModalVisible}
                deviceHeight={windowHeight}
                deviceWidth={windowWidth}
                animationInTiming={500}
                animationOutTiming={700}
                backdropOpacity={0.7}
                onBackdropPress={() => setIsQRCodeModalVisible(false)}
                onSwipeComplete={() => setIsQRCodeModalVisible(false)}
                swipeDirection={['down']}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                hideModalContentWhileAnimating={true}
            >
                <View style={{ backgroundColor: '#242D37', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 30 }}>
                    <ModalHeaderContainer>
                        <TouchableOpacity onPress={() => { setIsQRCodeModalVisible(false) }}>
                            <ModalLeftCancelButton source={require("../../../assets/images/trade/cancel.png")} />
                        </TouchableOpacity>
                        <ModalHedaerTitleText>二維碼</ModalHedaerTitleText>
                        <ModalEmptyDiv></ModalEmptyDiv>
                    </ModalHeaderContainer>

                    {
                        choosePayType === 'TouchnGo' &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <QRCodeContainer>
                                <QRCodeImage source={require(TouchnGoQRCode)} />
                            </QRCodeContainer>
                            <ModalDetailText>Touch’n Go 用戶掃描此行動條碼後，即可進行付款。</ModalDetailText>
                        </View>
                    }
                    {
                        choosePayType === 'Ppay' &&
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <QRCodeContainer>
                                <QRCodeImage source={require(PpayQRCode)} />
                            </QRCodeContainer>
                            <ModalDetailText>Ppay 用戶掃描此行動條碼後，即可進行付款。</ModalDetailText>
                        </View>
                    }

                </View>
            </Modal> */}
    </Container>
  );
};

export default C2cSellSecond;
