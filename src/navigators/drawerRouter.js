import React from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import CourseSideBar from '../components/courseSideBar';
import CourseHome from '../pages/courseHome';
import Meetings from '../pages/meetings';
import References from '../pages/references';
import Questions from '../pages/questions';
import AboutUs from '../pages/aboutUs';
import Missions from '../pages/missions';

const CourseHomeStack = StackNavigator({
    CourseHome: { screen:CourseHome}});

const MeetingsStack = StackNavigator({
    Meetings: { screen:Meetings}});

const ReferencesStack = StackNavigator({
    References: { screen:References}});

const QuestionsStack = StackNavigator({
    Questions: { screen:Questions}});

const MissionsStack = StackNavigator({
    Missions: { screen:Missions}});

const AboutUsStack = StackNavigator({
    AboutUs: { screen:AboutUs}});

const Drawer = DrawerNavigator({
  CourseHome: { screen: ({ navigation }) => <CourseHomeStack screenProps={navigation} /> },
  Meetings: { screen: ({ navigation }) => <MeetingsStack screenProps={navigation} /> },
  References: { screen: ({ navigation }) => <ReferencesStack screenProps={navigation} /> },
  Questions: { screen: ({ navigation }) => <QuestionsStack screenProps={navigation} /> },
  Missions: { screen: ({ navigation }) => <MissionsStack screenProps={navigation} /> },
  AboutUs: { screen: ({ navigation }) => <AboutUsStack screenProps={navigation} /> },

}, {
  contentOptions: {
    activeTintColor: '#FFFFFF',
    activeBackgroundColor: 'red'
  },
  drawerPosition:'right',
  contentComponent: props => <CourseSideBar {
    ...props
  } />
});
export default Drawer;
