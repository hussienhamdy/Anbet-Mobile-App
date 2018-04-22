import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';
import { Card,Container, CardItem,Right,Left,H3} from 'native-base';
import HTMLView from 'react-native-htmlview';

export default class SingleReply extends Component {
  render() {
    return (
            <View style ={{flex:1,flexDirection:'column'}}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={{uri:this.props.item.userpictureurl}}
                style={{width:50 , height:50, justifyContent:'flex-start'}} />
              <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
                  {this.props.item.userfullname}
              </Text>
              </View>
            <HTMLView value={this.props.item.message}/>
            </View>
    );
  }
}
