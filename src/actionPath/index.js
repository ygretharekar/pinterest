import axios from 'axios';

// const rootUrl = '';


//////////////////////////////////////////////////////////////

export const AUTH_USER = 'AUTH_USER';

export const authUser = () => ({
	type: AUTH_USER
});

/////////////////////////////////////////////////////////////////////



export const setUserInfo = 
	() => 
		dispatch => {
			const user = JSON.parse(localStorage.getItem('user'));

			if(user) dispatch({ type: 'SET_USER_INFO', payload: { userInfo: user } });
		};


export const resetUserInfo = () => ({type: 'RESET_USER_INFO'});

export const signIn = 
	() =>
		dispatch => 
			axios
				.get('/user/signinsuccess')
				.then(
					res => {
						if(!res.data.error){
							localStorage.setItem('token', res.data.token);
							localStorage.setItem('user', JSON.stringify(res.data.user));
							dispatch(setUserInfo());
							dispatch(authUser());							
						}
					}
				)
				.catch( err => console.error(err));


export const signOut = 
	() =>
		dispatch => 
			axios
				.get('/user/signout')
				.then(
					() => {
						localStorage.removeItem('token');
						localStorage.removeItem('username');

						dispatch({type: 'UNAUTH_USER'});
						dispatch({type: 'RESET_USER_INFO'});
					}
				)
				.catch( err => console.error(err) );

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
			console.log('====================================');
			console.log('url: ', url, 'description: ', description);
			console.log('====================================');
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			axios
				.post(
					'/pins/add',
					{
						url,
						description
					}
				)
				.then(
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));

						if(res.data.error) return dispatch(showError({message: res.data.error}));
						dispatch({ type: 'ADD_PIN', payload: res.data});
						dispatch(closeAddModal());
						
					}
				)
				.catch(err => console.error(err.response.data));
		};

/////

export const deletePin = 
	pinId =>
		dispatch => {
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

			axios
				.delete(`/pins/delete/${pinId}`)
				.then( 
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));
						console.log(pinId);
						dispatch({type: 'DELETE_PIN', payload: pinId});
						dispatch(resetError());
					}
				)
				.catch(err => console.error(err));
		};	

/////////

export const fetchAllPins = 
	() =>
		dispatch => {
			axios
				.get('/pins/all')
				.then(
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));

						dispatch({ type: 'FETCH_PINS_ALL', payload: {allPins: res.data} });
						dispatch(resetError());
					}
				)
				.catch(err => console.error(err));
		};
///////////////////////

export const fetchLoggedInPin = 
	() =>
		dispatch => {

			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			axios.get('/pins/signedinuser')
				.then(
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));

						dispatch({type: 'FETCH_PINS_SIGNEDIN_USER', payload: {signedInPins: res.data}});
						dispatch(resetError());
					}
				)
				.catch(err => console.log(err));

		};

////////

export const fetchPinsUser = 
	userId => 
		dispatch => {
			axios.get(`/user/${userId}`)
				.then(
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));

						dispatch({ type: 'FETCH_PINS_USER', payload: {pinsUser: res.data} });
						dispatch(resetError());
					}
				)
				.catch(err => console.log(err));
		};

////////////

export const RESET_PINS_USER = 'RESET_PINS_USER';

export const resetUserPins = () => ({
	type: RESET_PINS_USER
});

////////////

export const likePin = 
	pinId => 
		dispatch => {
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			axios.put(`/pins/like/${pinId}`)
				.then(
					res => {
						if (res.data.error) return dispatch(showError(res.data.error));

						dispatch({ type: 'LIKE_PIN', payload: res.data });
						dispatch(resetError());
					}
				)
				.catch(err => console.log(err));
		};

/////////////////

export const unlikePin = 
	pinId => 
		dispatch => {
			axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
			axios.put(`/pins/unlike/${pinId}`)
				.then(res => {
					if (res.data.error) return dispatch(showError(res.data.error));

					dispatch({ type: 'UNLIKE_PIN', payload: res.data });
					dispatch(resetError());
				})
				.catch(err => console.log(err));
		};

////////////////		

//////////////////////////////////MODAL/////////////////////////////////////////////

export const SHOW_ADD_MODAL = 'SHOW_ADD_MODAL';

export const showAddModal = () => ({
	type: SHOW_ADD_MODAL
});


export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL';

export const closeAddModal = () => ({
	type: CLOSE_ADD_MODAL
});

export const SHOW_IMAGE_MODAL = 'SHOW_IMAGE_MODAL';

export const showImageModal = () => ({
	type: SHOW_IMAGE_MODAL
});

export const CLOSE_IMAGE_MODAL = 'CLOSE_IMAGE_MODAL';

export const closeImageModal = () => ({
	type: CLOSE_IMAGE_MODAL
});

export const SET_IMAGE_MODAL = 'SET_IMAGE_MODAL';

export const setImage = payload => ({
	type: SET_IMAGE_MODAL,
	payload
});

