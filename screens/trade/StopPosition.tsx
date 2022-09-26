import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert
} from "react-native";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #18222d;
  width: 100%;
`;

// Stop Position Modal 當前持倉止盈/止損

const StopPositionRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StopPositionInRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StopPositionColumnContainer = styled(View)`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const StopPositionLabelText = styled(Text)`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: ${props => props.theme.color.LightGray};
  padding-bottom: 4px;
`;

const StopPositionLine = styled(View)`
  height: 1px;
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: #242d37;
`;

const StopPositionButtonRightText = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${props => props.theme.color.ExtraLightGray};
`;

const StopPositionSellVolumnButton = styled(TouchableOpacity)`
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #242d37;
  border-radius: 4px;
  padding: 10px 16px 10px 16px;
`;

const StopPositionSellVolumnButtonText = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${props => props.theme.color.White};
`;

const StopPositionInputContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StopPositionInputRightContainer = styled(View)`
  height: 48px;
  width: 40%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: #242d37;
  justify-content: center;
  align-items: center;
`;

const StopPositionSubmitButton = styled(TouchableOpacity)`
  height: 44px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.PrimaryDark};
  margin-top: 60px;
  border-radius: 4px;
`;

const StopPositionDisabledSubmitButton = styled(TouchableOpacity)`
  height: 44px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.PrimaryDark};
  margin-top: 60px;
  border-radius: 4px;
  opacity: 0.4;
`;

const StopPositionSubmitButtonText = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${props => props.theme.color.White};
`;

// Modal Style

// Modal Global Style
const ModalHeaderContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 26px;
`;

const ModalHedaerTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px
color: ${props => props.theme.color.White};
`;

const ModalYellowSelectedImage = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalNextImage = styled(Image)`
  width: 28px;
  height: 28px;
`;

const ModalRowContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
`;

const ModalButtonText = styled(Text)`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: ${props => props.theme.color.White};
`;

const StopPositionScreen = ({
  navigation,
  route
}: RootStackScreenProps<"StopPositionScreen">) => {
  const insets = useSafeAreaInsets();
  const { remarkPrice } = route.params;
  // Position Detail Button
  const [isStopPositionVisible, setIsStopPositionVisible] = useState(false);
  const [positionStopEarnPrice, setPositionStopEarnPrice] = useState("");
  const [positionStopLostPrice, setPositionStopLostPrice] = useState("");
  const [positionStopEarn_SellPrice, setPositionStopEarn_SellPrice] = useState(
    ""
  );
  const [positionStopLost_SellPrice, setPositionStopLost_SellPrice] = useState(
    ""
  );
  const [loading, setLoading] = useState(false);

  const toggleStopPositionModal = () => {
    setIsStopPositionVisible(!isStopPositionVisible);
  };

  const [
    isPositionSellVolumnVisible,
    setIsPositionSellVoiumnVisible
  ] = useState(false);
  const [positionSellVolumn, setPositionSellVolumn] = useState(0.1);
  const [predictEarning, setPredictEarning] = useState(0);
  const [predictLoss, setPredictLoss] = useState(0);
  const [predictEarningMsg, setPredictEarningMsg] = useState("");
  const [predictLostMsg, setPredictLostMsg] = useState("");
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [positionArray, setPositionArray] = useState({
    avgPrice: "0",
    forceClose: "0"
  });
  const { t } = useTranslation();
  const togglePositionSellVolumnModal = () => {
    setIsPositionSellVoiumnVisible(!isPositionSellVolumnVisible);
  };

  const getPosition = async () => {
    let position = await AsyncStorage.getItem("position");
    let symbol = JSON.parse(position!).position.symbol;
    setSymbol(JSON.parse(position!).position.symbol);
    if (JSON.parse(position!).position.profitPrice) {
      setPositionStopEarnPrice(
        JSON.parse(position!).position.profitPrice.toString()
      );
      api
        .getData(
          `/order/position/stop-price?symbol=${symbol}&profitPrice=` +
            JSON.parse(position!).position.profitPrice
        )
        .then(x => {
          if (x.status === 400) {
            setPredictEarning(0);
            setPredictEarningMsg(t("profitHigherPrice"));
          } else {
            setPredictEarning(x.data);
            setPredictEarningMsg("");
          }
        });
    }
    if (JSON.parse(position!).position.lossPrice) {
      setPositionStopLostPrice(
        JSON.parse(position!).position.lossPrice.toString()
      );
      api
        .getData(
          `/order/position/stop-price?symbol=${symbol}&lossPrice=` +
            JSON.parse(position!).position.lossPrice
        )
        .then(x => {
          if (x.status === 400) {
            setPredictLoss(0);
            setPredictLostMsg(t("lossLowerPrice"));
          } else {
            setPredictLoss(x.data);
            setPredictLostMsg("");
          }
        });
    }
    setPositionArray(JSON.parse(position!).position);
    axios
      .get(
        `https://api1.binance.com/api/v3/ticker/price?symbol=${
          symbol.split("-")[0]
        }USDT`
      )
      .then(x => {
        setPrice(x.data.price.slice(0, -6));
      });
  };
  useEffect(async () => {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      getPosition();
    }
  }, []);

  return (
    <Container>
      <View
        style={{
          backgroundColor: "#18222D",
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 200,
          width: "100%"
        }}
      >
        {loading && <Spinner visible={true} textContent={""} />}
        <StopPositionRowContainer style={{ paddingTop: 16 }}>
          <StopPositionInRowContainer>
            <StopPositionColumnContainer>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("entryPrice")}</Text>
                <Text style={{ color: "white" }}>
                  {parseFloat(positionArray.avgPrice) < 0.006 &&
                  parseFloat(positionArray.avgPrice) > 0
                    ? positionArray.avgPrice
                    : parseFloat(positionArray.avgPrice) < 0.1 &&
                      parseFloat(positionArray.avgPrice) > 0.006
                    ? positionArray.avgPrice.toString().slice(0, -1)
                    : parseFloat(positionArray.avgPrice) < 1 &&
                      parseFloat(positionArray.avgPrice) > 0.1
                    ? positionArray.avgPrice.toString().slice(0, -2)
                    : parseFloat(positionArray.avgPrice) < 50 &&
                      parseFloat(positionArray.avgPrice) > 1
                    ? positionArray.avgPrice.toString().slice(0, -3)
                    : positionArray.avgPrice.toString().slice(0, -4)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("marketPrice")}</Text>
                <Text style={{ color: "white" }}>
                  {parseFloat(remarkPrice) < 0.006 &&
                  parseFloat(remarkPrice) > 0
                    ? remarkPrice
                    : parseFloat(remarkPrice) < 0.1 &&
                      parseFloat(remarkPrice) > 0.006
                    ? remarkPrice.slice(0, -1)
                    : parseFloat(remarkPrice) < 1 &&
                      parseFloat(remarkPrice) > 0.1
                    ? remarkPrice.slice(0, -2)
                    : parseFloat(remarkPrice) < 50 &&
                      parseFloat(remarkPrice) > 1
                    ? remarkPrice.slice(0, -3)
                    : remarkPrice.slice(0, -4)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10,
                  marginBottom: 20
                }}
              >
                <Text style={{ color: "white" }}>{t("liqPrice")}</Text>
                <Text style={{ color: "white" }}>
                  {positionArray.forceClose}
                </Text>
              </View>
              <StopPositionLabelText>
                {t("stopProfitPrice")}
              </StopPositionLabelText>
              <StopPositionInputContainer>
                <TextInput
                  placeholder={t("price")}
                  value={positionStopEarnPrice}
                  onChangeText={async positionStopEarnPrice => {
                    let position = await AsyncStorage.getItem("position");
                    let symbol = JSON.parse(position!).position.symbol;
                    setPositionStopEarnPrice(positionStopEarnPrice);
                    if (positionStopEarnPrice) {
                      api
                        .getData(
                          `/order/position/stop-price?symbol=${symbol}&profitPrice=` +
                            positionStopEarnPrice
                        )
                        .then(x => {
                          if (x.status === 400) {
                            setPredictEarning(0);
                            setPredictEarningMsg(t("profitHigherPrice"));
                          } else {
                            setPredictEarning(x.data);
                            setPredictEarningMsg("");
                          }
                        });
                    } else {
                      setPredictEarning(0);
                    }
                  }}
                  placeholderTextColor={"#8D97A2"}
                  returnKeyType={"done"}
                  keyboardType={"decimal-pad"}
                  style={{
                    backgroundColor: "#242D37",
                    width: "100%",
                    height: 48,
                    color: "#F4F5F6",
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    paddingLeft: 12
                  }}
                />
                <StopPositionInputRightContainer>
                  <StopPositionButtonRightText>
                    USDT
                  </StopPositionButtonRightText>
                </StopPositionInputRightContainer>
              </StopPositionInputContainer>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("positionValue")}</Text>
                <Text style={{ color: "white" }}>{positionArray.avgPrice}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("estimatedPNL")}</Text>
                <Text style={{ color: "white" }}>{predictEarning}</Text>
              </View>
              {predictEarningMsg != "" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    width: "140%"
                  }}
                >
                  <Text style={{ color: "#FB4C51" }}>{predictEarningMsg}</Text>
                </View>
              )}
            </StopPositionColumnContainer>
          </StopPositionInRowContainer>
          {/* <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>賣出價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={t("price")}
                                    value={positionStopEarn_SellPrice}
                                    onChangeText={positionStopEarn_SellPrice => setPositionStopEarn_SellPrice(positionStopEarn_SellPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer> */}
        </StopPositionRowContainer>
        <StopPositionLine></StopPositionLine>
        <StopPositionRowContainer>
          <StopPositionInRowContainer>
            <StopPositionColumnContainer>
              <StopPositionLabelText>
                {t("stopLossPrice")}
              </StopPositionLabelText>
              <StopPositionInputContainer>
                <TextInput
                  placeholder={t("price")}
                  value={positionStopLostPrice}
                  onChangeText={async positionStopLostPrice => {
                    setPositionStopLostPrice(positionStopLostPrice);
                    let position = await AsyncStorage.getItem("position");
                    let symbol = JSON.parse(position!).position.symbol;
                    if (positionStopLostPrice) {
                      api
                        .getData(
                          `/order/position/stop-price?symbol=${symbol}&lossPrice=` +
                            positionStopLostPrice
                        )
                        .then(x => {
                          if (x.status === 400) {
                            setPredictLoss(0);
                            setPredictLostMsg(t("lossLowerPrice"));
                          } else {
                            setPredictLoss(x.data);
                            setPredictLostMsg("");
                          }
                        });
                    } else {
                      setPredictLoss(0);
                    }
                  }}
                  placeholderTextColor={"#8D97A2"}
                  // autoCorrect={false}
                  returnKeyType={"done"}
                  keyboardType={"decimal-pad"}
                  style={{
                    backgroundColor: "#242D37",
                    width: "100%",
                    height: 48,
                    color: "#F4F5F6",
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    paddingLeft: 12
                  }}
                />
                <StopPositionInputRightContainer>
                  <StopPositionButtonRightText>
                    USDT
                  </StopPositionButtonRightText>
                </StopPositionInputRightContainer>
              </StopPositionInputContainer>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("positionValue")}</Text>
                <Text style={{ color: "white" }}>{positionArray.avgPrice}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "140%",
                  marginTop: 10
                }}
              >
                <Text style={{ color: "white" }}>{t("estimatedPNL")}</Text>
                <Text style={{ color: "white" }}>{predictLoss}</Text>
              </View>
              {predictLostMsg != "" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    width: "140%"
                  }}
                >
                  <Text style={{ color: "#FB4C51" }}>{predictLostMsg}</Text>
                </View>
              )}
            </StopPositionColumnContainer>
          </StopPositionInRowContainer>

          {/* <StopPositionInRowContainer>
                        <StopPositionColumnContainer>
                            <StopPositionLabelText>賣出價</StopPositionLabelText>
                            <StopPositionInputContainer>
                                <TextInput
                                    placeholder={t("price")}
                                    value={positionStopLost_SellPrice}
                                    onChangeText={positionStopLost_SellPrice => setPositionStopLost_SellPrice(positionStopLost_SellPrice)}
                                    placeholderTextColor={'#8D97A2'}
                                    autoCorrect={false}
                                    keyboardType={"decimal-pad"}
                                    style={{ backgroundColor: '#242D37', width: '100%', height: 48, color: '#F4F5F6', borderTopLeftRadius: 4, borderBottomLeftRadius: 4, paddingLeft: 12 }}
                                />
                                <StopPositionInputRightContainer>
                                    <StopPositionButtonRightText>USDT</StopPositionButtonRightText>
                                </StopPositionInputRightContainer>
                            </StopPositionInputContainer>
                        </StopPositionColumnContainer>
                    </StopPositionInRowContainer> */}
        </StopPositionRowContainer>
        <StopPositionLine></StopPositionLine>
        {/* <StopPositionLabelText>賣出量</StopPositionLabelText>
                <StopPositionSellVolumnButton onPress={togglePositionSellVolumnModal}>
                    <StopPositionSellVolumnButtonText>{positionSellVolumn}</StopPositionSellVolumnButtonText>
                    <ModalNextImage source={require("../../assets/images/trade/next.png")} />
                </StopPositionSellVolumnButton> */}
        {positionStopEarnPrice !== "" || positionStopLostPrice !== "" ? (
          <StopPositionSubmitButton
            onPress={() => {
              setLoading(true);
              api
                .postData("/order/position/stop-price", {
                  profitPrice: positionStopEarnPrice
                    ? positionStopEarnPrice
                    : null,
                  lossPrice: positionStopLostPrice
                    ? positionStopLostPrice
                    : null,
                  symbol: symbol
                })
                .then(x => {
                  setLoading(false);
                  if (x.status === 400) {
                    if (
                      x.data.msg == "止盈價格需高於倉位平均價格且高於當前價格"
                    ) {
                      Alert.alert(t("profitHigherPrice"));
                    } else if (
                      x.data.msg == "止損價格需低於倉位平均價格且低於當前價格"
                    ) {
                      Alert.alert(t("lossLowerPrice"));
                    } else {
                      Alert.alert(x.data.msg);
                    }
                  } else {
                    Alert.alert("設置成功");
                    navigation.goBack();
                  }
                });
            }}
          >
            <StopPositionSubmitButtonText>
              {t("confirmSend")}
            </StopPositionSubmitButtonText>
          </StopPositionSubmitButton>
        ) : (
          <StopPositionDisabledSubmitButton disabled={true}>
            <StopPositionSubmitButtonText>
              {t("confirmSend")}
            </StopPositionSubmitButtonText>
          </StopPositionDisabledSubmitButton>
        )}

        {/*Sell Volumn Modal 賣出量 */}
        <Modal
          isVisible={isPositionSellVolumnVisible}
          deviceHeight={windowHeight}
          deviceWidth={windowWidth}
          animationInTiming={500}
          animationOutTiming={700}
          backdropOpacity={0.7}
          onBackdropPress={() => setIsPositionSellVoiumnVisible(false)}
          onSwipeComplete={() => setIsPositionSellVoiumnVisible(false)}
          swipeDirection={["down"]}
          style={{ justifyContent: "flex-end", margin: 0 }}
          hideModalContentWhileAnimating={true}
        >
          <View
            style={{
              backgroundColor: "#242D37",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 20
            }}
          >
            <ModalHeaderContainer>
              <ModalHedaerTitleText>賣出量</ModalHedaerTitleText>
            </ModalHeaderContainer>
            <TouchableOpacity
              onPress={() => {
                setPositionSellVolumn(0.1),
                  setIsPositionSellVoiumnVisible(false);
              }}
            >
              <ModalRowContainer>
                <ModalButtonText>100% (0.1)</ModalButtonText>
                {positionSellVolumn === 0.1 && (
                  <ModalYellowSelectedImage
                    source={require("../../assets/images/trade/YellowSelected.png")}
                  />
                )}
              </ModalRowContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPositionSellVolumn(0.075),
                  setIsPositionSellVoiumnVisible(false);
              }}
            >
              <ModalRowContainer>
                <ModalButtonText>75% (0.075)</ModalButtonText>
                {positionSellVolumn === 0.075 && (
                  <ModalYellowSelectedImage
                    source={require("../../assets/images/trade/YellowSelected.png")}
                  />
                )}
              </ModalRowContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPositionSellVolumn(0.05),
                  setIsPositionSellVoiumnVisible(false);
              }}
            >
              <ModalRowContainer>
                <ModalButtonText>50% (0.05)</ModalButtonText>
                {positionSellVolumn === 0.05 && (
                  <ModalYellowSelectedImage
                    source={require("../../assets/images/trade/YellowSelected.png")}
                  />
                )}
              </ModalRowContainer>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPositionSellVolumn(0.025),
                  setIsPositionSellVoiumnVisible(false);
              }}
            >
              <ModalRowContainer>
                <ModalButtonText>25% (0.025)</ModalButtonText>
                {positionSellVolumn === 0.025 && (
                  <ModalYellowSelectedImage
                    source={require("../../assets/images/trade/YellowSelected.png")}
                  />
                )}
              </ModalRowContainer>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </Container>
  );
};

export default StopPositionScreen;
