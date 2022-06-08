import React from "react";
import { useState } from "react";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import Keyboard2 from "../components/Keyboard2";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import { changePassword } from "../src/login_registerAPI";
import {
    StyledContainer,
    InnerContainer,
    PageLog,
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData, logout } from '../src/login_registerAPI';
import * as SecureStore from 'expo-secure-store';
import { showMessage } from 'react-native-flash-message';

const { darkLight } = Colors;
const regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/ // acepta basicamente todo tipo de caracter y minimo 8 caracteres
let SingUpValidationSchema = yup.object().shape({
    actualPassword: yup.string().required('Campo obligatorio'),
    newPassword: yup.string().min(8, ({ min }) => `La contraseña debe de tener al menos ${min} caracteres`)
        .required('Contraseña es obligatoria').matches(regularPassword,
            "Debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial"
        ),
    confirmPassword: yup.string().required('Campo obligatorio'),
});


const ChangePass = ({ route, navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [hideActualPassword, setHideActualPassword] = useState(true)
    const [hideNewPassword, setHideNewPassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')
    const [responseLog, setResponseLog] = useState(null);
    const { token } = route.params

    React.useEffect(() => {
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            // alert("Cambio de contraseña realizado correctamente");
            SecureStore.deleteItemAsync("user_session").then(
                );
                logout(setLoading, token, setResponseLog);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  }, showMessage({
                        // responseLog['message']
                        message: "Contraseña modificada",
                        description: "Cambio de contraseña exitoso.",
                        type: "success",
                      }));
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
        <View backgroundColor={Colors.primary} flex={1}>
          <Keyboard2 backgroundColor={Colors.primary}>
            <StyledContainer marginTop={-14}>
              <StatusBar style="dark" />
              <View style={styles.header} top={50}>
                <Icon
                  name="arrow-back"
                  size={30}
                  onPress={() => navigation.goBack()}
                />
              </View>

              <InnerContainer marginTop={190}>
                <PageLog
                  top={-145}
                  source={require("../assets/drofamilogo1.jpg")}
                  resizeMode="cover"
                />
                <Subtitle style={{ top: -150 }}>Cambiar Contraseña</Subtitle>
                <Formik
                  initialValues={{ newPassword: "", confirmPassword: "" }}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    changePassword(
                      setLoading,
                      values.actualPassword,
                      values.newPassword,
                      values.confirmPassword,
                      token,
                      setResponse
                    );
                  }}
                  validationSchema={SingUpValidationSchema}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <StyledFormArea style={{ top: -150 }}>
                      <MyTextInput
                        label={"Contraseña Actual"}
                        icon={"lock"}
                        placeholder={"*************"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("actualPassword")}
                        onBlur={handleBlur("actualPassword")}
                        value={values.actualPassword}
                        secureTextEntry={hideActualPassword}
                        isPassword={true}
                        hidePassword={hideActualPassword}
                        setHidePassword={setHideActualPassword}
                      />
                      {errors.actualPassword && touched.actualPassword && (
                        <Text style={styles.errores}>
                          {errors.actualPassword}
                        </Text>
                      )}

                      <MyTextInput
                        label={"Nueva Contraseña"}
                        icon={"lock"}
                        placeholder={"*************"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("newPassword")}
                        onBlur={handleBlur("newPassword")}
                        value={values.newPassword}
                        secureTextEntry={hideNewPassword}
                        isPassword={true}
                        hidePassword={hideNewPassword}
                        setHidePassword={setHideNewPassword}
                      />
                      {errors.newPassword && touched.newPassword && (
                        <Text style={styles.errores}>{errors.newPassword}</Text>
                      )}

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

                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errores}>
                          {errors.confirmPassword}
                        </Text>
                      )}

                      <StyledButton
                        top={55}
                        onPress={handleSubmit}
                        rounded
                        disabled={!isValid}
                        style={{
                          backgroundColor: isValid ? Colors.blue : "#9CA3AF",
                        }}
                      >
                        <ButtonText>Cambiar contraseña</ButtonText>
                      </StyledButton>
                    </StyledFormArea>
                  )}
                </Formik>
              </InnerContainer>
            </StyledContainer>
          </Keyboard2>
        </View>
        {isLoading && (
          <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
            {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
            <ActivityIndicator size={100} color={"blue"} />
            <Text>Cambiando contraseña...</Text>
          </View>
        )}
      </>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, flex, ...props }) => {
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