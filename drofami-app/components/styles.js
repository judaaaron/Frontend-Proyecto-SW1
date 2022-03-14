import React from "react";
import styled from "styled-components";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.StatusBarHeight;
// para colores
export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  light: "#FAF9F9",
  blue: '#002AA2',
  lightblue: '#0E84E0',
  white: '#FFFFFF'
};

const { primary, secondary, tertiary, darkLight, brand, green, red, blue, lightblue, white } = Colors;
export const StyledContainer = styled.View`
  flex: 1;
  padding: 10px;
  margin-bottom: 30px;
  background-color: ${primary};
`;

export const StyledContainer2 = styled.View`
  flex: 1;
  padding: 10px;
  top:-150;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`

  width: 100%;
  height:100%;
  align-items: center;
  top: -0px;
  
  background-color: ${primary};
  
`;


export const InnerContainer2 = styled.View`
  align-items: center;
  background-color: ${primary};
  margin-top:45;
  
`;

export const PageLog = styled.Image`
  
  width: 360px;
  height: 100px;
  
`;

export const PageTitle = styled.Text`

  font-size: 30px;
  text-align: center;
  
  margin-bottom: 5px;
  color: ${blue};
  

  ${(props) => props.welcome && `
    font-size :35px;
  `}
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  background-color: ${primary};

  ${(props) => props.welcome && `
  margin-bottom: 5px
  font-weight:normal;  
`}
`;

export const Subtitle2 = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${blue};
  background-color: ${primary};

  ${(props) => props.welcome && `
  margin-bottom: 5px
  font-weight:normal;  
`}
`;

export const StyledFormArea = styled.View`
  width: 95%;
  background-color: ${primary};
`;


export const StyledFormArea2 = styled.View`
  width: 95%;
  height:95%;
  background-color: ${primary};
`;
export const StyledTextInput = styled.TextInput`
  background: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 35px;
  font-size: 16px;
  height: 52px;
  margin-vertical: 3px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  font-weight: bold;
  background-color: ${primary};
`;
export const LeftIcon = styled.View`
  left: 15px;
  top: 28px;
  position: absolute;
  z-index: 1;
`;
export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;



export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${blue};
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin-vertical: 20px;
  height: 60px;
  font-weight: bold;
  shadowOpacity: 0.8;
  shadowRadius: 8px;
 
`;


export const StyledButton2 = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${primary};
  border-radius: 35px;
  font-weight: bold;
 
`;
export const StyledButtonMod = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${lightblue};
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin-vertical: 20px;
  height: 60px;
  font-weight: bold;
  shadowRadius: 8px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
 
  
`;
export const ButtonText2 = styled.Text`
  color: ${blue};
  font-size: 18px;
  
`;
export const RightIcon2 = styled.TouchableOpacity`
  right: 15px;
  top: 15px;
  position: absolute;
  z-index: 1;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: ${primary};
  `;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
  background-color: ${primary};
  `;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${primary};
  `;

export const TextLinkContent = styled.Text`
  color: ${blue};
  font-size: 15px;
  background-color: ${primary};
  `;


export const WelcomeContainer = styled(InnerContainer)`
  padding; 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px
  height: 100px;
  margin: auto;
  border-radius: 50px
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
  `;

export const WelcomeImage = styled.Image`
    height: 50%
    min-width: 100%
    `;

export const spinner = styled.View`
   background-color: ${primary};
   position: 'absolute';
   left: 0;
   right: 0;
   top: 0;
   bottom: 0;
   alignItems: 'center';
   justifyContent: 'center;
   
   `;

