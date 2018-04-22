import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import LoginPage from '../pages/loginPage';
import MyCourses from '../pages/myCourses';
import PostList from '../pages/postList';
import DiscussionPage from '../pages/discussionPage';
import CourseSideBar from '../components/courseSideBar';
import Drawer from '../navigators/drawerRouter';

const RootStack = StackNavigator({
  Login: {
    screen: LoginPage,navigationOptions:{
          header:null
    }
  },
  MyCourses: {
    screen: MyCourses
  },
  Drawer: {
    screen: Drawer,navigationOptions:{
          header:null
    }
  },
  Discussion:{
	  screen:DiscussionPage
	  },
  Posts:{
	  screen:PostList
  }},
  {
    headerMode:'screen'
  });

export default RootStack;
