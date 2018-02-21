'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

var _passportJwt = require('passport-jwt');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const twitterLogin = new _passportTwitter.Strategy({
	consumerKey: process.env.CONSUMER_KEY,
	consumerSecret: process.env.CONSUMER_SECRET,
	callbackURL: 'http://127.0.0.1:8100/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
	_user2.default.findOrCreate({
		twitterId: profile.id
	}, {
		username: profile.displayName,
		twitterId: profile.id,
		twitterScreenName: `@${profile._json.screen_name}`,
		twitterProfileImg: profile._json.profile_image_url
	}).then(user => done(null, user.result)).catch(err => done(err));
});

const jwtLogin = new _passportJwt.Strategy({
	jwtFromRequest: _passportJwt.ExtractJwt.fromHeader('authorization'),
	secretOrKey: process.env.SECRET
}, (jwt_payload, done) => {
	_user2.default.findById(jwt_payload.sub).then(user => {
		if (user) done(null, user);else done(null, false);
	}).catch(err => done(err, false));
});

_passport2.default.use(jwtLogin);
_passport2.default.use(twitterLogin);

_passport2.default.serializeUser((user, done) => done(null, user._id));

_passport2.default.deserializeUser((id, done) => {
	_user2.default.findById(id).then(user => {
		console.log(user);
		done(null, user);
	}).catch(err => done(err));
});