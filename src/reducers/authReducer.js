const authInitialState = {
	isAuthenticated: false,
	authError: ''
};

export default (state = authInitialState, action) => {
	switch (action.type) {
	case 'AUTH_USER':
		return {
			...state,
			isAuthenticated: true,
			authError: ''
		};

		
	case 'UNAUTH_USER':
		return {
			...state,
			isAuthenticated: false
		};

	default:
		return state;
	}
};
