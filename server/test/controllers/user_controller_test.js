'use strict';

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

var _pin = require('../../models/pin');

var _pin2 = _interopRequireDefault(_pin);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _token = require('../../services/token');

var _token2 = _interopRequireDefault(_token);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _middlewares = require('../../config/middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable */


(0, _middlewares2.default)(app);

describe('userController', () => {
	let userOne;
	let userTwo;
	let userOneToken;
	let userTwoToken;
	let pinOne;
	let pinTwo;

	beforeEach(done => {
		userOne = new _user2.default({
			username: 'usernameOne',
			twitterId: 'twitterIdOne',
			twitterScreenName: 'twitterScreenNameOne',
			twitterProfileImg: 'http://imgOne.png'
		});

		userTwo = new _user2.default({
			username: 'usernameTwo',
			twitterId: 'twitterIdTwo',
			twitterScreenName: 'twitterScreenNameTwo',
			twitterProfileImg: 'http://imgTwo.png'
		});

		userOneToken = (0, _token2.default)(userOne);
		userTwoToken = (0, _token2.default)(userTwo);

		pinOne = new _pin2.default({
			url: 'http://pinOne.png',
			description: 'pinOne',
			addedBy: userOne
		});

		pinTwo = new _pin2.default({
			url: 'http://pinTwo.png',
			description: 'pinTwo',
			addedBy: userTwo
		});

		userOne.pins = [pinOne];
		userTwo.pins = [pinTwo];
		pinOne.likedBy = [userTwo];

		Promise.all([userOne.save(), userTwo.save(), pinOne.save(), pinTwo.save()]).then(() => done()).catch(err => done(err));
	});

	describe('.signInSuccess', () => {
		it('sends error message to unauthorized users', done => {
			(0, _supertestAsPromised2.default)(app).get('/user/signinsuccess').then(res => {
				(0, _chai.expect)(res.body.error).to.equal('Insufficient permission');
				done();
			}).catch(err => done(err));
		});

		xit('sends token to authorized user', done => {
			(0, _supertestAsPromised2.default)(app).get('/user/signinsuccess').set('cookie', 'connect.sid=s%3AsRmj1zUFf5y5gJlu9W9tPlV1C_RZ7wIu.baxq6nQfOIA9hj%2FgapFE%2FJY429dumna6OjrDL1S2HqA').then(res => {
				(0, _chai.expect)(res.body.token).to.exist;
				done();
			}).catch(err => done(err));
		});
	});

	describe('.signOutUser', () => {
		it('sends back a response', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.stats).to.not.equal(404);
				done();
			}).catch(err => done(err));
		});
	});

	describe('.fetchUser', () => {
		it('sends a response', done => {
			(0, _supertestAsPromised2.default)(app).get(`/user/${userOne._id}`).then(res => {
				(0, _chai.expect)(res.status).to.not.equal(404);
				done();
			}).catch(err => done(err));
		});

		it('sends data about a requested user', done => {
			(0, _supertestAsPromised2.default)(app).get(`/user/${userOne._id}`).then(res => {
				(0, _chai.expect)(res.body).to.have.property('username');
				(0, _chai.expect)(res.body).to.have.property('twitterId');
				(0, _chai.expect)(res.body).to.have.property('twitterScreenName');
				(0, _chai.expect)(res.body).to.have.property('twitterProfileImg');
				(0, _chai.expect)(res.body).to.have.property('pins');
				(0, _chai.expect)(res.body).to.have.property('createdOn');
				done();
			}).catch(err => done(err));
		});

		it('deep populates the returned user object', done => {
			(0, _supertestAsPromised2.default)(app).get(`/user/${userOne._id}`).then(res => {
				(0, _chai.expect)(res.body.pins[0]).to.have.property('addedBy');
				(0, _chai.expect)(res.body.pins[0].addedBy).to.have.property('username');
				(0, _chai.expect)(res.body.pins[0]).to.have.property('likedBy');
				(0, _chai.expect)(res.body.pins[0].likedBy[0]).to.have.property('username');
				done();
			}).catch(err => done(err));
		});
	});
});