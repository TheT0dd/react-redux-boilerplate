const byId = (state = {}, action) => {
	if (action.response) {
		return {
			...state,
			...action.response.entities.users
		};
	}
	return state;
};

export default byId;
