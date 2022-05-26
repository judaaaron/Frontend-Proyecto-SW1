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
import {nuevaOrden} from "../src/OrderMethods"
import { FAB } from 'react-native-paper';
import Spinner from "../components/Spinner";

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState(null);
  const [response, setResponse] = useState(null);
  const [dataCart, setDataCart] = useState([]);
  const [token, setToken] = useState(useSelector((state) => state.token.value)); //se agrega
  // const [cantItems, setCantIntems] = useState(useSelector((state) => state.cart.value)); //se agrega
  const [loading, setLoading] = useState({value: true});
  const [productResponse, setProductResponse] = useState(null);
  const [productResponseDel, setProductResponseDel] = useState(null);
  console.log("DATA USE carrito ", useSelector((state) => state.cart.value));
  const dispatch = useDispatch();
  const [clearResponse, setClearResponse] = useState(null);
  const [centavo, setCentavo] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading({value: true});
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (!response) {
      return;
    }
    setDataCart(response["data"]);
  }, [response]);

  React.useEffect(() => {
    if (!dataCart) {
      setTotal(0);
      return;
    }
    const currentItems = dataCart;
    var totalAcum = 0;
    currentItems.forEach((element) => {
      totalAcum += element.producto.precio * element.cantidad;
    });
    setTotal(totalAcum);
  }, [dataCart]);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (isFocused) {
      getCart(setLoading, token, setResponse);
    }
  }, [token, isFocused]);

  React.useEffect(() => {
    if (!productResponse || !productResponse["status"]) {
      return;
    }
    switch (productResponse["status"]) {
      case "succesful":
        //no nos interesa creo
        break;
      case "over-limit":
        showMessage({
          message: productResponse["message"],
          type: "danger",
        });
        break;
    }
    if (!productResponse["data"]["cantidad"]) {
      return;
    }
    const currentItems = [...dataCart];
    currentItems.forEach((element) => {
      if (element.producto.id == productResponse["data"]["producto"]["id"]) {
        element.cantidad = productResponse["data"]["cantidad"]
      }
    });
    setDataCart(currentItems);
  }, [productResponse]);

  React.useEffect(() => {
    if (!productResponseDel || !productResponseDel["status"]) {
      return;
    }
    if (!productResponseDel["data"]["producto"]) {
      return;
    }

    const currentItems = [...dataCart];
    const arr2 = currentItems.filter((element) => {
      return (
        element.producto.id != productResponseDel["data"]["producto"]["id"]
      );
    });
    setDataCart(arr2);
  }, [productResponseDel]);

  React.useEffect(() => {
    (total + total * 0.15) % 1 == 0 ? setCentavo(true) : setCentavo(false)
    if (setCentavo === true) {
      <Text>
        {total + total * 0.15}.00
      </Text>
    } else {
      <Text>
        {total + total * 0.15}
      </Text>
    }
  }, [total])

  React.useEffect(() => {
    setLoading({value: true});
  },[])

  React.useEffect(() => {
    if (!orderResponse) {
      return;
    }
    console.log(orderResponse)
    setDataCart([]);
    showMessage({
      message: "Orden.",
      description: orderResponse['status'] == 'success' ? "Orden ha sido procesada" : 
      "Ocurrió un error inesperado. Por favor vuelva a intentar.",
      type: orderResponse['status'],
    }); 
    if (!orderResponse['data']) {
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'OrderDetails' , params: orderResponse['data']}]
    });
  }, [loading])

  React.useEffect(() => {
    if (!clearResponse) {
      return;
    }
    console.log(clearResponse);
    if (!clearResponse['status']) {
      showMessage({
        message: "Error vaciando carrito.",
        description: "Ocurrio un error inesperado, favor vuelva a intentar.",
        type: "danger",
      });
      return;
    }

    showMessage({
      message: (clearResponse['status'] == 'success' ? 'Carrito vaciado' : "Error vaciando carrito."),
      description: clearResponse['message'],
      type: "danger",
    });
    if (clearResponse['status'] == 'success') {
      setDataCart([]);
    }
  }, [clearResponse])

  const increaseQuantity = (id) => {
    const currentItems = [...dataCart];
    let cant = 0;
    currentItems.forEach((element) => {
      if (element.producto.id == id) {
        cant = element.cantidad + 1;
      }
    });
    console.log('subiendo...')
    saveCart(token, id, cant, setProductResponse);
  };

  const decreaseQuantity = (id) => {
    const currentItems = [...dataCart];

    let cant = 0;
    currentItems.forEach((element) => {
      if (element.producto.id == id) {
        cant = element.cantidad - 1;
      }
    });
    if (cant >= 1) {
      saveCart(token, id, cant, setProductResponse);
    }
  };
  const items = useSelector((state) => state.cart.value);

  const deleteSelectedElement = (id) => {

    Alert.alert(
      "Eliminando de carrito",
      "¿Está seguro de eliminar este producto?",
      [
        {
          text: "Dejar en carrito", onPress: () => { },
          style: "cancel",
        },


        {
          text: "Eliminar de carrito",
          onPress: () => {
            dispatch(cartItems(items - 1))
            deleteProduct(setLoading, token, id, setProductResponseDel)

          }

        },
      ]
    );


  };

  // const vaciarCarrito = (id) => {

  //   showMessage({
  //     message: (
  //       '¿Estás seguro de cancelar pedido?',
  //       'Seleccione:',
  //       [
  //         { text: 'Cancel', onPress: () => { }, style: 'cancel' },
  //         {
  //           text: 'OK', onPress: () => {

  //           }
  //         },
  //       ]),
  //     description: "Su orden ha sido cancelada",
  //     type: "danger",
  //   });
  // }

  const CartCard = ({
    id,
    name,
    quantity,
    count,
    productImage,
    precio,
    dosis,
    formula,
    indicaciones,
    fabricante,
    color
  }) => {
    return (
      <TouchableOpacity
        // key={id}
        onPress={() =>{
          navigation.navigate("DetalleProductsAncalmo", {
            id: id,
            cantidad: count,
            imagen: productImage,
            nombre: name,
            precio: precio,
            fabricante: fabricante,
            indicaciones: indicaciones,
            dosis: dosis,
            formula: formula,
            color: color
          })
          }
        }
        // aqui debe de llamarse detalle de producto
        style={{
          width: "100%",
          height: 100,
          marginVertical: 7,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.morado,
            borderRadius: 10,
            marginRight: 30,
          }}
        >
          <Image
            source={{ uri: productImage }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
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
              {name}
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
                {/* 
                (()=>({
                {
                   getPrecio(precio)
                } */}
                L. {precio}
                {/* Ancalmo */}
              </Text>
              <Text>
                {/* (~&#8377;
                {data.productPrice + data.productPrice / 20}) */}
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
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 0.5,
                  borderColor: Colors.white,
                  backgroundColor: Colors.darkBlue,
                  opacity: 0.5,
                }}
              >
                <TouchableOpacity onPress={() => decreaseQuantity(id)}>
                {/*<TouchableOpacity 
                activeOpacity={count > 1 ? 1 : 0.7}
              onPress={decreaseQuantity(id)}*/}
                  <MaterialCommunityIcons
                    name="minus"
                    style={{
                      fontSize: 16,
                      color: Colors.white,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text>{count}</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 0.5,
                  borderColor: Colors.white,
                  //   color: Colors.white,
                  backgroundColor: Colors.darkBlue,
                  opacity: 0.5,
                }}
              >
                <TouchableOpacity onPress={() => increaseQuantity(id)}>
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
            <TouchableOpacity onPress={() => deleteSelectedElement(id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 22,
                  color: Colors.red,
                  backgroundColor: Colors.white,
                  padding: 8,
                  borderRadius: 100,
                  marginRight: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>

      {dataCart.length > 0 ? <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.white,
          position: "relative",
        }}
      >
        {/* <ScrollView> */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
            backgroundColor: Colors.gray,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          ></TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              color: Colors.blue,
              fontWeight: "bold",
            }}
          >
            RESUMEN DE TU ORDEN
          </Text>
          <View></View>
        </View>
        {/* <View> */}

        {/* <Button
          style={style.buyBtn}
          title="Press me"
          onPress={() => Alert.alert("Simple Button pressed")}
        /> */}
        <Text
          style={{
            fontSize: 20,
            color: Colors.blue,
            backgroundColor: Colors.gray,
            fontWeight: "bold",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            top: -6,
            // marginBottom: 10,
          }}
        >
          Mi Carrito
        </Text>

        <StyledButtonCart
          // style={borderWidth= 0.3}
          // style={style.buyBtn}
          onPress={() => {
            if (dataCart.length == 0) {
              showMessage({
                message: "No tiene productos en su carrito.",
                // description: "Agrega productos Hessel o Ancalmo",
                type: "danger",
              });
              return;
            }

            Alert.alert(
              "Cancelando orden",
              "¿Está seguro de cancelar su orden?",
              [
                { text: "Seguir en carrito", onPress: () => { } },
                {
                  text: "Cancelar orden",
                  style: "cancel",
                  onPress: () =>
                    clearCarrito(setLoading, token, setClearResponse),
                },
              ]
            );
          }}
        >
          <ButtonTextCart>CANCELAR MI ORDEN</ButtonTextCart>
        </StyledButtonCart>

        {/* </View> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={dataCart ? dataCart : []}
          renderItem={({ item }) => (
            <CartCard
              key={item.producto.id}
              id={item.producto.id}
              name={item.producto.nombre}
              count={item.cantidad}
              productImage={item.producto.imagen}
              precio={item.producto.precio}
              indicaciones={item.producto.indicaciones}
              dosis={item.producto.dosis}
              formula={item.producto.formula}
              fabricante={item.producto.fabricante}
              color={item.producto.color}
            />
          )}
          keyExtractor={(item) => item.producto.id}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        />
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 15,
            paddingBottom: 15,
            // marginTop: 20,
            // marginBottom: 10,
            backgroundColor: Colors.gray,
            color: Colors.gray,

            // borderWidth: 0.3,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.black,
              fontWeight: "bold",
              letterSpacing: 0.7,
              marginBottom: 20,
            }}
          >
            Información de pedido
          </Text>
          <StyledButtonCart2
            // style={borderWidth= 0.3}
            // style={style.buyBtn}

            style={{
              backgroundColor: dataCart.length == 0 ? Colors.darkLight : Colors.blue,
            }}
            disabled={dataCart.length == 0 ? true : false}
            onPress={() => {
              if (dataCart.length != 0) {
                //navigation.navigate("OrderDetails")//no se si esto va aqui
                Alert.alert(
                  "Generando orden",
                  "¿Estás seguro de efectuar tu orden?",
                  [
                    {
                      text: "Generar orden",
                      style:"ok",
                      onPress: () => {
                        nuevaOrden(setLoading, token, setOrderResponse);
                      }
                      
                    },
                    {
                      text: "Regresar",
                      style: "cancel",
                      onPress: () => {}
                     ,
                    },
                  ]
                );
              } else {
                showMessage({
                  message: "No tiene productos en su carrito.",
                  description: "Agrega productos Hessel o Ancalmo",
                  type: "danger",
                });
              }
            }}
          >
            <ButtonTextCart2>CONTINUAR</ButtonTextCart2>
          </StyledButtonCart2>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                maxWidth: "80%",
                color: Colors.black,
                opacity: 0.5,
              }}
            >
              Subtotal
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: Colors.black,
                opacity: 0.8,
              }}
            >
              L. {total}.00
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 22,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                maxWidth: "80%",
                color: Colors.black,
                opacity: 0.5,
              }}
            >
              ISV
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: Colors.black,
                opacity: 0.8,
              }}
            >
              %{15}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                maxWidth: "80%",
                color: Colors.black,
                opacity: 0.7,
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.black,
              }}
            >
              L. {(total + total * 0.15) % 1 == 0 ? (total + total * 0.15).toFixed(2) : (total + total * 0.15)}

            </Text>
          </View>
        </View>

        {/* </ScrollView> */}
      </View> : <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: Colors.white,
          position: "relative",
        }}
      >
        {/* <ScrollView> */}

        <View marginLeft={30}
          top={20}
        >
          <Text style={{ fontWeight: 'bold', top: 200, color: Colors.blue }}>
            Actualmente no tienes productos en carrito.
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 230,
            backgroundColor: Colors.white,
          }}
        ></View>


        <PageLogOferta
          source={require("../assets/emptycart.png")}
          resizeMode="cover"
        />


        <FAB
          theme={{ colors: { accent: Colors.blue } }}
          big
          icon="plus"
          style={style.fab}
          onPress={()=>{
            navigation.navigate('Ancalmo')
          }}
        />

        <View marginTop={-177}
        marginLeft={80}
        >
          <Text style={{ fontWeight: 'bold', top: 215, color: Colors.blue }}>
            Agrega productos nuevos
          </Text>
        </View>
      </View>}

      {loading.value && 
      (loading.message ? 
        <Spinner text={loading.message}/> : 
        <Spinner text={"Cargando..."} color={'blue'}/>)}
    </>
  );
};;

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

export default CartScreen;
