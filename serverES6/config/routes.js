import passport from 'passport';

import { signInSuccess, signOutUser, fetchUser } from '../controllers/user_controller';
import { 
	fetchAllPins,
	fetchPinsOfUser,
	addPin,
	deletePin,
	likePin,
	unlikePin
} from '../controllers/pin_controller'; 

// import path from 'path';

import '../services/passport';
import '../services/token';

const requireAuth = passport.authenticate('jwt', {session: false});

export default (app) => {
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/failed'
	}));

	
	// app.get('/success', (req, res) => res.sendFile(path.join(__dirname, './successRedirect.js')));

	app.get('/user/signinsuccess', signInSuccess);
	app.get('/user/signout', signOutUser);
	app.get('/user/:userId', fetchUser);
	app.get('/pins/all', fetchAllPins);
	app.get('/pins/signedinuser', requireAuth, fetchPinsOfUser);
	app.post('/pins/add', requireAuth, addPin);
	app.delete('/pins/delete/:pinId', requireAuth, deletePin);
	app.put('/pins/like/:pinId', requireAuth, likePin);
	app.put('/pins/unlike/:pinId', requireAuth, unlikePin);

};
