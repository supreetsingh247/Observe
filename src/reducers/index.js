import { combineReducers } from 'redux';
import { student } from './studentReducer';

const rootReducer = combineReducers({
  student
});

export default rootReducer;