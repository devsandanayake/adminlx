import { combineReducers } from 'redux';
import dataReducer from './reducer-Allpost';
import authReducer from './authReducer';
import inqueryReducer from './inqueryReducer';
 
const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
    inquery: inqueryReducer

});

export default rootReducer;
