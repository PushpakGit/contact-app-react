import { combineReducers } from 'redux';

import contactApp from './crudReducers';
import appFilters from "./filters";

const rootReducer = combineReducers(
    {
        contactApp,
        appFilters
    }
)

export default rootReducer;
