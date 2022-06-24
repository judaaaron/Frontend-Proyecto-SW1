import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Colors
} from "../components/styles"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCatalog, getProduct } from '../src/ProductMethods'
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { showMessage } from 'react-native-flash-message';

const width = Dimensions.get('window').width / 2 - 30;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const AncalmoScreen = ({ navigation, dato }) => {
    const [isloading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const [productResponse, setProductResponse] = useState();
    const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
    const [catalog, setCatalog] = useState([]);
    const isEmpleado = React.useRef(useSelector((state) => state.staff.value));
    const [refreshing, setRefreshing] = React.useState(false);
    const [content, setContent] = React.useState(catalog)
    const [search, setSearch] = useState();
    const [filteredDataSource, setFilteredDataSource] = useState();
    React.useEffect(() => {
        // console.log("AQUIIII:",filteredDataSource)
    }, [filteredDataSource])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        wait(2000).then(() => {
            setRefreshing(false)
            setContent(getCatalog(setLoading, token, 'ANC', setResponse))
        })
    }, [refreshing, token])

    const isFocused = useIsFocused();
    React.useEffect(() => {
        if (!token) {
            return;
        }
        if (isFocused) {
            getCatalog(setLoading, token, 'ANC', setResponse);
        }
    }, [token])


    React.useEffect(() => {
        if (!response) {
            return;
        }
        if (!response['data']) {
            return;
        }

        const tempCatalog = [];
        response['data'].forEach((element) => {
            tempCatalog.push(element);
        })
        setCatalog(tempCatalog)

    }, [response]);

    React.useEffect(() => {
        const entries = Object.entries(catalog);
    }, [catalog])

    React.useEffect(() => {
        if (!productResponse) {
            return;
        }
        if (!productResponse['status']) {
            showMessage({
                message: "Ha ocurrido un error inesperado.",
                description: "Intente más tarde",
                type: "danger",
            });
            // alert('Ocurrió un error inesperado')
            return;
        }
        if (productResponse['status'] == 'failed') {
            showMessage({
                message: productResponse['message'],
                // description: "Failed",
                type: "danger",
            });
            // alert(productResponse['message']);
        }
        const product = productResponse['data'];

        if (isEmpleado.current) {
            navigation.navigate('EmpleadoDetalleProductoScreen', {
                id: product["producto"]['id'],
                cantidad: product['cantidad'],
                imagen: product['producto']['imagen'],
                nombre: product['producto']["nombre"],
                precio: product['producto']["precio"],
                fabricante: product['producto']["fabricante"],
                color: product["producto"]["color"],
                etiqueta: product["producto"]["etiqueta"]
            });
        } else {
            navigation.navigate('DetalleProductsAncalmo', {
                id: product["producto"]['id'],
                cantidad: product['cantidad'],
                imagen: product['producto']['imagen'],
                nombre: product['producto']["nombre"],
                precio: product['producto']["precio"],
                fabricante: product['producto']["fabricante"],
                indicaciones: product['producto']["indicaciones"],
                dosis: product['producto']["dosis"],
                formula: product['producto']['formula'],
                color: product["producto"]["color"],
                etiqueta: product["producto"]["etiqueta"]
            });
        }
    }, [productResponse])

    //hacer funcion que revise cada elemento del array, si la cantidad es 0 pop -> push al fondo 
    //Esto se seguirá haciendo?
    function emptyToBack(array) {
        //Ordena por cantidades y lo imprime en una tabla
        const temp = [];
        const empty = [];
        array.forEach((element) => {
            if (element['cantidad'] != 0) {
                temp.push(element);
            } else {
                empty.push(element);
            }
        });
        empty.forEach((element) => {
            temp.push(element);
        })
        return temp
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        let hasTag = false;
        if (text) {

            const newData = catalog.filter((element) => {
                if (element.producto.nombre.toLowerCase().includes(text.toLowerCase())) {
                    return true;
                }

                if (!element.producto.etiqueta)
                    return false;




                element.producto.etiqueta.every((tag) => {
                        setTimeout(() => console.log(tag), 5000);
                        if (tag.toLowerCase().includes(text.toLowerCase())) {
                            hasTag = true;

                            return;
                        }
                })

                return hasTag;
                // return ((element.producto.etiqueta.toLowerCase().includes(text.toLowerCase()) ) ? true : false);
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(catalog);
            setSearch(text);
        }
    };


    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.2,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const Card = ({ dato }) => {


        return (
            <TouchableOpacity
                disabled={dato['cantidad'] == 0 ? true : false}
                activeOpacity={dato['cantidad'] == 0 ? 0.1 : 1}
                onPress={() => getProduct(setLoading, token, dato.producto['id'], setProductResponse)}>
                {/* {//hacer el segundo fetch aqui -> mandar datos del response como navigator} */}

                <View style={styles.card}>


                    <View
                        style={{
                            height: 100,
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{ width: 100, height: 100, opacity: dato['cantidad'] == 0 ? 0.3 : 1, }}
                            source={{ uri: dato.producto['imagen'] }}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: dato['cantidad'] == 0 ? Colors.secondary : Colors.black, }}>
                        {dato.producto['nombre']}
                        {dato['cantidad'] == 0 ? ' (Agotado)' : ''}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>


                        {dato.producto.precio != '' && <Text style={{ fontSize: 19, fontWeight: 'bold', color: dato['cantidad'] == 0 ? Colors.secondary : Colors.black, }}>
                            {'L. '}{dato.producto.precio % 1 == 0 ? dato.producto.precio.toFixed(2) : dato.producto.precio}
                            {/* (total + total * 0.15) % 1 == 0 ? setCentavo(true) : setCentavo(false) */}
                        </Text>}
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
                                style={{ fontSize: 22, color: Colors.blue, fontWeight: 'bold', top: -4, color: dato['cantidad'] == 0 ? Colors.secondary : Colors.blue, }} >
                                +
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    function renderHeader() {
        return (
            <View style={styles.searchContainer} marginTop={10}>
                <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    placeholder="Buscar"

                />
            </View>
        );
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,

                backgroundColor: Colors.primary,
            }}
        >
            <View style={{ marginLeft: 16, marginTop: 25 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold", alignItems: 'flex-end' }}>
                    Bienvenido a
                </Text>
                <Text
                    style={{
                        // marginTop: 8,
                        fontSize: 35,
                        fontWeight: "bold",
                        top: -8,
                        color: Colors.blue,
                    }}
                >
                    Productos ANCALMO
                </Text>
            </View>
            <View style={{ paddingHorizontal: 19, marginHorizontal: 0 }}>

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={25} style={{ marginLeft: 20 }} />
                        <TextInput
                            onFocus={(text) => searchFilterFunction()}
                            style={styles.input}
                            onChangeText={(text) => searchFilterFunction(text)}
                            value={search}
                            placeholder="Buscar"
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: 170
                    }}>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            marginBottom: 0,
                            paddingBottom: 50,
                        }}
                        numColumns={2}
                        data={
                            filteredDataSource
                                ? emptyToBack(filteredDataSource)
                                : catalog
                                    ? emptyToBack(catalog)
                                    : []
                        }
                        renderItem={({ item }) => {
                            return <Card dato={item} />;
                        }}
                        keyExtractor={(item) => item.producto.id}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        top: 22,

        marginTop: -50,
        marginRight: -35,
        right: 18,

        backgroundColor: Colors.white
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
        top: -10
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
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        top: -10
    },
    card: {
        height: 225,
        backgroundColor: Colors.light,
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
    },
    scrollView: {
        backgroundColor: 'white',
    },
});

export default AncalmoScreen;


