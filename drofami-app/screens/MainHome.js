import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TouchableWithoutFeedback, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  StyledContainer,
  PageLogOferta,
  Colors,
  PageTitle
} from "../components/styles";
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'
import {
  getRecomendacion,
} from "../src/RecomendacionMethods";
import { data } from './OfertasAncalmo'
import { useSelector } from "react-redux";//este se agrega
import { useIsFocused } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from "./CarouselCardItem";
import { getProduct } from "../src/ProductMethods";
import { showMessage } from "react-native-flash-message";
import Spinner from '../components/Spinner';


function RecommendedCards(props) {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <TouchableOpacity
          onPress={() => {getProduct(props.setLoading, props.token,  item.id, props.setProductResponse)}}
        >
          <Image
            source={{ uri: item.imagen }}
            style={styles.image}
          />
          <Text style={styles.header}>{item.nombre}</Text>
          <Text style={styles.body}>L. {item.precio % 1 == 0 ? item.precio.toFixed(2) : item.precio} </Text>

          <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: Colors.secondary,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
              marginLeft: 250

            }}>
            <Text
              style={{ fontSize: 22, color: Colors.blue, fontWeight: 'bold', top: -4, color: Colors.blue }} >
              +
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

    return (
      <StyledContainer style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => console.log("producto")}
            style={styles.viiew}
          >
            {/* <CarouselCards data={recomendacionANC} /> */}
              <View>
                <Carousel
                  // layout="stack"
                  layoutCardOffset={19}
                  ref={isCarousel}
                  data={props.array}
                  renderItem={CarouselCardItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  onSnapToItem={(index) => setIndex(index)}
                  useScrollView={true}
                  autoplay={true}
                  enableSnap={true}
                  snapToAlignment={'center'}
                  loop={true}
                />
                <Pagination
                  dotsLength={props.array.length}
                  activeDotIndex={index}
                  carouselRef={isCarousel}
                  dotStyle={{
                    width: 10,
                    height: 1,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.92)",
                  }}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                  autoplay={true}
                  loop={true}
                />
              </View>
          </TouchableOpacity>
        </StyledContainer>
    );
}

export default function MainHome({ navigation }) {
  //const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
  const token = React.useRef(useSelector((state) => state.token.value))
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [productResponse, setProductResponse] = useState();
  const [recomendacionANC, setRecomendacionANC] = useState([]);
  const [recomendacionHES, setRecomendacionHES] = useState([]);
  const isEmpleado = React.useRef(useSelector((state) => state.staff.value));
  const isCarousel = React.useRef(null);
  const [index, setIndex] = useState(0);
  // console.log("fish ", recomendacionANC[0]['id']);


  
  React.useEffect(() => {
    if (!token.current) {
      return;
    }
    
      getRecomendacion(setLoading, token.current, setResponse);
    
  }, [])


  React.useEffect(() => {
    if (!response || !response['data'] || !response['data']['ANC']) {
        return;
    }
    setRecomendacionANC((response['data']['ANC']))
   
}, [response]);

React.useEffect(() => {
  if (!response || !response['data'] || !response['data']['HES']) {
      return;
  }
  setRecomendacionHES((response['data']['HES']))
  // console.log(response)
}, [response]);

React.useEffect(() => {
  if (!recomendacionANC) {
      return;
  }
  // console.log(recomendacionANC)
}, [recomendacionANC]);

React.useEffect(() => {
  if (!recomendacionHES) {
      return;
  }
  // console.log(recomendacionHES)
}, [recomendacionHES]);


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

  return (
    <View style={styles.container}>
      <PageLogOferta
        source={require("../assets/drofamilogo1.jpg")}
        resizeMode="cover"
      />
      <Text
        style={{
          marginLeft: 20,
          marginTop: 30,
          top: -20,
          fontWeight: "bold",
          color: Colors.blue,
          fontSize: 20,
        }}
      >
        Productos recomendados para tí
      </Text>
      <ScrollView
        // scrollIndicatorInsets={false}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("./../assets/logoAncalmo.png")}
          style={{
            width: 100,
            height: 100,
            top: 3,
            backgroundColor: Colors.primary,
            marginLeft: 125,
          }}
        />
        <RecommendedCards
          token={token.current}
          array={recomendacionANC}
          setProductResponse={setProductResponse}
          setLoading={setLoading}
        />
        <Image
          source={require("./../assets/hesselLogo1.png")}
          style={{
            width: 100,
            height: 100,
            top: 3,
            backgroundColor: Colors.primary,
            marginLeft: 125,
            marginTop: -60,
          }}
        />
        <RecommendedCards
          token={token.current}
          array={recomendacionHES}
          setProductResponse={setProductResponse}
          setLoading={setLoading}
        />
      </ScrollView>
      {loading && <Spinner text={"Cargando..."} />}
    </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viiew: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blue

  },

  image: {
    width: 150,
    height: 150,
    left:85
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});