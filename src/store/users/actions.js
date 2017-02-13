// Action creators that return plain action objects
// Async is handled in sagas

export const authRequest = ({username, password, token}) => ({
	type: 'AUTH_REQUEST',
	username,
	password,
	token
});
