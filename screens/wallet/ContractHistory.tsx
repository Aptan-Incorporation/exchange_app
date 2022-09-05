import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useState, useEffect } from "react";
import api from "../../common/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Container = styled(ScrollView)`
  display: flex;
  flex-direction: column;
  background-color: #18222d;
  border: none;
  flex:1;
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

// Assets Record Style
const AssetsRecordTitleContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const AssetsRecordDetailContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding-top: 5px;
`;

const AssetsRecordTitleText = styled(Text)`
font-weight: 400;
font-size: 15px;
line-height: 24px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const AssetsRecordTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.MidGray};
`;

const AssetsRecordAmountText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const AssetsRecordTypeLeverageTextSecondary = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const AssetsRecordTypeLeverageTextSecondaryLight = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const AssetsRecordEarnRatePositiveText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.Secondary};
`;

const AssetsRecordEarnRateNegativeText = styled(Text)`
font-weight: 600;
font-size: 13px;
line-height: 16px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-left: 16px;
padding-right: 16px;
`;

const CardLine = styled(View)`
height: 2px;
background-color: #242D37;
margin-top: 20px;
`;

const AssetsRecordArray = [
  {
      title: '手續費',
      typeName: 'ETHUSDT',
      leverage: 10,
      time: '2021-10-19 13:35:08',
      amount: '-5.0000',
      amountCurrency: 'USDT',
      type: 'buy'
  },
  {
      title: '開倉',
      typeName: 'ETHUSDT',
      leverage: 10,
      time: '2021-10-19 13:35:08',
      amount: '',
      amountCurrency: '',
      type: 'buy'
  },
  {
      title: '手續費',
      typeName: 'BTCUSDT',
      leverage: 20,
      time: '2021-10-19 13:14:22',
      amount: '-5.0000',
      amountCurrency: 'USDT',
      type: 'sell'
  },
  {
      title: '開倉',
      typeName: 'BTCUSDT',
      leverage: 20,
      time: '2021-10-19 13:14:22',
      amount: '',
      amountCurrency: '',
      type: 'sell'
  },
  {
      title: '平倉盈虧',
      typeName: 'DOGEUSDT',
      leverage: 5,
      time: '2021-10-18 21:21:56',
      amount: '6,000.00',
      amountCurrency: 'USDT',
      type: 'buy'
  },
  {
      title: '平倉盈虧',
      typeName: 'DOGEUSDT',
      leverage: 1,
      time: '2021-10-17 17:26:45',
      amount: '3,000.00',
      amountCurrency: 'USDT',
      type: 'sell'
  },
  {
      title: '強平',
      typeName: 'BTCUSDT',
      leverage: 15,
      time: '2021-10-16 12:38:09',
      amount: '-2,000.00',
      amountCurrency: 'USDT',
      type: 'buy'
  },
];

const ContractHistory = ({ navigation }: RootStackScreenProps<"ContractHistory">) => {
  const [positionArray, setPositionArray] = useState([]);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const getPosition = () => {
    api.get("/investor/finance?type=20").then(x => {
      setPositionArray(x.data);
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
        <HeaderText>{t("fundTransactionHistory")}</HeaderText>
        <View></View>
      </Header>
      {
        positionArray.map((x:any, i) => {
          return (
              <CardContainer>
                  <AssetsRecordTitleContainer>
                      <AssetsRecordTitleText>{x.remark}</AssetsRecordTitleText>
                      {
                          x.payment !== '' ?
                              <AssetsRecordAmountText>{x.payment} {x.coin}</AssetsRecordAmountText> :
                              <AssetsRecordAmountText>--</AssetsRecordAmountText>

                      }
                  </AssetsRecordTitleContainer>
                  <AssetsRecordDetailContainer>
                    <AssetsRecordTimeText>{new Date(x.createdDate).toISOString().split("T")[0]} {new Date(x.createdDate).toISOString().split("T")[1].split(".")[0]}</AssetsRecordTimeText>
                      {/* {
                          x.type === 'buy' ?
                              <AssetsRecordTypeLeverageTextSecondary>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondary> :
                              <AssetsRecordTypeLeverageTextSecondaryLight>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondaryLight>
                      } */}
                  </AssetsRecordDetailContainer>
                  {
                      i !== AssetsRecordArray.length - 1 &&
                      <CardLine></CardLine>
                  }
              </CardContainer>
          )
      })
      }
    </Container>
  );
};

export default ContractHistory;
