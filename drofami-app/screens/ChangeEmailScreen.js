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
import { changeEmail } from "../src/login_registerAPI";

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
import Icon from 'react-native-vector-icons/MaterialIcons';

const { brand, darkLight } = Colors;

let SingUpValidationSchema = yup.object().shape({
    newEmail: yup.string().email('Ingrese un correo válido').required('Dirección de correo es obligatoria'),

});

const ChangeEmail1 = ({route, navigation })  => {
    //const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const {token} = route.params
    

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

            <View backgroundColor={Colors.primary}>
                {/* <StyledContainer> */}
                        <View style={styles.header} top={50}>
                            <Icon name="arrow-back" size={30} onPress={() => navigation.goBack()} />
                        </View>

                        <InnerContainer marginTop={400} >
                            <PageLog
                                top={-250}
                                source={require("../assets/drofamilogo1.jpg")}
                                resizeMode="cover"

                            />
                        <Subtitle style={{top:-240}}>Cambiar Correo Electrónico</Subtitle>
                        <Formik
                            initialValues={{newEmail: ""}}
                            validateOnMount={true}
                            onSubmit={(values) => {
                            changeEmail(setLoading, values.newEmail, token, setResponse);
                            }}
                            validationSchema={SingUpValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (<StyledFormArea style={{top:-200}}>
                                
                                <MyTextInput
                                    label={"Nuevo Correo"}
                                    icon={"mail"}
                                    placeholder={"drofamiClient@ejemplo.com"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("newEmail")}
                                    onBlur={handleBlur("newEmail")}
                                    values={values.newEmail}
                                    keyboardType={"email-address"}
                                />
								{(errors.newEmail && touched.newEmail) &&
                                    <Text style={styles.errores}>
                                        {errors.newEmail}
                                    </Text>
                                }
                                
                                <View backgroundColor={Colors.primary}>

                              
                                <StyledButton onPress={handleSubmit} rounded disabled={!isValid} style={{ backgroundColor: isValid ? Colors.blue : '#9CA3AF' }}>
                                    <ButtonText >
                                        Cambiar Correo Electronico
                                    </ButtonText>
                                </StyledButton>
                                </View>
                            </StyledFormArea>)}

                        </Formik>

                    </InnerContainer>

                {/* </StyledContainer> */}
                </View>
            </KeyboardAvoidingWrapper>
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
export default ChangeEmail1;

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,flex, ...props }) => {
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
    }
})