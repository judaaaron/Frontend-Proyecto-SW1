import * as React from 'react';
import {SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle
} from "../components/styles"
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'

import { StatusBar } from "expo-status-bar";

export default function MainHome({ navigation }) {
    return (

        <>
            <ScrollView>
                <StyledContainer style={{top:1}}>
                    <StatusBar style="dark" />
                    <InnerContainer style={{top:30}}>
                        <PageLog
                            source={require("../assets/drofamilogo1.jpg")}
                            resizeMode="cover"
                        />

                        <PageTitle >Productos en Oferta</PageTitle>


                        <Subtitle style={{top:10}}>Ancalmo</Subtitle>
                        <SafeAreaView style={styles.container}>
                            <CarouselCards />
                        </SafeAreaView>
                    </InnerContainer>
                </StyledContainer>


                <StyledContainer>
                    <InnerContainer>
                        <Subtitle style={{top:-40}}>Hessel</Subtitle>
                        <SafeAreaView style={[styles.container, {top:-30}]}>
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
      padding: 50
    },
  });
  