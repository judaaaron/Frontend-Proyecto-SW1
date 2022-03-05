import * as React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
    ButtonText,
    StyledButton
} from "../components/styles";
import { getUserData } from '../src/login_registerAPI';
import { StatusBar } from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';

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
    return (
        <>
            <ScrollView>
                <StatusBar style="dark" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , top:20}}>
                    <Text
                        onPress={() => navigation.navigate('Home')}
                        style={{ fontSize: 26, fontWeight: 'bold' }}>Configuración</Text>

                    
                </View>
                <StyledButton style={{top:30}} onPress={() => {
                        getUserData(setLoading, token, setFormResponse).then(() => {
                            navigation.navigate('profileModification', {formResponse})
                        })
                    }}>

                        
                    <ButtonText>
                        Editar Perfil
                    </ButtonText>
                </StyledButton>
                <StyledButton onPress={() => navigation.navigate('profileModification')}>
                    <ButtonText>
                        Cambiar contraseña
                    </ButtonText>
                </StyledButton>

                


                
            </ScrollView>
        </>

    );
}