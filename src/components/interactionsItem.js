import React, { Component } from 'react';
import { Text,Card, Icon,CardItem,Right,Left,H3} from 'native-base';
import Hyperlink from 'react-native-hyperlink';
export default class InteractionsItem extends Component {
    renderImage()
    {
        if(this.props.item.completed==1){
          return(
              <Icon style= {{color:'green'}} name='checkmark-circle' />
          );
        }
        else if (this.props.item.completed==0){
          return(
              <Icon style= {{color:'red'}} name='radio-button-off' />
          );
        }
        else{
          return null;
        }
    }

  render() {
    return (
      <Card>
        <CardItem>
          {this.renderImage()}
          <Text style={{fontSize:15,right:7,position:'absolute'}}>
          {this.props.item.name}
          </Text>
        </CardItem>
      </Card>
    );
  }
}
