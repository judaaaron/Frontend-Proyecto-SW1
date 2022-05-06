import React from "react";
import RootStack from "./navigators/RootStack";
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { View } from 'react-native';
import tokenReducer from "./src/reducers/getToken"
import staffReducer from "./src/reducers/staff"
import cartItemsReducer from "./src/reducers/cartItems"
import { Provider } from "react-redux"
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    token: tokenReducer,
    staff: staffReducer,
    cart: cartItemsReducer,
  },
});

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