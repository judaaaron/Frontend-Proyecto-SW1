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
    direccion: yup.string().required('Dirección obligatoria'),
    rtn: yup.string().min(16, ({ min }) => `RTN debe tener 14 números`).max(16, ({ max }) => `RTN debe tener 14 números`)
        .required('Número de RTN es obligatorio').matches(regularRTN,
            "RTN inválido"
        ),



});

const Signup = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [formData, setFormData] = useState({ 'usuario': "", 'nombre': "", 'apellido': "", 'phone': "", 'direccion': ""});
    const [formResponse, setFormResponse] = useState({});
    const [phone, setPhone] = useState('');

    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token']
            console.log("token ", token)
            getUserData(setLoading, token, setFormResponse);
        }
        token();
    }, []);

    React.useEffect(() => {
        console.log(formResponse)
        if (!formResponse) {
            //handle error
            return;
        }
        console.log(formResponse)
        if (formResponse['status'] == 'success') {
            const cliente = formResponse['cliente'];
            console.log(cliente)
            const user = cliente['user']
            const obj = {}
            obj['usuario'] = user['username']
            obj['nombre'] = user['first_name']
            obj['apellido'] = user['last_name']
            obj['phone'] = user['phone_number']
            obj['direccion'] = cliente['address']
            setFormData(obj)
            setPhone(obj['phone'])
        }
    }, [formResponse])

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
                        <Subtitle>Modificacion</Subtitle>
                        <Formik
                            enableReinitialize 
                            initialValues={{ usuario: formData['usuario'], nombre: formData['nombre'],
                            apellido: formData['apellido'], phone: phone, direccion: formData['direccion'] }}
                            validateOnMount={true}
                            onSubmit={(values) => {
                                modification(values.usuario, values.phone, values.nombre, values.apellido, values.direccion, setLoading, setResponse, token);
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
                                    label={"Teléfono"}
                                    icon={"device-mobile"}
                                    placeholder={"1234-5678"}
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