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
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;
export const StyledContainer = styled.View `
  flex: 1;
  background-color: ${primary};
  padding: 25px
  justify-content: center;
`;

export const InnerContainer = styled.View `
  
  width: 100%;
  align-items: center;
  background-color: ${primary};
  
`;

export const PageLog = styled.Image `
  margin-bottom: 55px;
  width: 360px;
  height: 100px;
  background-color: ${primary};
`;

export const PageTitle = styled.Text `

  font-size: 30px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${brand};
  background-color: ${primary};

  ${(props)=> props.welcome &&`
    font-size :35px;
  `}
`;

export const Subtitle = styled.Text `
  font-size: 18px;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
  background-color: ${primary};

  ${(props)=> props.welcome &&`
  margin-bottom: 5px
  font-weight:normal;  
`}
`;

export const StyledFormArea = styled.View `
  width: 90%;
  background-color: ${primary};
`;

export const StyledTextInput = styled.TextInput `
  background: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 35px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text `
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
  font-weight: bold;
  background-color: ${primary};
`;
export const LeftIcon = styled.View `
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;
export const RightIcon = styled.TouchableOpacity `
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity `
  padding: 15px;
  background-color: ${brand};
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  margin-vertical: 20px;
  height: 60px;
  font-weight: bold;
`;

export const ButtonText = styled.Text `
  color: ${primary};
  font-size: 16px;
  
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
  color: ${brand};
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

  export const WelcomeImage= styled.Image`
    height: 50%
    min-width: 100%
    `;

