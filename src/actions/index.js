// Action creators that return plain action objects
// Async is handled in sagas

export const fetchTodos = (filter) => ({
	type: 'FETCH_TODOS_REQUEST',
	filter
});

export const addTodo = (text) => ({
	type: 'ADD_TODO_REQUEST',
	text
});

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO_REQUEST',
	id
});

export const showModal = ({ modalType, modalProps }) => ({
	type: 'SHOW_MODAL',
	modalType,
	modalProps
});

export const hideModal = ({ modalType }) => ({
	type: 'HIDE_MODAL',
	modalType: modalType
});
