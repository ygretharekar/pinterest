'use strict';

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _pin = require('../models/pin');

var _pin2 = _interopRequireDefault(_pin);

var _supertestAsPromised = require('supertest-as-promised');

var _supertestAsPromised2 = _interopRequireDefault(_supertestAsPromised);

var _chai = require('chai');

var _token = require('../services/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('pinController', () => {
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

	describe('.fetchPinsAll', () => {
		it('fetches list  of all pins', done => {
			(0, _supertestAsPromised2.default)(app).get('/pins/all').then(res => {
				(0, _chai.expect)(res.body).to.be.an.Array;
				(0, _chai.expect)(res.body.length).to.equal(2);
				(0, _chai.expect)(res.body[0]).to.have.property('url');
				(0, _chai.expect)(res.body[0]).to.have.property('description');
				(0, _chai.expect)(res.body[0]).to.have.property('addedBy');
				(0, _chai.expect)(res.body[0]).to.have.property('addedOn');
				(0, _chai.expect)(res.body[0]).to.have.property('likedBy');
				done();
			}).catch(err => done(err));
		});

		it('sends them in an descending array sorted by date', done => {
			const pinThree = new _pin2.default({
				url: 'http://pinThree.png',
				description: 'pinThree',
				addedBy: userOne,
				addedOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
			});

			pinThree.save().then(savedPin => {
				(0, _supertestAsPromised2.default)(app).get('/pins/all').then(res => {
					(0, _chai.expect)(res.body[0].description).to.equal('pinThree');
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});
	});

	describe('.addPin', () => {
		it('blocks unauth\'d users', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').then(res => {
				(0, _chai.expect)(res.text).to.equal('Unauthorized');
				done();
			}).catch(err => done(err));
		});

		it('sends back a response', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.status).to.not.equal(404);
				done();
			}).catch(err => done(err));
		});

		it('saves a pin', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').set('authorization', userOneToken).send({
				url: 'http://pinThree.png',
				description: 'pinThree'
			}).then(() => {
				_pin2.default.count().then(count => {
					(0, _chai.expect)(count).to.equal(3);
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('adds a pin to a user\'s "pins" array', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').set('authorization', userOneToken).send({
				url: 'http://pinThree.png',
				description: 'pinThree'
			}).then(() => {
				_user2.default.findById(userOne._id).populate('pins').then(user => {
					const index = user.pins.findIndex(pin => pin.description === 'pinThree');
					(0, _chai.expect)(index).to.not.equal(-1);
					(0, _chai.expect)(user.pins.length).to.equal(2);
					(0, _chai.expect)(user.pins[index].addedBy.toString()).to.equal(userOne._id.toString());
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('sends the saved pin as a response', done => {
			(0, _supertestAsPromised2.default)(app).post('/pins/add').set('authorization', userOneToken).send({
				url: 'http://pinThree.png',
				description: 'pinThree'
			}).then(res => {
				(0, _chai.expect)(res.body.url).to.equal('http://pinThree.png');
				(0, _chai.expect)(res.body.description).to.equal('pinThree');
				done();
			}).catch(err => done(err));
		});
	});

	describe('.deletePin', () => {
		it('blocks unauth\'d users', done => {
			(0, _supertestAsPromised2.default)(app).delete(`/pins/delete/${pinOne._id}`).then(res => {
				(0, _chai.expect)(res.text).to.equal('Unauthorized');
				done();
			}).catch(err => done(err));
		});

		it('sends back a response', done => {
			(0, _supertestAsPromised2.default)(app).delete(`/pins/delete/${pinOne._id}`).set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.status).to.not.equal(404);
				done();
			}).catch(err => done(err));
		});

		it('deletes a pin', done => {
			_pin2.default.count().then(count => {
				(0, _supertestAsPromised2.default)(app).delete(`/pins/delete/${pinOne._id}`).set('authorization', userOneToken).then(res => {
					_pin2.default.count().then(newCount => {
						(0, _chai.expect)(newCount).to.equal(count - 1);
						done();
					}).catch(err => done(err));
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('removes a pin from a user\'s "pins" array', done => {
			(0, _supertestAsPromised2.default)(app).delete(`/pins/delete/${pinOne._id}`).set('authorization', userOneToken).then(res => {
				_user2.default.findById(userOne._id).populate('pins').then(user => {
					const index = user.pins.findIndex(pin => pin.description === 'pinThree');
					(0, _chai.expect)(index).to.equal(-1);
					(0, _chai.expect)(user.pins.length).to.equal(0);
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('prevents users from deleting another user\'s pins', done => {
			(0, _supertestAsPromised2.default)(app).delete(`/pins/delete/${pinTwo._id}`).set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.body.error).to.equal('You cannot delete another user\'s pins');
				done();
			}).catch(err => done(err));
		});
	});

	describe('.likePin', () => {
		it('blocks unauth\'d users', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/like/${pinTwo._id}`).then(res => {
				(0, _chai.expect)(res.text).to.equal('Unauthorized');
				done();
			}).catch(err => done(err));
		});

		it('adds a user to a pin\'s "likedBy" array', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/like/${pinTwo._id}`).set('authorization', userOneToken).then(() => {
				_pin2.default.findById(pinTwo._id).populate('likedBy').then(pin => {
					(0, _chai.expect)(pin.likedBy.length).to.equal(1);

					(0, _chai.expect)(pin.likedBy[0].username).to.equal('usernameOne');
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('prevents a user liking a pin more than once', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/like/${pinOne._id}`).set('authorization', userTwoToken).then(res => {
				_pin2.default.findById(pinOne._id).populate('likedBy').then(pin => {
					(0, _chai.expect)(pin.likedBy.length).to.equal(1);

					(0, _chai.expect)(res.body.error).to.equal('User already liked this pin');

					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});
	});

	describe('.unlikePin', () => {
		it('blocks unauth\'d users', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/unlike/${pinOne._id}`).then(res => {
				(0, _chai.expect)(res.text).to.equal('Unauthorized');
				done();
			}).catch(err => done(err));
		});

		it('removes a user from a pin\'s "likedBy" array', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/unlike/${pinOne._id}`).set('authorization', userTwoToken).then(() => {
				_pin2.default.findById(pinOne._id).populate('likedBy').then(pin => {
					(0, _chai.expect)(pin.likedBy.length).to.equal(0);
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});

		it('sends an error message if the user has not previously liked the pin', done => {
			(0, _supertestAsPromised2.default)(app).put(`/pins/unlike/${pinOne._id}`).set('authorization', userOneToken).then(res => {
				_pin2.default.findById(pinOne._id).populate('likedBy').then(pin => {
					(0, _chai.expect)(pin.likedBy.length).to.equal(1);
					(0, _chai.expect)(res.body.error).to.equal('User must already have liked the pin');
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});
	});

	describe('.fetchPinsSignedInUser', () => {
		it('sends a response', done => {
			(0, _supertestAsPromised2.default)(app).get('/pins/signedinuser').set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.status).to.not.equal(404);
				done();
			}).catch(err => done(err));
		});

		it('blocks unauth\'d users', done => {
			(0, _supertestAsPromised2.default)(app).get('/pins/signedinuser').then(res => {
				(0, _chai.expect)(res.text).to.equal('Unauthorized');
				done();
			}).catch(err => done(err));
		});

		it('sends a list of a signed-in user\'s pins', done => {
			(0, _supertestAsPromised2.default)(app).get('/pins/signedinuser').set('authorization', userOneToken).then(res => {
				(0, _chai.expect)(res.body).to.be.an.Array;
				(0, _chai.expect)(res.body.length).to.equal(1);
				(0, _chai.expect)(res.body[0]).to.have.property('url');
				(0, _chai.expect)(res.body[0]).to.have.property('description');
				(0, _chai.expect)(res.body[0]).to.have.property('addedBy');
				(0, _chai.expect)(res.body[0]).to.have.property('addedOn');
				(0, _chai.expect)(res.body[0]).to.have.property('likedBy');
				done();
			}).catch(err => done(err));
		});

		it('sends them in an descending array sorted by date', done => {
			const pinThree = new _pin2.default({
				url: 'http://pinThree.png',
				description: 'pinThree',
				addedBy: userOne,
				addedOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
			});

			userOne.pins.push(pinThree);

			Promise.all([userOne.save(), pinThree.save()]).then(() => {
				(0, _supertestAsPromised2.default)(app).get('/pins/signedinuser').set('authorization', userOneToken).then(res => {
					(0, _chai.expect)(res.body.length).to.equal(2);
					(0, _chai.expect)(res.body[0].description).to.equal('pinThree');
					done();
				}).catch(err => done(err));
			}).catch(err => done(err));
		});
	});
}); /* eslint-disable */