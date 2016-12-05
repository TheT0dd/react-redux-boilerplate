import { assert } from 'chai';
import * as schema from '../../src/sagas/schema';
import { Schema } from 'normalizr';

describe('schema', () => {
	it('should define todo', () => {
		assert.instanceOf(schema.todo, Schema);
	});
	it('should define arrayOfTodos', () => {
		assert.instanceOf(schema.arrayOfTodos, Object);
		assert.property(schema.arrayOfTodos, '_itemSchema');
	});
});
