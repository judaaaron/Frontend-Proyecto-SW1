import React from "react";
import { useState } from "react";
import { Button, Modal, Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Octicons, Ionicons } from "@expo/vector-icons";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import MaskInput from 'react-native-mask-input';


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
    InnerContainer2,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink

} from "../components/styles";
import Login from "./Login";

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Keyboard2 from "../components/Keyboard2";
import Icon from 'react-native-vector-icons/MaterialIcons';


const { brand, darkLight } = Colors;
const regularRTN = /^[0-9]{1}[1-9]{1}[0-9]{2}([1]{1}[9]{1}[0-9]{2}|[2]{1}[0]{1}[0-2]{1}[0-2]{1})[0-9]{6}$/  // solo acepta numeros y 2 guiones en pos 4 y pos 9
const regularName = /(^(\S))+(\s*[aA-zZ0-9])+$/ // acepta basicamente todo tipo de caracter
const regularDireccion = /(^(\S))+(\s*[aA-zZ0-9])+$/

//es basicamente el signup  pero como create en empresa
let CreateValidationSchema = yup.object().shape({
    nombre: yup.string()
        .required('Nombre es obligatorio').matches(regularName,
            "Nombre inválido. Asegurese de no tener espacios, solo letras"
        ),
    direccion: yup.string().min(15, ({ min }) => `Direccion debe de tener al menos ${min} caracteres minimo`).max(150, ({ max }) => `Solo se permiten ${max} caracteres máximo`).required('Campo obligatorio'),
    rtn: yup.string().min(14, ({ min }) => `RTN debe tener 14 números`).max(14, ({ max }) => `RTN debe tener 14 números`)
         .required('Número de RTN es obligatorio').matches(regularRTN,
             "RTN inválido"
         ),
});

const createEmpresa = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false)
    const [response, setResponse] = useState('')

    const canalesDeVenta = [
        {nombre: 'Mayorista', id: 'MAY'},
        {nombre: 'Farmacia', id: 'FAR'},
        {nombre: 'Supermercado', id: 'SUP'},
        // {nombre: 'Farmacia-Mayorista'},
    ]

    React.useEffect(() => {
        console.log(response)
        if (!response) {
            return;
        }
        if (response['status'] == "success") {
            alert("Registrado correctamente");

            //Aqui va la parte adonde va a ir
            navigation.navigate('SelectEmpresa');
            //where to?
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
          <View backgroundColor={Colors.primary} top={-90}>
            <StyledContainer>
              <StatusBar style="dark" />

              <InnerContainer2 style={styles.inner2}>
                <View style={{ marginRight: 350 }}>
                  <Icon
                    name="arrow-back"
                    size={30}
                    onPress={() => navigation.goBack()}
                  />
                </View>
                <PageLog
                  source={require("../assets/drofamilogo1.jpg")}
                  resizeMode="cover"
                />
                <Subtitle>Creacion de Empresa</Subtitle>
                <Formik
                  initialValues={{
                    nombre: "",
                    direccion: "",
                    rtn: "",
                    canal: "",
                  }}
                  validateOnMount={true}
                  /*
                            onSubmit={(values) => {

                                // Esto hay que cambiar aqui va la parte de subir a la base de datos
                                signUp(values.usuario, values.correo, values.phone, values.password,
                                    values.confirmPassword, values.nombre, values.apellido, values.direccion,
                                    setLoading, setResponse
                                );
                            }}*/
                  validationSchema={CreateValidationSchema}
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
                        label={"Nombre de la Empresa"}
                        //hay que sacar un diferente Icon para esto
                        icon={"pencil"}
                        placeholder={"ej. Kielsa"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("nombre")}
                        onBlur={handleBlur("nombre")}
                        values={values.nombre}
                      />

                      {errors.nombre && touched.nombre && (
                        <Text style={styles.errores}>{errors.nombre}</Text>
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

                      <MyTextInput
                        label={"RTN"}
                        icon={"credit-card"}
                        placeholder={"08011999987415"}
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange("rtn")}
                        onBlur={handleBlur("rtn")}
                        values={values.rtn}
                      />

                      {errors.rtn && touched.rtn && (
                        <Text style={styles.errores}>{errors.rtn}</Text>
                      )}

                      {/* Canal de venta sera un text input Meanwhile */}
                      <StyledInputLabel>Canal de Venta</StyledInputLabel>
                      <Picker
                        enabled={true}
                        mode="dropdown"
                        placeholder="Canal de venta"
                        // onValueChange={formik.handleChange('city_name')}
                        // selectedValue={formik.values.city_name}
                        selectedValue={values.canal}
                        onValueChange={handleChange("canal")}
                      >
                        {canalesDeVenta.map((item) => {
                          return (
                            <Picker.Item
                              label={item.nombre.toString()}
                              value={item.nombre.toString()}
                              id={item.id.toString()}
                            />
                          );
                        })}
                      </Picker>

                      {errors.nombre && touched.nombre && (
                        <Text style={styles.errores}>{errors.nombre}</Text>
                      )}

                      <StyledButton
                        onPress={handleSubmit}
                        rounded
                        disabled={!isValid}
                        style={{
                          backgroundColor: isValid ? Colors.blue : "#9CA3AF",
                        }}
                      >
                        <ButtonText>Registrar Empresa</ButtonText>
                      </StyledButton>
                    </StyledFormArea>
                  )}
                </Formik>
              </InnerContainer2>
            </StyledContainer>
          </View>
        </KeyboardAvoidingWrapper>
        {isLoading && (
          <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
            {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
            <ActivityIndicator size={100} color={"blue"} />
            <Text>Creando empresa...</Text>
          </View>
        )}
      </>
    );
};

const MyTextInput = ({ label, icon,flex, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={Colors.blue} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
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
                {...props}
                style = {styles.textInput}
                
             />
        </View>
    );
};

export default createEmpresa;

const styles = StyleSheet.create({
    errores: {
        fontSize: 10,
        color: 'red',
        top: -10,
    },

    //>.<
    view2: {
        backgroundColor: "white",
      },
      backIcon: {
        top: 180,
      },
      inner2: {
        top: 80,
      },
    container2: {
        marginTop: 50,
      },
      container: {
        flex: 1,
        backgroundColor: "white",
        padding: 40,
      },
      icon: {
        marginRight: 5,
        width: 18,
        height: 18,
      },
    spinnercontent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    },
    view2: {
        backgroundColor: 'white',
    },
    //>.<
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
})

