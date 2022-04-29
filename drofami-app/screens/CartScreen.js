import React from "react";
import { useState } from "react";
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
import {showMessage} from 'react-native-flash-message';

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState(null);
  const [counter, setCounter] = useState(1);
  const [enCarrito, setCarrito] = useState([]);

  const handleAdd = (id) => {

    setCounter(counter + 1);
  };

  const handleSubstract = () => {
    counter != 1 ? setCounter(counter - 1) : counter;
  };

const [TEMP_DATA, setTEMP_DATA] = useState([
    {
        id: 1,
        name: 'ANTIGRIPAL ANCALMO',
        quantity: 3,
        count: 1,
       // like: true,
        // img: require('../assets/bacaoliver-web.png'),
    
        // about:
        //   'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
        // formula: 
        //   '500 mg bla bla bla',
        // dosis: 
        //     ' 2 tabletas al dia', 
      },
    
      {
        id: 2,
        name: 'BACAOLIVER EMULSION',
        quantity: 2,
        count: 1,
        // currency: 'L. ',
        // price: 20.95,
        // //like: false,
        // img: require('../assets/bacaoliver-web.png'),
        // about:
        // 'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
        // formula: 
        // '500 mg bla bla bla',
        // dosis: 
        //   ' 2 tabletas al dia',
      },
    
      {
        id: 3,
        name: 'CALAMINA ANTIALERGICA',
        quantity: 4,
        count: 1,
        // currency: 'L. ',
        // price: 20.95,
        // //like: false,
        // img: require('../assets/bacaoliver-web.png'),
        // about:
        // 'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
        // formula: 
        // '500 mg bla bla bla',
        // dosis: 
        //   ' 2 tabletas al dia',
      },
    
      {
        id: 4,
        name: 'CALAMINA MENTOLADA',
        quantity: 6,
        count: 1,
    //     currency: 'L. ',
    //     price: 20.95,
    //    // like: true,
    //     img: require('../assets/bacaoliver-web.png'),
    //     about:
    //     'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
    //   formula: 
    //     '500 mg bla bla bla',
    //   dosis: 
    //       ' 2 tabletas al dia',
      },
      {
        id: 5,
        name: 'DOLO MARATON',
        quantity: 7,
        count: 1,
    //     currency: 'L. ',
    //     price: 20.95,
    //     //like: true,
    //     img: require('../assets/bacaoliver-web.png'),
    //     about:
    //     'Por su acción: Antihistamínica y antipuriginosa (Antialérgica) Se recomienda para el alivio de molestias debido al salpullido, urticaria, quemaduras de sol y otras irritaciones de la piel y alergias.',
    //   formula: 
    //     '500 mg bla bla bla',
    //   dosis: 
    //       ' 2 tabletas al dia',
      },
 
  ]);
  const reduction = (id) =>{
    // const { cart } = this.state;
    TEMP_DATA.forEach(item =>{
        if(item.id === id){
            item.count === 1 ? item.count = 1 : item.count -=1;
        }
    })
  
   
};

const increase = (id) =>{
   
    TEMP_DATA.forEach(item =>{
        if(item.id === id){
            item.count += 1;
        }
    })
   
    
};


  const deleteSelectedElement = (id, name) => {
    const filteredData = TEMP_DATA.filter(item => item.id !== id);
    setTEMP_DATA(filteredData);
  }

 const handleDecrement = (id)=>{
    setTEMP_DATA(TEMP_DATA =>
        setTEMP_DATA.map((item)=>
        id===item.id ? {...item, quantity: item.quantity -1 }: item
        )
    )
 }

  const CartCard = ({ id, name, quantity, count }) => {
    return (
      <TouchableOpacity
        // key={data.key}
        // onPress={() =>
        // //   navigation.navigate("ProductInfo", { productID: data.id })
        // } aqui debe de llamarse detalle de producto
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
            // source={data.productImage}
            source={require("../assets/bacaoliver-web.png")}
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
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                {/* &#8377;{data.productPrice} */}
                Ancalmo
              </Text>
              <Text>
                {/* (~&#8377;
                {data.productPrice + data.productPrice / 20}) */}
                L.500
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
                <TouchableOpacity onPress={()=>handleAdd()}>
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
                <TouchableOpacity onPress={() => reduction(id)}>
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
            <TouchableOpacity onPress={() => deleteSelectedElement(id,name)}>
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
        // data={"foods"}
        data={TEMP_DATA}
        // renderItem={({ item }) => <CartCard item={item} />}
        renderItem={({ item }) => <CartCard id={item.id} name={item.name} quantity={item.quantity} count ={item.count}/>}
        // ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
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
            letterSpacing: 1,
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
            L. {total + total / 20}
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
