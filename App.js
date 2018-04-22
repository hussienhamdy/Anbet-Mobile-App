import React, {Component} from 'react';
import {persistStore} from 'redux-persist';
import {View, StatusBar,Text, AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import RootStack from './src/navigators/rootRouter';
import store from './src/store';
import { MenuProvider } from 'react-native-popup-menu';

let persistor = persistStore(store);

export default class App extends React.Component {
    render() {
        return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{backgroundColor:'gray',flex:1}}>
          <StatusBar
          backgroundColor="#1A237E"
          barStyle="dark-content"/>
          <MenuProvider>
          <RootStack/>
          </MenuProvider>
        </View>
      </PersistGate>
    </Provider>
        );
    }
};
