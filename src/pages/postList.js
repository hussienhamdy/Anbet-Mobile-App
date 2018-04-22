import React, {Component} from 'react';
import {FlatList,Modal,TouchableOpacity,View,Image,TextInput} from 'react-native';
import SinglePost from '../components/singlePost';
import {Content,List,Label,ListItem,Container,Input, Item,Text,Button,Right,Left,Icon} from 'native-base';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import Spinner from '../components/spinner';
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';

    class PostList extends Component {
    state={posts:[],subject:'',msg:'',modalVisible: false,loading:false,newPost:null,errorFlag:false,loadingFlag:true,parentID:null};

    static navigationOptions = ({ navigation }) =>({
      headerStyle: {
        backgroundColor:'#64DD17'
      },
        headerTitle: 'أنبت',
        headerTintColor:'#9C27B0',
        tintColor:'#9C27B0',
        headerLeft:<HeaderLeft navigation={navigation}/>,
        headerRight:<HeaderRight navigation={navigation} type={'back'}/>
    });
        setModalVisible(visible) {
          this.setState({modalVisible: visible});
        }

        hideModal()
        {
          this.setModalVisible(false)
          this.setState({errorFlag:false})
          this.setState({loading:false})
          this.setState({subject:''});
          this.setState({msg:''});
        }

        renderError()
        {
          if(this.state.errorFlag==true)
          {
            return(<Text style={{color:'red'}}>الرجاء ادخال الموضوع و الرسالة</Text>);
          }
          else {
            return null;
          }
        }

    renderButton()
    {
      if(this.state.loading==true)
      {
          return (<Spinner/>);
      }
      else if (this.state.loading==false)
      {
          return(
            <View style={{marginTop:10,padding:10,backgroundColor:'green',alignSelf:'center'}}>
              <Text style={{color:'#FFFFFF'}} onPress={()=>this.addNewPost()}>اضافة</Text>
            </View>
          );
      }
    }

    onSuccess(id)
    {
      var subject = this.state.subject;
      var msg = this.state.msg;
      var userfullname = this.props.user.fullName;
      var userpictureurl = this.props.user.profilePic;
      var comment = {id:id,userfullname:userfullname,message:msg,userpictureurl};
      var obj={comment:comment,replies:[]};
      var arr = this.state.posts;
      arr.push(obj);
      this.setState({posts:arr});
      this.setState({loading:false});
      this.setState({modalVisible:false});
      this.setState({subject:''});
      this.setState({msg:''});
    }


    addNewPost()
    {
      if(this.state.subject.length!=0 && this.state.msg.length!=0)
      {
        this.setState({errorFlag:false})
        this.setState({loading:true})
        var uToken = this.props.user.userToken;
        var postID=this.state.parentID;
        var subject = this.state.subject;
        var msg = this.state.msg;
        axios.get(UrlUtils.addNewPost(uToken,postID,subject,msg))
          .then((response) =>this.onSuccess(response.data.postid))
          .catch((error)=> {this.renderError()});
      }
      else
      {
          this.setState({errorFlag:true})
      }
    }

    renderSpinner()
    {
      if(this.state.loadingFlag==true)
      {
          return <Spinner/>;
      }
      else
      {
          return null;
      }
    }

    renderModal()
    {
      return(
        <Modal transparent={true} visible={this.state.modalVisible}>
          <View style={{marginTop:20,flexDirection:'column',flex:1,backgroundColor:'#FFFFFF'}}>
          <TextInput
          style={{flexWrap:'wrap',height: 40, borderColor: 'gray', borderWidth: 1}}
          multiline={true}
          placeholder={'الموضوع'}
          onChangeText={subject => this.setState({subject})}
          />
          <TextInput
          style={{flexWrap:'wrap',height: 40, borderColor: 'gray', borderWidth: 1}}
          multiline={true}
          placeholder={'الرسالة'}
          onChangeText={msg => this.setState({msg})}
          />
               {this.renderError()}
             <View style={{alignSelf:'center'}} >
               {this.renderButton()}
               <View style={{marginTop:10,padding:10,backgroundColor:'red'}}  >
                 <Text style={{alignSelf:'center',color:'#FFFFFF'}} onPress={()=>this.hideModal()}>الغاء</Text>
               </View>
             </View>
          </View>
        </Modal>
           );
    }

    componentDidMount()
    {
      discussionID = this.props.navigation.state.params.discussion.discussion;
      axios.get(UrlUtils.getDiscussionPosts(discussionID))
        .then((response) => {
          var posts=response.data.posts;
          this.setState({parentID:posts[posts.length-1].id})
          var associatedArray={};
          for(i=0;i<posts.length;i++)
          {
            associatedArray[posts[i].id]=posts[i];
          }

          var comments=[];
          for(i=0;i<posts[posts.length-1].children.length;i++)
          {
            comments.push(associatedArray[posts[posts.length-1].children[i]]);
          }
          comments.reverse();
          var arrayOfComments=[];
          for(i=0;i<comments.length;i++)
          {
                var list=[]//list of replies
            		var stack=[];
            		stack.push(comments[i].id);
            		while(stack.length>0)
            		{
                      var index = stack.pop();
                      if(index!=comments[i].id)
                      {
                			     list.push(associatedArray[index]);
                      }
                      var children = associatedArray[index].children;
                			//all json data
                			for(z=0;z<children.length;z++)
                			{
                					stack.push(children[z]);
                			}
                }
                var obj={comment:comments[i],replies:list};
                arrayOfComments.push(obj);
          }
          this.setState({loadingFlag:false});
          this.setState({posts:arrayOfComments});
        })
        .catch((error)=> this.setState({loadingFlag:false}));
      }

      render() {
        return (
          <Container>
          <Content style={{backgroundColor:'#FFFFFF'}} keyboardShouldPersistTaps={'handled'}>
          {this.renderModal()}
          <View style={{alignSelf:'center'}}>
          {this.renderSpinner()}
          </View>

          <View style ={{padding:10,alignSelf:'center',flexDirection:'column'}}>
            <View style={{flexDirection:'row'}}>
            <Image
              source={{uri:this.props.navigation.state.params.discussion.userpictureurl}}
              style={{width:80 , height:80, justifyContent:'flex-start'}} />
            <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
                {this.props.navigation.state.params.discussion.userfullname}
            </Text>
            </View>
          <HTMLView value={this.props.navigation.state.params.discussion.message}/>
          </View>
            <List dataArray={this.state.posts}
              renderRow={(item) =>
              <ListItem>
                <SinglePost item={item}/>
              </ListItem>
            }>
            </List>
            <View style={{padding:10,backgroundColor:'green',alignSelf:'center'}}  >
              <Text style={{color:'#FFFFFF'}} onPress={()=>this.setModalVisible(true)}> اضافة تعليق</Text>
            </View>
            </Content>
            </Container>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps)(PostList);
