import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { RootStackScreenProps } from "../../types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import C2cSellFirst from "../../components/c2c/sell/C2cSellFirst";
import C2cSellSecond from "../../components/c2c/sell/C2cSellSecond";
import C2cSellLast from "../../components/c2c/sell/C2cSellLast";
import CountdownTimer from "../../components/c2c/CountdownTimer";
import axios from "axios";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useTranslation } from "react-i18next";

const Container = styled(View)<{ insets: number }>`
  display: flex;
  flex-direction: column;
  padding-top: ${props => props.insets}px;
  background-color: #18222d;
  justify-content: space-between;
  padding-bottom: 200px;
`;

const HeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #18222d;
  padding-top: 12px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 10px;
`;

const PreviousIcon = styled(Image)`
  width: 28px;
  height: 28px;
`;

const HeaderTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.White};
`;

const HeaderEmptyContainer = styled(View)`
  width: 28px;
  height: 28px;
`;

const ProgressBarContainer = styled(View)`
  display: flex;
  flex-direction: row;
`;

const ProgressBarElseLine = styled(View)`
  height: 4px;
  background-color: ${props => props.theme.color.DarkGray};
`;

const TopContainer = styled(View)`
  display: flex;
  flex-direction: column;
  background-color: #18222d;
`;

const TopInColumnContainer = styled(View)`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`;

const TopContainerTitleText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: ${props => props.theme.color.White};
`;

const TopContainerTimerContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;

const TopContainerTimerText = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #fabd43;
`;

const TopContainerTimerMiddleText = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${props => props.theme.color.LightMidGray};
`;

const TopContainerDetailText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top: 4px;
`;

const C2cSellScreen = ({
  navigation,
  route
}: RootStackScreenProps<"C2cSellScreen">) => {
  const insets = useSafeAreaInsets();

  // Props From Previous Screen
  const { Id } = route.params; // 購買商品ID
  const { Owner } = route.params; // 售出者
  const { CryptoAsset } = route.params; // USDT, BTC..
  const { FiatCurrency } = route.params; //法幣
  const { SuccessRate } = route.params; // 成功率
  const { AvailableNum } = route.params; // 數量
  const { LimitFrom } = route.params; // 限額
  const { LimitTo } = route.params; // 限額
  const { Price } = route.params; // 單價
  const { PaymentTimeLimit } = route.params;
  const { From } = route.params;
  const { OrderId } = route.params;
  const { Amount } = route.params;
  const { Quantity } = route.params;
  const { Time } = route.params;
  const { Terms } = route.params;
  //const { Payments } = route.params; // 付款方式Array

  // 先用假資料等之後再將Payments Array內容轉成以下
  //const payTypeAccount = true; // 帳戶付款 Boolean
  //const payTypeTouchnGo = true; // TouchnGo付款 Boolean
  //const payTypePpay = true; // Ppay付款 Boolean

  /* const [payTypeAccount, setPayTypeAccount] = useState(false);
    const [payTypeTouchnGo, setPayTypeTouchnGo] = useState(false);
    const [payTypePpay, setPayTypePpay] = useState(false);
 */

  // Input Price
  const [inputAmount, setInputAmount] = useState("");

  // Input Number
  const [inputNumber, setInputNumber] = useState("");

  // 購買流程
  const [swapPage, setSwapPage] = useState(1);

  // 購買單號
  const [buyId, setBuyId] = useState("");

  // 選擇付款方式
  const [choosePayType, setChoosePaytype] = useState("Account");

  // 訂單時間
  const [buyTime, setBuyTime] = useState(Number);
  const [orderId, setOrderId] = useState("");

  // Countdown Timer (Import CountdownTimer)
  const FIVEMINUTES = 15 * 60 * 1000;

  // USER INFO
  const [account, setAccount] = useState("");
  const [userId, setUserId] = useState("");
  const [buyFeeRate, setBuyFeeRate] = useState();
  const [sellFeeRate, setSellFeeRate] = useState();
  const { t } = useTranslation();
  // Payment
  const [paymentList, setpaymentList] = useState<any[]>([]);

  // 付款確認 等待放行
  const [isWaitFinish, setIsWaitFinish] = useState(0);
  // Countdown Timer (Import CountdownTimer) ms
  const [payTimeLimit, setPayTimeLimit] = useState(Number);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const getUserInfo = async () => {
    let user = await AsyncStorage.getItem("user");

    api.get(`/otc/api/user/${JSON.parse(user!).account}`).then(x => {
      if (x.status != 400 && x.status != 401) {
        setBuyFeeRate(x.buyFeeRate);
        setSellFeeRate(x.sellFeeRate);
      }
    });
  };

  // 獲取訂單付款資訊
  const getOrderPayments = async () => {
    setLoading(true);
    api
      .get(`/user/payment`)
      .then((x: any) => {
        setLoading(false);
        if (x.status != 400 && x.status != 401) {
          setpaymentList(x.data);
        } else {
          Alert.alert("付款資料獲取失敗，請重新操作");
        }
      })
      .catch(Error => console.log(Error));
  };

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    let user = await AsyncStorage.getItem("user");
    setAccount(JSON.parse(user!).account);
    setUserId(JSON.parse(user!).userId);

    if (token) {
      getUserInfo();
      getOrderPayments();
    }
  }, []);
  useEffect(()=>{
    if(From === "order"){
      setOrderId(OrderId)
      setBuyId(OrderId)
      setSwapPage(2)
      setInputAmount(Amount)
      setInputNumber(Quantity)
      setPayTimeLimit(Time)
    }
  },[])

  useEffect(() => {
    api
      .get(`/otc/api/otcOrder/${buyId}`)
      .then((x: any) => {
        if(x.status){
          setStatus(x.status)
        }
      })
      .catch(Error => console.log(Error));
    const interval = setInterval(() => {
      api
        .get(`/otc/api/otcOrder/${buyId}`)
        .then((x: any) => {
          setStatus(x.status)

        })
        .catch(Error => console.log(Error));
    }, 2000);
    return () => clearInterval(interval);
  }, [buyId]);
  /* useEffect(() => {
        if (Payments.some((x: any) => { return x.type == 'BANK' })) {
            setPayTypeAccount(true);
        } else {
            setPayTypeAccount(false);
        };
        if (Payments.some((x: any) => { return x.type == 'TOUCHNGO' })) {
            setPayTypeTouchnGo(true)
        } else {
            setPayTypeTouchnGo(false)
        };
        if (Payments.some((x: any) => { return x.type == 'PPAY' })) {
            setPayTypePpay(true)
        } else {
            setPayTypePpay(false)
        };
    }, [Payments]); */

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container insets={insets.top}>
        {loading && (
          <Spinner
            visible={true}
            textContent={""}
            color={"#FFFFFF"}
            textStyle={{ color: "#FFFFFF" }}
          />
        )}
        <HeaderContainer>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <PreviousIcon
              source={require("../../assets/images/global/previous.png")}
            />
          </TouchableOpacity>
          <HeaderTitleText>{t("fiatSell")} {CryptoAsset}</HeaderTitleText>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderContainer>
        {swapPage === 1 && (
          <C2cSellFirst
            Id={Id}
            Owner={Owner}
            Account={account}
            CurrencyType={CryptoAsset}
            FiatCurrency={FiatCurrency}
            SuccessRate={SuccessRate}
            AvailableNum={AvailableNum}
            LimitFrom={LimitFrom}
            LimitTo={LimitTo}
            Price={Price}
            //PayTypeAccount={payTypeAccount}
            //PayTypeTouchnGo={payTypeTouchnGo}
            //PayTypePpay={payTypePpay}
            Payments={paymentList}
            PaymentTimeLimit={PaymentTimeLimit}
            onValueChangeInputAmount={setInputAmount}
            onValueChangeInputNumber={setInputNumber}
            onChangeSetSwapPage={setSwapPage}
            onValueChangeSetBuyId={setBuyId}
            onValueChangeSetBuyTime={setBuyTime}
            onValueChangeIsWaitFinish={setIsWaitFinish}
            onValueChangePayTimeLimit={setPayTimeLimit}
            setOrderId={setOrderId}
            Terms={Terms}
          />
        )}
        {swapPage === 2 &&
          isWaitFinish === 0 && (
            <TopContainer>
              <ProgressBarContainer>
                <LinearGradient
                  colors={["#A8C2DC", "#6699CC"]}
                  style={{
                    height: 4,
                    width: "33%"
                  }}
                ></LinearGradient>
                <ProgressBarElseLine
                  style={{ width: "67%" }}
                ></ProgressBarElseLine>
              </ProgressBarContainer>
              <TopInColumnContainer>
                <TopContainerTitleText>{t("waitBuyerPay")}</TopContainerTitleText>
                <TopContainerTimerContainer>
                  <CountdownTimer targetDate={payTimeLimit} />
                </TopContainerTimerContainer>
              </TopInColumnContainer>
            </TopContainer>
          )}
        {swapPage === 2 &&
          isWaitFinish === 1 && (
            <TopContainer>
              <ProgressBarContainer>
                <LinearGradient
                  colors={["#A8C2DC", "#6699CC"]}
                  style={{
                    height: 4,
                    width: "66%"
                  }}
                ></LinearGradient>
                <ProgressBarElseLine
                  style={{ width: "34%" }}
                ></ProgressBarElseLine>
              </ProgressBarContainer>
              <TopInColumnContainer>
                <TopContainerTitleText>
                {status === 3 && "等待買方確認交易"}
                {status === 0 && "等待買家付款"}
                {status === 1 && "買方已付款，請放行"}
                {status === 4 && "請確認交易"}
                </TopContainerTitleText>
                <TopContainerTimerContainer>
                  
                  <CountdownTimer targetDate={payTimeLimit} />
                </TopContainerTimerContainer>
              </TopInColumnContainer>
            </TopContainer>
          )}
        {swapPage === 3 &&
          isWaitFinish === 2 && (
            <TopContainer>
              <ProgressBarContainer>
                <LinearGradient
                  colors={["#A8C2DC", "#6699CC"]}
                  style={{
                    height: 4,
                    width: "100%"
                  }}
                ></LinearGradient>
                <ProgressBarElseLine
                  style={{ width: "0%" }}
                ></ProgressBarElseLine>
              </ProgressBarContainer>
              <TopInColumnContainer>
                <TopContainerTitleText>{t("orderFinish")}</TopContainerTitleText>
                <TopContainerDetailText>
                {t("finishMsg")}
                </TopContainerDetailText>
              </TopInColumnContainer>
            </TopContainer>
          )}
        {swapPage === 2 && (
          <C2cSellSecond
            Id={Id}
            Account={account}
            Owner={Owner}
            CurrencyType={CryptoAsset}
            FiatCurrency={FiatCurrency}
            SuccessRate={SuccessRate}
            AvailableNum={AvailableNum}
            LimitFrom={LimitFrom}
            LimitTo={LimitTo}
            Price={Price}
            //PayTypeAccount={payTypeAccount}
            //PayTypeTouchnGo={payTypeTouchnGo}
            //PayTypePpay={payTypePpay}
            BuyAmount={inputAmount}
            BuyNumber={inputNumber}
            ChosenPayType={choosePayType}
            BuyId={buyId}
            IsWaitFinish={isWaitFinish}
            onChangeSetSwapPage={setSwapPage}
            onChangeISWaitFinish={setIsWaitFinish}
            status={status}
          />
        )}
        {swapPage === 3 && (
          <C2cSellLast
            Id={Id}
            CurrencyType={CryptoAsset}
            FiatCurrency={FiatCurrency}
            Price={Price}
            BuyAmount={inputAmount}
            BuyNumber={inputNumber}
            BuyID={buyId}
            //ChosenPayType={choosePayType}
            BuyTime={buyTime}
          />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};
export default C2cSellScreen;
