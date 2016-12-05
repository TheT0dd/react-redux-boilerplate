import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import * as schema from './schema';
import * as api from '../api';


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

// Root Saga: single entry point to start all other Sagas at once
export default function *rootSaga() {
	yield [
		// takeLatest: don't allow multiple *fetchTodosAsync()
		// sagas to run at the same time. When a new one starts,
		// force stop the previous one
		// NOTE: this resembles the Observable's switchMap() operator
		takeLatest('FETCH_TODOS_REQUEST', fetchTodosAsync),
		// takeLatest: unlike takeLatest, allow multiple
		// sagas to run at the same time
		// NOTE: this resembles the Observable's mergeMap() operator
		takeEvery('ADD_TODO_REQUEST', addTodoAsync),
		takeEvery('TOGGLE_TODO_REQUEST', toggleTodoAsync)
	];
}
