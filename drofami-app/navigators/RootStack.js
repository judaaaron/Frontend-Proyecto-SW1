import {React, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from "../components/styles";
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import AncalmoScreen from '../screens/AncalmoScreen';
import SettingsHome from '../screens/SettingsHome';
import MainHome from '../screens/MainHome';
import HesselScreen from '../screens/HesselScreen';
import DetalleProductsAncalmo from '../screens/DetalleProductsAncalmo'
import profileModification from '../screens/profileModification'
import DetalleProductsHessel from "../screens/DetalleProductsHessel";
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import EmpleadoDetalleProductoScreen from "../screens/EmpleadoDetalleProductoScreen";
import HistorialOrden from "../screens/HistorialOrden";
import OpcionesCuenta from "../screens/OpcionesCuenta";
import OrderDetails from "../screens/OrderDetails"
import ChangeEmailScreen from '../screens/ChangeEmailScreen'
import SelectEmpresa from '../screens/SelectEmpresa'
import CreateEmpresa from '../screens/CreateEmpresa'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Image } from 'react-native';
import CartScreen from "../screens/CartScreen";
import { useSelector } from "react-redux";//esta

const Stack = createStackNavigator();

const homeName = "Inicio";
const Ancalmo = "Ancalmo";
const Hessel = "Hessel";
const settingsName = "Mi cuenta";
const carrito = "Carrito";

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    // const [notifications, setNotifications] = useState("3");
    const [notifications, setNotifications] = useState([]);
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.blue,
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 4, fontSize: 10 },
                style: { padding: 10, height: 70, top: 10 }
            }}>
            <Tab.Screen name={homeName} component={MainHome} options={{ header: () => null, tabBarIcon: () => (<Image source={require("./../assets/homeAzul3.png")} style={{ width: 35, height: 35, top: 2 }} />), name: () => null }} />
            <Tab.Screen name={Ancalmo} component={AncalmoScreen} options={{ header: () => null, tabBarIcon: () => (<Image source={require("./../assets/ancalmoAzul.jpg")} style={{ width: 25, height: 25, top: 5 }} />), name: () => null }} />
            <Tab.Screen name={Hessel} component={HesselScreen} options={{ header: () => null, tabBarIcon: () => (<Image source={require("./../assets/heseelAzul.png")} style={{ width: 30, height: 30, top: 3 }} />), name: () => null }} />
            {useSelector((state) => state.staff.value) === false ? 
            notifications.length != "0" ? 
            <Tab.Screen name={carrito} component={CartScreen} options={{ header: () => null, tabBarBadge: notifications.length, tabBarIcon: () => (<Image source={require("./../assets/carrito3.png")} style={{ width: 30, height:30, top: 3, backgroundColor: Colors.primary }} />), name: () => null }} />
            : 
            <Tab.Screen name={carrito} component={CartScreen} options={{ header: () => null, tabBarIcon: () => (<Image source={require("./../assets/carrito3.png")} style={{ width: 30, height:30, top: 3, backgroundColor: Colors.primary }} />), name: () => null }} />
            
            :
            null
            }
            <Tab.Screen name={settingsName} component={SettingsHome} options={{ header: () => null, tabBarIcon: () => (<Image source={require("./../assets/userAzul.png")} style={{ width: 25, height: 25, top: 3, backgroundColor: Colors.primary }} />), name: () => null }} />
            
        </Tab.Navigator>

    );
};

const RootStack = () => {
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <NavigationContainer>
                <RootStackScreens />
                {/* <HomeTabs/> */}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const RootStackScreens = () => (
    <Stack.Navigator initialRouteName={Login}>
        <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
        <Stack.Screen name="Signup" component={Signup} options={{ header: () => null }}/> 
        <Stack.Screen name="Home" component={HomeTabs} options={{ header: () => null }} />
        <Stack.Screen name="profileModification" component={profileModification} options={{ header: () => null }}/>
        <Stack.Screen name="DetalleProductsAncalmo" component={DetalleProductsAncalmo} options={{ header: () => null }} />
        <Stack.Screen name="DetalleProductsHessel" component={DetalleProductsHessel} options={{ header: () => null }} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ header: () => null }}/>
        <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} options={{ header: () => null }}/>
        <Stack.Screen name="SelectEmpresa" component={SelectEmpresa} options={{ header: () => null }}/>
        <Stack.Screen name="CreateEmpresa" component={CreateEmpresa} options={{ header: () => null }}/>
        <Stack.Screen name="EmpleadoDetalleProductoScreen" component={EmpleadoDetalleProductoScreen} options={{ header: () => null }} />
        <Stack.Screen name="HistorialOrden" component={HistorialOrden} options={{ header: () => null }} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ header: () => null }} />
        <Stack.Screen name="OpcionesCuenta" component={OpcionesCuenta} options={{ header: () => null }} />
    
    </Stack.Navigator>
);
export default RootStack;
