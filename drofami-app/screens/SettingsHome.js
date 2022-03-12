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
    TextLink

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
            <View flex={1}>
                <StyledContainer marginTop={-14}>
                    <InnerContainer marginTop={150} >
                        <Subtitle style={{ top: -100, }} size={100}>Cuenta</Subtitle>
                        <View style={{ top: -60 }}>
                            <ExtraView marginRight={260} >
                            </ExtraView>
                            <ExtraView marginRight={260} >
                                <TextLinkContent style={{ top: -20 }} onPress={() => {
                                    getUserData(setLoading, token, setFormResponse)
                                }}>Editar perfil</TextLinkContent>
                            </ExtraView>
                            <ExtraView marginRight={160}>
                                <TextLink style={{ top: -15 }} onPress={() => { navigation.navigate('ChangeEmailScreen', { token: token }), console.log(token) }}>
                                    <TextLinkContent>Cambiar correo electrónico</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                            <ExtraView marginRight={205}>
                                <TextLink style={{ top: -10 }} onPress={() => { navigation.navigate('ChangePasswordScreen', { token: token }), console.log(token) }}>
                                    <TextLinkContent>
                                        Cambiar contraseña
                                    </TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </View>
                    </InnerContainer>
                </StyledContainer>
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
})