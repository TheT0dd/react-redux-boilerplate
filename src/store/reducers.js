import { combineReducers } from 'redux';
import modal from './modal/reducers';
import todos from './todos/reducers';

// the root reducer
export default combineReducers({
	modal,
	todos
});
