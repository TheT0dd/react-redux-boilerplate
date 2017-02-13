import { takeEvery, takeLatest } from 'redux-saga';
import * as todosSagas from './todos/sagas';
import * as usersSagas from './users/sagas';

// Root Saga: single entry point to start all other Sagas at once
export default function *rootSaga() {
	yield [
		takeLatest('AUTH_REQUEST', usersSagas.authRequesAsync),
		// takeLatest: don't allow multiple *fetchTodosAsync()
		// sagas to run at the same time. When a new one starts,
		// force stop the previous one
		// NOTE: this resembles the Observable's switchMap() operator
		takeLatest('FETCH_TODOS_REQUEST', todosSagas.fetchTodosAsync),
		// takeLatest: unlike takeLatest, allow multiple
		// sagas to run at the same time
		// NOTE: this resembles the Observable's mergeMap() operator
		takeEvery('ADD_TODO_REQUEST', todosSagas.addTodoAsync),
		takeEvery('TOGGLE_TODO_REQUEST', todosSagas.toggleTodoAsync),
		takeEvery('DUMMY_SOCKET_REQUEST', todosSagas.dummySocketRequest)
	];
}
