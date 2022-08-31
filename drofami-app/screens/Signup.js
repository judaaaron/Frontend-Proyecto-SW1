import React from "react";
import { useState } from "react";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, StyleSheet, ScrollView } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { signUp } from "../src/login_registerAPI";
import * as yup from 'yup';
import Spinner from "../components/Spinner";
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

import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import Keyboard2 from "../components/Keyboard2";
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { darkLight } = Colors;
const regularNameLastName = /^[A-Za-záéíóúñ]+$/  //solo acepta letras si se acepta espacios en un futuro, solo colocar \s
const regularPhone = /^([2]||[3]||[8]||[9]{1})[0-9]{3}[0-9]{4}$/
const regularPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\$%\^&\*])(?=.{8,})/ // acepta basicamente todo tipo de caracter y minimo 8 caracteres
const regularUsername = /(^(\S))+(\s*[aA-zZ0-9!-@_#\$%\^&\*])+$/ // acepta basicamente todo tipo de caracter

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
});

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    React.useEffect(() => {
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            //   alert("Registrado correctamente");
            showMessage({
                message: "Registrado.",
                description: 'Has sido registrado correctamente.',
                type: "success",
            });
            navigation.navigate('Login');
        } else if (response['status']) {
            // alert("Ha ocurrido un error");
            showMessage({
                message: "Error.",
                description: 'Ha ocurrido un error inesperado.',
                type: "danger",
            });
        } else {
            let errors = '';
            for (const [key, value] of Object.entries(response)) {
                errors = key + ':\n';
                for (let i = 0; i < value.length; i++) {
                    errors += value[i] + '\n';
                }
            }
            // alert(errors);
            showMessage({
                message: errors,
                // description:'Has sido registrado correctamente.',
                type: "danger",
            });
        }
    }, [response])

    return (
      <>
        <View style={styles.header} top={7}>
          <Icon
            name="arrow-back"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <InnerContainer marginTop={0}>
          <StatusBar style="dark" backgroundColor="white" />

          <PageLog
            source={require("../assets/drofamilogo1.jpg")}
            resizeMode="cover"
          />
          <Subtitle>Registro</Subtitle>
          <ScrollView
            // scrollIndicatorInsets={false}
            showsVerticalScrollIndicator={false}
          >
            <Keyboard2>
              <StyledContainer>
                <Formik
                  initialValues={{
                    usuario: "",
                    nombre: "",
                    apellido: "",
                    correo: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    direccion: "",
                  }}
                  validateOnMount={true}
                  onSubmit={(values) => {
                    signUp(
                      values.usuario,
                      values.correo,
                      values.phone,
                      values.password,
                      values.confirmPassword,
                      values.nombre,
                      values.apellido,
                      values.direccion,
                      setLoading,
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
                    <StyledFormArea>
                      <MyTextInput
                        label={"Primer Nombre"}
                        icon={"person"}
                        placeholder={"Mauricio"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("nombre")}
                        onBlur={handleBlur("nombre")}
                        values={values.nombre}
                      />

                      {errors.nombre && touched.nombre && (
                        <Text style={styles.errores}>{errors.nombre}</Text>
                      )}

                      <MyTextInput
                        label={"Primer Apellido"}
                        icon={"person"}
                        placeholder={"Silva"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("apellido")}
                        onBlur={handleBlur("apellido")}
                        values={values.apellido}
                      />

                      {errors.apellido && touched.apellido && (
                        <Text style={styles.errores}>{errors.apellido}</Text>
                      )}

                      <MyTextInput
                        label={"Nombre de Usuario"}
                        icon={"person"}
                        placeholder={"drofamiClient"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("usuario")}
                        onBlur={handleBlur("usuario")}
                        values={values.usuario}
                      />

                      {errors.usuario && touched.usuario && (
                        <Text style={styles.errores}>{errors.usuario}</Text>
                      )}
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

                      {errors.correo && touched.correo && (
                        <Text style={styles.errores}>{errors.correo}</Text>
                      )}

                      <MyTextInput
                        label={"Teléfono"}
                        icon={"device-mobile"}
                        placeholder={"99999999"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        values={values.phone}
                        
                      />

                      {errors.phone && touched.phone && (
                        <Text style={styles.errores}>{errors.phone}</Text>
                      )}

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
                      {errors.password && touched.password && (
                        <Text style={styles.errores}>{errors.password}</Text>
                      )}

                      <MyTextInput
                        label={"Confirmar Contraseña"}
                        icon={"lock"}
                        placeholder={"*************"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        values={values.confirmPassword}
                        secureTextEntry={hidePassword2}
                        isPassword2={true}
                        hidePassword2={hidePassword2}
                        setHidePassword2={setHidePassword2}
                      />

                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errores}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                      <MyAutoGrowingTextInput
                        backgroundColor={Colors.secondary}
                        label={"Dirección"}
                        icon={"location"}
                        placeholder={"Dirección de entrega"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("direccion")}
                        onBlur={handleBlur("direccion")}
                        values={values.direccion}
                      />

                      {errors.direccion && touched.direccion && (
                        <Text style={styles.errores}>{errors.direccion}</Text>
                      )}

                      {/* <MyTextInput
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
                                } */}

                      <StyledButton
                        onPress={handleSubmit}
                        rounded
                        disabled={!isValid}
                        style={{
                          backgroundColor: isValid ? Colors.blue : "#9CA3AF",
                        }}
                      >
                        <ButtonText>Registrate</ButtonText>
                      </StyledButton>
                    </StyledFormArea>
                  )}
                </Formik>
              </StyledContainer>
            </Keyboard2>
          </ScrollView>
        </InnerContainer>
        {isLoading && <Spinner text="Creando cuenta..." />}
      </>
    );
};

const MyTextInput = ({ label, icon, isPassword, isPassword2, confirmPassword, hidePassword, setHidePassword,hidePassword2, setHidePassword2, flex, ...props }) => {
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

            {isPassword2 && (
                <RightIcon onPress={() => setHidePassword2(!hidePassword2)}>
                    <Ionicons name={hidePassword2 ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}


        </View>
    );
};
const MyAutoGrowingTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={40} color={Colors.blue} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <AutoGrowingTextInput
                {...props}
                style={styles.textInput}

            />
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
  errores: {
    fontSize: 10,
    color: "red",
    top: -10,
  },
  spinnercontent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
  },
  view2: {
    backgroundColor: "white",
  },
  header: {
    paddingTop: 8,
    backgroundColor: "white",
  },
  textInput: {
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 17,
    padding: 17,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 35,
    fontSize: 16,
    height: 52,
    marginVertical: 3,
    marginBottom: 20,
    fontWeight: "bold",
    color: Colors.tertiary,
  },
});


