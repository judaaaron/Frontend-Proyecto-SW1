import React from 'react'
import { useState } from "react";
import { getCart, saveCart, clearCarrito, deleteProduct } from '../src/CartMethods'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
    Colors,
    StyledButtonCart2,
    ButtonTextCart2,
    StyledButtonCart,
    ButtonTextCart,
    PageLogOferta,
    PageTitle,
    StyledContainer,
} from "../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";//esta
import { useDispatch } from "react-redux";
import { cartItems } from "../src/reducers/cartItems";
import { FAB } from 'react-native-paper';

const DATA = [
    {
        id: 1,
        nombre: 'Zorritone',
        cantidad: 25,
        precio: 250.50
    },
    {
        id: 2,
        nombre: 'Calamina',
        cantidad: 20,
        precio: 350.50
    },
    {
        id: 3,
        nombre: 'Bacaoliver',
        cantidad: 10,
        precio: 720.99
    },
    {
        id: 4,
        nombre: 'Enteroguanil Adulto',
        cantidad: 10,
        precio: 720.99
    },
    {
        id: 5,
        nombre: 'Enteroguanil Kids',
        cantidad: 10,
        precio: 720.99
    },
];

const OrderDetails = ({ navigation }) => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds() < 10 ? current.getSeconds() + .0 : current.getSeconds()}`;
    const List = ({ id, nombre, cantidad, precio }) => {
        return (

            <>

                <View

                    style={{
                        width: 250,
                        height: 100,
                        backgroundColor: Colors.white,
                        marginTop: -14

                    }}
                >



                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "space-around",
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    maxWidth: "100%",
                                    color: Colors.black,
                                    fontWeight: "bold",
                                    // letterSpacing: 1,
                                }}
                            >

                                Nombre: {nombre}
                            </Text>


                            <View
                                style={{
                                    marginTop: 4,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    opacity: 0.6,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "bold",
                                        maxWidth: "85%",
                                        marginRight: 4,
                                    }}
                                >

                                    Precio x Unidad: L.{precio}

                                </Text>

                            </View>
                            <View
                                style={{
                                    marginTop: 4,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    opacity: 0.6,
                                    marginRight: -10
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: "bold",
                                        maxWidth: "85%",
                                        marginRight: 4,
                                    }}
                                >

                                    Cantidad: {cantidad}

                                </Text>

                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >


                        </View>
                    </View>

                </View>


            </>
        );


    };


    return (
        <View style={styles.container}>
            <PageLogOferta
                source={require("../assets/drofamilogo1.jpg")}
                resizeMode="cover"
                style={{marginTop:-63}}
            />


            <ScrollView>
                <StyledContainer style={{ marginTop: 15 }}>
                    <View>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 16 }}>
                            Droguería y Farmacia Centroámerica Milenio
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Orden: #8377
                        </Text>
                    </View>

                    <View style={{ marginTop: -19, marginLeft: 195 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            {date}
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Nombre de la empresa: Kielsa
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Nombre del encargado: Paulinna Euceda
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Productos Ordenados
                        </Text>
                    </View>

                    <View style={{ marginTop: 20, marginLeft: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            data={DATA}
                            renderItem={({ item }) => (
                                <List
                                    id={item.id}
                                    nombre={item.nombre}
                                    cantidad={item.cantidad}
                                    precio={item.precio}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                        />
                    </View>


                    <View style={{ marginTop: -70, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Total a pagar: 2500.99
                        </Text>
                    </View>
                    <StyledButtonCart2


                        style={{
                            backgroundColor: Colors.blue,
                            marginTop: 25,
                            marginLeft: 70,
                            width: 200
                        }}

                        onPress={() => {

                        }}
                    >
                        <ButtonTextCart2>Generar Orden</ButtonTextCart2>
                    </StyledButtonCart2>

                </StyledContainer>

            </ScrollView>
        </View>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 62,
        paddingHorizontal: 20
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viiew: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default OrderDetails;
