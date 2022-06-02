import * as React from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import {
  StyledContainer,
  PageLogOferta,
  Colors,
  PageTitle
} from "../components/styles";
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'


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