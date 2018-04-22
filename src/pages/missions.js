import React, {Component} from 'react';
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';
import {Content,H2,H3,Container} from 'native-base';
import {Text,View,FlatList,TouchableOpacity} from 'react-native';
import DiscussionBoardItem from '../components/discussionBoardItem';
import Spinner from '../components/spinner';
import { NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import AnimatedBar from "react-native-animated-bar";
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';


class Missions extends Component {
  state = {contents:[],loadingFlag:true}

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



      goToPostList=(discussions)=>
      {
        this.props.screenProps.navigate('Posts',{discussion:discussions[0]});
      }

      navigate=(forumID,data)=>
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
                  this.props.screenProps.navigate('Discussion',{id:forumID});
              }
            }
          }
      }

      getTypeOfForum=(item)=>
      {
          if(item.modName=='forum')
          {
            forumID = item.modInstance;
            courseID = this.props.course;
            axios.get(UrlUtils.getCourseForum(courseID))
              .then((response) => this.navigate(forumID,response.data))
              .catch((error)=> {this.renderError()});
          }
      }

  setContents=(contentsData,activitiesData)=>
  {
    var arr=[];
    var content = contentsData[2];
    for( j = 0 ; j < content.modules.length ; j ++ )
    {
        var module = content.modules[j];
        if(module.visible==0)
        {
          continue;
        }
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
        var obj = {name:module.name,completed:state,id:module.id,modName:module.modname,modInstance:module.instance};
        arr.push(obj)
    }
    this.setState({contents:arr})
  }


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

    renderProgress=()=>
    {
      var contents = this.state.contents;
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
          <Container>
          <Content>
          <View style={{alignSelf:'center'}}>
          {this.renderSpinner()}
          </View>
          {this.renderProgress()}
          <FlatList contentContainerStyle={{padding:10}}
            data = {this.state.contents}
            keyExtractor={(x,i)=>i}
            renderItem = { ({item}) =>
            <TouchableOpacity onPress={()=>this.getTypeOfForum(item)}>
            <DiscussionBoardItem item={item} />
            </TouchableOpacity>
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
  export default connect(mapStateToProps)(Missions);
