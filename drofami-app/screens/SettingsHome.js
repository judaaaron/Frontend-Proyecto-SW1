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


export default function SettingsHome({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [formResponse, setFormResponse] = useState({});
    const [token, setToken] = useState();

    React.useEffect(() => {
        async function token() {
            const session = await SecureStore.getItemAsync("user_session");
            token = JSON.parse(session)['token'];
            console.log("token ", token);
            setToken(token)
        }
        token();
    }, [])

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
        navigation.navigate('profileModification',
            {
                usuario: user['username'],
                apellido: user['last_name'],
                nombre: user['first_name'],
                direccion: cliente['address'],
                phone: user['phone_number'],
            })
    }, [formResponse])

    return (
        <>
            <View flex={1} backgroundColor={Colors.primary}>
                {/* <StyledContainer marginTop={-14}> */}

                <View backgroundColor={Colors.primary} style={{ top: 40 }}>

                    <Subtitle2 style={styles.view3} backgroundColor={Colors.primary} color={Colors.blue} >                             Cuenta</Subtitle2>

                    {/* <ExtraView marginRight={260}> */}

                    <StyledButton2 onPress={() => {
                        getUserData(setLoading, token, setFormResponse)
                    }}>
                        <RightIcon2 onPress={() => {
                        getUserData(setLoading, token, setFormResponse)
                    }}>
                            <Icon name="arrow-forward-ios" size={20} marginRight={40} color={Colors.blue}/>
                        </RightIcon2>
                        <ButtonText2>Editar perfil

                            {/* <RightIcon /> */}
                        </ButtonText2>
                    </StyledButton2>
                    {/* </ExtraView> */}
                    {/* <ExtraView marginRight={160}> */}

                    <StyledButton2 onPress={() => { navigation.navigate('ChangeEmailScreen', { token: token }), console.log(token) }}>
                        <RightIcon2 onPress={() => { navigation.navigate('ChangeEmailScreen', { token: token }), console.log(token) }}>
                            <Icon name="arrow-forward-ios" size={20} color={Colors.blue} />
                        </RightIcon2>

                        <ButtonText2>Cambiar correo electrónico

                        </ButtonText2>
                    </StyledButton2>
                    {/* </ExtraView> */}
                    {/* <ExtraView marginRight={205}> */}
                    <StyledButton2 onPress={() => { navigation.navigate('ChangePasswordScreen', { token: token }), console.log(token) }}>
                        <RightIcon2 onPress={() => { navigation.navigate('ChangePasswordScreen', { token: token }), console.log(token) }}>
                            <Icon name="arrow-forward-ios" size={20} color={Colors.blue} />
                        </RightIcon2>
                        <ButtonText2>
                            Cambiar contraseña
                        </ButtonText2>
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