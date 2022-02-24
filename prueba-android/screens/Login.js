import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
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
} from "../components/styles";

const { brand, darkLight } = Colors;

const Login = () => {
    const [hidePassword, setHidePassword] = useState(true)
    return (
        <StyledContainer>
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
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>
                        <MyTextInput
                            label={"Usuario"}
                            icon={"mail"}
                            placeholder={"usuario@ejemplo.com"}
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
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
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
                <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
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
