import React, { Component } from 'react';
import { Card, H3,CardItem} from 'native-base';
import {View,Image} from 'react-native';
export default class CourseListItem extends Component {
  render() {
    return (
          <Card >
            <CardItem style={{flexDirection:'column'}}>
              <Image
                source={require('../images/logo.png')}
                style={{width:150 , height:120, justifyContent:'center',alignItems:'center'}} />
              <H3 style={{marginTop:10,paddingStart:15,flex:1,flexWrap:'wrap',justifyContent:'center'}}>
                  {this.props.item.fullname}
              </H3>
            </CardItem>
          </Card>
    );
  }
}
