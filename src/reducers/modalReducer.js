const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {

  case "SHOW_ADD_MODAL":
		return { 
			...state 
		};

  case 'CLOSE_ADD_MODAL':
		return {
			...state
		};

  default:
		return state
  }
};
