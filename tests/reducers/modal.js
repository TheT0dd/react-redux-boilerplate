import { assert } from 'chai';
import modal from '../../src/reducers/modal';

describe('modal reducer', () => {
	it('should return the initial state', () => {
		const initialState = {
			modalType: null,
			modalProps: {}
		};
		assert.deepEqual(modal(undefined, {}), initialState);
	});

	it('should handle SHOW_MODAL', () => {
		const state = {};
		const action = {
			type: 'SHOW_MODAL',
			modalType: 'test',
			modalProps: {}
		};
		const nextState = {
			modalType: 'test',
			modalProps: {}
		};
		assert.deepEqual(modal(state, action), nextState);
	});

	it('should handle HIDE_MODAL', () => {
		const state = {};
		const action = {
			type: 'HIDE_MODAL',
			modalType: 'test'
		};
		const nextState = {
			modalType: null,
			modalProps: {}
		};
		assert.deepEqual(modal(state, action), nextState);
	});
});
