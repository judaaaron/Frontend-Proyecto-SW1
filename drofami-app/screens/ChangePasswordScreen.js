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
import { changePassword } from "../src/login_registerAPI";
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
const regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/ // acepta basicamente todo tipo de caracter y minimo 8 caracteres
let SingUpValidationSchema = yup.object().shape({
    actualPassword: yup.string().required('Campo obligatorio'),
    newPassword: yup.string().min(8, ({ min }) => `La contraseña debe de tener al menos ${min} caracteres`)
        .required('Contraseña es obligatoria').matches(regularPassword,
            "Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial"
        ),
    confirmPassword: yup.string().required('Campo obligatorio'),
});

const ChangePass = ({route, navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const {token} = route.params

    React.useEffect(() => {
        console.log(response)
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            alert("Cambio de contraseña realizado correctamente");
            //navigation.navigate('Settings'); no estoy seguro esto existe
        } else if (response['status'] && response['message']) {
            alert(response['message']);
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
                        <Subtitle>Cambiar Contraseña</Subtitle>
                        <Formik
                            initialValues={{newPassword: "", confirmPassword: ""}}
                            validateOnMount={true}
                            onSubmit={(values) => {
                                console.log(values.actualPassword);
                                console.log(values.newPassword);
                                console.log(values.confirmPassword);
                                changePassword(setLoading, values.actualPassword, values.newPassword, values.confirmPassword, token,setResponse);
                            }}
                            validationSchema={SingUpValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (<StyledFormArea>
                                
                                <MyTextInput
                                    label={"Contraseña Actual"}
                                    icon={"lock"}
                                    placeholder={"*************"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("actualPassword")}
                                    onBlur={handleBlur("actualPassword")}
                                    value={values.actualPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                {(errors.actualPassword && touched.actualPassword) &&
                                    <Text style={styles.errores}>
                                        {errors.actualPassword}
                                    </Text>
                                }
                                
                                <MyTextInput
                                    label={"Nueva Contraseña"}
                                    icon={"lock"}
                                    placeholder={"*************"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("newPassword")}
                                    onBlur={handleBlur("newPassword")}
                                    value={values.newPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                {(errors.newPassword && touched.newPassword) &&
                                    <Text style={styles.errores}>
                                        {errors.newPassword}
                                    </Text>
                                }


                                <MyTextInput
                                    label={"Confirmar Contraseña"}
                                    icon={"lock"}
                                    placeholder={"*************"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />

                                {(errors.confirmPassword && touched.confirmPassword) &&
                                    <Text style={styles.errores}>
                                        {errors.confirmPassword}
                                    </Text>
                                }
                                

                                <StyledButton onPress={handleSubmit} rounded disabled={!isValid} style={{ backgroundColor: isValid ? '#6D28D9' : '#9CA3AF' }}>
                                    <ButtonText >
                                        Cambiar contraseña
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
                    Cambiando contraseña...
                </Text>
            </View>

            }

        </>


    );
};

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

export default ChangePass;

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