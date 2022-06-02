import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
    Colors,
    StyledButtonCart2,
    ButtonTextCart2,
    PageLogOferta,
    StyledContainer,
} from "../components/styles";
import { showMessage } from 'react-native-flash-message';


const OrderDetails = ({route, navigation }) => {
    const current = new Date();
    const orden = route.params;
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
                                    marginTop:10
                                    // letterSpacing: 1,
                                }}
                            >

                                Nombre producto: {nombre}
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
                style={{marginTop:-42}}
            />

                <StyledContainer style={{ marginTop:- 10}}>
                    <View>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 16 }}>
                            Droguería y Farmacia Centroámerica Milenio
                        </Text>
                    </View>

                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Orden:#{orden.id}
                        </Text>
                    </View>

                    <View style={{ marginTop: -25, marginLeft: 195 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            {orden.date}
                        </Text>
                    </View>

                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Nombre de la empresa: {orden.cliente.empresa}
                        </Text>
                    </View>

                    <View style={{ marginTop: 10, marginLeft: 10, }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Nombre del encargado: {orden.cliente.nombre + ' ' + orden.cliente.apellido}
                        </Text>
                    </View>

                    <View style={{ marginTop: 5, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            {/* Productos Ordenados */}
                        </Text>
                    </View>

                    {/* <View style={{ marginTop:-20, top:-10, marginLeft: 10 }}> */}
                        <FlatList
                        style={{marginLeft:10}}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            data={orden.items}
                            renderItem={({ item }) => (
                                <List
                                    key={item.producto.id + '__OD'}
                                    id={item.producto.id}
                                    nombre={item.producto.nombre}
                                    cantidad={item.cantidad}
                                    precio={item.producto.precio}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                        />
                    {/* </View> */}


                    <View style={{ top:15, marginLeft: 10 }}>
                        <Text style={{ color: Colors.black, fontWeight: 'bold', fontSize: 14 }}>
                            Total: L. {(orden.total + orden.total * 0.15) % 1 == 0 ? (orden.total + orden.total * 0.15).toFixed(2) : (orden.total + orden.total * 0.15)}
                        </Text>
                    </View>
                    <StyledButtonCart2



                        style={{
                            backgroundColor: Colors.blue,
                            marginTop: -10,
                            top:-2,
                            marginLeft: 145,
                            width: 200
                        }}

                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                              }, showMessage({
                                    // responseLog['message']
                                    message: "Gracias por preferirnos.",
                                    description: "Drofami.",
                                    type: "success",
                                  }));
                        }}
                    >
                        <ButtonTextCart2>Continuar</ButtonTextCart2>
                    </StyledButtonCart2>

                </StyledContainer>
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
