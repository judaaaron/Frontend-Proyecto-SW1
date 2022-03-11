import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ScrollView, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { signUp } from "../src/login_registerAPI";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";

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
    Colors
} from "../components/styles";

const { brand, darkLight } = Colors;

let SingUpValidationSchema = yup.object().shape({
    correo: yup.string().email('Ingrese un correo válido').required('Dirección de correo es obligatoria'),

});

const ChangeEmail = ({ navigation }) => {
    //const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    React.useEffect(() => {
        console.log(response)
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            alert("Cambio de correo electronico correctamente");
            navigation.navigate('Login');
        } else if (response['status']) {
            alert("Ha ocurrido un error");
        } else {
            let errors = '';
            for (const [key, value] of Object.entries(response)) {
                errors = key + ':\n';
                for (let i = 0; i < value.length; i++) {
                    errors += value[i] + '\n';
                }
            }
            alert(errors);
        }
    }, [response])

    return (
        <>
            <KeyboardAvoidingWrapper>

                <StyledContainer>
                    <StatusBar style="dark" />

                    <InnerContainer>
                        <PageLog
                            source={require("../assets/drofamilogo1.jpg")}
                            resizeMode="cover"

                        />
                        <Subtitle>Cambiar Correo Electronico</Subtitle>
                        <Formik
                            initialValues={{newEmail: ""}}
                            validateOnMount={true}
                            onSubmit={(values) => {
                                signUp(values.newEmail, setLoading, setResponse);
                            }}
                            validationSchema={SingUpValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (<StyledFormArea>
                                
                                <MyTextInput
                                    label={"Correo"}
                                    icon={"mail"}
                                    placeholder={"drofamiClient@ejemplo.com"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("correo")}
                                    onBlur={handleBlur("correo")}
                                    values={values.correo}
                                    keyboardType={"email-address"}
                                />
								{(errors.correo && touched.correo) &&
                                    <Text style={styles.errores}>
                                        {errors.correo}
                                    </Text>
                                }
                                

                                <StyledButton onPress={handleSubmit} rounded disabled={!isValid} style={{ backgroundColor: isValid ? '#6D28D9' : '#9CA3AF' }}>
                                    <ButtonText >
                                        Cambiar Correo Electronico
                                    </ButtonText>
                                </StyledButton>

                            </StyledFormArea>)}

                        </Formik>

                    </InnerContainer>

                </StyledContainer>
            </KeyboardAvoidingWrapper>
            {isLoading && <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
                {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
                <ActivityIndicator size={100} color={'blue'} />
                <Text>
                    Cambiando correo electronico...
                </Text>
            </View>

            }

        </>


    );


};
export default ChangeEmail;

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
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
    }
})