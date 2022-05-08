import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from "react-native";
import { getUserData, logout } from '../src/login_registerAPI';
import * as SecureStore from 'expo-secure-store';
import { useIsFocused } from "@react-navigation/native";
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

export default function SettingsHome({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isLoading, setLoading] = useState(false);
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
          message:"Sesión cerrada",
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
              navigation.navigate("profileModification", {
                usuario: state["username"],
                apellido: state["last_name"],
                nombre: state["first_name"],
                address: state["address"],
                phone: state["phone_number"],
              });
            }}
          >

            <RightIcon2
              onPress={() => {
                navigation.navigate("profileModification", {
                  usuario: state["username"],
                  apellido: state["last_name"],
                  nombre: state["first_name"],
                  address: state["address"],
                  phone: state["phone_number"],
                });
              }}
            >
              <Icon
                name="edit"
                size={20}
                marginRight={40}
                color={Colors.blue}
              />
            </RightIcon2>
            <ButtonText2>
              Editar perfil
              {/* <RightIcon /> */}
            </ButtonText2>
          </StyledButton2>

          {/* </ExtraView> */}
          {/* <ExtraView marginRight={160}> */}

          <StyledButton2
            onPress={() => {
              navigation.navigate("ChangeEmailScreen", { token: token }),
                console.log(token);
            }}
          >
            <RightIcon2
              onPress={() => {
                navigation.navigate("ChangeEmailScreen", { token: token }),
                  console.log(token);
              }}
            >
              <Icon name="edit" size={20} color={Colors.blue} />
            </RightIcon2>

            <ButtonText2>Cambiar correo electrónico</ButtonText2>
          </StyledButton2>
          {/* </ExtraView> */}
          {/* <ExtraView marginRight={205}> */}
          <StyledButton2
            onPress={() => {
              navigation.navigate("ChangePasswordScreen", { token: token }),
                console.log(token);
            }}
          >
            <RightIcon2
              onPress={() => {
                navigation.navigate("ChangePasswordScreen", { token: token }),
                  console.log(token);
              }}
            >
              <Icon name="edit" size={20} color={Colors.blue} />
            </RightIcon2>
            <ButtonText2>Cambiar contraseña</ButtonText2>
          </StyledButton2>
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
            <ButtonText2>Selección de empresa</ButtonText2>
          </StyledButton2>
          :
          null}
          {/* </ExtraView> */}
          <StyledButton2
            onPress={()=> setIsEnabled(true)}
          >
            <RightIcon2
              onPress={()=> setIsEnabled(true)}
            >
              <Icon name="logout" size={20} color={Colors.red} />
            </RightIcon2>
            <ButtonText2 style={{color: Colors.red}}>Cerrar Sesión</ButtonText2>
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

})