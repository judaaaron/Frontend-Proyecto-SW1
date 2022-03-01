import * as React from 'react';
import { View, Text } from 'react-native';
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

import { StatusBar } from "expo-status-bar";

export default function MainHome({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          
            <>
                <View style={{ backgroundColor: 'white' }} top={8}>
                    <StyledContainer>
                        <StatusBar style="dark" />
                        <InnerContainer>
                            <PageLog
                                source={require("../assets/drofamilogo1.jpg")}
                                resizeMode="cover"
                            />

                            <PageTitle>Productos</PageTitle>
                            <Subtitle>Ancalmo</Subtitle>
                            <Avatar resizeMode="cover" source={require("../assets/azul.png")} />
                            <Subtitle>Hessel</Subtitle>
                            <Avatar resizeMode="cover" source={require("../assets/hessel1.png")} />


                        </InnerContainer>
                    </StyledContainer>
                </View>
            </>
        </View>



    );
}