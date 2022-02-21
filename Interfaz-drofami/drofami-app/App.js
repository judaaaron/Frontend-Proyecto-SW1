import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
// import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
// import ButtonGradient from './components/ButtontGradiente';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import DrofamiApp from './app/index';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }


  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/logoD.jpg'),require('./assets/fondo.jpg')]);

    await Promise.all([...imageAssets]);
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <DrofamiApp/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

  //   mainContainer: {
  //     backgroundColor: '#1292BA',
  //     flex: 1,

  //   },
  //   container: {

  //     alignItems: 'center',
  //     justifyContent: 'center',

  //   },

  //   containerImage: {
  //     flex: 2,
  //     justifyContent: 'flex-start',
  //     alignItems: 'center',

  //   },

  //   titulo: {
  //     fontSize: 35,
  //     color: '#FAFAFA',
  //     fontFamily: 'condensed bold',
  //     fontWeight: 'bold',
  //   },
  //   subTitle: {
  //     fontSize: 20,
  //     color: '#FAFAFA',
  //   },
  //   textInput: {
  //     padding: 10,
  //     paddingStart: 21,
  //     width: '80%',
  //     height: 45,
  //     borderColor: 'gray',
  //     marginTop: 20,
  //     borderRadius: 30,
  //     backgroundColor: '#fff',
  //   }
});
