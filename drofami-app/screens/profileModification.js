import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, ScrollView, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { modification, getUserData } from "../src/login_registerAPI";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import MaskInput from 'react-native-mask-input';
import * as SecureStore from 'expo-secure-store';
import Keyboard2 from "../components/Keyboard2";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
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
    Colors,

} from "../components/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from "./Login";

const { brand, darkLight } = Colors;
const regularNameLastName = /(^(\S))+(\s*[aA-zZ])+$/  //solo acepta letras
const regularPhone = /^([2]||[3]||[8]||[9]{1})[0-9]{3}-[0-9]{4}$/ // solo acepta numeros y guion en el centro
const regularUsername = /(^(\S))+(\s*[aA-zZ0-9!@_#\$%\^&\*])+$/ // acepta basicamente todo tipo de caracter
const regularDireccion = /(^(\S))+(\s*[aA-zZ0-9,.])+$/
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
    phone: yup.string().min(9, ({ min }) => `Número teléfonico debe tener 8 números y un guión`).max(9, ({ max }) => `Número teléfonico debe tener 8 números y un guión`)
        .required('Número teléfonico es obligatorio').matches(regularPhone,
            "Número teléfonico inválido",
        ),
    direccion: yup.string().min(15, ({ min }) => `Direccion debe de tener al menos ${min} caracteres minimo`).max(150, ({ max }) => `Solo se permiten ${max} caracteres máximo`).required('Número teléfonico es obligatorio').matches(regularDireccion,'Dirección inválida'),
});

const Signup = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const { usuario, apellido, nombre, address, phone } = route.params

    const [response, setResponse] = useState('');
    const token = React.useRef('');

    React.useEffect(() => {
        console.log(route.params)
        async function getToken() {
            const session = await SecureStore.getItemAsync("user_session");
            token.current = JSON.parse(session)['token']
            console.log("token ", token)
            
            getUserData(setLoading, token.current, setFormResponse);
        }
        getToken();

    }, []);
    
    React.useEffect(() => {
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            alert(response['message']);
            navigation.navigate('Home');
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

    function uploadChanges() {

    }

    return (
      <>
        <Keyboard2>
          <StyledContainer marginTop={-20} top={25}>
            <StatusBar style="dark" />
            <View style={styles.header} top={6}>
              <Icon
                name="arrow-back"
                size={30}
                onPress={() => navigation.goBack()}
              />
            </View>

            <InnerContainer top={-10}>
              <PageLog
                source={require("../assets/drofamilogo1.jpg")}
                resizeMode="cover"
              />
              <Subtitle>Modificación</Subtitle>
              <Formik
                enableReinitialize
                initialValues={{
                  usuario: usuario,
                  nombre: nombre,
                  apellido: apellido,
                  phone: phone,
                  direccion: address,
                }}
                validateOnMount={true}
                onSubmit={(values) => {
                  modification(
                    values.usuario,
                    values.phone,
                    values.nombre,
                    values.apellido,
                    values.direccion,
                    setLoading,
                    setResponse,
                    token.current
                  );
                }}
                validationSchema={SingUpValidationSchema}
              >
                {({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
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
                      value={values.nombre}
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
                      value={values.apellido}
                    />

                    {errors.apellido && touched.apellido && (
                      <Text style={styles.errores}>{errors.apellido}</Text>
                    )}

                    <MyTextInput
                      label={"Username"}
                      icon={"person"}
                      placeholder={"drofamiClient"}
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("usuario")}
                      onBlur={handleBlur("usuario")}
                      value={values.usuario}
                    />

                    {errors.usuario && touched.usuario && (
                      <Text style={styles.errores}>{errors.usuario}</Text>
                    )}
                    <MyTextInput
                      label={"Teléfono"}
                      icon={"device-mobile"}
                      placeholder={"9874-8574"}
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      value={values.phone}
                    />

                    {errors.phone && touched.phone && (
                      <Text style={styles.errores}>{errors.phone}</Text>
                    )}

                    <MyAutoGrowingTextInput
                      label={"Direccion"}
                      icon={"location"}
                      placeholder={"Dirección de entrega"}
                      placeholderTextColor={darkLight}
                      onChangeText={handleChange("direccion")}
                      onBlur={handleBlur("direccion")}
                      value={values.direccion}
                    />

                    {errors.direccion && touched.direccion && (
                      <Text style={styles.errores}>{errors.direccion}</Text>
                    )}

                    <StyledButton
                      onPress={handleSubmit}
                      rounded
                      disabled={!isValid}
                      style={{
                        backgroundColor: isValid ? Colors.blue : "#9CA3AF",
                      }}
                    >
                      <ButtonText>Modificar datos</ButtonText>
                    </StyledButton>
                  </StyledFormArea>
                )}
              </Formik>
            </InnerContainer>
          </StyledContainer>
        </Keyboard2>
        {isLoading && (
          <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
            {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
            <ActivityIndicator size={100} color={"blue"} />
            <Text>Modificando datos...</Text>
           
          </View>
          
        )}
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

const MyAutoGrowingTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword,flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={40} color={Colors.blue} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <AutoGrowingTextInput 
                style = {styles.textInput}
                size = {50} 
                {...props}
             />
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
  errores: {
    fontSize: 10,
    color: "red",
    top: -15,
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 17,
        padding: 17,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 35,
        fontSize: 16,
        height: 52,
        marginVertical: 3,
        marginBottom: 20,
        fontWeight:'bold',
        color: Colors.tertiary,
      }
});