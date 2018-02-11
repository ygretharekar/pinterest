import passport from 'passport';

import userController from '../controllers/user_controller';
import pinController from '../controllers/pin_controller';

import '../services/passport';
import '../services/token';

const requireAuth = passport.authenticate('jwt', {session: false});

export default (app) => {
	app.get('/auth/twitter', passport.authenticate('twitter'));	
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/success',
		failureRedirect: '/'
	}));


	app.get('/user/signinsuccess', userController.signInSuccess);
	app.get('/user/signout', userController.signOutUser);
	app.get('/user/:userId', userController.fetchUser);

	app.get('/pins/all', pinController.fetchPinsAll);
	app.get('/pins/signedinuser', requireAuth, pinController.fetchPinsSignedInUser);
	app.post('/pins/add/', requireAuth, pinController.addPin);
	app.delete('/pins/delete/:pinId', requireAuth, pinController.deletePin);
	app.put('/pins/like/:pinId', requireAuth, pinController.likePin);
	app.put('/pins/unlike/:pinId', requireAuth, pinController.unlikePin);
};

