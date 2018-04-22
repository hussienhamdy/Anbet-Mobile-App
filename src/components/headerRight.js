import React, {Component} from 'react';
import {View} from 'react-native';
import {Button,Icon} from 'native-base';
import NavigationActions from 'react-navigation';

export default class HeaderRight extends Component {

  openDrawer=()=>
  {
    this.props.navigation.navigate('DrawerOpen');
  }

  goBack=()=>
  {
    this.props.navigation.goBack();
  }

    renderButton=()=>
    {
      if(this.props.type=='back')
      {
        return(
            <Button
              onPress={()=>this.goBack()}
              transparent>
              <Icon name='arrow-back' style ={{
                color: '#9C27B0'
              }}/>
            </Button>
          );
      }
      else if (this.props.type=='menu')
      {
            return(
                <Button
                  onPress={()=>this.openDrawer()}
                  transparent>
                  <Icon name='menu' style ={{
                    color: '#9C27B0'
                  }}/>
                </Button>
          );
      }
    }

  render() {
    return (
      <View>
      {this.renderButton()}
      </View>
    );
  }
}
