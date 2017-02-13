const owner = (state = {}, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return {
				id: action.userId,
				token: action.token
			};
		case 'AUTH_FAILURE':
			return {};
		default:
			return state;
	}
};

export default owner;
