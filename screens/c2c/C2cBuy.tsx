import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView
} from "react-native";
import { RootStackScreenProps } from "../../types";
import styled from "styled-components";
import { useEffect, useState,useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import C2cBuyFirst from "../../components/c2c/buy/C2cBuyFirst";
import C2cBuySecond from "../../components/c2c/buy/C2cBuySecond";
import C2cBuyLast from "../../components/c2c/buy/C2cBuyLast";
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

const TopContainerDetailText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top: 4px;
`;

const C2cBuyScreen = ({
  navigation,
  route
}: RootStackScreenProps<"C2cBuyScreen">) => {
  const insets = useSafeAreaInsets();

  // Props From Previous Screen
  const { Id } = route.params; // 購買商品ID
  const { Owner } = route.params; //Email
  const { CryptoAsset } = route.params; // USDT, BTC..
  const { FiatCurrency } = route.params; //法幣
  const { SuccessRate } = route.params; // 成功率
  const { AvailableNum } = route.params; // 數量
  const { LimitFrom } = route.params; // 限額
  const { LimitTo } = route.params; // 限額
  const { Price } = route.params; // 單價
  const { Payments } = route.params; // 付款方式Array
  const { PaymentTimeLimit } = route.params;
  const { From } = route.params;
  const { OrderId } = route.params;
  const { Amount } = route.params;
  const { Quantity } = route.params;
  const { Time } = route.params;
  const { Terms } = route.params;
  // 先用假資料等之後再將Payments Array內容轉成以下
  // const payTypeAccount = true; // 帳戶付款 Boolean
  // const payTypeTouchnGo = true; // TouchnGo付款 Boolean
  // const payTypePpay = true; // Ppay付款 Boolean

  const [payTypeAccount, setPayTypeAccount] = useState(false);
  const [payTypeTouchnGo, setPayTypeTouchnGo] = useState(false);
  const [payTypePpay, setPayTypePpay] = useState(false);

  // Input Price
  const [inputAmount, setInputAmount] = useState("");

  // Input Number
  const [inputNumber, setInputNumber] = useState("");

  // 購買流程
  const [swapPage, setSwapPage] = useState(1);

  // 選擇付款方式
  const [choosePayType, setChoosePaytype] = useState("");

  // USER INFO
  const [account, setAccount] = useState("");
  const [userId, setUserId] = useState("");
  const [buyFeeRate, setBuyFeeRate] = useState();
  const [sellFeeRate, setSellFeeRate] = useState();

  // Sent Buy Response
  const [buyId, setBuyId] = useState("");
  const [header, setHeader] = useState("");
  const [buyTime, setBuyTime] = useState(Number);
  // 付款確認 等待放行
  const [isWaitFinish, setIsWaitFinish] = useState(0);

  const [payTimeLimit, setPayTimeLimit] = useState(Number);

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(0);
  const { t } = useTranslation();
  const getUserInfo = async () => {
    let user = await AsyncStorage.getItem("user");
    api.get(`/otc/api/user/${JSON.parse(user!).account}`).then(x => {
      if (x.status != 400 && x.status != 401) {
        setBuyFeeRate(x.buyFeeRate);
        setSellFeeRate(x.sellFeeRate);
      }
    });
  };

  // 判斷付款類型
  const checkPaymentType = () => {
    if (
      Payments.some((x: any) => {
        return x.type == "BANK";
      })
    ) {
      setPayTypeAccount(true);
    }
    if (
      Payments.some((x: any) => {
        return x.type == "TOUCHNGO";
      })
    ) {
      setPayTypeTouchnGo(true);
    }
    if (
      Payments.some((x: any) => {
        return x.type == "PPAY";
      })
    ) {
      setPayTypePpay(true);
    }
  };

  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    let user = await AsyncStorage.getItem("user");
    setAccount(JSON.parse(user!).account);
    setUserId(JSON.parse(user!).userId);

    if (token) {
      getUserInfo();
      checkPaymentType();
    }
  }, []);

  useEffect(() => {
    if (From === "order") {
      setBuyId(OrderId);
      setSwapPage(2);
      setInputAmount(Amount)
      setInputNumber(Quantity)
      setPayTimeLimit(Time)

    }
  }, []);

  useEffect(() => {
    api
      .get(`/otc/api/otcOrder/${buyId}`)
      .then((x: any) => {
          setStatus(x.status);
      })
      .catch(Error => console.log(Error));
    const interval = setInterval(() => {
      api
        .get(`/otc/api/otcOrder/${buyId}`)
        .then((x: any) => {
            if(x.status === 3){
              setHeader("請確認交易")
            }else if(x.status ===0){
              setHeader("請付款")

            }else if(x.status ===1){
              setHeader("等待放行中")

            }else if(x.status === 4){
              setHeader("等待賣家確認交易")
            }
            setStatus(x.status);
        })
        .catch(Error => console.log(Error));
    }, 1000);
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
          <HeaderTitleText>{t("fiatBuy")} {CryptoAsset}</HeaderTitleText>
          <HeaderEmptyContainer></HeaderEmptyContainer>
        </HeaderContainer>
        {swapPage === 1 && (
          <C2cBuyFirst
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
            PayTypeAccount={payTypeAccount}
            PayTypeTouchnGo={payTypeTouchnGo}
            PayTypePpay={payTypePpay}
            PaymentTimeLimit={PaymentTimeLimit}
            onValueChangeInputAmount={setInputAmount}
            onValueChangeInputNumber={setInputNumber}
            onChangeSetSwapPage={setSwapPage}
            onValueChangeSetBuyId={setBuyId}
            onValueChangeSetBuyTime={setBuyTime}
            onValueChangeIsWaitFinish={setIsWaitFinish}
            onValueChangePayTimeLimit={setPayTimeLimit}
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
                <TopContainerTitleText>
                  {header}
                </TopContainerTitleText>
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
                <TopContainerTitleText>{t("waitSellerTransfer")}</TopContainerTitleText>
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
                {t("fiatOrderFinishedMsg")}
                </TopContainerDetailText>
              </TopInColumnContainer>
            </TopContainer>
          )}
        {swapPage === 2 && (
          <C2cBuySecond
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
            PayTypeAccount={payTypeAccount}
            PayTypeTouchnGo={payTypeTouchnGo}
            PayTypePpay={payTypePpay}
            BuyAmount={inputAmount}
            BuyNumber={inputNumber}
            onChangeSetSwapPage={setSwapPage}
            onChangeSetChoosePayType={setChoosePaytype}
            onValueChangeIsWaitFinish={setIsWaitFinish}
            BuyTime={buyTime}
            BuyId={buyId}
            IsWaitFinish={isWaitFinish}
            status={status}
          />
        )}
        {swapPage === 3 &&
          isWaitFinish === 2 && (
            <C2cBuyLast
              Id={Id}
              CurrencyType={CryptoAsset}
              FiatCurrency={FiatCurrency}
              Price={Price}
              BuyAmount={inputAmount}
              BuyNumber={inputNumber}
              BuyID={buyId}
              ChosenPayType={choosePayType}
              BuyTime={buyTime}
            />
          )}
      </Container>
    </TouchableWithoutFeedback>
  );
};
export default C2cBuyScreen;
