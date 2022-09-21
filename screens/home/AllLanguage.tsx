import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import * as React from "react";
import { useContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const Container = styled(View)`
  display: flex;
  flex-direction: column;
  background: #18222d;
  flex: 1;
`;

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;

const HeaderTitleTextClicked = styled(Text)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: ${props => props.theme.color.White};
`;

const HeaderTitleText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.color.Gray};
`;

const Header = styled(View) <{ insets: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 11px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`


const AllLanguage = ({ navigation }: RootStackScreenProps<"AllLanguage">) => {
  const [search, setSearch] = useState("");
  const [btc, setBtc] = useState(false);
  const [eth, setEth] = useState(false);
  const [doge, setDoge] = useState(false);
  const [index, setIndex] = useState(1);
  const [favorite, setFavorite] = useState([""]);
  const insets = useSafeAreaInsets();
  const TextEl = useRef<TextInput | null>(null);
  const filterByName = (filteredData: any) => {
    // Avoid filter for null value
    if (!search) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (x: any) => x.s.indexOf(search.toUpperCase()) !== -1
    );
    return filteredCars;
  };
  const { t, i18n } = useTranslation();


  const arr = [
    {
      key:"繁體中文",
      value:"tw"
    },
    {
      key:"English",
      value:"en"
    },
    {
      key:"简体中文",
      value:"cn"
    },
  ]


  return (
    <Container>
      <Header insets={insets.top}>
      </Header>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{}}>
          <IconImg source={require("../../assets/images/global/cancel.png")} />

        </TouchableOpacity>

          <>
            <ScrollView contentContainerStyle={{paddingBottom:150}}>
            {arr.map((x: any) => {
              return (
                <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 24,
                        alignItems: "center"
                      }}
                      onPress={()=>{
                        i18n.changeLanguage(x.value);
                        navigation.goBack();
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "#F4F5F6",
                            fontSize: 15,
                            fontWeight: "400"
                          }}
                        >
                          {x.key}
                        </Text>
                      </View>               
                        
                   
                    </TouchableOpacity>
              );
            })}
            </ScrollView>
          </>
      </View>
    </Container>
  );
};

export default AllLanguage;
