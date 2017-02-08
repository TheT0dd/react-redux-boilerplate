import { call, put } from 'redux-saga/effects';
import * as api from './api';
import * as schema from './schema';
import { normalize } from 'normalizr';

export function *fetchTodosAsync({ filter }) {
	try {
		// yield a call effect: we do NOT call the actual method,
		// we just yield an 'effect' object that *describes* the
		// method call & serves as an instruction to the redux-saga
		// middleware. Based on this effect object, the middleware
		// will perform the actual method call & resume the Saga
		// based on the result
		const response = yield call(api.fetchTodos, filter);
		// yield a put effect: an object describing a dispatch()
		// call. The actual call to dispatch happens (same as above)
		// inside the middleware, not here
		yield put({
			type: 'FETCH_TODOS_SUCCESS',
			filter,
			response: normalize(response, schema.arrayOfTodos)
		});
	}
	catch(error) {
		yield put({
			type: 'FETCH_TODOS_FAILURE',
			filter,
			message: error.message || 'Something went wrong.'
		});
	}
}

export function *addTodoAsync({ text }) {
	const response = yield call(api.addTodo, text);
	yield put({
		type: 'ADD_TODO_SUCCESS',
		response: normalize(response, schema.todo)
	});
}

export function *toggleTodoAsync({ id }) {
	const response = yield call(api.toggleTodo, id);
	yield put({
		type: 'TOGGLE_TODO_SUCCESS',
		response: normalize(response, schema.todo)
	});
}

// dummy saga that sends request to server over socket.io
export function *dummySocketRequest(action) {
	const response = yield call(api.dummySocketRequest, action);
	// at this point 'response' holds the server response,
	// we can do with it as we please (i.e. dispatch an action)
	console.log('server responded: ', response);
	// yield put({
	// 	type: 'SOME_OTHER_ACTION',
	// 	response: normalize(response)
	// });
}
