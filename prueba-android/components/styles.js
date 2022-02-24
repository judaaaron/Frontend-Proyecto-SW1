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
`;

export const InnerContainer = styled.View `
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLog = styled.Image `
  width: 250px;
  height: 200px;
`;

export const PageTitle = styled.Text `
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
`;

export const Subtitle = styled.Text `
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View `
  width: 90%;
`;

export const StyledTextInput = styled.TextInput `
  background: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text `
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
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
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
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
  `;

  export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
  `;

  export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  `;

  export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
  `;


