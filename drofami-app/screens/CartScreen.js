import React from "react";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { getCart, saveCart, clearCarrito, deleteProduct } from '../src/CartMethods'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList } from "react-native-gesture-handler";
import {
  Colors,
  StyledButtonCart2,
  ButtonTextCart2,
  StyledButtonCart,
  ButtonTextCart,
} from "../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";//esta

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState(null);
  const [enCarrito, setCarrito] = useState([]);
  const [response, setResponse] = useState(null);
  const [dataCart, setDataCart] = useState(null);
  const [token, setToken] = useState(useSelector((state) => state.getToken));
  const [loading, setLoading] = useState(false);
  const [productResponse, setProductResponse] = useState(null);
  const [productResponseDel, setProductResponseDel] = useState(null);
  const [TEMP_DATA, setTEMP_DATA] = useState([
    //#region tempData
    {
      id: 0,
      name: 'ANTIGRIPAL ANCALMO',
      quantity: 3,
      count: 1,
    },

    {
      id: 1,
      name: 'BACAOLIVER EMULSION',
      quantity: 2,
      count: 1,

    },

    {
      id: 2,
      name: 'CALAMINA ANTIALERGICA',
      quantity: 4,
      count: 1,

    },

    {
      id: 3,
      name: 'CALAMINA MENTOLADA',
      quantity: 6,
      count: 1,

    },
    {
      id: 4,
      name: 'DOLO MARATON',
      quantity: 7,
      count: 1,

    },

  ]);//#endregion


  
  React.useEffect(() => { 
    if (!response) {
      return;
    }
    setDataCart(response['data']);
    

  }, [response])

  React.useEffect(() => {
    if (!dataCart) {
      setTotal(0);
      return;
    }
    const currentItems = dataCart;
    var totalAcum = 0;
    currentItems.forEach((element) => {
      totalAcum += element.producto.precio*element.cantidad;
    });
    setTotal(totalAcum);
  }, [dataCart])

//   React.useEffect(() => {
//     async function token() {
//         const session = await SecureStore.getItemAsync("user_session");
//         token = JSON.parse(session)['token'];
//         console.log("token ", token);
//         setToken(token)
//     }
//     token();
// }, []);

const isFocused = useIsFocused();
  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (isFocused) {
      getCart(setLoading, token, setResponse);
    }
  }, [token, isFocused])

  React.useEffect(() => {
    if (!productResponse || !productResponse['status']) {
      return;
    }
    switch (productResponse['status']) {
      case 'succesful':
        //no nos interesa creo
        break;
      case 'over-limit': 
      showMessage({
        message: productResponse['message'],
        type: "danger",
        
      });
        break;
    }
    if (!productResponse['data']['cantidad']) {
      return;
    }
    const currentItems = [...dataCart];
    currentItems.forEach((element) => {
      if (element.producto.id == productResponse['data']['producto']['id']) {
        element.cantidad = productResponse['data']['cantidad'];
      }
    });
    setDataCart(currentItems);
  }, [productResponse])

  React.useEffect(() => {
    if (!productResponseDel || !productResponseDel['status']) {
      return;
    }
    if (!productResponseDel['data']['producto']) {
      return;
    }
    
    const currentItems = [...dataCart];
    const arr2 = currentItems.filter((element) => {
      return element.producto.id != productResponseDel['data']['producto']['id'];
    });
    setDataCart(arr2);
  }, [productResponseDel])

  const increaseQuantity = (id) => {
    const currentItems = [...dataCart];
    let cant = 0
    currentItems.forEach((element) => {
      if (element.producto.id == id) {
        cant = (element.cantidad + 1);
      }
    });
    saveCart(token, id, cant, setProductResponse)  
  };



  const decreaseQuantity = (id) => {
    const currentItems = [...dataCart];

    let cant = 0
    currentItems.forEach((element) => {
      if (element.producto.id == id) {
        cant = (element.cantidad - 1);
      }
    });
    saveCart(token, id, cant, setProductResponse)  
  };

  const deleteSelectedElement = (id) => {
    deleteProduct(setLoading, token, id, setProductResponseDel);
  }

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


  const CartCard = ({ id, name, quantity, count, productImage, precio, dosis, formula, indicaciones, fabricante }) => {
    return (
      <TouchableOpacity
        // key={id}
        onPress={() =>
          navigation.navigate('DetalleProductsAncalmo', {
            id: id,
            cantidad: count,
            imagen: productImage,
            nombre: name,
            precio: precio,
            fabricante: fabricante,
            indicaciones: indicaciones,
            dosis: dosis,
            formula: formula,
        })
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
            source={{ uri: productImage}}
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
                fontWeight: 'bold',
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
                  fontWeight: 'bold',
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
    <View
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
          top:-6
          // marginBottom: 10,
        }}
      >
        Mi Carrito
      </Text>

      <StyledButtonCart
        // style={borderWidth= 0.3}
        // style={style.buyBtn}
        onPress={() => {
          showMessage({
            message: "Orden Cancelada.",
            description: "Su orden ha sido cancelada",
            type: "danger",
            
          });
        }}
      >
        <ButtonTextCart>CANCELAR MI ORDEN</ButtonTextCart>
      </StyledButtonCart>

      {/* </View> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={dataCart ? dataCart : []}
        renderItem={({ item }) => <CartCard key={item.producto.id} id={item.producto.id} name={item.producto.nombre} count={item.cantidad}
        productImage={item.producto.imagen} precio={item.producto.precio} indicaciones={item.producto.indicaciones}
        dosis={item.producto.dosis} formula={item.producto.formula} fabricante={item.producto.fabricante} />}
        keyExtractor={item => item.producto.id}
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
          onPress={() => {
            showMessage({
              message: "Orden en Proceso.",
              description: "Estamos preparando los detalles de tu orden",
              type: "info",
            });
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
            L. {total + (total *0.15)}
          </Text>
        </View>
      </View>



      {/* </ScrollView> */}
    </View>
  );
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
