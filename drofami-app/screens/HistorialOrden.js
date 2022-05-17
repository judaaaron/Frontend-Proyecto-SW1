import React from "react";
import { useState } from "react";
import { getCart, saveCart, clearCarrito, deleteProduct } from '../src/CartMethods'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
    Colors,
    StyledButtonCart2,
    ButtonTextCart2,
    StyledButtonCart,
    ButtonTextCart,
    PageLogOferta,
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
        codigo: 'bd7acbea-c1b1',
        fecha: '14/05/2022',
        total: 1205.50
    },
    {
        id: 2,
        codigo: 'bd7acbea-c1b2',
        fecha: '31/12/2022',
        total: 550.00
    },
    {
        id: 3,
        codigo: 'bd7acbea-c1b2',
        fecha: '25/10/2022',
        total: 785.75
    },
];

const HistorialOrden = ({ navigation }) => {

    const List = ({ id, codigo, fecha, total }) => {
        return (

            <>

                <TouchableOpacity

                    style={{
                        width: "100%",
                        height: 100,
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 30,
                        marginLeft: 30,
                        top: 10


                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "space-around",
                        }}
                    >
                        <View style={{}}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    maxWidth: "100%",
                                    color: Colors.black,
                                    fontWeight: "bold",
                                    // letterSpacing: 1,
                                }}
                            >
                                {/* {data.productName} */}
                                {/* BACAOLIVER */}
                                codigo: {codigo}
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

                                    fecha de orden: {fecha}

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
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >

                                <Text> Total: L. {total}</Text>

                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );


    };

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: Colors.white,
                position: "relative",
            }}

        >

            <View style={{ marginTop: 35, alignContent: 'center', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: 18, color: Colors.blue }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.blue }}>Historial de tus ordenes</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={DATA}
                renderItem={({ item }) => (
                    <List
                        id={item.id}
                        codigo={item.codigo}
                        fecha={item.fecha}
                        total={item.total}
                    />
                )}
                keyExtractor={(item) => item.id}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            />
        </View>
    )

};


const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: Colors.lightblue,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: Colors.white,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
    buyBtn: {
        width: 220,
        height: 50,
        top: -72,
        backgroundColor: Colors.blue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        // marginLeft: 130,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        // right: 0,
        marginTop: 400,
        color: Colors.blue,
    },
});

const styleSheet = StyleSheet.create({
    MainContainer: {
        flex: 1,
    },

    itemText: {
        fontSize: 26,
        color: 'black',
        textTransform: 'capitalize'
    }

});
export default HistorialOrden