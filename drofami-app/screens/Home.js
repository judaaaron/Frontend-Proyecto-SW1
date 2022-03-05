import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons, Ionicons } from "@expo/vector-icons";


import AncalmoScreen from './AncalmoScreen';
import SettingsHome from './SettingsHome';
import MainHome from './MainHome';
import HesselScreen from './HesselScreen';

//Screen names
const homeName = "Inicio";
const Ancalmo = "Ancalmo";
const Hessel = "Hessel";
const settingsName = "Configuración";

export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
};

const Tab = createBottomTabNavigator();

function Home() {
    return (

        <Tab.Navigator
        
            initialRouteName={homeName}
           
              
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';

                    } else if (rn === Ancalmo) {
                        iconName = focused ? 'list' : 'list-outline';

                    } else if (rn === Hessel) {
                        iconName = focused ? 'list' : 'list-outline';

                    } else if (rn === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    
                    return <Ionicons name={iconName} size={size} color={'#6D28D9'}/>;
                },
            })}
           
            tabBarOptions={{
                activeTintColor: '#6D28D9',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 4, fontSize: 10 },
                style: { padding: 10, height: 70, top: 10 }
            }}>
                

            <Tab.Screen name={homeName} component={MainHome} options={{header: () => null}} />
            <Tab.Screen name={Ancalmo} component={AncalmoScreen} options={{header: () => null}}/>
            <Tab.Screen name={Hessel} component={HesselScreen} options={{header: () => null}} />
            <Tab.Screen name={settingsName} component={SettingsHome} options={{header: () => null}} />

        </Tab.Navigator>

    );
}

export default Home;