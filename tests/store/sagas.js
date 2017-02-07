import { assert } from 'chai';
import { put, call } from 'redux-saga/effects';
import { fetchTodosAsync, addTodoAsync, toggleTodoAsync } from '../../src/store/sagas';
import * as schema from '../../src/store/schema';
import * as api from '../../src/store/api';
import { normalize } from 'normalizr';

describe('sagas', () => {

	describe('fetchTodosAsync', () => {

		it('should async fetch todos', () => {
			// mock action
			const action = {
				filter: 'all'
			};
			// Get iterator out of generator
			const gen = fetchTodosAsync(action);

			// Get first value out of the generator
			assert.deepEqual(
				gen.next().value,
				call(api.fetchTodos, action.filter),
				`fetchTodosAsync Saga must call api.fetchTodos('${action.filter}')`
			);

			// mock response object
			const response = [];

			// Get second value out of the generator
			assert.deepEqual(
				gen.next(response).value,
				put({
					type: 'FETCH_TODOS_SUCCESS',
					filter: action.filter,
					response: normalize(response, schema.arrayOfTodos)
				}),
				'fetchTodosAsync Saga must dispatch a FETCH_TODOS_SUCCESS action'
			);

			// Generator should be done now
			assert.deepEqual(
				gen.next(),
				{
					done: true,
					value: undefined
				},
				'fetchTodosAsync Saga must be done'
			);
		});

		it('should handle async exceptions', () => {
			// mock action
			const action = {
				filter: 'all'
			};

			// Get iterator out of generator
			const gen = fetchTodosAsync(action);

			// Get first value out of the generator
			assert.deepEqual(
				gen.next().value,
				call(api.fetchTodos, action.filter),
				`fetchTodosAsync Saga must call api.fetchTodos('${action.filter}')`
			);

			// mock error object
			const error = {
				message: 'Boom!'
			};

			// Force generator to resume with throw()
			assert.deepEqual(
				gen.throw(error).value,
				put({
					type: 'FETCH_TODOS_FAILURE',
					filter: action.filter,
					message: error.message
				}),
				'fetchTodosAsync Saga must dispatch a FETCH_TODOS_FAILURE action'
			);

			// Generator should be done now
			assert.deepEqual(
				gen.next(),
				{
					done: true,
					value: undefined
				},
				'fetchTodosAsync Saga must be done'
			);
		});
	});

	describe('addTodoAsync', () => {

		it('should async add todos', () => {
			// mock action
			const action = {
				text: 'Test'
			};

			// Get iterator out of generator
			const gen = addTodoAsync(action);

			// Get first value out of the generator
			assert.deepEqual(
				gen.next().value,
				call(api.addTodo, action.text),
				`addTodoAsync Saga must call api.addTodo('${action.text}')`
			);

			// mock response object
			const response = {};

			// Get second value out of the generator
			assert.deepEqual(
				gen.next(response).value,
				put({
					type: 'ADD_TODO_SUCCESS',
					response: normalize(response, schema.todo)
				}),
				'addTodoAsync Saga must dispatch a ADD_TODO_SUCCESS action'
			);

			// Generator should be done now
			assert.deepEqual(
				gen.next(),
				{
					done: true,
					value: undefined
				},
				'addTodoAsync Saga must be done'
			);
		});
	});

	describe('toggleTodoAsync', () => {

		it('should async toggle todos', () => {
			// mock action
			const action = {
				id: 'test-id'
			};

			// Get iterator out of generator
			const gen = toggleTodoAsync(action);

			// Get first value out of the generator
			assert.deepEqual(
				gen.next().value,
				call(api.toggleTodo, action.id),
				`toggleTodoAsync Saga must call api.toggleTodo('${action.id}')`
			);

			// mock response object
			const response = {};

			// Get second value out of the generator
			assert.deepEqual(
				gen.next(response).value,
				put({
					type: 'TOGGLE_TODO_SUCCESS',
					response: normalize(response, schema.todo)
				}),
				'toggleTodoAsync Saga must dispatch a TOGGLE_TODO_SUCCESS action'
			);

			// Generator should be done now
			assert.deepEqual(
				gen.next(),
				{
					done: true,
					value: undefined
				},
				'toggleTodoAsync Saga must be done'
			);
		});
	});

});
