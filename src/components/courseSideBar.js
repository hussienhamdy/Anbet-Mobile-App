import React, {Component} from 'react';
import {Content, Icon, Text, List, ListItem} from 'native-base';
import {View, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';

class CourseSideBar extends Component {

  goToScreen=(screen)=>
  {
    if(this.props.navigation.state.key!=screen)
    {
    const navigateAction = NavigationActions.navigate({routeName: screen});
    this
      .props
      .navigation
      .dispatch(navigateAction);
    }
  }

  render() {
    return (
      <Content style={{
        backgroundColor: 'white'
      }}>
        <List style={{alignSelf:'flex-end'}}>
          <ListItem>
            <TouchableOpacity
              style={{
              padding: 3
            }}
              onPress={() => this.goToScreen('CourseHome')}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>الصفحة الرئيسية</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToScreen('Meetings')}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>التفاعلات</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToScreen('Missions')}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>المهمات</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
            onPress={() => this.goToScreen('Questions')}
              style={{
              flexDirection: 'row',
              padding: 3
            }}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>الاسئلة</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
            onPress={() => this.goToScreen('References')}
              style={{
              flexDirection: 'row',
              padding: 3
            }}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>مصادر</Text>
            </TouchableOpacity>
          </ListItem>

          <ListItem>
            <TouchableOpacity
              style={{
              flexDirection: 'row',
              padding: 3
            }}
              onPress={() => this.goToScreen('AboutUs')}>
              <Text
                style={{
                paddingStart: 10,
                fontSize: 20
              }}>عن أنبت</Text>
            </TouchableOpacity>
          </ListItem>
        </List>
      </Content>
    );
  }
}
export default CourseSideBar;
