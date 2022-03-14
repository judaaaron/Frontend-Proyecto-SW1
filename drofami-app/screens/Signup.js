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
import MaskInput from 'react-native-mask-input';

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
    TextLink

} from "../components/styles";
import Login from "./Login";

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


const { brand, darkLight } = Colors;
const regularNameLastName = /(^(\S))+(\s*[aA-zZ])+$/  //solo acepta letras si se acepta espacios en un futuro, solo colocar \s
const regularPhone = /^([2]||[3]||[8]||[9]{1})[0-9]{3}-[0-9]{4}$/ // solo acepta numeros y guion en el centro
const regularRTN = /^[0-9]{1}[1-9]{1}[0-9]{2}([1]{1}[9]{1}[0-9]{2}|[2]{1}[0]{1}[0-2]{2})[0-9]{6}$/  // solo acepta numeros y 2 guiones en pos 4 y pos 9
const regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/ // acepta basicamente todo tipo de caracter y minimo 8 caracteres
const regularUsername = /(^(\S))+(\s*[aA-zZ0-9!@_#\$%\^&\*])+$/ // acepta basicamente todo tipo de caracter
const regularDireccion = /(^(\S))+(\s*[aA-zZ0-9,.])+$/

let SingUpValidationSchema = yup.object().shape({
    nombre: yup.string()
        .required('Nombre es obligatorio').matches(regularNameLastName,
            "Nombre inválido. Asegurese de no tener espacios, solo letras"
        ),
    apellido: yup.string()
        .required('Apellido es obligatorio').matches(regularNameLastName,
            "Apellido inválido. Asegurese de no tener espacios, solo letras"
        ),
    usuario: yup.string().required('Nombre de usuario es obligatorio').matches(regularUsername,
            "Nombre de usuario inválido, este campo no permite espacios"
        ),
    correo: yup.string().email('Ingrese un correo válido').required('Dirección de correo es obligatoria'),
    password: yup.string().min(8, ({ min }) => `La contraseña debe de tener al menos ${min} caracteres`)
        .required('Contraseña es obligatoria').matches(regularPassword,
            "Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial"
        ),
    phone: yup.string().min(9, ({ min }) => `Número teléfonico debe tener 8 números y un guión`).max(9, ({ max }) => `Número teléfonico debe tener 8 números y un guión`)
        .required('Número teléfonico es obligatorio').matches(regularPhone,
            "Número teléfonico inválido",
        ),
    confirmPassword: yup.string().required('Campo obligatorio'),
    direccion: yup.string().min(15, ({ min }) => `Direccion debe de tener al menos ${min} caracteres minimo`).max(150, ({ max }) => `Solo se permiten ${max} caracteres máximo`).required('Campo obligatorio'),
    rtn: yup.string().min(14, ({ min }) => `RTN debe tener 14 números`).max(14, ({ max }) => `RTN debe tener 14 números`)
        .required('Número de RTN es obligatorio').matches(regularRTN,
            "RTN inválido"
        ),



});

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    React.useEffect(() => {
        console.log(response)
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            alert("Registrado correctamente");
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
                        <Subtitle>Registro</Subtitle>
                        <Formik
                            initialValues={{ usuario: "", nombre: "", apellido: "", correo: "", phone: "", password: "", confirmPassword: "", direccion: "", rtn: "" }}
                            validateOnMount={true}
                            onSubmit={(values) => {
                                signUp(values.usuario, values.correo, values.phone, values.password,
                                    values.confirmPassword, values.nombre, values.apellido, values.direccion,
                                    values.rtn, setLoading, setResponse
                                );
                            }}
                            validationSchema={SingUpValidationSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (<StyledFormArea>
                                <MyTextInput
                                    label={"Primer Nombre"}
                                    icon={"person"}
                                    placeholder={"Mauricio"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("nombre")}
                                    onBlur={handleBlur("nombre")}
                                    values={values.nombre}

                                />

                                {(errors.nombre && touched.nombre) &&
                                    <Text style={styles.errores}>
                                        {errors.nombre}
                                    </Text>
                                }

                                <MyTextInput
                                    label={"Primer Apellido"}
                                    icon={"person"}
                                    placeholder={"Silva"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("apellido")}
                                    onBlur={handleBlur("apellido")}
                                    values={values.apellido}
                                />

                                {(errors.apellido && touched.apellido) &&
                                    <Text style={styles.errores}>
                                        {errors.apellido}
                                    </Text>
                                }

                                <MyTextInput
                                    label={"Username"}
                                    icon={"person"}
                                    placeholder={"drofamiClient"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("usuario")}
                                    onBlur={handleBlur("usuario")}
                                    values={values.usuario}

                                />

                                {(errors.usuario && touched.usuario) &&
                                    <Text style={styles.errores}>
                                        {errors.usuario}
                                    </Text>
                                }
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

                                <MyTextInput
                                    label={"Teléfono"}
                                    icon={"device-mobile"}
                                    placeholder={"9985-5678"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("phone")}
                                    onBlur={handleBlur("phone")}
                                    values={values.phone}
                                />


                                {(errors.phone && touched.phone) &&
                                    <Text style={styles.errores}>
                                        {errors.phone}
                                    </Text>
                                }
                                <MyTextInput
                                    label={"Contraseña"}
                                    icon={"lock"}
                                    placeholder={"*************"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    values={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                {(errors.password && touched.password) &&
                                    <Text style={styles.errores}>
                                        {errors.password}
                                    </Text>
                                }


                                <MyTextInput
                                    label={"Confirmar Contraseña"}
                                    icon={"lock"}
                                    placeholder={"*************"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                    values={values.confirmPassword}
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
                                <MyAutoGrowingTextInput 
                                    backgroundColor= {Colors.secondary}
                                    label={"Direccion"}
                                    icon={"location"}
                                    placeholder={"Dirección de entrega"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("direccion")}
                                    onBlur={handleBlur("direccion")}
                                    values={values.direccion}
                                     />

                                {(errors.direccion && touched.direccion) &&
                                    <Text style={styles.errores}>
                                        {errors.direccion}
                                    </Text>
                                }

                                <MyTextInput
                                    label={"RTN"}
                                    icon={"credit-card"}
                                    placeholder={"08011999987415"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("rtn")}
                                    onBlur={handleBlur("rtn")}
                                    values={values.rtn}
                                />

                                {(errors.rtn && touched.rtn) &&
                                    <Text style={styles.errores}>
                                        {errors.rtn}
                                    </Text>
                                }

                                <StyledButton onPress={handleSubmit} rounded disabled={!isValid} style={{ backgroundColor: isValid ? Colors.blue : '#9CA3AF' }}>
                                    <ButtonText >
                                        Registrate
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
                    Creando cuenta...
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
const MyAutoGrowingTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.blue} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <AutoGrowingTextInput 
                style = {styles.textInput}
             />
        </View>
    );
};

export default Signup;

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
    textInput: {
        backgroundColor: Colors.secondary,
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 35,
        fontSize: 16,
        height: 52,
        marginVertical: 3,
        marginBottom: 20,
      }
})


