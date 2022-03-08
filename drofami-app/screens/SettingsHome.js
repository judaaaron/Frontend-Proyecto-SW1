import * as React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Colors, ButtonText, StyledButton } from "../components/styles";
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
        <ScrollView>
          <StatusBar style="dark" />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              top: 20,
            }}
          >
            <Text
              onPress={() => navigation.navigate("Home")}
              style={{ fontSize: 26, fontWeight: "bold" }}
            >
              Configuración
            </Text>
          </View>
          <StyledButton
            style={{ top: 30, backgroundColor: Colors.blue }}
            onPress={() => {
              getUserData(setLoading, token, setFormResponse);
            }}
          >
            <ButtonText>Editar Perfil</ButtonText>
          </StyledButton>
          <StyledButton
            style={{ backgroundColor: Colors.blue }}
            onPress={() => navigation.navigate("profileModification")}
          >
            <ButtonText>Cambiar contraseña</ButtonText>
          </StyledButton>
        </ScrollView>
      </>
    );
}