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



//////////////////////////////////MODAL/////////////////////////////////////////////

export const SHOW_ADD_MODAL = 'SHOW_ADD_MODAL';

export const showAddModal = () => ({
	type: SHOW_ADD_MODAL
});


export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL';

export const closeAddModal = () => ({
	type: CLOSE_ADD_MODAL
});

