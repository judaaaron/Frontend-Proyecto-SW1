import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { Colors } from '../prueba-android/components/styles'
//const { primary, tertiary } = Colors;
import Login from './screens/Login'
import Signup from './screens/signUp'
import Home from './screens/home'


const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
               
            initialRouteName={Login}
            >
                <Stack.Screen name="Login" component={Login}

                />
                <Stack.Screen name="Signup" component={Signup} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;
