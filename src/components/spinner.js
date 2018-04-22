import React, {Component} from 'react';
import {Image, StyleSheet,ActivityIndicator,View} from 'react-native';

export default class Spinner extends Component {
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    );
  }
}
