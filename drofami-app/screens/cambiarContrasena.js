import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle
} from "../components/styles"


import { StatusBar } from "expo-status-bar";

export default function cambiarContrasena({ navigation }) {
    return (

        <>
            <PageTitle >Productos en Oferta</PageTitle>
            <ScrollView>
                <StyledContainer style={{top:10}}>
                    <StatusBar style="dark" />
                    <InnerContainer>
                        <PageLog
                            source={require("../assets/drofamilogo1.jpg")}
                            resizeMode="cover"
                        />

                        <PageTitle >Productos en Oferta</PageTitle>


                        <Subtitle style={{top:10}}>Ancalmo</Subtitle>
                        
                    </InnerContainer>
                </StyledContainer>


                
            </ScrollView>
        </>
        /*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!!</Text>
        </View>*/



    );
}
