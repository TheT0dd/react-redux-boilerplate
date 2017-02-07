import { combineReducers } from 'redux';
import modal from './modal';
import todos from './todos';

const rootReducer = combineReducers({
	modal,
	todos
});

export default rootReducer;
