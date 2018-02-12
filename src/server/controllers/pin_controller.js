'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.unlikePin = exports.likePin = exports.deletePin = exports.addPin = exports.fetchPinsOfUser = exports.fetchAllPins = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pin = require('../models/pin');

var _pin2 = _interopRequireDefault(_pin);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fetchAllPins = exports.fetchAllPins = (req, res) => {
	_pin2.default.find({}).populate('addedBy').populate('likedBy').sort({ addedOn: -1 }).then(pins => res.send(pins)).catch(err => {
		console.error(err);
		res.json({ error: 'Pins could not be retrieved' });
	});
};

const fetchPinsOfUser = exports.fetchPinsOfUser = (req, res) => {
	const { user } = req;

	_pin2.default.find({ addedBy: user }).populate('addedBy').populate('likedBy').sort({ addedOn: -1 }).then(pins => res.send(pins)).catch(err => {
		console.error(err);
		res.json({ error: 'Pins could not be retrieved' });
	});
};

const addPin = exports.addPin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;

	_user2.default.findById(user._id).then(user => {

		const pin = new _pin2.default({ url, description, addedBy: user });
		user.pins.push(pin);

		Promise.all([pin.save(), user.save()]).then(results => res.json(results[0])).catch(err => {
			console.log(err);
			res.json({ error: 'Pin could not be saved' });
		});
	}).catch(err => {
		console.log(err);
		res.json({ error: 'User could not be retrieved' });
	});
};

const deletePin = exports.deletePin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;

	_pin2.default.findById(pinId).populate('addedBy').then(pin => {
		const { addedBy } = pin;

		if (user._id.toString() !== addedBy._id.toString()) return res.json({ error: 'You cannot delete another user\'s pins' });

		pin.remove().then(deletedPin => res.send(deletedPin)).catch(err => {
			console.log(err);
			res.json({ error: 'Pin could not be deleted' });
		});
	}).catch(err => {
		console.log(err);
		res.json({ error: 'Pin could not be retrieved' });
	});
};

const likePin = exports.likePin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;

	_pin2.default.findById(pinId).populate('likedBy').populate('addedBy').then(pin => {
		const { likedBy } = pin;
		const index = pin.likedBy.findIndex(likedByUser => likedByUser._id.toString() === user._id.toString());

		if (index !== -1) return res.json({ error: 'User already liked this pin' });

		pin.likedBy.push(user);

		pin.save().then(savedPin => res.send(savedPin)).catch(err => {
			console.log(err);
			res.json({ error: 'Pin could not be updated' });
		});
	}).catch(err => {
		console.log(err);
		res.json({ error: 'Pin could not be retrieved' });
	});
};

const unlikePin = exports.unlikePin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;

	_pin2.default.findById(pinId).populate('likedBy').populate('addedBy').then(pin => {
		const { likedBy } = pin;
		const index = pin.likedBy.findIndex(likedByUser => likedByUser._id.toString() === user._id.toString());

		if (index === -1) return res.json({ error: 'User must already have liked the pin' });

		pin.likedBy.splice(index, 1);
		pin.save().then(savedPin => res.send(savedPin)).catch(err => {
			console.log(err);
			res.json({ error: 'Pin could not be updated' });
		});
	}).catch(err => {
		console.log(err);
		res.json({ error: 'Pin could not be retrieved' });
	});
};