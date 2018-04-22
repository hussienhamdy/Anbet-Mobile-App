import {combineReducers} from 'redux';
import userReducer from './userReducer';
import courseReducer from './courseReducer';

export default combineReducers({
  auth:userReducer,
  crsReducer:courseReducer
})
 
