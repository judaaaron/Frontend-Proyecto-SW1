import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from 'react-native';//agregado
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';//agregado
import {
    StyledContainer,
    InnerContainer,
    PageLog,
    PageTitle,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    ButtonText,
    StyledButton,
    Colors,
    ExtraView,
    ExtraText,
    TextLinkContent,
    TextLink,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "../components/styles";


const Home = () => {
    return (
        <>
            
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLog
                    source={require("../assets/drofamilogo1.jpg")}
                    resizeMode="cover"
                />
                
                    <PageTitle>Productos</PageTitle>
                    <Subtitle>Ancalmo</Subtitle>
                    <Avatar resizeMode="cover" source={require("../assets/azul.png")} />
                   <Subtitle>Hessel</Subtitle>
                    <Avatar resizeMode="cover" source={require("../assets/hessel1.png")} />

                
            </InnerContainer>
            </StyledContainer>
        </>
        /*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!!</Text>
        </View>*/
        
    );
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default Home;{
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Settings') {
              return (
                <Ionicons
                  name={focused ? 'ios-list-box' : 'ios-list'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ tabBarBadge: 3 }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    /* <Button onPress={() => setOpenModal(!openModal)}>
              <Text>Holaa</Text>
          </Button>
          <Modal visible={openModal} onDismiss={() => setOpenModal(false)}>
              <Text>Hola Hola Holaaaa</Text>
          </Modal> */
}