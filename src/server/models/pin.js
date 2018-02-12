'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const PinSchema = new Schema({
	url: String,
	description: String,
	addedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	likedBy: [{
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	addedOn: {
		type: Date,
		default: Date.now()
	}
});

const Pin = _mongoose2.default.model('pin', PinSchema);

exports.default = Pin;