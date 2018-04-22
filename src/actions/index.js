import axios from 'axios';
import UrlUtils from '../components/UrlUtils';
import { NavigationActions } from 'react-navigation';

export const startLoading=()=>
{
  return{
    type:'start_loading'
  };
};

export const saveCourseID=(courseID)=>
{
  return{
    type:'save_id',payload:courseID
  };
};

export const setLoginError=()=>
{
  return{
    type:'no_such_user'
  };
};

export const setNetworkError=()=>
{
  return{
    type:'network_error'
  };
};

export const deleteUser=()=>{
  return{
    type:'delete_user'
  };
}
export const loginUser = (uToken,navigation) =>{
  return(dispatch)=>{
  axios.get(UrlUtils.getSiteInfoUrl(uToken))
  .then((response) => {
    var user={
      userName:response.data.username,
      firstName:response.data.firstname,
      lastName:response.data.lastname,
      fullName:response.data.fullname,
      userID:response.data.userid,
      profilePic:response.data.userpictureurl,
      userToken:uToken
    };
    dispatch({type:'save_user',payload:user});
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCourses' })],
    });
    navigation.dispatch(resetAction);
  })
  .catch((err) => {
    this.setNetworkError();
    });
  };
};
