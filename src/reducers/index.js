import { combineReducers } from 'redux';
import {nextReducer, prevReducer, searchReducer} from './reducers.js' 


const rootReducer = combineReducers({
  nextReducer: nextReducer,
  prevReducer: prevReducer,
  searchReducer: searchReducer
});

export default rootReducer;