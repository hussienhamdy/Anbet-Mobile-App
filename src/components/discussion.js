import React, { Component } from 'react';
import { Content,Card, H3,CardItem,Left} from 'native-base';
import {ScrollView,View,Image,Text} from 'react-native';
export default class Discussion extends Component {
  render() {
    return (
          <Card>
            <CardItem>
            <View Style={{flexDirection:'column'}}>
              <View style={{flexDirection:'column',padding:10}}>
              <Text style={{fontWeight:'bold'}}>عنوان المناقشه</Text>
              <Text style={{flexWrap:'wrap'}}>{this.props.item.name}</Text>
              </View>

              <View style={{flexDirection:'column',padding:10}}>
              <Text style={{fontWeight:'bold',paddingBottom:5}}>صاحب المناقشه</Text>
                <View style={{flexDirection:'row'}}>
                <Image
                  source={{uri:this.props.item.userpictureurl}}
                  style={{width:80 , height:80}} />
                  <Text style={{flexWrap:'wrap',alignSelf:'center',paddingStart:5}}>{this.props.item.userfullname}</Text>
                </View>
              </View>

              <View style={{flexDirection:'column',padding:10}}>
                <Text style={{fontWeight:'bold'}}>عدد التعليقات</Text>
                <Text>{this.props.item.numreplies+''}</Text>
              </View>
            </View>
            </CardItem>
          </Card>
    );
  }
}
