import React, {Component} from 'react';
import {Header,Body,Right,Button,Icon,Title,Left} from 'native-base';
import {Text, View} from 'react-native';
import {Menu,MenuOptions,MenuOption,MenuTrigger,renderers} from 'react-native-popup-menu';
import { NavigationActions } from 'react-navigation';
import {deleteUser} from '../actions/index';
import {connect} from 'react-redux';
const { Popover } = renderers;

class HeaderLeft extends Component {

  logOut=()=>
  {
    this.props.deleteUser()
    const resetAction = NavigationActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'Login' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  goToMyCourses=()=>
  {
    const resetAction = NavigationActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({ routeName: 'MyCourses' })]
    });
    this.props.navigation.dispatch(resetAction);
  }


  render() {
    return (
          <View style={{flexDirection:'row'}}>
            <Menu ref={(r)=>this.menu=r} renderer={Popover} rendererProps={{ placement: 'bottom' }}>
              <MenuTrigger triggerOuterWrapper>
              <Button transparent onPress={()=>{this.menu.open()}} >
                <Icon name='person' style ={{color: '#9C27B0'}}/>
              </Button>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value={1}>
                  <Text onPress={()=>this.logOut()}>تسجيل الخروج</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          <Button transparent onPress={()=>this.goToMyCourses()}>
              <Icon name='home' style ={{color: '#9C27B0'}}/>
          </Button>
        </View>
    );
  }
}
const mapStateToProps = state=>{
  return {
    user:state.auth.user
  };
};
export default connect(mapStateToProps,{deleteUser})(HeaderLeft);
