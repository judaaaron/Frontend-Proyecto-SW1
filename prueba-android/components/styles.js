import React from 'react';
import styled from 'styled-components'
import { View, Text, Image } from 'react-native'
import Constants from 'expo-constants';


const StatusBarHeight = Constants.StatusBarHeight;
// para colores
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
    teriary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#6D28D9",
    green: "#10B981",
    red: "#EF4444",
};

const { primary, secondary, teriary, darkLight, brand, green, red } = Colors;
export const StyledContainer = styled.View `
flex:1;
background-color :${primary};`


export const InnerContainer = styled.View `
flex:1;
width: 100%;
align-items: center;`;

export const PageLog = styled.Image `
width:250px;
height: 200px`;

export const PageTitle = styled.Text `
font-size: 30px;
text-align: center;
font-weight: bold;
color:${brand};`;