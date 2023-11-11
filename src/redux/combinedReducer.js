import { combineReducers } from 'redux';
import memberReducer from './members/reducers/membersReducer';
import groupReducer from './groups/reducers/groupsReducer';

const combinedReducer = combineReducers({
    member: memberReducer,
    group: groupReducer,
});

export default combinedReducer;