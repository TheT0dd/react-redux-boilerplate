import { assert } from 'chai';
import rootReducer from '../../src/reducers';
import modal from '../../src/reducers/modal';
import todos from '../../src/reducers/todos';

describe('root reducer', () => {
	it('should be composed of modal and todos reducers', () => {
		assert.property(rootReducer(undefined, {}), 'modal');
		assert.property(rootReducer(undefined, {}), 'todos');
	});
});
