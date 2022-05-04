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
import Keyboard2 from "../components/Keyboard2";
import {showMessage} from 'react-native-flash-message';

const { brand, darkLight } = Colors;

import { useSelector, useDispatch } from "react-redux";//esta
// import { login, logout } from "../features/user";
import { setToken } from "../src/reducers/getToken";
import { isStaff } from "../src/reducers/staff";


const Login = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [loginResponse, setLoginResponse] = useState('');

    //redux
    // const reduxToken = useSelector(state => state.getToken);//esta linea
    const reduxToken = useSelector((state) => state.token.value); 
    const reduxStaff = useSelector((state) => state.staff.value); 
    const dispatch = useDispatch();

    console.log("redux token ", reduxToken);
    console.log("redux staff ", reduxStaff);

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
            showMessage({
                message: "Sesión iniciada",
                description:'Has iniciado sesión exitosamente.',
                type: "success",
              });
        } else if(loginResponse.status && loginResponse.message){
            showMessage({
                message: loginResponse.message,
                // description:'Ha ocurrido un error inesperado.',
                type: "danger",
              });
            //   alert(loginResponse.message);
        }else if(loginResponse.status){
            showMessage({
                message: "Usuario y/o contraseña incorrectos",
                // description:'Ha ocurrido un error inesperado.',
                type: "danger",
              });
            // alert('Usuario y/o contraseña incorrectos')
        }
            
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
            console.log("usuario ", usuario.is_staff);
            // dispatch(setToken(sToken));
            // dispatch(login({ name: "Pedro", age: 20, email: "pedro@gmail.com" }));
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
                console.log("oli");
                const session = await SecureStore.getItemAsync("user_session");
                console.log("session ", session);
                console.log("staff get credentials ", JSON.parse(session)["user"]["is_staff"])
                dispatch(setToken(JSON.parse(session)["token"]));
                dispatch(isStaff(JSON.parse(session)["user"]["is_staff"]));
                checkToken(setLoading, JSON.parse(session)['token'], setLoginResponse)

                /*if (session == undefined) {
                    console.log("olvidese");
                } else {
                    navigation.navigate('Home')
                }*/
            } catch (error) {
                showMessage({
                    message: "Hubo un error en la lectura de las credenciales.",
                    // description:'Ha ocurrido un error inesperado.',
                    type: "danger",
                  });
                // alert("Hubo un error en la lectura de las credenciales.");
                
                console.log(error);
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
                                resizeMode="cover"/>
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
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}
