import { combineReducers } from 'redux';
import authReducer from './authReducer';
import pollsReducer from './pollsReducer';

export default combineReducers({
  auth: authReducer,
  polls: pollsReducer
});