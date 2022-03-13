import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as SecureStore from 'expo-secure-store';
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
import datos from './AncalmoProducts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCatalog} from '../src/ProductMethods'
import { StatusBar } from "expo-status-bar";
//import { Icon } from 'react-native-elements';
const width = Dimensions.get('window').width / 2 - 30;
const AncalmoScreen = ({ navigation }) => {
    const [isloading, setLoading] = useState(false);
    const [response, setResponse] = useState();
    const [token, setToken] = useState();
    const [catalog, setCatalog] = useState([]);
    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token'];
            console.log("token ", token);
            setToken(token)    
        }
        token();
    }, []);

    React.useEffect(() => {
        if (!token) {
            return;
        }
        getCatalog(setLoading, token, 'ANC',setResponse);
    }, [token])

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
        console.log(entries);
    }, [catalog])

    const Card = ({ dato }) => {
        console.log(dato)
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetalleProductsAncalmo', dato) }>
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
                            style={{ width: 100, height: 100, }}
                            source={{uri: dato.producto['imagen']}}
                        />
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
                        {dato.producto['nombre']}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                        }}>
                                {/* estimado necesita algo? */}
                                
                        {/* <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
                            {dato.price}
                        </Text> */}
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>
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
                                style={{ fontSize: 22, color: Colors.blue, fontWeight: 'bold', top: -4 }}>
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
                paddingHorizontal: 25,
                backgroundColor: Colors.primary,

            }}>
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
                data={catalog ? Object.values(catalog) : []}
                renderItem={({ item }) => {
                    return <Card dato={item} />;
                }}
                keyExtractor={(item) => item.producto.id}
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
});

export default AncalmoScreen;