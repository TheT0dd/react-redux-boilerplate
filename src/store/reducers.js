import { combineReducers } from 'redux';
import modal from './modal/reducers';
import todos from './todos/reducers';
import users from './users/reducers';
import { reducer as form } from 'redux-form';

// the root reducer
export default combineReducers({
	modal,
	todos,
	users,
	form
});
