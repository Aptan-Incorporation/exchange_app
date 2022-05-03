import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView, Dimensions, Alert } from "react-native"
import styled from "styled-components"
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Container = styled(View)`
    display: flex;
    flex-direction: column;
    background-color: #18222D;
    border: none;
    padding: 0;
`;

// Header Container Style

const HeaderContainer = styled(View)`
display: flex;
flex-direction: row;
padding-top: 16px;
padding-left: 16px;
padding-right: 16px;
`;

const BottomContainer = styled(ScrollView)`
display: flex;
flex-direction: column;
padding-bottom: 1000px;
`;

const SwapButtonText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.LightMidGray};
`;

const SwapButtonClickedText = styled(Text)`
font-weight: 500;
font-size: 14px;
line-height: 22px;
color: ${props => props.theme.color.White};
`;

const SwapContainerLine = styled(View)`
height: 1px;
background-color: #242D37;
margin-bottom: 11px;
`;


// Bottom Container Style

// Global Style
const CardContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 20px;
padding-left: 16px;
padding-right: 16px;
`;

const CardTitleContainer = styled(View)`
display: flex;
flex-direction: column;
`;

const CardTitleRowContainer = styled(View)`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const CardDetailContainer = styled(View)`
display: flex;
flex-direction: row;
margin-top: 3px;
`;

const CardDetailColumnContainer = styled(View)`
display: flex;
flex-direction: column;
width: 38%;
`;

const CardDetailInColumnContainer = styled(View)`
display: flex;
flex-direction: column;
padding-top: 10px;
`;

const CardTitleTimeText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 15px;
color: ${props => props.theme.color.ExtraLightGray};
margin-top: 4px;
`;

const CardTitleSecondaryText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.Secondary};
`;

const CardTitleSecondaryLightText = styled(Text)`
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardDetailTitleText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
`;

const CardDetailValueText = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.ExtraLightGray};
`;

const CardDetailValueDirectionShort = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.SecondaryLight};
`;

const CardDetailValueDirectionLong = styled(Text)`
font-weight: 500;
font-size: 13px;
line-height: 20px;
color: ${props => props.theme.color.Secondary};
`;

const CardLine = styled(View)`
height: 2px;
background-color: #242D37;
margin-top: 20px;
`;

// History Commit Style
const HistoryCommitCardTitleProgressCommitText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.SecondaryLight};
`;

const HistoryCommitCardTitleProgressCancelText = styled(Text)`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: ${props => props.theme.color.MidGray};
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


// Array

const HistoryCommitArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        progress: 1,
        type: '限價',
        direction: '賣出平多',
        directionType: 'Long',
        commitNum: '0.1',
        successRate: 3,
        successNum: '0.1',
        commitPrice: '17,000.0',
        successAverage: '20,000.0'
    },
    {
        title: 'ETHUSDT',
        buyType: 'buy',
        leverage: 10,
        time: '2021-10-19 17:11:45',
        progress: 0,
        type: '限價',
        direction: '賣出做空',
        directionType: 'Short',
        commitNum: '0.1',
        successRate: 0,
        successNum: '0.1',
        commitPrice: '17,000.0',
        successAverage: '20,000.0'
    }
];

const SubmitRecordArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 5,
        time: '2021-10-19 13:35:08',
        type: '限價',
        direction: '賣出平多',
        directionType: 'Long',
        successRate: 3,
        successNum: '0.1',
        successPrice: '20,000.0',
        EarnLost: '6,000.0'
    },
    {
        title: 'ETHUSDT',
        buyType: 'buy',
        leverage: 1,
        time: '2021-10-19 13:14:22',
        type: '限價',
        direction: '買入平空',
        directionType: 'Short',
        successRate: 2,
        successNum: '0.1',
        successPrice: '14,000.0',
        EarnLost: '3,000.0'
    }
];

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

const PositionArray = [
    {
        title: 'BTCUSDT',
        buyType: 'sell',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        openPositionAveragePrice: '17,000.0000',
        holdPositionAveragePrice: '17,000.0000',
        assetsNum: '170.00000',
        earnLost: '10.94000',
        earn: '+10.94000',
        earnRate: '+5.61',
        earnRatePositive: true,
        positionNum: '0.1',
        assetsRate: '0.33',
        estimateCancelValue: '24,000.0000',
        price: '20,000.0000',
        number: '0.9'
    },
    {
        title: 'BTCUSDT',
        buyType: 'buy',
        leverage: 20,
        time: '2021-10-19 13:24:30',
        openPositionAveragePrice: '17,000.0000',
        holdPositionAveragePrice: '17,000.0000',
        assetsNum: '170.00000',
        earnLost: '10.94000',
        earn: '+10.94000',
        earnRate: '-5.61',
        earnRatePositive: false,
        positionNum: '0.1',
        assetsRate: '0.33',
        estimateCancelValue: '13,000.0000',
        price: '20,000.0000',
        number: '0.9'
    }
];



const HistoryScreen = ({
    navigation
}: RootStackScreenProps<"HistoryScreen">) => {

    const [swapView, setSwapView] = useState('HistoryCommit');



    return (
        <Container>
            <HeaderContainer>
                {
                    swapView === 'HistoryCommit' ?
                        <TouchableOpacity onPress={() => { setSwapView('HistoryCommit') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24 }}>
                            <SwapButtonClickedText>歷史委託</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('HistoryCommit') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>歷史委託</SwapButtonText>
                        </TouchableOpacity>
                }
                {
                    swapView === 'SubmitRecord' ?
                        <TouchableOpacity onPress={() => { setSwapView('SubmitRecord') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24 }}>
                            <SwapButtonClickedText>成交紀錄</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('SubmitRecord') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>成交紀錄</SwapButtonText>
                        </TouchableOpacity>
                }
                {
                    swapView === 'AssetsRecord' ?
                        <TouchableOpacity onPress={() => { setSwapView('AssetsRecord') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24 }}>
                            <SwapButtonClickedText>資產紀錄</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('AssetsRecord') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>資產紀錄</SwapButtonText>
                        </TouchableOpacity>
                }
                {
                    swapView === 'Position' ?
                        <TouchableOpacity onPress={() => { setSwapView('Position') }} style={{ borderBottomWidth: 2, borderBottomColor: '#6699CC', marginRight: 24 }}>
                            <SwapButtonClickedText>所有持倉</SwapButtonClickedText>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => { setSwapView('Position') }} style={{ marginRight: 24 }}>
                            <SwapButtonText>所有持倉</SwapButtonText>
                        </TouchableOpacity>
                }

            </HeaderContainer>
            <SwapContainerLine></SwapContainerLine>
            <BottomContainer>
                {
                    swapView === 'HistoryCommit' &&

                    HistoryCommitArray.map((x, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    <CardTitleRowContainer>
                                        {
                                            x.buyType === 'sell' ?
                                                <CardTitleSecondaryLightText>{x.title} ・ {x.leverage}X</CardTitleSecondaryLightText> :
                                                <CardTitleSecondaryText>{x.title} ・ {x.leverage}X</CardTitleSecondaryText>
                                        }
                                        {
                                            x.progress === 0 ?
                                                <HistoryCommitCardTitleProgressCancelText>已撤銷</HistoryCommitCardTitleProgressCancelText> :
                                                <HistoryCommitCardTitleProgressCommitText>已委託</HistoryCommitCardTitleProgressCommitText>
                                        }
                                    </CardTitleRowContainer>
                                    <CardTitleTimeText>{x.time}</CardTitleTimeText>
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>交易類型</CardDetailTitleText>
                                            <CardDetailValueText>{x.type}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交率</CardDetailTitleText>
                                            <CardDetailValueText>{x.successRate}%</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交均價</CardDetailTitleText>
                                            <CardDetailValueText>{x.successAverage}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>下單方向</CardDetailTitleText>
                                            {
                                                x.directionType === 'Long' ?
                                                    <CardDetailValueDirectionLong>{x.direction}</CardDetailValueDirectionLong> :
                                                    <CardDetailValueDirectionShort>{x.direction}</CardDetailValueDirectionShort>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交量</CardDetailTitleText>
                                            <CardDetailValueText>{x.successNum}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>止盈/止損</CardDetailTitleText>
                                            <TouchableOpacity onPress={() => { }}>
                                                <CardDetailValueText>查看</CardDetailValueText>
                                            </TouchableOpacity>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>委託量</CardDetailTitleText>
                                            <CardDetailValueText>{x.commitNum}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>委託價</CardDetailTitleText>
                                            <CardDetailValueText>{x.commitPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== HistoryCommitArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'SubmitRecord' &&

                    SubmitRecordArray.map((x, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    {
                                        x.buyType === 'sell' ?
                                            <CardTitleSecondaryLightText>{x.title}</CardTitleSecondaryLightText> :
                                            <CardTitleSecondaryText>{x.title}</CardTitleSecondaryText>
                                    }
                                    <CardTitleTimeText>{x.time}</CardTitleTimeText>
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>交易類型</CardDetailTitleText>
                                            <CardDetailValueText>{x.type}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交量</CardDetailTitleText>
                                            <CardDetailValueText>{x.successNum}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>下單方向</CardDetailTitleText>
                                            {
                                                x.directionType === 'Long' ?
                                                    <CardDetailValueDirectionLong>{x.direction}</CardDetailValueDirectionLong> :
                                                    <CardDetailValueDirectionShort>{x.direction}</CardDetailValueDirectionShort>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交價</CardDetailTitleText>
                                            <CardDetailValueText>{x.successPrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>成交率</CardDetailTitleText>
                                            <CardDetailValueText>{x.successRate}%</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>平倉盈虧</CardDetailTitleText>
                                            <CardDetailValueText>{x.EarnLost}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== SubmitRecordArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'AssetsRecord' &&

                    AssetsRecordArray.map((x, i) => {
                        return (
                            <CardContainer>
                                <AssetsRecordTitleContainer>
                                    <AssetsRecordTitleText>{x.title}</AssetsRecordTitleText>
                                    {
                                        x.amount !== '' ?
                                            <AssetsRecordAmountText>{x.amount} {x.amountCurrency}</AssetsRecordAmountText> :
                                            <AssetsRecordAmountText>--</AssetsRecordAmountText>

                                    }
                                </AssetsRecordTitleContainer>
                                <AssetsRecordDetailContainer>
                                    <AssetsRecordTimeText>{x.time}</AssetsRecordTimeText>
                                    {
                                        x.type === 'buy' ?
                                            <AssetsRecordTypeLeverageTextSecondary>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondary> :
                                            <AssetsRecordTypeLeverageTextSecondaryLight>{x.typeName}・{x.leverage}X</AssetsRecordTypeLeverageTextSecondaryLight>
                                    }
                                </AssetsRecordDetailContainer>
                                {
                                    i !== AssetsRecordArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
                {
                    swapView === 'Position' &&

                    PositionArray.map((x, i) => {
                        return (
                            <CardContainer>
                                <CardTitleContainer>
                                    {
                                        x.buyType === 'buy' ?
                                            <CardTitleSecondaryText>{x.title}・{x.leverage}X</CardTitleSecondaryText> :
                                            <CardTitleSecondaryLightText>{x.title}・{x.leverage}X</CardTitleSecondaryLightText>
                                    }
                                    <CardTitleTimeText>{x.time}</CardTitleTimeText>
                                </CardTitleContainer>
                                <CardDetailContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>開倉均價</CardDetailTitleText>
                                            <CardDetailValueText>{x.openPositionAveragePrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>未實現盈虧</CardDetailTitleText>
                                            <CardDetailValueText>{x.earnLost}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>持倉量</CardDetailTitleText>
                                            <CardDetailValueText>{x.positionNum}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>價格</CardDetailTitleText>
                                            <CardDetailValueText>{x.price}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>持倉均價</CardDetailTitleText>
                                            <CardDetailValueText>{x.holdPositionAveragePrice}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>收益</CardDetailTitleText>
                                            <CardDetailValueText>{x.earn}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>擔保資產率</CardDetailTitleText>
                                            <CardDetailValueText>{x.assetsRate}%</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>數量</CardDetailTitleText>
                                            <CardDetailValueText>{x.number}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                    <CardDetailColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>擔保資產</CardDetailTitleText>
                                            <CardDetailValueText>{x.assetsNum}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>收益率</CardDetailTitleText>
                                            {
                                                x.earnRatePositive === true ?
                                                    <AssetsRecordEarnRatePositiveText>{x.earnRate}%</AssetsRecordEarnRatePositiveText> :
                                                    <AssetsRecordEarnRateNegativeText>{x.earnRate}%</AssetsRecordEarnRateNegativeText>
                                            }
                                        </CardDetailInColumnContainer>
                                        <CardDetailInColumnContainer>
                                            <CardDetailTitleText>預估強平</CardDetailTitleText>
                                            <CardDetailValueText>{x.estimateCancelValue}</CardDetailValueText>
                                        </CardDetailInColumnContainer>
                                    </CardDetailColumnContainer>
                                </CardDetailContainer>
                                {
                                    i !== PositionArray.length - 1 &&
                                    <CardLine></CardLine>
                                }
                            </CardContainer>
                        )
                    })
                }
            </BottomContainer>
        </Container>

    )
}

export default HistoryScreen