// Action creators that return plain action objects
// Async is handled in sagas

export const authRequest = (values) => ({
	type: 'AUTH_REQUEST',
	...values
});
