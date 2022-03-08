import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { Colors } from '../prueba-android/components/styles'
//const { primary, tertiary } = Colors;
import Login from './screens/Login'
//import Signup from './screens/Signup'
import Home from './screens/Home'
import RootStack from "./navigators/RootStack";

export default function App(){
    return <RootStack/>
}