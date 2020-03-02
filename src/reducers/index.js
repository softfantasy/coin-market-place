import themeReducer from './theme';
import {combineReducers} from 'redux'
import pageReducer from './page';

const rootReducer =combineReducers({
    theme: themeReducer,
    page: pageReducer
})

export default rootReducer;