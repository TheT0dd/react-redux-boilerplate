import { assert } from 'chai';
import users from '../../../src/store/users/reducers';
import byId from '../../../src/store/users/reducers/byId';
import owner from '../../../src/store/users/reducers/owner';

describe('users reducer', () => {

	it('should return the initial state', () => {
		const initialState = {
			byId: {},
			owner: {}
		};
		assert.deepEqual(users(undefined, {}), initialState);
	});

	describe('byId reducer', () => {

		it('should return the initial state', () => {
			const initialState = {};
			assert.deepEqual(byId(undefined, {}), initialState);
		});

		it('should index new users', () => {
			const state = {};
			const action = {
				type: 'IRRELEVANT_ACTION_TYPE',
				response: {
					entities: {
						users: {
							id1: { username: 'dummy', password: 'user' }
						}
					}
				}
			};
			const nextState = {
				id1: { username: 'dummy', password: 'user' }
			};
			assert.deepEqual(byId(state, action), nextState);
			// reject duplicates
			assert.deepEqual(byId(state, action), nextState);
			const action2 = {
				type: 'IRRELEVANT_ACTION_TYPE',
				response: {
					entities: {
						users: {
							id2: { username: 'another dummy', password: 'another user' }
						}
					}
				}
			};
			const nextState2 = {
				id1: { username: 'dummy', password: 'user' },
				id2: { username: 'another dummy', password: 'another user' }
			};
			assert.deepEqual(byId(nextState, action2), nextState2);
		});
	});

	describe('owner reducer', () => {

		it('should return the initial state', () => {
			const initialState = {};
			assert.deepEqual(owner(undefined, {}), initialState);
		});

		it('should handle AUTH_SUCCESS', () => {
			const state = {};
			const action = {
				type: 'AUTH_SUCCESS',
				response: {
					username: 'test',
					token: 'asdf'
				}
			};
			const nextState = {
				username: 'test',
				token: 'asdf'
			};
			assert.deepEqual(owner(state, action), nextState);
		});

		it('should handle AUTH_FAILURE', () => {
			const state = {
				username: 'test',
				token: 'asdf'
			};
			const action = {
				type: 'AUTH_FAILURE'
			};
			const nextState = {};
			assert.deepEqual(owner(state, action), nextState);
		});
	});
});
