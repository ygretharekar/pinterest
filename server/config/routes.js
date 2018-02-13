'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user_controller = require('../controllers/user_controller');

var _pin_controller = require('../controllers/pin_controller');

require('../services/passport');

require('../services/token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requireAuth = _passport2.default.authenticate('jwt', { session: false });

exports.default = app => {
	app.get('/auth/twitter', _passport2.default.authenticate('twitter'));
	app.get('/auth/twitter/callback', _passport2.default.authenticate('twitter', {
		successRedirect: '/success',
		failureRedirect: '/'
	}));

	app.get('/user/signinsuccess', _user_controller.signInSuccess);
	app.get('/user/signout', _user_controller.signOutUser);
	app.get('/user/:userId', _user_controller.fetchUser);
	app.get('/pins/all', _pin_controller.fetchAllPins);
	app.get('/pins/signedinuser', requireAuth, _pin_controller.fetchPinsOfUser);
	app.post('/pins/add', requireAuth, _pin_controller.addPin);
	app.delete('/pins/delete/:pinId', requireAuth, _pin_controller.deletePin);
	app.put('/pins/like/:pinId', requireAuth, _pin_controller.likePin);
	app.put('/pins/unlike/:pinId', requireAuth, _pin_controller.unlikePin);
};