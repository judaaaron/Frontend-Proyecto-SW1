import React from "react";
import { useState } from "react";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Octicons } from "@expo/vector-icons";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import {crearEmpresa, setEmpresa} from '../src/EmpresaMethods'
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors
} from "../components/styles";

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Keyboard2 from "../components/Keyboard2";
import { useSelector } from "react-redux";//esta

const { darkLight } = Colors;
const regularRTN = /^[0-9]{1}[1-9]{1}[0-9]{2}([1]{1}[9]{1}[0-9]{2}|[2]{1}[0]{1}[0-2]{1}[0-2]{1})[0-9]{6}$/  // solo acepta numeros y 2 guiones en pos 4 y pos 9
const regularName = /(^(\S))+(\s*[aA-zZáéíóúñ0-9])+$/ // acepta basicamente todo tipo de caracter
const regularDireccion = /(^(\S))+(\s*[aA-zZáéíóúñ0-9])+$/

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
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [responsePUT, setResponsePUT] = useState("");
  const [token, setToken] = useState(useSelector((state) => state.token.value)); //se agrega

  const canalesDeVenta = [
    { nombre: "Mayorista", id: "MAY" },
    { nombre: "Farmacia", id: "FAR" },
    { nombre: "Supermercado", id: "SUP" },
  ];


  React.useEffect(() => {
    if (!responsePUT) {
      return;
    }
    if (response["status"] && response["status"] == "success") {
      alert("Empresa creada y vinculada exitosamente");
    }
  }, [responsePUT]);

  React.useEffect(() => {
    if (!response) {
      return;
    }
    if (response["status"] == "success") {
      setEmpresa(setLoading, token, response["data"]["id"], setResponsePUT);
      navigation.navigate("Home");
      //Aqui va la parte adonde va a ir
      //where to?
    } else if (response["status"]) {
      alert("Ha ocurrido un error");
    } else {
      let errors = "";
      for (const [key, value] of Object.entries(response)) {
        errors = key + ":\n";
        for (let i = 0; i < value.length; i++) {
          errors += value[i] + "\n";
        }
      }
      alert(errors);
    }
  }, [response]);

  return (
    <>
      <Keyboard2>
        <StyledContainer marginTop={-10} top={25}>
          <StatusBar style="dark" />
          <View style={styles.header} top={6}>
            {/* <Icon
                name="arrow-back"
                size={30}
                onPress={() => navigation.goBack()}
              /> */}
          </View>

          <InnerContainer top={-30}>
            <PageLog
              source={require("../assets/drofamilogo1.jpg")}
              resizeMode="cover"
            />
            <Subtitle>Modificación</Subtitle>
            <Formik
              initialValues={{
                nombre: "",
                direccion: "",
                rtn: "",
                canal: "",
              }}
              validateOnMount={true}
              onSubmit={(values) => {
                // Esto hay que cambiar aqui va la parte de subir a la base de datos
                crearEmpresa(
                  setLoading,
                  token,
                  values.nombre,
                  values.rtn,
                  values.direccion,
                  values.canal,
                  setResponse
                );
              }}
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
                    placeholder={"Nombre Empresa"}
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
                    placeholder={"RTN"}
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
                    {canalesDeVenta.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.nombre.toString()}
                          value={item.id.toString()}
                          id={item.id.toString()}
                          key={index}
                        />
                      );
                    })}
                  </Picker>

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
          </InnerContainer>
        </StyledContainer>
      </Keyboard2>
      {isLoading && (
        <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
          {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
          <ActivityIndicator size={100} color={"blue"} />
          <Text>Creando empresa...</Text>
        </View>
      )}
    </>
  );
};;

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
        marginTop:180,
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


