import { assert } from 'chai';
import rootReducer from '../../src/store/reducers';

describe('root reducer', () => {
	it('should be composed of modal, todos, users reducers', () => {
		assert.property(rootReducer(undefined, {}), 'modal');
		assert.property(rootReducer(undefined, {}), 'todos');
		assert.property(rootReducer(undefined, {}), 'todos');
	});
});
