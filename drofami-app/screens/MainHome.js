import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  StyledContainer,
  InnerContainer,
  PageLogOferta,
  Subtitle,
  Colors,
  NotificationText,
  CounterHome,
  PageTitle
} from "../components/styles";
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'

import { StatusBar } from "expo-status-bar";

export default function MainHome({ navigation }) {

  return (


    <View style={styles.container}>
      <PageLogOferta
        source={require("../assets/drofamilogo1.jpg")}
        resizeMode="cover"
      />
      <PageTitle style={{marginRight:-180, marginTop:-20, fontWeight: 'bold'}}>Ofertas</PageTitle>
      <ScrollView
      // scrollIndicatorInsets={false}
      showsVerticalScrollIndicator={false}
      >
        <Image source={require("./../assets/logoAncalmo.png")}
        style={{ width: 100, height: 100, top: 3, backgroundColor: Colors.primary, marginLeft:125 }}
        />
        <StyledContainer style={{marginTop:10}}>
          <View style={styles.viiew}>
            <CarouselCards />
          </View>
        </StyledContainer>

        <Image source={require("./../assets/hesselLogo1.png")}
        style={{ width: 100, height: 100, top: 3, backgroundColor: Colors.primary, marginLeft:125, marginTop:-60 }}
        />
        <StyledContainer style={{marginTop:-10}}>
          <View style={styles.viiew}>
            <CarouselCards2 />
          </View>
        </StyledContainer>
      </ScrollView>
    </View>







    // <ScrollView>
    // <StyledContainer style={{ top: 23 }}>
    //   <PageLogOferta
    //     source={require("../assets/drofamilogo1.jpg")}
    //     resizeMode="cover"
    //   />
    //   <PageTitle>Productos en Oferta</PageTitle>

    //   <InnerContainer>
    //     <Subtitle style={{ top: 5, fontSize: 30 }}>Ancalmo</Subtitle>

    //     <SafeAreaView style={styles.container}>
    //       <CarouselCards />
    //     </SafeAreaView>
    //   </InnerContainer>
    // </StyledContainer>

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
  }
});