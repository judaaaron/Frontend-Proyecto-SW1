import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
import {
    Colors
} from "../components/styles"
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'
import datos from './AncalmoProducts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCatalog, getProduct} from '../src/ProductMethods'
import { useIsFocused } from "@react-navigation/native";
//import { Icon } from 'react-native-elements';
const width = Dimensions.get('window').width / 2 - 30;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
const AncalmoScreen = ({ navigation }) => {
    const [isloading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const [productResponse, setProductResponse] = useState();
    const [token, setToken] = useState();
    const [catalog, setCatalog] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    
    }, [catalog])
    wait(2000).then(() => setRefreshing(false));
  

    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token'];
            console.log("token ", token);
            setToken(token)    
        }
        token();
    }, []);

    const isFocused = useIsFocused();
    React.useEffect(() => {
        if (!token) {
            return;
        }
        if(isFocused){ 
            getCatalog(setLoading, token, 'ANC',setResponse);
        }
    }, [token])
    //}, [token, isFocused])

    React.useEffect(() => {
        if (!response) {
            return;
        }
        if (!response['data']) {
            return;
        }
        const tempCatalog = [...catalog];
        response['data'].forEach((element) => {
            tempCatalog.push(element);
        })
        setCatalog(catalog => ({
            ...tempCatalog
        }));
    }, [response]);

    React.useEffect(() => {
        const entries = Object.entries(catalog);
    }, [catalog])

    React.useEffect(() => {
        if (!productResponse) {
            return;
        }
        if (!productResponse['status']) {
            alert('Ocurrió un error inesperado')
            return;
        }
        if (productResponse['status'] == 'failed') {
            alert(productResponse['message']);
        }
        console.log(productResponse)
        const product = productResponse['data'];
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
          });
    }, [productResponse])
    
    //hacer funcion que revise cada elemento del array, si la cantidad es 0 pop -> push al fondo 
    //Esto se seguirá haciendo?
    function emptyToBack(array) {
        //Ordena por cantidades y lo imprime en una tabla
        //console.table(this.producto.sort(((a, b) => b.cantidad - a.cantidad)));w
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

    const Card = ({ dato }) => {
      
        return (
            <TouchableOpacity
                disabled={dato['cantidad'] == 0 ? true : false}
                activeOpacity={dato['cantidad'] == 0  ? 0.1 : 1}
                onPress={() => getProduct(setLoading, token, dato.producto['id'], setProductResponse) }>
                    {/* {//hacer el segundo fetch aqui -> mandar datos del response como navigator} */}
                    
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
                            style={{ width: 100, height: 100, opacity: dato['cantidad'] == 0 ? 0.3:1,}}
                            source={{uri: dato.producto['imagen']}}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10, color: dato['cantidad'] == 0 ? Colors.secondary:Colors.black, }}>
                        {dato.producto['nombre']}
                        {dato['cantidad']==0 ? ' (Agotado)':''}
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
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: dato['cantidad'] == 0 ? Colors.secondary:Colors.black, }}>
                            {'L. '}{dato.producto.precio}
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
                                style={{ fontSize: 22, color: Colors.blue, fontWeight: 'bold', top: -4, color: dato['cantidad'] == 0 ? Colors.secondary:Colors.blue, }} >
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
                paddingHorizontal: 19,
                backgroundColor: Colors.primary,

            }}>
        {/* <ScrollView contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
             */}
                   
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Bienvenido a</Text>
                    <Text style={{ fontSize: 38, fontWeight: 'bold', color: Colors.blue, alignItems: 'center' }}>
                        Productos ANCALMO
                    </Text>

                    {/* <PageLog
                            source={require("../assets/logoAncalmo.png")}
                            style={{width: 100, height: 100}}
                            resizeMode="cover"
                        /> */}
                        
                </View>
                
                <Icon name="shopping-cart" size={30} color={Colors.blue} />
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
                data={catalog ? emptyToBack(Object.values(catalog)) : []}
                renderItem={({ item }) => {
                    return <Card dato={item} />;
                }}
                keyExtractor={(item) => item.producto.id}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
             {/* </ScrollView> */}
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
        marginBottom: 20,
        padding: 15,
    },
    scrollView: {
        backgroundColor:'white',
      },
});

export default AncalmoScreen;