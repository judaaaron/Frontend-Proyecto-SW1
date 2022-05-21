import * as React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Alert, Linking, Button } from "react-native";
//import * as Linking from 'expo-linking'
import { getUserData, logout } from '../src/login_registerAPI';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";
import { getSupportUrl } from '../src/customer_service';
import {
  Colors,
  ButtonText2,
  StyledButton2,
  Subtitle2,
  RightIcon2

} from "../components/styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';
import { useSelector } from "react-redux";//esta
import { showMessage } from 'react-native-flash-message';

function SettingsHome({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isLoading, setLoading] = useState(true);
  const [isUndefined, setIsUndefined] = useState(false);
  const [formResponse, setFormResponse] = useState({});
  const [token, setToken] = useState(useSelector((state) => state.token.value)); //se agrega
  const [responseLog, setResponseLog] = useState(null);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    username: "",
    address: "",
  });

  React.useEffect(() => {
    async function token() {
      const session = await SecureStore.getItemAsync("user_session");
      token = JSON.parse(session)["token"];
      setToken(token);
    }
    token();
  }, []);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      getUserData(setLoading, token, setFormResponse);
    }
  }, [token, isFocused]);

  React.useEffect(() => {
    if (isEnabled) {
      Alert.alert("Cerrando Sesión", "¿Estás seguro de cerrar sesión?", [
        {
          text: "Cancel",
          onPress: () => setIsEnabled(false),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            SecureStore.deleteItemAsync("user_session").then(
            );
            logout(setLoading, token, setResponseLog);
          }
        },
      ]);

    }
  }, [isEnabled]);

  React.useEffect(() => {
    if (!responseLog) {
      return;
    }
    if (responseLog['status'] && responseLog['status'] == 'success') {
      navigation.navigate(
        "Login",
        showMessage({
          // responseLog['message']
          message: "Sesión cerrada",
          description: "Esperamos verte pronto.",
          type: "info",
        })
      )
    }
  }, [responseLog]);

  React.useEffect(() => {
    if (!formResponse) {
      return;
    }
    if (!formResponse["status"] || formResponse["status"] == "failed") {
      //handle error
      return;
    }
    const obj = { ...state };

    let user = '';
    const cliente = (formResponse["cliente"] ? formResponse["cliente"] : '');
    if (formResponse['cliente']) {
      user = cliente["user"];
    } else {
      user = formResponse['data'];
    }
    obj["address"] = (cliente['address'] ? cliente["address"] : '');
    obj["first_name"] = user["first_name"];
    obj["last_name"] = user["last_name"];
    obj["phone_number"] = user["phone_number"];
    obj["username"] = user["username"];
    setState((state) => ({
      ...obj,
    }));
  }, [formResponse]);

  const URLconSporte = `https://wa.me/50497060482?text=Buen+D%C3%ADa%2C%0ASoy+daniela+de%3A+Fullstack+Drofami%0AQueria+su+ayuda+con+algo.+%F0%9F%98%88%E2%80%8B%E2%80%8B`;
  const [url, setUrl] = useState("");

  React.useEffect(() => {
    if (!url) {
      return;
    }
    console.log(url);
    if (url['url']) {
      console.log('voy ahi')
      followURL(url['url'])
    }
  }, [url]);

  async function followURL(url) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);

    } else {
      Alert.alert(`No se puede contactar con el servicio al cliene en este momento, intente mas tarde`);
    }
  }

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`No se puede contactar con el servicio al cliente en este momento, intente mas tarde.`);
      }
    });

    return <Button title={children} onPress={handlePress} />;
  };

  return (
    <>
      <View flex={1} backgroundColor={Colors.primary}>
        {/* <StyledContainer marginTop={-14}> */}

        <View backgroundColor={Colors.primary} style={{ top: 40 }}>
          <View style={{ alignItems: "center", fontSize: 20 }}>
            <Subtitle2
              style={styles.view3}
              backgroundColor={Colors.primary}
              color={Colors.blue}
            >
              Cuenta
            </Subtitle2>
          </View>

          {/* <ExtraView marginRight={260}> */}
          <View style={{ alignItems: "center", alignContent: "center" }}>
            <Avatar
              size={64}
              rounded
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
              }}
              containerStyle={{
                borderColor: Colors.blue,
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Avatar.Accessory
                size={15}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/929/929440.png",
                }}
              />
            </Avatar>


            <View style={{ alignItems: "center" }}>
              <Text style={{ alignContent: "center" }}>
                {state ? state.first_name + " " + state.last_name : ""}
              </Text>
            </View>
          </View>
          {/* <View>
            <Switch
              trackColor={{ false: Colors.red, true: Colors.blue }}
              thumbColor={isEnabled ? Colors.blue : Colors.secondary}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              marginLeft={250}
              marginTop={-25}
            /></View> */}
          <StyledButton2
            onPress={() => {
              navigation.navigate("OpcionesCuenta");
            }}
          >

            <RightIcon2
              onPress={() => {
                navigation.navigate("OpcionesCuenta")
              }}
            >
              <Icon
                name="settings-applications"
                size={20}
                marginRight={40}
                color={Colors.blue}
              />
            </RightIcon2>
            <ButtonText2>
              Configuración de tu cuenta
              {/* <RightIcon /> */}
            </ButtonText2>
          </StyledButton2>

          {/* </ExtraView> */}
          {/* <ExtraView marginRight={160}> */}

         

      
          {useSelector((state) => state.staff.value) === false ?
            <StyledButton2
              onPress={() => {
                navigation.navigate("SelectEmpresa", { token: token }),
                  console.log(token);
              }}
            >
              <RightIcon2
                onPress={() => {
                  navigation.navigate("SelectEmpresa", { token: token }),
                    console.log(token);
                }}
              >
                <Icon name="business" size={20} color={Colors.blue} />
                {/* <Image source={require("./../assets/empresa3.png")} style={{width:30, height:30}}/> */}
              </RightIcon2>
              <ButtonText2>Selección de Empresa</ButtonText2>
            </StyledButton2>
            :
            null}
          <StyledButton2
            onPress={() => {
              navigation.navigate("HistorialOrden")

            }}
          >
            <RightIcon2
              onPress={() => {
                navigation.navigate("HistorialOrden")

              }}
            >
              <Icon name="history" size={20} color={Colors.blue} />
            </RightIcon2>

            <ButtonText2>Historial de Órdenes</ButtonText2>
          </StyledButton2>
          {useSelector((state) => state.staff.value) === false ?
            <StyledButton2
            onPress={() => {
              console.log("1", token);
              getSupportUrl(setLoading, token, setUrl);
            }}
            >
              <RightIcon2
                onPress={() => {
                  console.log("2", token);
                  getSupportUrl(setLoading, token, setUrl);
                }}
              >
                <Icon name="message" size={20} color={Colors.blue} />
                {/* <Image source={require("./../assets/empresa3.png")} style={{width:30, height:30}}/> */}
              </RightIcon2>
              <ButtonText2
                // onPress={() => {
                //   followURL(getSupportUrl(setLoading, token, setUrl));
                // }}
              >Servicio al Cliente</ButtonText2>
            </StyledButton2>
            :
            null}

          {/* {
            useSelector((state) => state.staff.value) === false ?
              <View>
                <OpenURLButton url={url}>
                  Contactanos
                </OpenURLButton>
              </View>
              : null
          } */}

          {/* </ExtraView> */}
          <StyledButton2
            onPress={() => setIsEnabled(true)}
          >
            <RightIcon2
              onPress={() => setIsEnabled(true)}
            >
              <Icon name="logout" size={20} color={Colors.red} />
            </RightIcon2>
            <ButtonText2 style={{ color: Colors.red }}>Cerrar Sesión</ButtonText2>
          </StyledButton2>
        </View>

        {/* </StyledContainer> */}
      </View>


    </>
  );
}

const styles = StyleSheet.create({
  errores: {
    fontSize: 10,
    color: 'red',
    top: -10,
  },
  spinnercontent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
  },
  view2: {
    backgroundColor: 'white',
  },
  searchContainer: {
    height: 50,
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    top: -10
  },
  view3: {
    alignContent: 'center',
    justifyContent: 'center',

  },
  searchContainer: {
    height: 50,
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    top: -10
  },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
})

export default SettingsHome;