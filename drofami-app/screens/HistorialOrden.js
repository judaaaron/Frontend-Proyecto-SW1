import React from "react";
import { useState } from "react";
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { cartItems } from "../src/reducers/cartItems";
import { FAB } from 'react-native-paper';
import { getOrdenes, getOrdenDetalle } from "../src/OrderMethods";

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
    //const token = useRef(useSelector((state) => state.token.value));
    const [response, setResponse] = useState(null);
    const [specificResponse, setSpecificResponse] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [ordenes, setOrdenes] = useState(null);
    const token = React.useRef(useSelector((state) => state.token.value))
    React.useEffect(() => {
        getOrdenes(setLoading, token.current, setResponse);
    }, []);

    React.useEffect(() => {
        if(!response) {
            return;
        }
        if (response['data']) {
            setOrdenes(response['data']);
        }
    }, [response]);

    React.useEffect(() => {
        if(!specificResponse) {
            return;
        }
        console.log(specificResponse)
        navigation.reset({
            index: 0,
            routes: [{ name: 'OrderDetails' , params: specificResponse['data']}]
          })

    }, [specificResponse]);


    function ordenarPorCodigo(array) {
        const temp = array.sort((a,b)=> parseInt(a.id)-parseInt(b.id))
        return temp;
    }

    const List = ({ id, codigo, fecha, total }) => {
        return (
            <>
                <TouchableOpacity
                    style={{
                        width: 350,
                        height: 100,
                        // paddingBottom:10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: Colors.white,
                        borderWidth: 1,
                        borderColor: Colors.black,
                        
                        borderRadius: 10,
                        marginLeft: 13,
                        marginTop: 10
                    }}
                    onPress={() => {getOrdenDetalle(setLoading, token.current, id, setSpecificResponse)}}
                    /*onPress={
                        
                    }*/
                >


                    <Image
                        source={require("./../assets/carritoH.png")}
                        style={{
                            width: 100,
                            height: 80,
                            resizeMode: "contain",
                            marginLeft: 250,
                            top: 10
                        }}
                    />
                    <Icon name="shopping-bag" size={20} color={Colors.morado} borderColor={Colors.blue} style={{ top: -40, marginRight: 290 }} />
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                            justifyContent: "space-around",
                        }}
                    >
                        <View style={{ marginTop: -90, marginLeft:25 }}>
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
                                Código: {codigo}
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

                                    Fecha de orden: {new Date(fecha).toLocaleString('es-CR')}

                                </Text>

                            </View>
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

                                    Total: L.{total + (total*0.15)}

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
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Historial de tus ordenes</Text>
                <Icon name="arrow-back" size={30} style={{marginRight:350, top:-25}} onPress={() => navigation.goBack()} />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={ordenes ? ordenarPorCodigo(ordenes) : []}
                renderItem={({ item }) => (
                    <List
                        key={item.id + '_Orden'}
                        id={item.id}
                        codigo={item.id}
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