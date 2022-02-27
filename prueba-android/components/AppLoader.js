import React from 'react';
import { View, StyleSheet} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const AppLoader = () =>{
    return(

        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AnimatedLottieView source={require('../assets/loader.json')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1,
    }
})

export default AppLoader;

