import * as React from 'react';
import { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import { getUserData } from '../src/login_registerAPI';
import { StatusBar } from "expo-status-bar";
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
    TextLink,
    ButtonText2,
    StyledButton2,
    Subtitle2,
    RightIcon2

} from "../components/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';

export default function SettingsHome({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [formResponse, setFormResponse] = useState({});
    const [token, setToken] = useState();
    const [state, setState] = useState({
      first_name: '',
      last_name:'',
      phone_number: '',
      username: '',
      address: ''
    });

    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token'];
            console.log("token ", token);
            setToken(token)
            
        }
        token();
    }, [])

    React.useEffect(() =>{
      getUserData(setLoading, token, setFormResponse)
    },[token])

    React.useEffect(() => {
        console.log('response ->', formResponse)
        if (!formResponse) {
            return;
        }
        if (!formResponse['status'] || formResponse['status'] == 'failed') {
            //handle error
            return;
        } 
        const cliente = formResponse['cliente'];
        const user = cliente['user']
        const obj = {...state}
        obj['address'] = cliente['address']
        obj['first_name'] = user['first_name']
        obj['last_name'] = user['last_name']
        obj['phone_number'] = user['phone_number']
        obj['username'] = user['username']
        setState(state => ({
          ...obj
        }));
        console.log(user)
    }, [formResponse])

    return (
      <>
        <View flex={1} backgroundColor={Colors.primary}>
          {/* <StyledContainer marginTop={-14}> */}

          <View backgroundColor={Colors.primary} style={{ top: 40 }}>
            <View style={{ alignItems: "center", fontSize: 20 }}>
              <Subtitle2
                style={styles.view3}
                backgroundColor={Colors.primary}
                color={Colors.blue}
              >
                Cuenta
              </Subtitle2>
            </View>
            {/* <ExtraView marginRight={260}> */}
            <View style={{ alignItems: "center", alignContent: "center" }}>
              <Avatar
                size={64}
                rounded
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
                }}
                containerStyle={{
                  borderColor: Colors.blue,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              >
                <Avatar.Accessory
                  size={15}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/929/929440.png",
                  }}
                />
              </Avatar>
              <View style={{ alignItems: "center" }}>
                <Text style={{ alignContent: "center" }}>
                  {state ? state.first_name + " " + state.last_name : ""}
                </Text>
                
              </View>
            </View>
            <StyledButton2
              onPress={() => {
                navigation.navigate("profileModification", {
                  usuario: state["username"],
                  apellido: state["last_name"],
                  nombre: state["first_name"],
                  address: state["address"],
                  phone: state["phone_number"],
                });
              }}
            >
              <RightIcon2
                onPress={() => {
                  navigation.navigate("profileModification", {
                    usuario: state["username"],
                    apellido: state["last_name"],
                    nombre: state["first_name"],
                    address: state["address"],
                    phone: state["phone_number"],
                  });
                }}
              >
                <Icon
                  name="arrow-forward-ios"
                  size={20}
                  marginRight={40}
                  color={Colors.blue}
                />
              </RightIcon2>
              <ButtonText2>
                Editar perfil
                {/* <RightIcon /> */}
              </ButtonText2>
            </StyledButton2>
            {/* </ExtraView> */}
            {/* <ExtraView marginRight={160}> */}

            <StyledButton2
              onPress={() => {
                navigation.navigate("ChangeEmailScreen", { token: token }),
                  console.log(token);
              }}
            >
              <RightIcon2
                onPress={() => {
                  navigation.navigate("ChangeEmailScreen", { token: token }),
                    console.log(token);
                }}
              >
                <Icon name="arrow-forward-ios" size={20} color={Colors.blue} />
              </RightIcon2>

              <ButtonText2>Cambiar correo electrónico</ButtonText2>
            </StyledButton2>
            {/* </ExtraView> */}
            {/* <ExtraView marginRight={205}> */}
            <StyledButton2
              onPress={() => {
                navigation.navigate("ChangePasswordScreen", { token: token }),
                  console.log(token);
              }}
            >
              <RightIcon2
                onPress={() => {
                  navigation.navigate("ChangePasswordScreen", { token: token }),
                    console.log(token);
                }}
              >
                <Icon name="arrow-forward-ios" size={20} color={Colors.blue} />
              </RightIcon2>
              <ButtonText2>Cambiar contraseña</ButtonText2>
            </StyledButton2>
            {/* </ExtraView> */}
          </View>

          {/* </StyledContainer> */}
        </View>
      </>
    );
}

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
    },
    searchContainer: {
        height: 50,
        backgroundColor: Colors.secondary,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        top: -10
    },
    view3: {
        alignContent: 'center',
        justifyContent: 'center',

    },
    searchContainer: {
        height: 50,
        backgroundColor: Colors.secondary,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        top: -10
    },
})