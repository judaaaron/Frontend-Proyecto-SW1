import React from 'react';
import {View, SafeAreaView, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "../components/styles"
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'

const DetalleProductsHessel = ({navigation, route}) =>{
    const producto = route.params;
    return(
        <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.lightblue,
        }}>
        <View style={style.header} top={15}>
          <Icon name="arrow-back" size={30} onPress={() => navigation.goBack()} />
          <Icon name="shopping-cart" size={28} />
        </View>
        <View style={style.imageContainer}>
          <Image source={producto.img} style={{resizeMode: 'contain', flex: 1}} />
        </View>
        <View style={style.detailsContainer}>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>DROFAMI</Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>{producto.name}</Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                L. {producto.price}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Descripción</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {producto.about}
            </Text>
    
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>-</Text>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                  }}>
                  1
                </Text>
                <View style={style.borderBtn}>
                  <Text style={style.borderBtnText}>+</Text>
                </View>
              </View>
  
              <View style={style.buyBtn}>
                <Text
                  style={{color: Colors.primary, fontSize: 18, fontWeight: 'bold'}}>
                  Ordenar
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>


    );


};


export default DetalleProductsHessel;

const style = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    imageContainer: {
      flex: 0.45,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailsContainer: {
      flex: 0.55,
      backgroundColor: Colors.light,
      marginHorizontal: 7,
      marginBottom: 7,
      borderRadius: 20,
      marginTop: 30,
      paddingTop: 30,
    },
    line: {
      width: 25,
      height: 2,
      backgroundColor: Colors.darkLight,
      marginBottom: 5,
      marginRight: 3,
    },
    borderBtn: {
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 40,
    },
    borderBtnText: {fontWeight: 'bold', fontSize: 28},
    buyBtn: {
      width: 130,
      height: 50,
      backgroundColor: Colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    priceTag: {
      backgroundColor: Colors.blue,
      width: 80,
      height: 40,
      justifyContent: 'center',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 25,
    },
  });