import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
export default class Logo extends Component {
  render() {
    return (<Image source={require('../images/logo.png')} style={styles.imageDesign}/>);
  }
}

styles = StyleSheet.create({
  imageDesign: {
    width: 300,
    height: 260
  }
});
