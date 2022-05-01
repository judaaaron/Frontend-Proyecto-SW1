import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import { Colors } from '../prueba-android/components/styles'
//const { primary, tertiary } = Colors;
import Login from './screens/Login'
//import Signup from './screens/Signup'
import Home from './screens/Home'
import RootStack from "./navigators/RootStack";
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { View } from 'react-native';
import { createStore } from "redux";
import allReducers from "./src/reducers/index"
import { Provider } from "react-redux"

const store = createStore( allReducers);

LogBox.ignoreAllLogs();

export default function App(){
    return(
        <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStack />
          <FlashMessage position="bottom" />
        </View>
      </Provider>
    ) 
}