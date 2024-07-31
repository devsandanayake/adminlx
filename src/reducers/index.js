import { combineReducers } from 'redux';
import dataReducer from './reducer-Allpost';
import authReducer from './authReducer';
import inqueryReducer from './inqueryReducer';
import auctionReducer from './auctionReducer';
 
const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer,
    inquery: inqueryReducer,
    auction: auctionReducer

});

export default rootReducer;
