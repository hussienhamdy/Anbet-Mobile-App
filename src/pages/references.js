import React, {Component} from 'react';
import UrlUtils from '../components/UrlUtils';
import axios from 'axios';
import {Content,Container} from 'native-base';
import {View,FlatList,TouchableOpacity,Linking} from 'react-native';
import ReferenceItem from '../components/referenceItem';
import Spinner from '../components/spinner';
import {connect} from 'react-redux';
import HeaderLeft from '../components/headerLeft';
import HeaderRight from '../components/headerRight';

class References extends Component {
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


  onGetSuccess=(contentsData)=>
  {
    var arr=[];
    var content = contentsData[4];
    for( j = 0 ; j < content.modules.length ; j ++ )
    {
        var module = content.modules[j];
        if(module.visible==0)
        {
          continue;
        }
        arr.push(module);
    }
    this.setState({contents:arr});
    this.setState({loadingFlag:false});
  }

  componentDidMount()
  {
    courseID = this.props.course;
    axios.get(UrlUtils.getCourseContents(courseID))
      .then((response) => this.onGetSuccess(response.data))
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

  openUrl=(item)=>
  {
    Linking.openURL(item.contents[0].fileurl);
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
            <TouchableOpacity onPress={()=>this.openUrl(item)}>
            <ReferenceItem item={item} />
            </TouchableOpacity>
          }/>
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
  export default connect(mapStateToProps)(References);
