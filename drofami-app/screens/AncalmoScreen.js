import * as React from 'react';
import { Text, View, SafeAreaView, StyleSheet,ScrollView } from 'react-native';
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "../components/styles"
import CarouselCards from './CarouselCards'
import CarouselCards2 from './CarouselCards2'

import { StatusBar } from "expo-status-bar";

export default function AncalmoScreen({ navigation }) {
    return (
        <>
        <ScrollView>
            <StyledContainer style={{top:45}}>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLog
                        source={require("../assets/drofamilogo1.jpg")}
                        resizeMode="cover"
                    />

                    <PageTitle >Productos ANCALMO</PageTitle>


                    <Subtitle style={{top:10}}>Ancalmo</Subtitle>
                    <SafeAreaView style={[styles.container, {top:-50}]}>
                        <CarouselCards />
                    </SafeAreaView>
                </InnerContainer>
            </StyledContainer>


            <StyledContainer>
                <InnerContainer>
                    <SafeAreaView style={[styles.container, {top:-100}]}>
                        <CarouselCards />
                    </SafeAreaView>
                </InnerContainer>
            </StyledContainer>

            <StyledContainer>
                <InnerContainer>
                    <SafeAreaView style={[styles.container, {top:-100}]}>
                        <CarouselCards />
                    </SafeAreaView>
                </InnerContainer>
            </StyledContainer>


            <StyledContainer>
                <InnerContainer>
                    <SafeAreaView style={[styles.container, {top:-100}]}>
                        <CarouselCards />
                    </SafeAreaView>
                </InnerContainer>
            </StyledContainer>

            <StyledContainer>
                <InnerContainer>
                    <SafeAreaView style={[styles.container,{top:-100}]}>
                        <CarouselCards />
                    </SafeAreaView>
                </InnerContainer>
            </StyledContainer>
        </ScrollView>
    </>
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