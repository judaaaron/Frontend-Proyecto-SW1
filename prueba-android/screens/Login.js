import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import { login } from "../src/login_registerAPI";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
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
        console.log(loginResponse);
    }, [loginResponse])

    return (
        <>
        <ActivityIndicator animating={isLoading} size={87}/>
        <KeyboardAvoidingWrapper id="1">
            <View>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLog
                        resizeMode="cover"
                        source={require("../assets/drofamilogo1.jpg")}
                    />
                    <PageTitle>Drogueria y Farmacia</PageTitle>
                    <PageTitle>Centroámerica Milenio</PageTitle>
                    <Subtitle>Inicio de Sesión</Subtitle>
                    <Formik
                        initialValues={{ usuario: "", token: "" }}
                        onSubmit={(values) => {
                            (login(setLoading, values.usuario, values.token, setLoginResponse));
                            navigation.navigate('Home');
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
            </View>
        </KeyboardAvoidingWrapper>
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

{
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}
