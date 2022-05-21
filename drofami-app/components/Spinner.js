import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
export default function Spinner(props) {
    return(
        <View style={[StyleSheet.absoluteFillObject, styles.spinnercontent]}>
            {/* <AnimatedLottieView source={require('../assets/loader.json')} autoPlay />  */}
            <ActivityIndicator size={props.size ? props.size : 100} 
            color={props.color ? props.color :'blue'} />
            <Text>
                {props.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    spinnercontent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    },
})