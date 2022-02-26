import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ScrollView } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { signUp } from "../src/login_registerAPI";
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

const Signup = (navigation) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')



    React.useEffect(() => {
        console.log(response)
    }, [response])

    return (
        <ScrollView>
            <StyledContainer>
                <StatusBar style="dark" />

                <InnerContainer>
                    <PageTitle>DROFAMI Registro</PageTitle>

                    <Formik
                        initialValues={{ usuario: "", nombre: "", apellido: "", correo: "", phone: "", password: "", confirmPassword: "", direccion: "", rtn: "" }}
                        onSubmit={(values) => {
                            signUp(values.usuario, values.correo, values.phone, values.password,
                                values.confirmPassword, "first", "lastnames", values.direccion,
                                values.rtn, setLoading, setResponse);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                            <MyTextInput
                                label={"Primer Nombre"}
                                icon={"person"}
                                placeholder={"Mauricio"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("nombre")}
                                onBlur={handleBlur("nombre")}
                                values={values.nombre}

                            />

                            <MyTextInput
                                label={"Primer Apellido"}
                                icon={"person"}
                                placeholder={"Ordoñez"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("apellido")}
                                onBlur={handleBlur("apellido")}
                                values={values.apellido}

                            />

                            <MyTextInput
                                label={"Username"}
                                icon={"person"}
                                placeholder={"drofamiClient"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("usuario")}
                                onBlur={handleBlur("usuario")}
                                values={values.usuario}

                            />
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

                            <MyTextInput
                                label={"Teléfono"}
                                icon={"megaphone"}
                                placeholder={"5555-5555"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("phone")}
                                onBlur={handleBlur("phone")}
                                values={values.phone}

                            />
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


                            <MyTextInput
                                label={"Confirmar Constraña"}
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
                            <MyTextInput
                                label={"Direccion"}
                                icon={"location"}
                                placeholder={"Direecion de entrega"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("direccion")}
                                onBlur={handleBlur("direccion")}
                                values={values.direccion}
                            />

                            <MyTextInput
                                label={"RTN"}
                                icon={""}
                                placeholder={"123456789"}
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange("rtn")}
                                onBlur={handleBlur("rtn")}
                                values={values.rtn}
                            />

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Registrate
                                </ButtonText>
                            </StyledButton>

                            {/* <ExtraView>
                            <ExtraText>¿Ya tienes cuenta? </ExtraText>
                            <TextLink onPress={()=> navigation.navigate('Login')}>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView> */}


                        </StyledFormArea>)}

                    </Formik>

                </InnerContainer>

            </StyledContainer>
        </ScrollView>


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

{
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}
