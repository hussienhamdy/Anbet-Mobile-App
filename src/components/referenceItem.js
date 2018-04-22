import React, { Component } from 'react';
import {Card,CardItem} from 'native-base';
import {View,Text} from 'react-native';

export default class referenceItem extends Component {

  render() {
    return (
      <Card style={{height:50}}>
        <CardItem>
          <View style={{right:7,position:'absolute'}}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>
          {this.props.item.name}
          </Text>
          </View>
        </CardItem>
      </Card>
    );
  }
}
