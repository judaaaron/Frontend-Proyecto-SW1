import React from "react";
import { useState } from "react";
import { Button, Modal, RadioButton, Text } from "react-native-paper";
import { Formik } from "formik";
import { View, ScrollView, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";

import {
    PageLog,
    Subtitle,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    StyledContainer2,
    InnerContainer2,
    StyledFormArea2
} from "../components/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { brand, darkLight } = Colors;



const SelectEmpresa = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState('first');
    const opciones = [
        { value: 'Cadenas de Farmacia' },
        { value: 'Farmacias Independientes' },
    ];

    

    return (
        <>
            {/* <KeyboardAvoidingWrapper> */}
            <View backgroundColor={Colors.primary} top={-90}>

                <InnerContainer2 style={styles.inner2}>
                    <View style={{marginRight:350}}>
                        <Icon name="arrow-back" size={30} onPress={() => navigation.goBack()} />
                    </View>
                    <PageLog
                        source={require("../assets/drofamilogo1.jpg")}
                        resizeMode="cover"

                    />

                    <Subtitle>Cambiar Correo Electrónico</Subtitle>
                    <Formik>
                        
                        <StyledFormArea2>

                            <MyTextInput
                                label={"Nuevo Correo"}
                                icon={"mail"}
                                placeholder={"drofamiClient@ejemplo.com"}
                                placeholderTextColor={darkLight}
                                keyboardType={"email-address"}
                            />
                            
                            <View>
                                <RadioButton
                                    
                                    label="Cadenas de farmacia"
                                    value="first"
                                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('first')}
                                    >
                                    <Text>Hola</Text>
                                </RadioButton>
                                <RadioButton
                                    value="second"
                                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                                    onPress={() => setChecked('second')}
                                />
                            </View>
                            
                            <View backgroundColor={Colors.primary}>


                                <StyledButton>
                                    <ButtonText >
                                        Cambiar Correo Electrónico
                                    </ButtonText>
                                </StyledButton>
                            </View>
                            <View backgroundColor={Colors.primary}>

                            </View>
                        </StyledFormArea2>

                    </Formik>
                </InnerContainer2>
            </View>
            {/* </KeyboardAvoidingWrapper> */}
            {isLoading && <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
                {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
                <ActivityIndicator size={100} color={'blue'} />
                <Text>
                    Cambiando correo electrónico...
                </Text>
            </View>

            }

        </>


    );


};
export default SelectEmpresa;

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.blue} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    errores: {
        fontSize: 10,
        color: 'red',
        top: -10,
    },
    spinnercontent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    },
    view2: {
        backgroundColor: 'white',
    },
    backIcon: {
        top: 180,

    },
    inner2: {
        top: 80,
    },
    container2: {
        marginTop: 50,
    }
})