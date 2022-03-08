// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Octicons, Ionicons } from "@expo/vector-icons";
// import { Text, View, SafeAreaView, StyleSheet, ScrollView, TextInput, FlatList, Dimensions, Image } from 'react-native';
// //import RNMaterialLetterIcon from '@react-native-material-letter-icon';


// import AncalmoScreen from './AncalmoScreen';
// import SettingsHome from './SettingsHome';
// import MainHome from './MainHome';
// import HesselScreen from './HesselScreen';
// import DetalleProductsAncalmo from './DetalleProductsAncalmo';
// import LogoAncalmo from '../assets/LogoAncalmo.json'


// //Screen names
// const homeName = "Inicio";
// const Ancalmo = "Ancalmo";
// const Hessel = "Hessel";
// const settingsName = "Mi cuenta";

// export const Colors = {
//     primary: "#ffffff",
//     secondary: "#E5E7EB",
//     tertiary: "#1F2937",
//     darkLight: "#9CA3AF",
//     brand: "#6D28D9",
//     green: "#10B981",
//     red: "#EF4444",
// };

// const Tab = createBottomTabNavigator();
// const AddButton = () => {
//     return null
//   }

// function Home() {
//     return (
        
//         <Tab.Navigator
        
//             initialRouteName={homeName}
           
              
//             screenOptions={({ route }) => ({
//                 // tabBarIcon: ({ focused, color, size }) => {
//                 //     let iconName;
//                 //     let rn = route.name;

//                 //     if (rn === homeName) {
//                 //         iconName = focused ? 'home' : 'home-outline';

//                 //     } else if (rn === Ancalmo) {
//                 //         iconName = focused ? 'list' : 'card-outline';

//                 //     } else if (rn === Hessel) {
//                 //         iconName = focused ? 'list' : 'list-outline';

//                 //     } else if (rn === settingsName) {
//                 //         iconName = focused ? 'settings' : 'settings-outline';
//                 //     }

                    
//                 //     return <Ionicons name={iconName} size={size} color={'#6D28D9'}/>;
//                 // },
//             })}
           
//             tabBarOptions={{
//                 activeTintColor: '#6D28D9',
//                 inactiveTintColor: 'grey',
//                 labelStyle: { paddingBottom: 4, fontSize: 10 },
//                 style: { padding: 10, height: 70, top: 10 }
//             }}>
                

//             <Tab.Screen name={homeName} component={MainHome} options={{header: () => null, tabBarIcon: () => (<Image source={require("./../assets/home1.png")} style={{width: 35, height: 35, top:2}} />),name: () => null}} />
//             <Tab.Screen name={Ancalmo} component={AncalmoScreen} options={{header: () => null, tabBarIcon: () => (<Image source={require("./../assets/ancalmoLogo3.png")} style={{width: 25, height: 25, top:5}} />),name: () => null}} />
//             <Tab.Screen name={Hessel} component={HesselScreen} options={{header: () => null, tabBarIcon: () => (<Image source={require("./../assets/hesselLogo1.png")} style={{width: 30, height: 30, top:3}} />),name: () => null}} />
//             <Tab.Screen name={settingsName} component={SettingsHome} options={{header: () => null, tabBarIcon: () => (<Image source={require("./../assets/profile5.png")} style={{width: 25, height: 25, top:3, backgroundColor: Colors.primary}} />),name: () => null}} />

//         </Tab.Navigator>

//     );
// }

// export default Home;