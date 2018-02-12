'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchUser = exports.signOutUser = exports.signInSuccess = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../services/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signInSuccess = exports.signInSuccess = (req, res) => {
	if (req.user) {
		const token = (0, _token2.default)(req.user);
		res.send({ token, user: req.user });
	} else {
		res.json({ error: 'Insufficient permission' });
	}
};

const signOutUser = exports.signOutUser = (req, res) => {
	req.logout();
	res.json({ signedOut: true });
};

const fetchUser = exports.fetchUser = (req, res) => {
	const { userId } = req.params;

	_user2.default.findById(userId).populate({
		path: 'pins',
		options: { sort: { addedOn: -1 } },
		populate: { path: 'addedBy' }
	}).populate({
		path: 'pins',
		options: { sort: { addedOn: -1 } },
		populate: { path: 'likedBy' }
	}).then(user => res.send(user)).catch(err => {
		console.log(err);
		res.json({ error: 'User could not be retrieved' });
	});
};