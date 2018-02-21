const initialState = {
	addPinModal: false,
	imageModal: false,
	setImage: {}
};

export default (state = initialState, action) => {
	switch (action.type) {

	case 'SHOW_ADD_MODAL':
		return { 
			...state,
			addPinModal: true
		};

	case 'CLOSE_ADD_MODAL':
		return {
			...state,
			addPinModal: false
		};
	case 'SHOW_IMAGE_MODAL':
		return { 
			...state,
			imageModal: true
		};

	case 'CLOSE_IMAGE_MODAL':
		return {
			...state,
			imageModal: false
		};
	case 'SET_IMAGE_MODAL':
		return {
			...state,
			...action.payload
		};

	default:
		return state;
	}
};
