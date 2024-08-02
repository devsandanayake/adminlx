import { combineReducers } from 'redux';
import dataReducer from './reducer-Allpost';
import approvelReducer from './reducer-approvel';
import authReducer from './authReducer';
import inqueryReducer from './inqueryReducer';
import auctionReducer from './auctionReducer';
import userReducer from './userReducer';
 
const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
    inquery: inqueryReducer,
    auction: auctionReducer,
    user: userReducer,
    approvel: approvelReducer,

});

export default rootReducer;
