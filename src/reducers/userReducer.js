const initialState = {
	userInfo: null

};

export default (state = initialState, action) => {
	
	switch (action.type) {
	
	case 'SET_USER_INFO':
		return { 
			...state,
			...action.payload
		};

	case 'RESET_USER_INFO':
		return {
			...state,
			userInfo: null
		};
		
	default:
		return state;
	}
	
};
