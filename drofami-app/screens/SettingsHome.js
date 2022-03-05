import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
    ButtonText,
    StyledButton
} from "../components/styles";

import { StatusBar } from "expo-status-bar";

export default function SettingsHome({ navigation }) {
    return (
        
        <>
            <ScrollView>
                <StatusBar style="dark" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , top:20}}>
                    <Text
                        onPress={() => navigation.navigate('Home')}
                        style={{ fontSize: 26, fontWeight: 'bold' }}>Configuración</Text>

                    
                </View>
                <StyledButton style={{top:30}} onPress={() => navigation.navigate('profileModification')}>
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