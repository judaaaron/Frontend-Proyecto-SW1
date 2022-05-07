import React from 'react';
import { useState } from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationText, Counter, Colors, StyledButton, ButtonText } from "../components/styles";
import CarouselDescripcionAncalmo from './CarouselDescripcionAncalmo'
import { showMessage } from 'react-native-flash-message';
import { getCart, saveCart, isItemInCart } from '../src/CartMethods'; 0
import NumericInput from 'react-native-numeric-input'
import { useSelector } from "react-redux";//este se agrega
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from 'react-native-paper';


const EmpleadoDetalleProductoScreen = ({ navigation, route }) => {

    const producto = route.params;
    const [notifications, setNotifications] = useState([]);
    const { id, cantidad, imagen, nombre, precio, fabricante } = route.params
    const [counter, setCounter] = useState(1);
    const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [productResponse, setProductResponse] = useState(null);
    const [Cart, setIsInCart] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const timeout = React.useRef(null);



    return (
        <>
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

               
                        <Avatar
                            size={64}
                            rounded
                            source={{
                                uri: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
                            }}
                            containerStyle={{
                                borderColor: Colors.blue,
                                borderStyle: "solid",
                                borderWidth: 1,
                            }}
                        ></Avatar>
                    

                    {/* <View style={style.imageContainer} top={25}>
                        <Image source={{ uri: imagen }} style={{ resizeMode: 'contain', flex: 1, width: 350, height: 350, }} top={-50} />
                    </View> */}
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
                            {/* {precio != '' && <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: Colors.primary,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                L. {precio}
              </Text>
            </View>} */}
                        </View>

                        {precio != '' && <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Descripción</Text> */}


                            <View
                                style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 15,

                                }}>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',


                                    }}>

                                    <View >

                                        {/* <NumericInput
                    
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
                  /> */}
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


                                    {/* {!isInCart && <StyledButton
                  style={style.buyBtn}
                  onPress={() => {
                    // saveCart(token, id, counter, setProductResponse);
                  }}>
                  <ButtonText>
                    Añadir al carrito
                  </ButtonText>
                </StyledButton>} */}

                                </View>
                            </View>
                        </View>}
                    </View>
                </ScrollView>

            </SafeAreaView>
        </>

    );




}

export default EmpleadoDetalleProductoScreen;

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