import React, { Component } from 'react';
import {View,Text,FlatList,TouchableOpacity} from 'react-native';
import { Card, Icon,CardItem,Right,Left,H3} from 'native-base';
import InteractionsItem from '../components/interactionsItem';
import AnimatedBar from "react-native-animated-bar";
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';

export default class MeetingItem extends Component {

    goToPostList(discussions)
    {
      this.props.navigation.navigate('Posts',{discussion:discussions[0]});
    }
      navigate(forumID,data)
      {
        for(i=0;i<data.length;i++)
        {
          if(forumID==data[i].id)
          {
            if(data[i].type=='single')
            {
              axios.get(UrlUtils.getActivityDiscussions(forumID))
                .then((response) => this.goToPostList(response.data.discussions))
                .catch((error)=> {this.renderError()});
            }
            else if (data[i].type=='general')
            {
                this.props.navigation.navigate('Discussion',{id:forumID});
            }
          }
        }
      }
      getTypeOfForum(item)
      {
        if(item.modName=='forum')
        {
          forumID = item.modInstance;
          axios.get(UrlUtils.getCourseForum(this.props.id))
            .then((response) => this.navigate(forumID,response.data))
            .catch((error)=> {this.renderError()});
        }
      }
      renderProgress()
      {
        var contents = this.props.item.contents;
        if(contents.length!=0)
        {
            var count = 0 ;
            for( i = 0 ; i < contents.length; i ++)
            {
              if (contents[i].completed!=0)
              {
                count++;
              }
            }
            var progress = Math.round( (count/contents.length) * 10 ) / 10;
            return(
              <View style={{padding:10}}>
              <Text style={{fontWeight:'bold'}}>معدل التقدم</Text>
                 <AnimatedBar
                 progress={progress}
                 height={null}
                 borderColor="#FFFFFF"
                 barColor="#03A9F4"
                 borderRadius={5}
                 borderWidth={3}>
                   <Text style={{textAlign:'center',color:'#FFFFFF'}}>{(progress*100)+'%'}</Text>
               </AnimatedBar>
               </View>
             );
        }
      }

  render() {
    return (
      <View>
      <Text style={{fontWeight:'bold'}}>{this.props.item.meeting.name}</Text>
      {this.renderProgress()}
      <FlatList contentContainerStyle={{padding:10}}
        data = {this.props.item.contents}
        keyExtractor={(x,i)=>i}
        renderItem = { ({item}) =>
        <TouchableOpacity onPress={()=>this.getTypeOfForum(item)}>
        <InteractionsItem item={item} />
        </TouchableOpacity>
      }/>
      </View>
    );
  }
}
