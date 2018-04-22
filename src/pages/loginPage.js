import React, {Component} from 'react';
import {
  Container,
  Center,
  Content,
  Text,
  Card,
  Root,
  CardItem
} from 'native-base';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import {View, Button,StyleSheet,TouchableOpacity} from 'react-native';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import Spinner from '../components/spinner';
import {loginUser,startLoading,setLoginError,setNetworkError} from '../actions/index';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';
class LoginPage extends Component {
  static navigationOptions = {
        header: null
    };

  state = {
    Username: '',
    Password: '',
    text: '',
    errorFlag:false
  };
  componentDidMount()
  {
    if(this.props.user!=null)
    {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MyCourses' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  login(uname,upassword)
  {
    this.props.startLoading();
    axios.get(UrlUtils.getTokenGet(uname, upassword))
    .then(response=>{
      if(response.data.token!=null){
        this.props.loginUser(response.data.token,this.props.navigation);
      }
      else{
        this.props.setLoginError();
      }
    })
    .catch((error)=> {
      this.props.setNetworkError();
    });
  }

  validateLogin() {
    username = this.state.Username;
    password = this.state.Password;
    emptyInput = false;
    if (username.length === 0 || password.length==0)
    {
      this.setState({errorFlag:true});
      this.setState({text:'الرجاء ادخال اسم المستخدم و الكلمة السر'});
    }
    else {
      this.setState({errorFlag:false});
      this.setState({text:''});
      this.login(username,password);
    }
  }

  renderError2()
  {
    if(this.state.errorFlag==true)
    {
      return (
        <View>
          <Text style={{fontSize:20, alignSelf:'center', color:'red'}} >{this.state.text}</Text>
        </View>
      );
    }
    else {
      return null;
    }
  }

  renderError()
  {
    if(this.props.error!='')
    {
      return (
        <View>
          <Text style={{fontSize:20, alignSelf:'center', color:'red'}} >{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton()
  {
    if(this.props.loading)
    {
      return <Spinner/>;
    }
    return (
      <Button
        styles={{marginTop:20}}
        onPress={() => {
          this.validateLogin()
      }}
        color="#512DA8"
        title="تسجيل الدخول"/>
    );
  }

  render() {
    return (
      <Container style={{backgroundColor:'#FFFFFF'}}>
        <Root>
          <Content>
              <View style={{marginTop:10,justifyContent: 'center',alignItems:'center'}}>
                <Logo />
              </View>
              <LoginForm
                value1={this.state.Username}
                onChangeText1={Username => this.setState({Username})}
                value2={this.state.Password}
                onChangeText2={Password => this.setState({Password})}/>
              {this.renderError()}
              {this.renderError2()}
              <View style={{flex:1}}>
              {this.renderButton()}
              </View>
          </Content>
        </Root>
      </Container>
      );
    }
   }
   const mapStateToProps = state=>{
     return {
       error:state.auth.error,
       loading:state.auth.loading,
       user:state.auth.user
     };
   };
   export default connect(mapStateToProps,{loginUser,startLoading,setLoginError,setNetworkError})(LoginPage);
   const styles = StyleSheet.create(
      {
        centerLogo : {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          height: 150
      }
    }
  );
