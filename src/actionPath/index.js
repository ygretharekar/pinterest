import axios from 'axios';

const rootUrl = '';

export const USER_INFO = 'USER_INFO';

export const setUserInfo = payload => ({
	type: USER_INFO,
	payload
});

////////////////////// ERROR ///////////////////////////////

export const SHOW_ERROR = 'SHOW_ERROR';

export const showError = payload => ({
	type: SHOW_ERROR,
	payload
});

export const RESET_ERROR = 'RESET_ERROR';

export const resetError = () => ({
	type: RESET_ERROR
});

///////////////////////add pins//////////////////////////////////

export const addPin = 
	({ url, description }) =>
		dispatch => {
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			axios
				.post(
					`${rootUrl}/pins/add`,
					{
						url,
						description
					}
				)
				.then(
					res => {
						if(res.data.error) return dispatch(showError());
						dispatch();
					}
				)
				.catch();
		};

