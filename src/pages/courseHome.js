import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View,Text, Image} from 'react-native';
import {Container, Content, H2} from 'native-base';
import UrlUtils from '../components/UrlUtils';
import Spinner from '../components/spinner';
import axios from 'axios';
import BadgeItem from '../components/badgeItem';
import {connect} from 'react-redux';
import AnimatedBar from "react-native-animated-bar";
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';
import NavigationActions from 'react-navigation';

class CourseHome extends Component {
     state = {
          badges: [],
          loadingFlag:true,
          json: "",
          error: "",
      };

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
      userID = this.props.user.userID
      axios.get(UrlUtils.getUserBadges(userID))
        .then((response) => this.setState({badges: response.data.badges,loadingFlag:false}))
        .catch((error)=> {});
    }

    setBadges=(newBadges)=>
    {
        this.setState({badges: newBadges.data.badges});
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

    renderBadges=()=>
    {
            this.setState({loadingFlag:false});
            return (
                <FlatList
                    contentContainerStyle={{
                    padding: 10
                }}
                    data={this.state.badges}
                    keyExtractor={(item, index) => index}
                    renderItem=
                    { ({item}) => <BadgeItem item={item}/>}/>
            );
    }

    renderProfilePic=()=>
    {
      if(this.props.user!=null)
      {
        return(
          <Image
            source={{uri: this.props.user.profilePic }}
            style={{width:150 , height:150, justifyContent:'center'}} />
        );
      }
      else {
        return null;
      }
    }

    renderUserName=()=>
    {
      if(this.props.user!=null)
      {
        return(
          <Text style={{fontWeight:'bold',flexWrap:'wrap',alignSelf:'center',padding:10}}>
              {this.props.user.fullName}
          </Text>
        );
      }
      else {
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
                <View style ={{alignSelf:'center',marginTop:10,flexDirection:'column'}}>
                  {this.renderProfilePic()}
                  {this.renderUserName()}
                  </View>
                    <H2
                        style={{
                        textAlign: 'center',
                        paddingTop: 10
                    }}>الشارات</H2>
                    <FlatList
                        contentContainerStyle={{
                        padding: 10
                    }}
                        data={this.state.badges}
                        keyExtractor={(item, index) => index}
                        renderItem=
                        { ({item}) => <BadgeItem item={item}/>}/>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      course:state.crsReducer.courseID
    };
};

export default connect(mapStateToProps, null)(CourseHome);
