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
    const { id, cantidad, imagen, nombre, precio, fabricante, color } = route.params
    const [counter, setCounter] = useState(1);
    const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [productResponse, setProductResponse] = useState(null);
    const [Cart, setIsInCart] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const timeout = React.useRef(null);

    React.useEffect(() => {
        Object.entries(producto.precio).map((element, i) => {
            console.log(element);
            console.log(i);

        })
    }, [])


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: producto.color[3],
            }}
        >
            <View style={style.header}>
                <Icon
                    name="arrow-back"
                    size={28}
                    onPress={() => navigation.goBack()}
                />


                {/* <Icon name="shopping-cart" size={28} /> */}
                {/* {
            notifications.length > 0 &&
            <Counter>
              <NotificationText>{notifications.length}</NotificationText>
            </Counter>
          } */}
            </View>
            {/* <ScrollView> */}
            <View style={style.imageContainer} top={25}>
                <Image
                    source={{ uri: imagen }}
                    style={{
                        resizeMode: "contain",
                        flex: 1,
                        width: 350,
                        height: 350,
                    }}
                    top={-50}
                />
            </View>

            <View style={style.detailsContainer} top={-50} marginTop={30}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: "row",
                        alignItems: "flex-end",
                        marginTop: -100,
                    }}
                >


                </View>

                <View
                    style={{

                        marginTop: 100,
                        flexDirection: "row",
                        justifyContent: 'center',
                        alignItems: "center",
                        top: -170,
                        alignContent:'center'
                    }}
                >
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{nombre}</Text>
                </View>
                <View
                    style={{

                        marginTop: 100,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        top: -260,
                        marginLeft: 15
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Canales de Venta:</Text>
                </View>
                {Object.entries(producto.precio).map((element, i) => {
                    return (<View style={style.priceTag} key={element[0] + '_' + i} marginTop={10}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.white, justifyContent: 'center' }}>{element[0]}: L. {element[1]}</Text>
                    </View>)
                })}
                <View style={style.priceTag2} top={-170}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.white, justifyContent: 'center' }}>En stock: {producto.cantidad}</Text>
                </View>
                {/*<View style={style.priceTag}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.white, justifyContent:'center' }}>Farmacia: L. {producto.precio.Farmacia}</Text>
                </View>

                <View style={style.priceTag} top={-235}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.white, justifyContent:'center' }}>Mayorista: L. {producto.precio.Mayorista}</Text>
                </View>

                <View style={style.priceTag} top={-225}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.white, justifyContent:'center' }}>Supermercado: L. {producto.precio.Supermercado}</Text>
                </View>

               */}




                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Descripción</Text> */}

                    <View
                        style={{
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View>

                            </View>
                            <TextInput
                                style={{
                                    fontSize: 20,
                                    marginHorizontal: 10,
                                    fontWeight: "bold",
                                }}
                                keyboardType="numeric"
                            // value={counter.toString()}
                            // onChangeText={(value)=>handleChange(parseInt(value))}
                            />

                            <View>

                            </View>
                        </View>
                        <View>

                        </View>
                    </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
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
        paddingTop: 200,
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
        // marginLeft: -20,
    },
    priceTag: {
        backgroundColor: Colors.blue,
        width: 200,
        height: 50,
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        top: -250,
        marginLeft:80

    },
    priceTag2: {
        backgroundColor: Colors.blue,
        width: 200,
        height: 50,
        // alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        top: -250,
        marginLeft:5

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