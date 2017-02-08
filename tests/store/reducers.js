import { assert } from 'chai';
import rootReducer from '../../src/store/reducers';
import modal from '../../src/store/modal/reducers';
import todos from '../../src/store/todos/reducers';

describe('root reducer', () => {
	it('should be composed of modal and todos reducers', () => {
		assert.property(rootReducer(undefined, {}), 'modal');
		assert.property(rootReducer(undefined, {}), 'todos');
	});
});
