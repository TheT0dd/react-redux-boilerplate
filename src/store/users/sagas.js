import { call, put } from 'redux-saga/effects';
import * as api from './api';
import * as schema from './schema';
import { normalize } from 'normalizr';

export function *authRequesAsync({ username, password, token }) {
	try {
		const response = yield call(api.authRequest, { username, password, token });
		yield put({
			type: 'AUTH_SUCCESS',
			response: normalize(response, schema.user)
		});
	}
	catch(error) {
		yield put({
			type: 'AUTH_FAILURE',
			message: error.message || 'Something went wrong.'
		});
	}
}
