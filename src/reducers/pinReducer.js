/* eslint-disable */
const initialState = {
	allPins: [],
	signedInPins: [],
	pinsUser: []
};

export default (state = initialState, action) => {
	switch (action.type) {

	case 'FETCH_PINS_ALL':
		return { 
			...state,
			...action.payload
		};

	case 'FETCH_PINS_SIGNEDIN_USER':
		return { 
			...state,
			...action.payload
		};

	case 'FETCH_PINS_USER':
		return { 
			...state,
			...action.payload
		};

	case 'RESET_PINS_USER':
		return { 
			...state,
			pinsUser: null
		};

	case 'ADD_PIN':
		return {
			...state,
			allPins: [...state.allPins, action.payload],
			signedInPins: [ ...state.signedInPins, action.payload ]
		};

	case 'DELETE_PIN':
		return {
			...state,
			allPins: state.allPins.filter(pin => pin._id !== action.payload ),
			signedInPins: state.allPins.filter(pin => pin._id !== action.payload )
		};

	case 'LIKE_PIN':
		const allPins = [...state.allPins];
		const allIndex = allPins.findIndex( pin => pin_id === action.payload._id );
		if(allIndex !== -1) allPins.splice(allIndex, 1, action.payload);

		const signedInPins = [...state.signedInPins];
		const signedInIndex = signedInPins.findIndex( pin => pin_id === action.payload._id );
		if(signedInIndex !== -1) signedInPins.splice(signedInIndex, 1, action.payload);

		let pinsUser;

		if(state.pinsUser){
			pinsUser = {...state.pinsUser};
			const pinsUserIndex = pinsUser.pins.findIndex(
				pin => pin._id === action.payload._id
			);
			if (pinsUserIndex !== -1) pinsUser.pins.splice(pinsUserIndex, 1, action.payload);
		}

		return {
			...state,
			allPins,
			signedInPins,
			pinsUser
		};

	case 'UNLIKE_PIN':
		const allPins2 = [...state.allPins];
		const allIndex2 = allPins2.findIndex( pin => pin_id === action.payload._id );
		if(allIndex2 !== -1) allPins2.splice(allIndex2, 1, action.payload);

		const signedInPins2 = [...state.signedInPins];
		const signedInIndex2 = signedInPins2.findIndex( pin => pin_id === action.payload._id );
		if(signedInIndex2 !== -1) signedInPins2.splice(signedInIndex2, 1, action.payload);

		let pinsUser2;

		if(state.pinsUser){
			pinsUser2 = {...state.pinsUser};
			const pinsUserIndex2 = pinsUser2.pins.findIndex(
				pin => pin._id === action.payload._id
			);
			if (pinsUserIndex2 !== -1) pinsUser2.pins.splice(pinsUserIndex2, 1, action.payload);
		}

		return {
			...state,
			allPins: allPins2,
			signedInPins: signedInIndex2,
			pinsUser: pinsUser2
		};

	default:
		return state;
	}
};
