import React from 'react';
import { View, SafeAreaView, Image, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotificationText, Counter, Colors, StyledButton, ButtonText } from "../components/styles";

import { Picker } from "@react-native-picker/picker";

const EmpleadoDetalleProductoScreen = ({ navigation, route }) => {

    const producto = route.params;
    const { id, cantidad, imagen, nombre, precio, fabricante, color } = route.params
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => {
        Object.entries(producto.precio).map((element, i) => {
            console.log(element);
            console.log(i);

        })
    }, [])

    const _renderItem = item => {
        return (
            <View style={style.item}>
                <Text style={style.textItem}>{item.name}</Text>
            </View>
        );
    };


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: color,
            }}
        >
            <View style={style.header}>
                <Icon
                    name="arrow-back"
                    size={28}
                    onPress={() => navigation.goBack()}
                />


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
                        alignContent: 'center'
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
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>Seleccione canal de venta:</Text>


                </View>

                <View
                    marginTop={-250}
                >
                    <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholder="Canal de venta"
                        selectedValue={selected}
                        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}

                    >
                        <Picker.Item key={'00'}
                            label={'Canal de venta'}
                            value={null}
                            id={0} />
                        {Object.entries(producto.precio).map((item, index) => {
                            return (
                                <Picker.Item key={index + '-' + item[0]}
                                    label={item[0]}
                                    value={item[0]}
                                    id={item[0]}
                                />
                            );
                        })}
                    </Picker>
                </View>

                {selected &&
                    <View style={style.priceTag}>
                        <Text style={{ color: Colors.white }}>
                            Precio L. {producto.precio[selected]}
                        </Text>
                    </View>
                }

                {selected &&
                    <View style={style.priceTag} marginTop={10}>
                        <Text style={{ color: Colors.white }}>
                            En stock {producto.cantidad}
                        </Text>
                    </View>
                }

            
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
        // top: -250,
        marginLeft: 80

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
        marginLeft: 5

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
    dropdown: {
        backgroundColor: Colors.secondary,
        borderBottomColor: Colors.black,
        borderBottomWidth: 1,
        marginTop: 50,
        top: -200,
        marginBottom: 80,
        marginLeft: 35

    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: Colors.black
    },

});