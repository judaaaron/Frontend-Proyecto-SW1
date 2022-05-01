import React from 'react';
import { useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationText, Counter, Colors, StyledButton, ButtonText } from "../components/styles";
import CarouselDescripcionAncalmo from './CarouselDescripcionAncalmo'
import { FAB } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';
import NumericInput from 'react-native-numeric-input'

const DetalleProductsAncalmo = ({ navigation, route }) => {
  const producto = route.params;
  const [notifications, setNotifications] = useState([]);
  const { id, cantidad, imagen, nombre, precio, fabricante, indicaciones, dosis, formula } = route.params
  const [counter, setCounter] = useState(1);

  const handleAdd = () => {
    setCounter(counter + 1);
  }

  const handleSubstract = () => {
    counter != 1 ? setCounter(counter - 1) : counter
  }

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
          <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
          {/* <Icon name="shopping-cart" size={28} /> */}
          {
            notifications.length > 0 &&
            <Counter>
              <NotificationText>{notifications.length}</NotificationText>
            </Counter>
          }

        </View>
        <View style={style.imageContainer} top={25}>
          <Image source={{ uri: imagen }} style={{ resizeMode: 'contain', flex: 1, width: 350, height: 350, }} top={-50} />
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
            {precio != '' && <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                L. {precio}
              </Text>
            </View>}
          </View>
          <View style={{ marginLeft: -50, top: 20 }}>
            <CarouselDescripcionAncalmo data={carouselData} />
          </View>

          {precio != '' && <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
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

                <View>
                <NumericInput
                
                 minValue={1}
                 //initValue={1}
                // inputMode=
                valueType='integer'
                initValue={1}
                 value={counter} 
                 onChange={value => setCounter({value})}
                  // onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={130}
                  totalHeight={45}
                  iconSize={15}
                  step={1}
                  textColor={Colors.black}
                  iconStyle={{ color: 'white' }}
                  rightButtonBackgroundColor= {Colors.blue}
                  leftButtonBackgroundColor= {Colors.blue}
                  
                  />
                  {/* <Text style={style.borderBtnText} onPress={handleSubstract}>-</Text> */}
                  {/* <FAB
                    theme={{ colors: { accent: Colors.blue } }}
                    big
                    icon="minus"
                    onPress={handleSubstract}
                  /> */}
                </View>
                {/* <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                  }}>
                  {counter}
                </Text> */}
                <View >
                  {/* <Text style={style.borderBtnText} onPress={handleAdd}>+</Text> */}
                  {/* <FAB
                    // style={style.borderBtnText}
                    theme={{ colors: { accent: Colors.blue } }}
                    big
                    icon="plus"
                    onPress={handleAdd}
                  /> */}
                </View>

              </View>
              <View >
                {/* <Text
                style={{ color: Colors.primary, fontSize: 18, fontWeight: 'bold' }}
                onPress={() => setNotifications((prev) => [...prev, 1])}>
               
              </Text> */}

                {/* <Button
              style={style.buyBtn} top={3}
               title=" Añadir al carrito"
               
            /> */}
               

                <StyledButton
                  style={style.buyBtn}
                  onPress={() => {
                    showMessage({
                      message: "Producto agregado.",
                      description: 'El producto ha sido añadido al carrito con éxito',
                      type: "success",
                    });
                  }}>
                  <ButtonText>
                    Añadir al carrito
                  </ButtonText>
                </StyledButton>

              </View>
            </View>
          </View>}
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
    width: 200,
    height: 50,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 10,
  },
  priceTag: {
    backgroundColor: Colors.blue,
    width: 100,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: Colors.blue,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color: Colors.blue,
  },

});