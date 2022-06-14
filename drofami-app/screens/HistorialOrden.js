import React from "react";
import { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
    Colors
} from "../components/styles";
import { useSelector } from "react-redux";//esta
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getOrdenes, getOrdenDetalle } from "../src/OrderMethods";


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
        navigation.reset({
            index: 0,
            routes: [{ name: 'OrderDetails' , params: specificResponse['data']}]
          })

    }, [specificResponse]);


    function ordenarPorFecha(array) {
        const temp = array.sort((a, b) => new Date(a.fechas).getTime() > new Date(b.fechas).getTime())
        //const
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

                                    Total: L.{(total + (total*0.15)) %1==0 ? (total + (total*0.15)).toFixed(2) : total + (total*0.15)}

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
        <View
          style={{
            marginTop: 35,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 18,
            color: Colors.blue,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: Colors.black }}
          >
            Historial de tus ordenes
          </Text>
          <Icon
            name="arrow-back"
            size={30}
            style={{ marginRight: 350, top: -25 }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
            data={ordenes ? ordenarPorFecha(ordenes) : []}
            renderItem={({ item }) => (
              <List
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
      </View>
    );

};




export default HistorialOrden