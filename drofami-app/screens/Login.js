import React from "react";
import { useState } from "react";
import { Text, Checkbox } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { login, checkToken } from "../src/login_registerAPI";
import { Octicons, Ionicons } from "@expo/vector-icons";
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
import Keyboard2 from "../components/Keyboard2";
import { showMessage } from 'react-native-flash-message';

const { darkLight } = Colors;

import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../src/reducers/getToken";
import { isStaff } from "../src/reducers/staff";


const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [loginResponse, setLoginResponse] = useState('');
    const [loginInput, setLoginInput] = useState(" ");
    const [rememberMe, setRememberMe] = useState(false);

    //redux
    const dispatch = useDispatch();


    React.useEffect(() => {
        if (!loginResponse) {
            return;
        }
        if (loginResponse.status == "success") {
            if (loginResponse['token']) {
                storeCredentials(loginResponse['user'], loginResponse['token']);
            }
            navigation.navigate('Home');
            showMessage({
                message: "Sesión iniciada",
                description: 'Has iniciado sesión exitosamente.',
                type: "success",
            });
        } else if (loginResponse.status && loginResponse.message) {
            showMessage({
                message: loginResponse.message,
                // description:'Ha ocurrido un error inesperado.',
                type: "danger",
            });
            //   alert(loginResponse.message);
        } else if (loginResponse.status) {
            showMessage({
                message: "Usuario y/o contraseña incorrectos",
                // description:'Ha ocurrido un error inesperado.',
                type: "danger",
            });
            // alert('Usuario y/o contraseña incorrectos')
        }

    }, [loginResponse])

    async function storeCredentials(usuario, sToken) {
        try {
            if (rememberMe) {
                await SecureStore.setItemAsync(
                    "user_session",
                    JSON.stringify({
                        user: usuario,
                        token: sToken
                    })
                );
            }
            dispatch(setToken(sToken));
            dispatch(isStaff(usuario.is_staff));
            console.log("Se almaceno");
        } catch (error) {
            showMessage({
                message: "Hubo un error en el almacenamiento de las credenciales.",
                // description:'Ha ocurrido un error inesperado.',
                type: "danger",
            });
            // alert("Hubo un error en el almacenamiento de las credenciales.");
            console.log(error);
        }
    };

    React.useEffect(() => {
        async function getCredentials() {
            try {
                const session = await SecureStore.getItemAsync("user_session");
                dispatch(setToken(JSON.parse(session)["token"]));
                dispatch(isStaff(JSON.parse(session)["user"]["is_staff"]));
                checkToken(setLoading, JSON.parse(session)['token'], setLoginResponse)

            } catch (error) {
                if (error === "null is not an object (evaluating 'JSON.parse(session)[\"token\"]')") {
                    showMessage({
                        message:
                            "Hubo un error en la lectura de las credenciales.",
                        // description:'Ha ocurrido un error inesperado.',
                        type: "danger",
                    });
                    // alert("Hubo un error en la lectura de las credenciales.");

                    console.log(error);
                }

            }
        }
        getCredentials();
    }, []);


    return (
        <>
            <Keyboard2>
                <View style={estilos.view2} top={-50}>
                    <StyledContainer>
                        <StatusBar style="dark" />
                        <InnerContainer marginTop={120}>
                            <PageLog
                                top={-30}
                                source={require("../assets/drofamilogo1.jpg")}
                                resizeMode="cover" />
                            <PageTitle>Droguería y Farmacia
                                Centroámerica Milenio
                            </PageTitle>
                            <PageTitle></PageTitle>

                            <Subtitle>Inicio de Sesión</Subtitle>
                            <Formik
                                initialValues={{ usuario: "", token: "" }}
                                onSubmit={(values) => {
                                    (login(setLoading, values.usuario, values.token, setLoginResponse));

                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, handleReset }) => (<StyledFormArea>


                                    <MyTextInput
                                        label={"Nombre de Usuario"}
                                        icon={"person"}
                                        placeholder={"drofamiClient"}
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange("usuario")}
                                        onBlur={handleBlur("usuario")}
                                        values={values.usuario}
                                        keyboardType={"email-address"}
                                        handleReset={handleChange(" ")}
                                    />

                                    <MyTextInput
                                        label={"Contraseña"}
                                        icon={"lock"}
                                        placeholder={"*************"}
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange("token")}
                                        onBlur={handleBlur("token")}
                                        values={values.token}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />

                                    <ExtraView>
                                        <ExtraText>Recuerdame</ExtraText>

                                        <Checkbox
                                            status={rememberMe ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                setRememberMe(!rememberMe);
                                            }}
                                        />
                                    </ExtraView>

                                    <StyledButton onPress={
                                        handleSubmit
                                    }>
                                        <ButtonText >
                                            Iniciar Sesión
                                        </ButtonText>
                                    </StyledButton>


                                    <ExtraView>
                                        <ExtraText>¿No tienes cuenta? </ExtraText>
                                        <TextLink onPress={() => navigation.navigate('Signup')}>
                                            <TextLinkContent>Registrate</TextLinkContent>
                                        </TextLink>
                                    </ExtraView>

                                </StyledFormArea>)}
                            </Formik>
                        </InnerContainer>
                    </StyledContainer>
                </View>
            </Keyboard2>

            {isLoading && <View style={[StyleSheet.absoluteFillObject, estilos.spinnercontent]}>
                {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
                <ActivityIndicator size={100} color={'blue'} />
                <Text>
                    Cargando...
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



export default Login;


const estilos = StyleSheet.create({
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

{
}
