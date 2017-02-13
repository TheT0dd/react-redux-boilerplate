const owner = (state = {}, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return action.response;
		case 'AUTH_FAILURE':
			return {};
		default:
			return state;
	}
};

export default owner;
