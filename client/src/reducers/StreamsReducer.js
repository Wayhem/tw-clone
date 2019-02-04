import _ from 'lodash';
import { 
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    DELETE_STREAM
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }    
        case DELETE_STREAM: 
            return _.omit(state, action.payload)
        case FETCH_STREAMS: 
                
        default: 
            return state;
    }
}