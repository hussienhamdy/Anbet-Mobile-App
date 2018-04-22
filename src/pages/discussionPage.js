import React, {Component} from 'react';
import {FlatList,TouchableOpacity,View,Modal,TextInput} from 'react-native';
import SinglePost from '../components/singlePost';
import {H3,Content,Container,Input, Item,Text,Icon,Button,Right,Left,Label} from 'native-base';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import Discussion from '../components/discussion';
import Spinner from '../components/spinner';
import {connect} from 'react-redux';
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';

      class DiscussionPage extends Component {
      state={discussions:[],subject:'',msg:'',loadingFlag:true,modalVisible: false,loading:false,errorFlag:false};

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

      setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
      }

      hideModal=()=>
      {
        this.setModalVisible(false);
        this.setState({errorFlag:false});
        this.setState({loading:false});
        this.setState({subject:''});
        this.setState({msg:''});
      }

      renderError=()=>
      {
        if(this.state.errorFlag==true)
        {
          return(<Text style={{color:'red'}}>الرجاء ادخال الموضوع و الرسالة</Text>);
        }
        else {
          return null;
        }
      }

  renderButton=()=>
  {
    if(this.state.loading==true)
    {
        return (<Spinner/>);
    }
    else if (this.state.loading==false)
    {
      return(
        <View style={{marginTop:10,padding:10,backgroundColor:'green'}} >
          <Text style={{color:'#FFFFFF'}} onPress={()=>this.addNewDiscussion()}>اضافة</Text>
        </View>
      );
    }
  }

  onAddSuccess=(id)=>
  {
    var subject = this.state.subject;
    var msg = this.state.msg;
    var name = subject;
    var userpictureurl = this.props.user.profilePic;
    var userfullname = this.props.user.fullName;
    var numreplies = 0;
    var obj = {discussion:id, message:msg,
      name:name, userfullname:userfullname,
      numreplies:numreplies, userpictureurl:userpictureurl};
    var arr = this.state.discussions;
    arr.push(obj);
    this.setState({discussions:arr});
    this.setState({loading:false})
    this.setState({modalVisible:false})
    this.setState({subject:''})
    this.setState({msg:''})
  }

      renderModal=()=>
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

      onGetSuccess=(data)=>
      {
        this.setState({loadingFlag:false})
        this.setState({discussions :data})
      }

      componentDidMount()
      {
        forumID = this.props.navigation.state.params.id;
        axios.get(UrlUtils.getActivityDiscussions(forumID))
          .then((response) => this.onGetSuccess(response.data.discussions))
          .catch((error)=> {this.renderError()});
      }

        renderSpinner=()=>
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

      addNewDiscussion=()=>
      {
        if(this.state.subject.length!=0 && this.state.msg.length!=0)
        {
          this.setState({errorFlag:false})
          this.setState({loading:true})
          var uToken = this.props.user.userToken;
          var forumID = this.props.navigation.state.params.id;
          var subject = this.state.subject;
          var msg = this.state.msg;
          axios.get(UrlUtils.addNewDiscussion(uToken,forumID,subject,msg))
            .then((response) =>this.onAddSuccess(response.data.discussionid))
            .catch((error)=> {this.renderError()});
        }
        else {
            this.setState({errorFlag:true})
        }
      }

      goToPosts=(item)=>
      {
          this.props.navigation.navigate('Posts',{discussion:item});
      }

      render() {
        return (
              <View style={{flex:1,flexDirection:'column'}}>
              <Content>
              <View style={{alignSelf:'center'}}>
              {this.renderSpinner()}
              {this.renderModal()}
              </View>
              <FlatList contentContainerStyle={{padding:10}}
                data = {this.state.discussions}
                keyExtractor={(x,i)=>i}
                renderItem = { ({item}) =>
                <TouchableOpacity onPress={()=>this.goToPosts(item)}>
                  <Discussion item={item}/>
                </TouchableOpacity>
              }/>
              <View style={{padding:10,marginBottom:10,backgroundColor:'green',alignSelf:'center'}}  >
                <Text style={{color:'#FFFFFF'}} onPress={()=>this.setModalVisible(true)} > اضافة مناقشة</Text>
              </View>
              </Content>
              </View>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps)(DiscussionPage);
