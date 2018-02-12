'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

before(done => {
	_mongoose2.default.connect(process.env.MONGODB_TEST_URI);

	_mongoose2.default.connection.once('open', () => {
		console.log('====================================');
		console.log('test database connection established');
		console.log('====================================');
		done();
	}).on('error', err => {
		console.error(err);
		done();
	});
}); /* eslint-disable */


beforeEach(done => {
	const { users, pins } = _mongoose2.default.connection.collections;

	Promise.all([users.drop(), pins.drop()]).then(() => done()).catch(() => done());
});