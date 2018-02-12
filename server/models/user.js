'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _findorcreatePromise = require('findorcreate-promise');

var _findorcreatePromise2 = _interopRequireDefault(_findorcreatePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

_mongoose2.default.Promise = global.Promise;

const UserSchema = new Schema({
	username: String,
	twitterId: String,
	twitterScreenName: String,
	twitterProfileImg: String,
	pins: [{
		type: Schema.Types.ObjectId,
		ref: 'pin'
	}],
	createdOn: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.plugin(_findorcreatePromise2.default);

const User = _mongoose2.default.model('user', UserSchema);

exports.default = User;