import { combineReducers } from 'redux';

import auth from '../reducers/authReducer';
import user from '../reducers/userReducer';

export default combineReducers(
	{
		auth,
		user
	}
);