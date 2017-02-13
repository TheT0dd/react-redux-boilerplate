import { call, put } from 'redux-saga/effects';
import * as api from './api';
import * as schema from './schema';
import { normalize } from 'normalizr';

export function *authRequesAsync(action) {
	try {
		const { logged_in, token, userId } = yield call(api.authRequest, action);
		yield put({
			type: 'AUTH_SUCCESS',
			logged_in,
			token,
			userId
		});
	}
	catch(error) {
		yield put({
			type: 'AUTH_FAILURE',
			message: error.message || 'Something went wrong.'
		});
	}
}
