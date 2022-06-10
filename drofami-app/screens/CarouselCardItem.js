import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import {
  StyledContainer,
  PageLogOferta,
  Colors,
  PageTitle
} from "../components/styles";

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imagen }}
        style={styles.image}
      />
      <Text style={styles.header}>{item.nombre}</Text>
      <Text style={styles.body}>L. {item.precio} </Text>

      <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: Colors.secondary,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:5,
                marginLeft:250
            
              }}>
              <Text
                style={{ fontSize: 22, color: Colors.blue, fontWeight: 'bold', top: -4, color:Colors.blue}} >
                +
              </Text>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
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
})

export default CarouselCardItem