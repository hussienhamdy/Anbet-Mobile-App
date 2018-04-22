import React, {Component} from 'react';
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';
import {Content,H2,H3,Container} from 'native-base';
import {Text,View,FlatList,TouchableOpacity} from 'react-native';
import MeetingItem from '../components/meetingItem';
import Spinner from '../components/spinner';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import AnimatedBar from "react-native-animated-bar";
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';

class Meetings extends Component {
  state = {contents:[]}

    static navigationOptions = ({ navigation,screenProps }) =>({
        headerStyle: {
          backgroundColor:'#64DD17'
        },
        headerTitle: 'أنبت',
        headerTintColor:'#9C27B0',
        tintColor:'#9C27B0',
        headerLeft:<HeaderLeft navigation = {screenProps}/>,
        headerRight:<HeaderRight navigation={screenProps} type={'menu'}/>
    });


      componentDidMount()
      {
        courseID = this.props.course;
        userID=this.props.user.userID;
        axios.all([
        axios.get(UrlUtils.getCourseContents(courseID)),
        axios.get(UrlUtils.getActivitiesCompletionStatus(courseID,userID))
      ])
      .then(axios.spread((contentsRes,activitiesRes) => {
        this.setContents(contentsRes.data,activitiesRes.data.statuses);
      }));
      }

    setContents=(contentsData,activitiesData)=>
    {
        var arr=[];
        var content = contentsData[1];
        for( i = 0 ; i < content.modules.length ; i ++ )
        {
            var module = content.modules[i];
            if(module.visible==0)
            {
              continue;
            }
            if(module.modname=='label')
            {
              var list=[];
              var temp=module;
              var j=i+1;
              while(j<content.modules.length && content.modules[j].modname!='label')
              {
                list.push(content.modules[j]);
                j=j+1;
              }
              var obj = {meeting:temp,contents:list};
              arr.push(obj);
              i=j-1;
            }
        }

        var arr2=[];
        for(i=0;i<arr.length;i++)
        {
          var m = arr[i].meeting;
          var list=[];
          for(j=0;j<arr[i].contents.length;j++)
          {
            var module = arr[i].contents[j];
            var state = -1; // for activities like announcements that have no progress
            for( z = 0 ; z < activitiesData.length ; z ++ )
            {
              var status = activitiesData[z];
              if(module.id==status.cmid)
              {
                  state=status.state;
                  break;
              }
            }
            if(module.modname=='url')
            {
              var obj1 = {name:module.contents[0].fileurl,completed:state,id:module.id,modName:module.modname,modInstance:module.instance};
                list.push(obj1);
            }
            else {
              var obj1 = {name:module.name,completed:state,id:module.id,modName:module.modname,modInstance:module.instance};
                list.push(obj1);
            }
          }
          var obj2 ={meeting:m,contents:list};
          arr2.push(obj2);
        }
      this.setState({contents:arr2})
    }

  renderSpinner=()=>
  {
    if(this.state.contents.length==0)
    {
        return <Spinner/>;
    }
    else
    {
        return null;
    }
  }

      render() {
        return (
          <Container>
          <Content>
          <View style={{alignSelf:'center'}}>
          {this.renderSpinner()}
          </View>
          <FlatList contentContainerStyle={{padding:10}}
            data = {this.state.contents}
            keyExtractor={(x,i)=>i}
            renderItem = { ({item}) =>
            <MeetingItem   navigation={this.props.screenProps}  id={this.props.course}  item={item} />
          }/>
          </Content>
          </Container>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user,
      course:state.crsReducer.courseID
    };
  };
  export default connect(mapStateToProps)(Meetings);
