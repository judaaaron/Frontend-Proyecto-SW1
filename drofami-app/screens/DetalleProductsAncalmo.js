import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Colors
} from "../components/styles"
import CarouselDescripcionAncalmo from './CarouselDescripcionAncalmo'

const DetalleProductsAncalmo = ({ navigation, route }) => {
  const producto = route.params;
  const {id,cantidad ,imagen ,nombre ,precio,fabricante ,indicaciones ,dosis ,formula} = route.params
  
  const carouselData = [
    {
      name: "Indicaciones",
      body: indicaciones,
      
    },
    {
      name: "Fórmula",
      body: formula,
    },
    {
      name: "Dósis",
      body: dosis,
    },
  ]

  return (
    <ScrollView>
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.lightblue,
      }}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()}/>
        <Icon name="shopping-cart" size={28} />
      </View>
      <View style={style.imageContainer} top={25}>
        <Image source={{uri: imagen}} style={{ resizeMode: 'contain', flex: 1, width: 350, height: 350,}} top={-50} />
      </View>
      <View style={style.detailsContainer} top={-50} marginTop={30} >
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginTop: -100,
          }}>
        </View>
        <View
          style={{
            marginLeft: 10,
            marginTop: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{nombre}</Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: Colors.primary,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              L. {precio}
            </Text>
          </View>
        </View>
        <View style={{marginLeft:-50, top:20}}>
              <CarouselDescripcionAncalmo data={carouselData}/>
        </View>
        
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Descripción</Text> */}
          
          
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15
            }}>
              
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                
              }}>
              <View style={style.borderBtn} >
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
                style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold' }}>
                Ordenar
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>

  );


};


export default DetalleProductsAncalmo;

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 40,
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
  borderBtnText: { fontWeight: 'bold', fontSize: 28 },
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
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});