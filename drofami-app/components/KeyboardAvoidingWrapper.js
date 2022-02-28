import React from "react";


import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";


const offset = (Platform.OS === 'android') ? -500 : 64;

const KeyboardAvoidingWrapper = ({ children }) => {
    return (
        
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={offset}>
                <ScrollView >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {children}
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        
    );
}

export default KeyboardAvoidingWrapper;