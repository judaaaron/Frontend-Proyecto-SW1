import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ScrollView, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { modification, getUserData } from "../src/login_registerAPI";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import MaskInput from 'react-native-mask-input';
import * as SecureStore from 'expo-secure-store';
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

const { brand, darkLight } = Colors;
const regularNameLastName = /^[aA-zZ\s]+$/  //solo acepta letras
const regularPhone = /^([2]||[3]||[8]||[9]{1})[0-9]{3}-[0-9]{4}$/ // solo acepta numeros y guion en el centro
const regularRTN = /^[0-9]{1}[1-9]{1}[0-9]{2}-[0-9]{4}-[0-9]{6}$/  // solo acepta numeros y 2 guiones en pos 4 y pos 9
const regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/ // acepta basicamente todo tipo de caracter y minimo 8 caracteres
let SingUpValidationSchema = yup.object().shape({
    nombre: yup.string()
        .required('Nombre es obligatorio').matches(regularNameLastName,
            "Nombre inválido"
        ),
    apellido: yup.string()
        .required('Apellido es obligatorio').matches(regularNameLastName,
            "Apellido inválido"
        ),
    usuario: yup.string().required('Nombre de usuario es obligatorio'),
    phone: yup.string().min(9, ({ min }) => `Número teléfonico debe tener 8 números y un guión`).max(9, ({ max }) => `Número teléfonico debe tener 8 números y un guión`)
        .required('Número teléfonico es obligatorio').matches(regularPhone,
            "Número teléfonico inválido",
        ),
    direccion: yup.string().required('Dirección obligatoria'),
});

const Signup = ({route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const {usuario, apellido, nombre, direccion, phone} = route.params
    const [response, setResponse] = useState('');
    const token = React.useRef('');

    React.useEffect(() => {
        async function getToken() {
            const session = await SecureStore.getItemAsync("user_session");
            token.current = JSON.parse(session)['token']
            console.log("token ", token)
            getUserData(setLoading, token.current, setFormResponse);
        }
        getToken();
        
    }, []);

    React.useEffect(() => {
        console.log(response)
        if (!response) {
            return;
        }
        
    }, [response])

    function uploadChanges() {
        
    }

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
                        <Subtitle>Modificacion</Subtitle>
                        <Formik
                            enableReinitialize 
                            initialValues={{ usuario: usuario, nombre: nombre,
                            apellido: apellido, phone: phone, direccion: direccion }}
                            validateOnMount={true}
                            onSubmit={(values) => {
                                modification(values.usuario, values.phone, values.nombre, values.apellido, values.direccion, setLoading, setResponse, token.current);
                            }}
                            validationSchema={SingUpValidationSchema}
                        >
                            {({values, handleBlur, handleChange, handleSubmit, touched, errors, isValid})=> (<StyledFormArea>
                                <MyTextInput
                                    label={"Primer Nombre"}
                                    icon={"person"}
                                    placeholder={"Mauricio"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("nombre")}
                                    onBlur={handleBlur("nombre")}
                                    value={values.nombre}
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
                                    value={values.apellido}
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
                                    value={values.usuario}

                                />

                                {(errors.usuario && touched.usuario) &&
                                    <Text style={styles.errores}>
                                        {errors.usuario}
                                    </Text>
                                }
                                <MyTextInput
                                    label={"Teléfono"}
                                    icon={"device-mobile"}
                                    placeholder={"1234-5678"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("phone")}
                                    onBlur={handleBlur("phone")}
                                    value={values.phone}
                                />


                                {(errors.phone && touched.phone) &&
                                    <Text style={styles.errores}>
                                        {errors.phone}
                                    </Text>
                                }
                                
                                <MyTextInput
                                    label={"Direccion"}
                                    icon={"location"}
                                    placeholder={"Dirección de entrega"}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange("direccion")}
                                    onBlur={handleBlur("direccion")}
                                    value={values.direccion}
                                />

                                {(errors.direccion && touched.direccion) &&
                                    <Text style={styles.errores}>
                                        {errors.direccion}
                                    </Text>
                                }

                                <StyledButton onPress={handleSubmit} rounded disabled={!isValid} style={{ backgroundColor: isValid ? '#6D28D9' : '#9CA3AF' }}>
                                    <ButtonText >
                                        Modificar datos
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
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
    }
})