import { assert } from 'chai';
import * as actions from '../../../src/store/modal/actions';


describe('actions', () => {
	it('should create an action to show a modal', () => {
		const payload = {
			modalType: 'test',
			modalProps: {}
		};
		const expectedAction = {
			type: 'SHOW_MODAL',
			...payload
		};
		assert.deepEqual(actions.showModal(payload), expectedAction);
	});
	it('should create an action to hide a modal', () => {
		const payload = {
			modalType: 'test'
		};
		const expectedAction = {
			type: 'HIDE_MODAL',
			...payload
		};
		assert.deepEqual(actions.hideModal(payload), expectedAction);
	});
});
