import { combineReducers } from 'redux';
import byId from './byId';
import owner from './owner';

const users = combineReducers({
	byId,
	owner
});

export default users;
