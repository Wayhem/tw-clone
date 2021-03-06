import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import streamsReducer from './StreamsReducer'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer
})