import React from 'react';
import { useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationText, Counter, Colors, StyledButton, ButtonText } from "../components/styles";
import CarouselDescripcionAncalmo from './CarouselDescripcionAncalmo'
import { showMessage } from 'react-native-flash-message';
import { getCart, saveCart, isItemInCart } from '../src/CartMethods';
import NumericInput from 'react-native-numeric-input'
import { useSelector } from "react-redux";//este se agrega
import { useIsFocused } from "@react-navigation/native";
import { getColorFromURL } from 'rn-dominant-color';

const DetalleProductsAncalmo = ({ navigation, route }) => {
  const producto = route.params;
  const [notifications, setNotifications] = useState([]);
  const { id, cantidad, imagen, nombre, precio, fabricante, indicaciones, dosis, formula } = route.params
  const [counter, setCounter] = useState(1);
  const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [productResponse, setProductResponse] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const timeout = React.useRef(null);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      getCart(setLoading, token, setResponse);
      isItemInCart(setLoading, producto.id, token, setIsInCart);
    }
  }, [token, isFocused]);

  React.useEffect(() => {
      console.log("HOLA JUDA");
      console.log("ImagenURL:", producto.imagen)
      console.log("Color:",getAverageRGB(producto.imagen))
    }, [])

  async function getAverageRGB(imageUrl) {
    getColorFromURL(imageUrl).then(colors => {
      return colors
    })
}
 

  React.useEffect(() => {
    if (!response) {
      return;
    }
    if (!response['data']) {
      //error super inesperado
      return;
    }
    response['data'].forEach((element) => {
      if (id == element.producto.id) {
        setCounter(element.cantidad)
      }
    });
  }, [response]);

  React.useEffect(() => {
    if (!productResponse || !productResponse['status']) {
      return;
    }
    switch (productResponse["status"]) {
      case "success":
        showMessage({
          message: "Producto agregado al carrito.",
          type: "success",
        });

        break;
      case "over-limit":
        showMessage({
          message: productResponse["message"],
          type: "danger",
        });
        break;
    }
    if (!productResponse['data']['cantidad']) {
      return;
    }
    setCounter(productResponse['data']['cantidad']);
  }, [productResponse])

  const handleAdd = () => {
    setCounter(counter + 1);
  }

  const handleSubstract = () => {
    counter != 1 ? setCounter(counter - 1) : counter
  }

  function handleChange(value) {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(()=>{
      saveCart(token, id, value, setProductResponse);
   }, 1000);
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
        <ScrollView>
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
                marginBottom: 15,
                marginLeft: isInCart ? 50:-15
              }}>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  

                }}>

                <View >
                
                  <NumericInput
                    
                    totalWidth={isInCart ? (220) : (150)}
                    totalHeight={45}
                    iconSize={15}
                    textColor={Colors.black}
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor={Colors.blue}
                    leftButtonBackgroundColor={Colors.blue}
                    step={1}
                    minValue={1}
                    maxValue={1000} // traer la cantidad de este producto de backend
                    // mobile
                    initValue={counter}
                    value={counter}
                    disable={false}
                    //onFocus={setIsInputFocused(true)}
                    onEndEditing={(e) => {
                      handleChange(e.nativeEvent.text);
                    }}
                    onChange={(value) => {
                      setCounter(value)
                      if (isInCart) {
                        handleChange(value)
                      }
                    }}
                    containerStyle={{
                      
                      backgroundColor: Colors.white,
                      // borderWidth: 1,
                      borderColor: Colors.white,
                      borderRadius: 50,
                      
                    }}
                  />
                  {/* <Text style={style.borderBtnText} onPress={handleSubstract}>-</Text> */}
                  {/* <FAB
                    theme={{ colors: { accent: Colors.blue } }}
                    big
                    icon="minus"
                    onPress={handleSubstract}
                  /> */}
                </View>
                <TextInput
                    style={{
                      fontSize: 20,
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                    }}
                    keyboardType='numeric'
                    // value={counter.toString()}
                    // onChangeText={(value)=>handleChange(parseInt(value))}
                  />
                  
                
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


                {!isInCart && <StyledButton
                  style={style.buyBtn}
                  onPress={() => {
                    saveCart(token, id, counter, setProductResponse);
                  }}>
                  <ButtonText>
                    Añadir al carrito
                  </ButtonText>
                </StyledButton>}

              </View>
            </View>
          </View>}
        </View>
        </ScrollView>

      </SafeAreaView>
   
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
    marginLeft: -20,
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