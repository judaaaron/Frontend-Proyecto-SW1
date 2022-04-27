import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../components/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CartScreen = ({ navigation }) => {
    const [total, setTotal] = useState(null);
    const [counter, setCounter] = useState(1);

    const handleAdd = () => {
        setCounter(counter + 1);
    }

    const handleSubstract = () => {
        counter != 1 ? setCounter(counter - 1) : counter
    }
    const CartCard = ({ item }) => {
        return <TouchableOpacity
            key={data.key}
            onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
            style={{
                width: '100%',
                height: 100,
                marginVertical: 7,
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10
            }}>
            <View
                style={{
                    width: '30%',
                    height: 100,
                    padding: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.secondary,
                    borderRadius: 10,
                    marginRight: 30,
                }}>
                <Image
                    source={data.productImage}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'space-around',
                }}>
                <View style={{}}>
                    <Text
                        style={{
                            fontSize: 14,
                            maxWidth: '100%',
                            color: Colors.black,
                            fontWeight: '600',
                            letterSpacing: 1,
                        }}>
                        {data.productName}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            opacity: 0.6,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '85%',
                                marginRight: 4,
                            }}>
                            &#8377;{data.productPrice}
                        </Text>
                        <Text>
                            (~&#8377;
                            {data.productPrice + data.productPrice / 20})
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: Colors.blue,
                                backgroundColor: Colors.blue,
                                opacity: 0.5,
                            }}>
                            <TouchableOpacity onPress={handleSubstract}>


                                <MaterialCommunityIcons
                                    name="minus"
                                    style={{
                                        fontSize: 16,
                                        color: Colors.white,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text>{counter}</Text>
                        <View
                            style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                // borderWidth: 1,
                                // borderColor: Colors.blue,
                                color: Colors.white,
                                backgroundColor: Colors.blue,
                                opacity: 0.5,
                            }}>
                            <TouchableOpacity onPress={handleAdd}>


                                <MaterialCommunityIcons

                                    name="plus"
                                    style={{
                                        fontSize: 16,
                                        color: Colors.white,
                                    }}

                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity >
                        {/* onPress={() => removeItemFromCart(data.id)} para remover*/}
                        <MaterialCommunityIcons
                            name="delete-outline"
                            style={{
                                fontSize: 22,
                                color: Colors.red,
                                backgroundColor: Colors.white,
                                padding: 8,
                                borderRadius: 100,
                                marginRight: 25
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    }
    return (

        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: Colors.white,
                position: 'relative',

            }}>
            {/* <ScrollView> */}
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                     marginTop: 20,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 18,
                        color: Colors.black,
                        fontWeight: 'bold'
                    }}>
                    Detalle de Orden
                </Text>
                <View></View>

            </View>
            <Text
                style={{
                    fontSize: 20,
                    color: Colors.black,
                    fontWeight: 'bold',
                    paddingTop: 20,
                    paddingLeft: 16,
                    marginBottom: 10,
                }}>
                Mi Carrito
            </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={"foods"}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
            />
            <View
            style={{
              paddingHorizontal: 16,
              marginTop: 20,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: Colors.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Información de pedido
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: Colors.black,
                  opacity: 0.5,
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: Colors.black,
                  opacity: 0.8,
                }}>
                L. {total}.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: Colors.black,
                  opacity: 0.5,
                }}>
                ISV
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: Colors.black,
                  opacity: 0.8,
                }}>
                % {0.15}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: Colors.black,
                  opacity: 0.5,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.black,
                }}>
                L. {total + total / 20}
              </Text>
            </View>
          </View>
            
            {/* </ScrollView> */}
        </View>
    )
};

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: Colors.white,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    }
});


export default CartScreen;