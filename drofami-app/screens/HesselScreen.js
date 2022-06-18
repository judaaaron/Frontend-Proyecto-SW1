import * as React from 'react';
import { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Colors
} from "../components/styles"
import { TouchableOpacity } from 'react-native-gesture-handler';
import {getCatalog, getProduct} from '../src/ProductMethods'
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";//este se agrega
import { showMessage } from 'react-native-flash-message';
const width = Dimensions.get('window').width / 2 - 30;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default function HesselScreen({ navigation }) {
  const [isloading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [token, setToken] = useState(useSelector((state) => state.token.value)); //se agrega
  const [productResponse, setProductResponse] = useState();
  const [catalog, setCatalog] = useState([]);
  const isEmpleado = React.useRef(useSelector((state) => state.staff.value));
  const [refreshing, setRefreshing] = React.useState(false);
  const [content, setContent] = React.useState(catalog);
  const [search, setSearch] = useState();
  const [filteredDataSource, setFilteredDataSource] = useState();
  const [masterDataSource, setMasterDataSource] = useState(catalog);

  React.useEffect(() => {
    // console.log("AQUIIII:", filteredDataSource);
  }, [filteredDataSource]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      setContent(getCatalog(setLoading, token, "HES", setResponse));
    });
  }, [refreshing, token]);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (!token) {
      return;
    }
    if (isFocused) {
      getCatalog(setLoading, token, "HES", setResponse);
    }
  }, [token]);

  React.useEffect(() => {
    if (!response) {
      return;
    }
    if (!response["data"]) {
      return;
    }
    const tempCatalog = [];
    response["data"].forEach((element) => {
      tempCatalog.push(element);
    });
    setCatalog(tempCatalog);
  }, [response]);

  React.useEffect(() => {
    const entries = Object.entries(catalog);
  }, [catalog]);

  React.useEffect(() => {
    if (!productResponse) {
      return;
    }
    if (!productResponse["status"]) {
      showMessage({
        message: "Ha ocurrido un error inesperado.",
        description: "Intente más tarde",
        type: "danger",
      });
      // alert('Ocurrió un error inesperado')
      return;
    }
    if (productResponse["status"] == "failed") {
      showMessage({
        message: productResponse["message"],
        // description: "Failed",
        type: "danger",
      });
      // alert(productResponse['message']);
    }

    const product = productResponse["data"];
    if (isEmpleado.current) {
      navigation.navigate("EmpleadoDetalleProductoScreen", {
        id: product["producto"]["id"],
        cantidad: product["cantidad"],
        imagen: product["producto"]["imagen"],
        nombre: product["producto"]["nombre"],
        precio: product["producto"]["precio"],
        fabricante: product["producto"]["fabricante"],
        color: product["producto"]["color"],
      });
    } else {
      navigation.navigate("DetalleProductsAncalmo", {
        id: product["producto"]["id"],
        cantidad: product["cantidad"],
        imagen: product["producto"]["imagen"],
        nombre: product["producto"]["nombre"],
        precio: product["producto"]["precio"],
        fabricante: product["producto"]["fabricante"],
        indicaciones: product["producto"]["indicaciones"],
        dosis: product["producto"]["dosis"],
        formula: product["producto"]["formula"],
        color: product["producto"]["color"],
      });
    }
  }, [productResponse]);

  //hacer funcion que revise cada elemento del array, si la cantidad es 0 pop -> push al fondo
  function emptyToBack(array) {
    //Ordena por cantidades y lo imprime en una tabla
    const temp = [];
    const empty = [];
    array.forEach((element) => {
      if (element["cantidad"] != 0) {
        temp.push(element);
      } else {
        empty.push(element);
      }
    });
    empty.forEach((element) => {
      temp.push(element);
    });
    return temp;
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = catalog.filter((element) => {
        return element.producto.nombre
          .toLowerCase()
          .includes(text.toLowerCase())
          ? true
          : false;
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
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const Card = ({ dato }) => {
    return (
      <TouchableOpacity
        disabled={dato["cantidad"] == 0 ? true : false}
        activeOpacity={dato["cantidad"] == 0 ? 0.1 : 1}
        onPress={() =>
          getProduct(setLoading, token, dato.producto["id"], setProductResponse)
        }
      >
        {/* {//hacer el segundo fetch aqui -> mandar datos del response como navigator} */}

        <View style={styles.card}>
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                opacity: dato["cantidad"] == 0 ? 0.3 : 1,
              }}
              source={{ uri: dato.producto["imagen"] }}
            />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              marginTop: 10,
              color: dato["cantidad"] == 0 ? Colors.secondary : Colors.black,
            }}
          >
            {dato.producto["nombre"]}
            {dato["cantidad"] == 0 ? " (Agotado)" : ""}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            {dato.producto.precio != "" && (
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "bold",
                  color:
                    dato["cantidad"] == 0 ? Colors.secondary : Colors.black,
                }}
              >
                {"L. "}
                {dato.producto.precio %1==0 ? dato.producto.precio.toFixed(2) : dato.producto.precio}
              </Text>
            )}
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: Colors.primary,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: Colors.blue,
                  fontWeight: "bold",
                  top: -4,
                  color: dato["cantidad"] == 0 ? Colors.secondary : Colors.blue,
                }}
              >
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
        paddingHorizontal: 19,
        backgroundColor: Colors.primary,
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Bienvenido a</Text>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              color: Colors.blue,
            }}
          >
            Productos HESSEL
          </Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: "row" }}>
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
        <FlatList
          //  ListHeaderComponent={renderHeader}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
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
          //   ItemSeparatorComponent={ItemSeparatorView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
        height: 50,
        backgroundColor: Colors.secondary,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
    },

    input: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.tertiary,
        flex: 1,
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