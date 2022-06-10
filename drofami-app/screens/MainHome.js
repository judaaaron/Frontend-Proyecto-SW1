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


export default function MainHome({ navigation }) {
  //const [token, setToken] = useState(useSelector((state) => state.token.value));//se agrega
  const token = React.useRef(useSelector((state) => state.token.value))
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [productResponse, setProductResponse] = useState();
  const [recomendacionANC, setRecomendacionANC] = useState([]);
  const [recomendacionHES, setRecomendacionHES] = useState([]);


  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (!token.current) {
      // console.log("CACA")
      return;
    }
    if (isFocused) {
      getRecomendacion(setLoading, token.current, setResponse);
      // console.log(token.current)
    }
  }, [])


  React.useEffect(() => {
    if (!response) {
        return;
    }
    setRecomendacionANC(...(response['data']['ANC']))
    // console.log(response)
}, [response]);

React.useEffect(() => {
  if (!response) {
      return;
  }
  setRecomendacionHES(...(response['data']['HES']))
  // console.log(response)
}, [response]);

React.useEffect(() => {
  if (!recomendacionANC) {
      return;
  }
  console.log(recomendacionANC)
}, [recomendacionANC]);

React.useEffect(() => {
  if (!recomendacionHES) {
      return;
  }
  console.log(recomendacionHES)
}, [recomendacionHES]);

  // este dataRecomendaciones ya tiene los nombres de los campos que el json de recomendaciones retorna (nombre, url, precio)
  const dataRecomendaciones = [
    {
      nombre: "Aciclovirax",
      imgUrl: "https://www.ancalmo.com/wp-content/uploads/2017/04/Aciclo-120ml.jpg",
      precio: 50.50.toFixed(2)

    },
    {
      nombre: "Aciclovirax",
      imgUrl: "https://www.ancalmo.com/wp-content/uploads/2017/04/Aciclo-120ml.jpg",
      precio: 50.50.toFixed(2)
    },
    {
      nombre: "Aciclovirax",
      imgUrl: "https://www.ancalmo.com/wp-content/uploads/2017/04/Aciclo-120ml.jpg",
      precio: 50.50.toFixed(2)
    },
  ]
  return (


    <View style={styles.container}>
      <PageLogOferta
        source={require("../assets/drofamilogo1.jpg")}
        resizeMode="cover"
      />
      <Text style={{ marginLeft: 20, marginTop: 30, top: -20, fontWeight: 'bold', color: Colors.blue, fontSize: 20 }}>Productos recomendados para tí</Text>
      <ScrollView
        // scrollIndicatorInsets={false}
        showsVerticalScrollIndicator={false}
      >
        <Image source={require("./../assets/logoAncalmo.png")}
          style={{ width: 100, height: 100, top: 3, backgroundColor: Colors.primary, marginLeft: 125 }}
        />
        <StyledContainer style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => console.log('producto')} style={styles.viiew}>

            <CarouselCards data={dataRecomendaciones} />

          </TouchableOpacity>
        </StyledContainer>

        <Image source={require("./../assets/hesselLogo1.png")}
          style={{ width: 100, height: 100, top: 3, backgroundColor: Colors.primary, marginLeft: 125, marginTop: -60 }}
        />
        <StyledContainer style={{ marginTop: -2 }}>
          <TouchableOpacity style={styles.viiew}>
            <CarouselCards2 />
          </TouchableOpacity>
        </StyledContainer>
      </ScrollView>
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

  }
});