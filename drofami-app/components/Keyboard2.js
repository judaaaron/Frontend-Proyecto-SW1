import React from "react";


import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";


const offset = (Platform.OS === 'android') ? -500 : 0;

const Keyboard2 = ({ children }) => {
    return (
        
            <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {children}
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        
    );
}

export default Keyboard2;