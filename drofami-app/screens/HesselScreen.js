import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "../components/styles"
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'
//import datos from './AncalmoProducts';
import datosH from './HesselProducts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DetalleProductsAncalmo from '../screens/DetalleProductsAncalmo';
import DetalleProductsHessel from './DetalleProductsHessel';

import { StatusBar } from "expo-status-bar";
//import { Icon } from 'react-native-elements';
const width = Dimensions.get('window').width / 2 - 30;


export default function HesselScreen({ navigation }) {
    const Card = ({datoh}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetalleProductsHessel', datoh)}>
                <View style={styles.card}>
                    <View style={{ alignItems: 'flex-end' }}>
                        {/* <View
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: dato.like
                                    ? 'rgba(245, 42, 42,0.2)'
                                    : 'rgba(0,0,0,0.2) ',
                            }}> */}
                            {/* <Icon
                                name="favorite"
                                size={18}
                                color={dato.like ? Colors.red : Colors.primary}
                            /> */}
                        {/* </View> */}
                    </View>

                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{ flex: 1, resizeMode: 'contain' }}
                            source={datoh.img}
                           
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
                        {datoh.name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                        {/* <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                            {dato.price}
                        </Text> */}
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                            {datoh.currency}{datoh.price}
                        </Text>
                        <View
                            style={{
                                height: 25,
                                width: 25,
                                backgroundColor: Colors.primary,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{ fontSize: 22, color: Colors.brand, fontWeight: 'bold' , top:-4}}>
                                +
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                top: 25,
                paddingHorizontal: 20,
                backgroundColor: Colors.primary,

            }}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Bienvenido a</Text>
                    <Text style={{ fontSize: 38, fontWeight: 'bold', color: Colors.brand, alignItems:'center' }}>
                        Productos  HESSEL
                    </Text>
                    {/* <PageLog
                            source={require("../assets/logoAncalmo.png")}
                            style={{width: 100, height: 100}}
                            resizeMode="cover"
                        /> */}
                </View>
                <Icon name="shopping-cart" size={30} color={'#6D28D9'} />
            </View>
            <View style={{ marginTop: 30, flexDirection: 'row' }}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                    <TextInput placeholder='Buscar' style={styles.input}></TextInput>
                </View>
                <View style={styles.sortBtn}>
                    <Icon name="sort" size={30} color={Colors.primary} />
                </View>
            </View>
            <FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                }}
                numColumns={2}
                data={datosH}
                renderItem={({ item }) => {
                    return <Card datoh={item} />;
                }}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    searchContainer: {
        height: 50,
        backgroundColor: Colors.secondary,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        top:-10
    },

    input: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.tertiary,
        flex: 1,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: Colors.brand,
        justifyContent: 'center',
        alignItems: 'center',
        top:-10
    },
    card: {
        height: 225,
        backgroundColor: Colors.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
});