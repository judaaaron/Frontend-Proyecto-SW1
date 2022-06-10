import * as React from 'react';
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


export default function MainHome({ navigation }) {
React.useEffect(() => {
  if (!token) {
    return;
  }
  getRecomendacion(setLoading, token, setResponse);
  console.log("fist?");
}, [token]);
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

            <CarouselCards />

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