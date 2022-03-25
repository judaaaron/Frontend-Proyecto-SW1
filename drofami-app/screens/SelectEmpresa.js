import React from "react";
import { useState } from "react";
import { Button, Modal, RadioButton, Text } from "react-native-paper";
import { Formik } from "formik";
import { View, Image, StyleSheet } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import * as yup from 'yup';
import { ActivityIndicator } from "react-native-paper";
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {getEmpresa, setEmpresa} from '../src/EmpresaMethods'
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";
import {
    PageLog,
    Subtitle,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    StyledContainer2,
    InnerContainer2,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    StyledFormArea2
} from "../components/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { brand, darkLight } = Colors;

const data = [
    {label: 'Kielsa', value: '1'},
    {label: 'Del Ahorro', value: '2'},
    {label: 'Siman', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
];


const SelectEmpresa = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState('first');
    const [response, setResponse] = React.useState();
    const [responsePUT, setResponsePUT] = React.useState();
    const [token, setToken] = React.useState();
    const [empresas, setEmpresas] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token'];
            setToken(token)
        }
        token();
    }, []);

    const isFocused = useIsFocused();

    React.useEffect(() =>{
      if(isFocused && token){ 
        getEmpresa(setLoading, token, setResponse)
      }
    },[token, isFocused])

    React.useEffect(() => {
        getEmpresa(setLoading, token, setResponse);
    }, [token])

    React.useEffect(() => {
        if (!response) {
            return;
        }
        console.log(response);
        console.log('data', response['data']);
        setEmpresas(response['data']);
    }, [response])

    React.useEffect(() => {
        if (!responsePUT) {
            return;
        
        }
        if (responsePUT['message']) {
            alert(responsePUT['message']);
        }
        if (response['status'] && response['status'] == 'success') {
            navigation.goBack();
        }
        setEmpresas(responsePUT['data']);
    }, [responsePUT])

    const _renderItem = item => {
            return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
                {/* <Image style={styles.icon} source={require('../assets/drofamilogo1.png')} /> */}
            </View>
            );
        };

    function handleSubmit() {
        if(!selected || !selected.id) {
            return;
        }
        const id = selected.id
        console.log('Token ', token)
        console.log('ID |||', id, "|||")
        setEmpresa(setLoading, token, id, setResponsePUT);
    }

    return (
        <>
            {/* <KeyboardAvoidingWrapper> */}
            <View backgroundColor={Colors.primary} top={-90}>
                <InnerContainer2 style={styles.inner2}>
                    <View style={{marginRight:350}} >
                        <Icon name="arrow-back" size={30} onPress={() => navigation.goBack()} />
                    </View>
                    <PageLog
                        source={require("../assets/drofamilogo1.jpg")}
                        resizeMode="cover"
                    />                
                    <StyledFormArea2>
                        <Subtitle marginTop={10}>Seleccione su empresa para continuar</Subtitle>
                            {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Registrá t</Text> */}
                            <Dropdown
                                style={styles.dropdown}
                                containerStyle={styles.shadow}
                                data={empresas}
                                search
                                searchPlaceholder="Buscar"
                                labelField="name"
                                valueField="id"
                                label="Dropdown"
                                placeholder=" Empresas"
                                fontWeight="bold"
                                // value={dropdown}
                                onChange={(item) => {
                                        setSelected(item)
                                    }
                                }
                                renderLeftIcon={() => (
                                    <Image source={require("./../assets/empresa3.png")} style={{width:30, height:30}}/>
                                )}
                                renderItem={item => _renderItem(item)}
                                textError="Error"
                            />                        
                            <View backgroundColor={Colors.primary}>
                                <StyledButton onPress={() => handleSubmit()} 
                                disabled={selected ? false : true} 
                                style={{ backgroundColor: selected ? Colors.blue : '#9CA3AF' }}>
                                    <ButtonText >
                                        Aceptar
                                    </ButtonText>
                                </StyledButton>
                            </View>                        
                            <ExtraView>
                                <ExtraText>¿No está tu empresa? </ExtraText>
                                {/* <TextLink onPress={() => navigation.navigate('')}> poner entre comillas el nombre de la ventana registrar empresa*/}
                                <TextLink onPress={() => navigation.navigate('CreateEmpresa')}>
                                    <TextLinkContent>Regístrala</TextLinkContent>
                                </TextLink>
                            </ExtraView>                            
                        </StyledFormArea2>
                </InnerContainer2>
            </View>
            {/* </KeyboardAvoidingWrapper> */}
            
        </>
    );
};
export default SelectEmpresa;

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
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 50,
    marginBottom: 50,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});