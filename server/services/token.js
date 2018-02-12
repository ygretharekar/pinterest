'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = user => _jwtSimple2.default.encode({ sub: user.id, iat: new Date().getTime() }, process.env.SECRET);