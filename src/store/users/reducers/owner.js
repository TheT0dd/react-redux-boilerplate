const owner = (state = {}, action) => {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return action.response;
		default:
			return state;
	}
};

export default owner;
