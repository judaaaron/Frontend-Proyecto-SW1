import * as React from 'react';
import {SafeAreaView, StyleSheet,ScrollView, View, Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  StyledContainer,
  InnerContainer,
  PageLogOferta,
  PageTitle,
  Subtitle,
  RightIcon,
  Colors,
  RightIcon2
} from "../components/styles";
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

export default function MainHome({ navigation }) {
    
    return (
      <>
        <ScrollView>
          <StyledContainer style={{ top: 23 }}>
            <PageLogOferta
              source={require("../assets/drofamilogo1.jpg")}
              resizeMode="cover"
            />

            <StatusBar style="dark" />

            {/* Icono */}
            <View style={styles.header}>
                <View>
                  
                    <Text style={{ fontSize: 35, color: Colors.blue, alignItems: 'center' }}>
                            Productos en Oferta
                    </Text>

                </View>
                <View style={{justifyContent: 'center'}}>
                <Icon name="shopping-cart" size={30} color={Colors.blue} 
                   onPress={() => navigation.navigate('CartScreen')}
                />
                </View>
            </View>


            <InnerContainer>
              <Subtitle style={{ top: 10 }}>Ancalmo</Subtitle>

              <SafeAreaView style={styles.container}>
                <CarouselCards />
              </SafeAreaView>
            </InnerContainer>
          </StyledContainer>

          <StyledContainer>
            <InnerContainer>
              <Subtitle>Hessel</Subtitle>
              <SafeAreaView style={styles.container}>
                <CarouselCards2 />
              </SafeAreaView>
            </InnerContainer>
          </StyledContainer>
        </ScrollView>
      </>
      /*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!!</Text>
        </View>*/
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50,
      top:10
    },
    header: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  });