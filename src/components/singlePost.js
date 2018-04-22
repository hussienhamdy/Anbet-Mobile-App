import React, { Component } from 'react';
import {View,Image,ScrollView,FlatList,TouchableOpacity,StyleSheet,WebView,Modal} from 'react-native';
import { Icon,List,ListItem,Text,Item,Input,Card,Container,Content,CardItem,Right,Left,H3,Label} from 'native-base';
import SingleReply from '../components/singleReply';
import HTMLView from 'react-native-htmlview';
import {connect} from 'react-redux';
import Spinner from '../components/spinner';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';

class SinglePost extends Component {
state={replies:[],flag:false,text:'view replies',subject:'',msg:'',modalVisible: false,loading:false,errorFlag:false};

  componentDidMount()
  {
    this.setState({replies:this.props.item.replies});
  }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }


setFlag()
{
  if(this.state.flag==true)
  {
    var f=false;
    this.setState({flag:f});
  }
  else
  {
    var f=true;
    this.setState({flag:f});
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

    onSuccess(obj)
    {
      this.setState({loading:false})
      this.setState({modalVisible:false})
      this.setState({subject:''})
      this.setState({msg:''})
      var arr = this.state.replies;
      arr.push(obj);
      this.setState({replies:arr});
    }

    addNewPost()
    {
      if(this.state.subject.length!=0 && this.state.msg.length!=0)
      {
        this.setState({errorFlag:false})
        this.setState({loading:true})
        var uToken = this.props.user.userToken;
        var postID=this.props.item.comment.id;
        var subject = this.state.subject;
        var msg = this.state.msg;
        var comment = {userfullname:this.props.user.fullName,message:msg,userpictureurl:this.props.user.profilePic};
        axios.get(UrlUtils.addNewPost(uToken,postID,subject,msg))
          .then((response) =>this.onSuccess(comment))
          .catch((error)=> {this.renderError()});
      }
      else {
          this.setState({errorFlag:true})
      }
    }

    hideModal()
    {
      this.setModalVisible(false)
      this.setState({errorFlag:false})
      this.setState({subject:''});
      this.setState({msg:''});
      this.setState({loading:false})
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


renderReplies()
{
  if(this.state.flag==true)
  {
    return(
      <View>
        {this.renderModal()}
        <List dataArray={this.state.replies}
        renderRow={(item) =>
        <ListItem>
          <SingleReply item={item} />
        </ListItem>
      }>
      </List>
      <View style={{marginTop:10,padding:10,backgroundColor:'green',alignSelf:'center'}}>
        <Text style={{color:'#FFFFFF'}} onPress={()=>this.setModalVisible(true)}>اضافة تعليق</Text>
      </View>
      </View>
    );
  }
  else {
    return null;
  }
}

  render() {
    return (
            <View style ={{flex:1,flexDirection:'column'}}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={{uri:this.props.item.comment.userpictureurl}}
                style={{width:80 , height:80, justifyContent:'flex-start'}} />
              <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
              {this.props.item.comment.userfullname}
              </Text>
              </View>
              <HTMLView value={this.props.item.comment.message}/>
            <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity onPress={()=>this.setFlag()}>
              <Icon style= {{color:'green'}} name='add-circle' />
            </TouchableOpacity>
            </View>
            {this.renderReplies()}
            </View>
    );
  }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps)(SinglePost);
