import { Text, View, TouchableOpacity, Image,ScrollView,StyleSheet,Dimensions } from "react-native";
import styled from "styled-components";
import { RootStackScreenProps } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as React from "react";
import { useState,useEffect,useContext } from "react";
import { PriceContext,PriceContext2,ThreePriceContext } from "../../App" 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import Swiper from "react-native-web-swiper";
import api from "../../common/api"

const { width } = Dimensions.get('window');
const height = width * 0.8
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

const GrayHeader = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 52px;
  background-color: ${props => props.theme.color.DarkGray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  align-items: center;
  padding-left:16px;
`;

const GrayText = styled(Text)`
  font-size: 13px;
  color: ${props => props.theme.color.ExtraLightGray};
  margin-left:12px;
  font-weight:600;
`;

const PriceText = styled(Text)`
  font-size: 20px;
  color: white;
  font-weight: 700;
`;

const USDText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.LightMidGray};
  margin-top:4px;
`;

const PercentText = styled(Text)`
  font-size: 32px;
  color: ${props => props.theme.color.Secondary};
  font-weight: 700;

`;

const RedPercentText = styled(Text)`
  font-size: 32px;
  color: ${props => props.theme.color.SecondaryLight};
  font-weight: 700;

`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: white;
  margin-left:20px;
`;

const IconImg = styled(Image)`
  width: 28px;
  height:28px;
`

const ColumnText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.color.MidGray};
`;


const HomeScreen = ({ navigation }: RootStackScreenProps<"HomeScreen">) => {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  const context = useContext(PriceContext)
  const context2 = useContext(PriceContext2)
  const [imgArr, setImgArr] = useState([]);
  const {btcPrice,btcRate,btcAmt,ethPrice,ethRate,ethAmt,dogePrice,dogeRate,dogeAmt} = useContext(ThreePriceContext)
  const { t } = useTranslation();
  const images = [
    {
      source: {
        uri: 'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg',
      },
    },
    {
      source: {
        uri: 'https://cdn.pixabay.com/photo/2017/05/02/22/43/mushroom-2279558__340.jpg',
      },
    },
    {
      source: {
        uri: 'https://cdn.pixabay.com/photo/2017/05/18/21/54/tower-bridge-2324875__340.jpg',
      },
    },
    {
      source: {
        uri: 'https://cdn.pixabay.com/photo/2017/05/16/21/24/gorilla-2318998__340.jpg',
      },
    },
    
  ];
  useEffect(()=>{
    let gfg = context2.sort(function (a:any, b:any) {
      return parseFloat(b.P) - parseFloat(a.P);
    });
    setArr(gfg.reverse())
  },[context])


  useEffect(() => {
    api.get("/info/carousel").then(x => {
      console.log(x.data);
      setImgArr(x.data);
    });
  }, []);
  return (
    <Container>
      <Header insets={insets.top}>
        <TouchableOpacity
          onPress={async () => {
            let token = await AsyncStorage.getItem("token")
            if(token){
              navigation.navigate("Member");
            }else{
              navigation.navigate("Login");
            }
          }}
        >
          <IconImg source={require("../../assets/images/home/avatar.png")} />
        </TouchableOpacity>
        <HeaderText>{t("home")} </HeaderText>
        <View style={{display:"flex",flexDirection:"row"}}>
        <TouchableOpacity
          style={{marginRight:10}}
          onPress={async () => {
            
              navigation.navigate("AllLanguage");
            
          }}
        >
          <IconImg source={require("../../assets/images/home/language.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {   
              navigation.navigate("Consult");        
          }}
        >
          <IconImg source={require("../../assets/images/home/support.png")} />
        </TouchableOpacity>
        </View>
        
      </Header>
      
      <Swiper showsButtons={false}  height={250} containerStyle={{height:200,flex:0}} style={{borderRadius:8}} showsPagination={true} loop timeout={2.5}>
       {imgArr.map((x)=>{
         return(
          <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
         )
       })}
       <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
        
      </Swiper>
       
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})
export default HomeScreen;
