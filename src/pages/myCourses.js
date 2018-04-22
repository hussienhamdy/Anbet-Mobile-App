import React, {Component} from 'react';
import {FlatList,TouchableOpacity,View} from 'react-native';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import CourseListItem from '../components/courseListItem';
import {connect} from 'react-redux';
import Spinner from '../components/spinner';
import {Center,Container,H3,Drawer} from 'native-base';
import {saveCourseID} from '../actions/index';

class MyCourses extends Component {

    static navigationOptions = {
      headerStyle: {
        backgroundColor:'#64DD17'
      },
      title: 'مجموعات',
      headerTintColor:'#9C27B0',
      tintColor:'#9C27B0'
    };

      goToCourseEntry=(courseID)=>
      {
        this.props.saveCourseID(courseID);
        this.props.navigation.navigate('Drawer');
      }

      state = { courses:[] };

      renderSpinner=()=>
      {
        if(this.state.courses.length==0)
        {
            return <Spinner/>;
        }
        else
        {
            return null;
        }
      }

      componentDidMount()
      {
        axios.get(UrlUtils.getUserCourses(this.props.user.userID))
          .then((response) => this.setState({courses :response.data}))
          .catch((error)=> {});
      }

      render() {
        return (
      <Container>
      <View style={{alignSelf:'center'}}>
      {this.renderSpinner()}
      </View>
      <FlatList style={{padding:10}}
        data = {this.state.courses}
        keyExtractor={(x,i)=>i.toString()}
        renderItem = { ({item}) =>
        <TouchableOpacity onPress={()=>this.goToCourseEntry(item.id)}>
        <CourseListItem item={item} />
        </TouchableOpacity>
      }/>
    </Container>
        );
      }
  }
  const mapStateToProps = state=>{
    return {
      user:state.auth.user
    };
  };
  export default connect(mapStateToProps,{saveCourseID})(MyCourses);
