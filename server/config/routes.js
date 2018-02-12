'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user_controller = require('../controllers/user_controller');

require('../services/passport');

require('../services/token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const requireAuth = passport.authenticate('jwt', {session: false});

/* import { 
	fetchPinsAll, 
	fetchPinsSignedInUser, 
	addPin,
	deletePin,
	likePin,
	unlikePin
} from '../controllers/pin_controller'; */

exports.default = app => {
	app.get('/auth/twitter', _passport2.default.authenticate('twitter'));
	app.get('/auth/twitter/callback', _passport2.default.authenticate('twitter', {
		successRedirect: '/success',
		failureRedirect: '/'
	}));

	app.get('/user/signinsuccess', _user_controller.signInSuccess);
	app.get('/user/signout', _user_controller.signOutUser);
	app.get('/user/:userId', _user_controller.fetchUser);
	// app.get('/pins/all', fetchPinsAll);
	// app.get('/pins/signedinuser', requireAuth, fetchPinsSignedInUser);
	// app.post('/pins/add/', requireAuth, addPin);
	// app.delete('/pins/delete/:pinId', requireAuth, deletePin);
	// app.put('/pins/like/:pinId', requireAuth, likePin);
	// app.put('/pins/unlike/:pinId', requireAuth, unlikePin);
};