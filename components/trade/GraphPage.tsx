import * as React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from "react-native"
import Modal from "react-native-modal";
import styled from "styled-components"
import { useState } from "react";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Graph Page Header Style
const GraphHeaderContainer = styled(View)`
display: flex;
flex-direction: column;
margin-top: 13px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 12px;
`;

const GraphHeaderTopRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
padding-bottom: 13px;
`;

const GraphHeaderBottomRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const GraphHeaderBottomRowColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const GraphHeaderBottomInlineRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const GraphHeaderBigTitleText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.White};
`;

const GraphHeaderFluctuationRiseText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
background-color: rgba(47, 178, 100, 0.3);
margin-left: 12px;
`;

const GraphHeaderFluctuationFallText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
background-color: rgba(251, 76, 81, 0.3);
margin-left: 12px;
`;

const GraphHeaderTitleRisePriceText = styled(Text)`
font-weight: 700;
font-size: 32px;
line-height: 40px;
color: ${props => props.theme.color.Secondary};
`;

const GraphHeaderTitleFallPriceText = styled(Text)`
font-weight: 700;
font-size: 32px;
line-height: 40px;
color: ${props => props.theme.color.SecondaryLight};
`;

const GraphHeaderSmallTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
margin-right: 8px;
`;

const GraphHeaderSmallValueText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.White};
`;

// Graph Page Style
const GraphContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
width: 100%;
`;

const GraphContentContainer = styled(View)`
padding-top: 12px;
`;

const GraphTempImage = styled(Image)`
height: 400px;
width: 420px;
`;

// Graph Page Detail Buy Style
const GraphDetailContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-left: 16px;
padding-right: 16px;
`;

const GraphDetailTitleText = styled(Text)`
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: ${props => props.theme.color.White};
padding-top: 24px;
padding-left: 16px;
padding-right: 16px;
margin-bottom: 16px;
`;

const GraphDetailBuyContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const GraphDetailRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-left: 16px;
padding-right: 16px;
`;

const GraphDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const GraphDetailBuyRightTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
text-align: right;
color: ${props => props.theme.color.MidGray};
`;

const GraphDetailBuyLeftTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
text-align: left;
color: ${props => props.theme.color.MidGray};
`;

const GraphDetailBuyMiddleTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
text-align: center;
padding-left: 10px;
color: ${props => props.theme.color.MidGray};
`;

const GraphDetailBuyPriceTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.SecondaryLight};
`;

const GraphDetailBuyDetailText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
`;

// Graph Detail Price Container Style
const GraphDetailPriceRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 8px;
padding-left: 16px;
padding-right: 16px;
padding-bottom: 8px;
`;

const GraphDetailPriceColumnContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const GraphDetailPriceRightTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
text-align: right;
`;

const GraphDetailPriceLeftTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
text-align: left;
`;

const GraphDetailLatestPriceText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const GraphDetailIndexPriceText = styled(Text)`
font-weight: 700;
font-size: 16px;
line-height: 20px;
color: ${props => props.theme.color.White};
`;

// Graph Page Detail Sell Style
const GraphDetailSellContainer = styled(View)`
display: flex;
flex-direction: column;
justify-content: space-between;
`;

const GraphDetailSellPriceText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.Secondary};
`;

const GraphDetailSellDetailText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.White};
`;

//Graph Detail Button

const GraphButtonContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 24px;
padding-right: 16px;
padding-left: 16px;
margin-bottom: 150px;
`;

const GraphOpenPositionButton = styled(TouchableOpacity)`
width: 45%;
height: 40px;
border-radius: 4px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.Secondary};
`;

const GraphClosePositionButton = styled(TouchableOpacity)`
width: 45%;
height: 40px;
border-radius: 4px;
justify-content: center;
align-items: center;
background-color: ${props => props.theme.color.SecondaryLight};
`;

const GraphButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

// Graph Page Array

const SellArray = [
    { id: 0, price: '41254.50', number: 0.104, total: 0.104, timeStamp: "" },
    { id: 1, price: '41254.00', number: 0.079, total: 0.104, timeStamp: "" },
    { id: 2, price: '41253.50', number: 0.868, total: 0.104, timeStamp: "" },
    { id: 3, price: '41253.00', number: 0.260, total: 0.104, timeStamp: "" },
    { id: 4, price: '41252.50', number: 0.260, total: 0.104, timeStamp: "" },
    { id: 5, price: '41252.00', number: 0.013, total: 0.104, timeStamp: "" },
    { id: 6, price: '41251.50', number: 0.295, total: 0.104, timeStamp: "" },
    { id: 7, price: '41251.00', number: 0.019, total: 0.104, timeStamp: "" }
];

const BuyArray = [
    { id: 0, price: '41254.50', number: 0.295, total: 0.104, timeStamp: "" },
    { id: 1, price: '41254.25', number: 0.019, total: 0.104, timeStamp: "" },
    { id: 2, price: '41254.00', number: 0.323, total: 0.104, timeStamp: "" },
    { id: 3, price: '41253.75', number: 0.019, total: 0.104, timeStamp: "" },
    { id: 4, price: '41253.50', number: 0.760, total: 0.104, timeStamp: "" },
    { id: 5, price: '41253.25', number: 0.656, total: 0.104, timeStamp: "" },
    { id: 6, price: '41253.00', number: 0.781, total: 0.104, timeStamp: "" },
    { id: 7, price: '41252.75', number: 0.781, total: 0.104, timeStamp: "" }
];


const GraphPage = () => {

    // Value is Positive
    const [isPositive, setIsPositive] = useState(true);

    return (
        <View>
            <GraphHeaderContainer>
                <GraphHeaderTopRowContainer>
                    <GraphHeaderBigTitleText>BTCUSDT</GraphHeaderBigTitleText>
                    {
                        isPositive === true ?
                            <GraphHeaderFluctuationRiseText>+2.90%</GraphHeaderFluctuationRiseText> :
                            <GraphHeaderFluctuationFallText>-2.90%</GraphHeaderFluctuationFallText>
                    }
                </GraphHeaderTopRowContainer>
                <GraphHeaderBottomRowContainer>
                    {
                        isPositive === true ?
                            <GraphHeaderTitleRisePriceText>41,254.50</GraphHeaderTitleRisePriceText> :
                            <GraphHeaderTitleFallPriceText>41,254.50</GraphHeaderTitleFallPriceText>
                    }
                    <GraphHeaderBottomRowColumnContainer>
                        <GraphHeaderBottomInlineRowContainer>
                            <GraphHeaderSmallTitleText>標記價格</GraphHeaderSmallTitleText>
                            <GraphHeaderSmallValueText>57,648.39</GraphHeaderSmallValueText>
                        </GraphHeaderBottomInlineRowContainer>
                        <GraphHeaderBottomInlineRowContainer>
                            <GraphHeaderSmallTitleText>指數價格</GraphHeaderSmallTitleText>
                            <GraphHeaderSmallValueText>57,607.26</GraphHeaderSmallValueText>
                        </GraphHeaderBottomInlineRowContainer>
                        <GraphHeaderBottomInlineRowContainer>
                            <GraphHeaderSmallTitleText>資金費率</GraphHeaderSmallTitleText>
                            <GraphHeaderSmallValueText>0.0193%</GraphHeaderSmallValueText>
                        </GraphHeaderBottomInlineRowContainer>
                    </GraphHeaderBottomRowColumnContainer>
                </GraphHeaderBottomRowContainer>
            </GraphHeaderContainer>

            <GraphContainer>
                <GraphContentContainer>
                    <GraphTempImage source={require("../../assets/images/trade/bg.png")} />
                </GraphContentContainer>
                <GraphDetailTitleText>掛單簿</GraphDetailTitleText>
                <GraphDetailRowContainer>
                    <GraphDetailColumnContainer>
                        <GraphDetailBuyLeftTitleText>價格</GraphDetailBuyLeftTitleText>
                        <GraphDetailBuyLeftTitleText>(USDT)</GraphDetailBuyLeftTitleText>
                    </GraphDetailColumnContainer>
                    <GraphDetailColumnContainer>
                        <GraphDetailBuyMiddleTitleText>數量</GraphDetailBuyMiddleTitleText>
                        <GraphDetailBuyMiddleTitleText>(BTC)</GraphDetailBuyMiddleTitleText>
                    </GraphDetailColumnContainer>
                    <GraphDetailColumnContainer>
                        <GraphDetailBuyRightTitleText>合計</GraphDetailBuyRightTitleText>
                        <GraphDetailBuyRightTitleText>(BTC)</GraphDetailBuyRightTitleText>
                    </GraphDetailColumnContainer>
                </GraphDetailRowContainer>

                <GraphDetailContainer>
                    <GraphDetailBuyContainer>

                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailBuyContainer>
                                        <GraphDetailBuyPriceTitleText>{x.price}</GraphDetailBuyPriceTitleText>
                                    </GraphDetailBuyContainer>
                                )
                            })
                        }
                    </GraphDetailBuyContainer>
                    <GraphDetailBuyContainer>
                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailBuyContainer>
                                        <GraphDetailBuyDetailText>{x.number}</GraphDetailBuyDetailText>
                                    </GraphDetailBuyContainer>
                                )
                            })
                        }
                    </GraphDetailBuyContainer>
                    <GraphDetailBuyContainer>
                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailBuyContainer>
                                        <GraphDetailBuyDetailText>{x.total}</GraphDetailBuyDetailText>
                                    </GraphDetailBuyContainer>
                                )
                            })
                        }
                    </GraphDetailBuyContainer>

                </GraphDetailContainer>
                <GraphDetailPriceRowContainer>
                    <GraphDetailPriceColumnContainer>
                        <GraphDetailPriceLeftTitleText>最新價</GraphDetailPriceLeftTitleText>
                        <GraphDetailLatestPriceText>41254.50</GraphDetailLatestPriceText>
                    </GraphDetailPriceColumnContainer>
                    <GraphDetailPriceColumnContainer>
                        <GraphDetailPriceRightTitleText>指數價</GraphDetailPriceRightTitleText>
                        <GraphDetailIndexPriceText>57,647.48</GraphDetailIndexPriceText>
                    </GraphDetailPriceColumnContainer>
                </GraphDetailPriceRowContainer>
                <GraphDetailContainer>
                    <GraphDetailSellContainer>
                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailSellContainer>
                                        <GraphDetailSellPriceText>{x.price}</GraphDetailSellPriceText>
                                    </GraphDetailSellContainer>
                                )
                            })
                        }
                    </GraphDetailSellContainer>
                    <GraphDetailSellContainer>
                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailSellContainer>
                                        <GraphDetailSellDetailText>{x.number}</GraphDetailSellDetailText>
                                    </GraphDetailSellContainer>
                                )
                            })
                        }
                    </GraphDetailSellContainer>
                    <GraphDetailSellContainer>
                        {
                            SellArray.map((x, i) => {
                                return (
                                    <GraphDetailSellContainer>
                                        <GraphDetailSellDetailText>{x.total}</GraphDetailSellDetailText>
                                    </GraphDetailSellContainer>
                                )
                            })
                        }
                    </GraphDetailSellContainer>
                </GraphDetailContainer>
                <GraphButtonContainer>
                    <GraphOpenPositionButton>
                        <GraphButtonText>開倉</GraphButtonText>
                    </GraphOpenPositionButton>
                    <GraphClosePositionButton>
                        <GraphButtonText>平倉</GraphButtonText>
                    </GraphClosePositionButton>
                </GraphButtonContainer>
            </GraphContainer>
        </View>
    );
};

export default GraphPage