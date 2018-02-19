const errorInitialState = {
	message: null
};

export default (state = errorInitialState, action) => {
	switch (action.type) {
	
	case 'SHOW_ERROR':
		return {
			...state,
			...action.payload
		};

	case 'RESET_ERROR':
		return {
			...state,
			...action.payload				
		};

	default:
		return state;
	}
};