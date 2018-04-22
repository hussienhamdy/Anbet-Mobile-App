import React, { Component } from 'react';
import { Container,Content,Card,H2, H3} from 'native-base';
import {View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import Spinner from '../components/spinner';
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';
import {connect} from 'react-redux';

class AboutUs extends Component {
  state = {text:'',loadingFlag:true};

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

    setContents=(data)=>
    {
      var content = data[5];
      var description = content.modules[0].description;
      this.setState({text:description});
      this.setState({loadingFlag:false});
    }

    componentDidMount()
    {
        courseID = this.props.course;
          axios.get(UrlUtils.getCourseContents(courseID))
          .then((response) =>this.setContents(response.data))
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

  render() {
    return (
          <Container>
            <Content style={{flex:1}}>
            <View style={{alignSelf:'center'}}>
            {this.renderSpinner()}
            </View>
              <Card>
                <HTMLView value={this.state.text}/>
            </Card>
            </Content>
          </Container>
    );
  }
}
const mapStateToProps = state=>{
  return {
    course:state.crsReducer.courseID
  };
};
export default connect(mapStateToProps)(AboutUs);
