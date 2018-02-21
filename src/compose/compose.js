import { combineReducers } from 'redux';

import auth from '../reducers/authReducer';
import user from '../reducers/userReducer';
import modal from '../reducers/modalReducer';
import pin from '../reducers/pinReducer';

export default combineReducers(
	{
		auth,
		user,
		modal,
		pin
	}
);