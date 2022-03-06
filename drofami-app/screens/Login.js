import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { login, checkToken } from "../src/login_registerAPI";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import AppLoader from "../components/AppLoader";
import AnimatedLottieView from 'lottie-react-native';
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

const { brand, darkLight } = Colors;

const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [loginResponse, setLoginResponse] = useState('');

    React.useEffect(() => {
        console.log(loginResponse);
        if (!loginResponse) {
            return;
        }
        if(loginResponse.status == "success") { 
            if(loginResponse['token']) {
                storeCredentials(loginResponse['user'], loginResponse['token']);
            }
            navigation.navigate('Home');
        } else if(loginResponse.status && loginResponse.message)
            alert(loginResponse.message);
            else if(loginResponse.status)
            alert('Usuario y/o contraseña incorrectos')
        console.log(loginResponse);
    }, [loginResponse])

    async function storeCredentials(usuario, sToken) {
        try {
            await SecureStore.setItemAsync(
                "user_session",
                JSON.stringify({
                    user: usuario,
                    token: sToken
                })
            );
            console.log("Se almaceno");
        } catch (error) {
            alert("Hubo un error en el almacenamiento de las credenciales.");
            console.log(error);
        }
    };

    React.useEffect(() => {
        async function getCredentials() {
            try {
                console.log("oli");
                const session = await SecureStore.getItemAsync("user_session");
                console.log(session);
                checkToken(setLoading, JSON.parse(session)['token'], setLoginResponse)

                /*if (session == undefined) {
                    console.log("olvidese");
                } else {
                    navigation.navigate('Home')
                }*/
            } catch (error) {
                alert("Hubo un error en la lectura de las credenciales.");
                console.log(error);
            }
        }
        getCredentials();
    }, []);

    return (
        <>

            <KeyboardAvoidingWrapper>
                <View style={estilos.view2}>
                    <StyledContainer>
                        <StatusBar style="dark" />
                        <InnerContainer>
                            <PageLog
                                source={require("../assets/drofamilogo1.jpg")}
                                resizeMode="cover"

                            />
                            <PageTitle>Droguería y Farmacia
                                Centroámerica Milenio
                            </PageTitle>
                            <PageTitle></PageTitle>

                            <Subtitle>Inicio de Sesión</Subtitle>
                            <Formik
                                initialValues={{ usuario: 'male', token: "" }}
                                onSubmit={(values) => {
                                    (login(setLoading, values.usuario, values.token, setLoginResponse));
                                }}
                            >
                                
                                
                                {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>


                                    <MyTextInput
                                        
                                        label={"Username"}
                                        icon={"person"}
                                        placeholder={"drofamiClient"}
                                        placeholderTextColor={darkLight}
                                        onChangeText={handleChange("usuario")}
                                        onBlur={handleBlur("usuario")}
                                        values={values.usuario}
                                        keyboardType={"email-address"}
                                    />
                                    <MyTextInput
                                        label={"Token"}
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

                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>
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
            </KeyboardAvoidingWrapper>

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
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}
