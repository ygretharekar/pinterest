/* eslint-disable */
import User from '../models/user';
import Pin from '../models/pin';
import request from 'supertest-as-promised';
import { expect } from 'chai';
import tokenForUser from '../services/token';

describe(
	'userController',
	() => {
		let userOne;
		let userTwo;
		let userOneToken;
		let userTwoToken;
		let pinOne;
		let pinTwo;

		beforeEach(
			done => {
				console.log('====================================');
				console.log('mocha mocha mocha');
				console.log('====================================');
				userOne = new User({
					username: 'usernameOne',
					twitterId: 'twitterIdOne',
					twitterScreenName: 'twitterScreenNameOne',
					twitterProfileImg: 'http://imgOne.png'
				});

				userTwo = new User({
					username: 'usernameTwo',
					twitterId: 'twitterIdTwo',
					twitterScreenName: 'twitterScreenNameTwo',
					twitterProfileImg: 'http://imgTwo.png'
				});

				
				userOneToken = tokenForUser(userOne);
				userTwoToken = tokenForUser(userTwo);

				pinOne = new Pin({
					url: 'http://pinOne.png',
					description: 'pinOne',
					addedBy: userOne,
				});

				pinTwo = new Pin({
					url: 'http://pinTwo.png',
					description: 'pinTwo',
					addedBy: userTwo,
				});

				userOne.pins = [pinOne];
				userTwo.pins = [pinTwo];
				pinOne.likedBy = [userTwo];

				Promise
					.all(
						[
							userOne.save(),
							userTwo.save(),
							pinOne.save(),
							pinTwo.save()
						]
					)
					.then(() => done())
					.catch(err => done(err));			
			}
		);

		describe(
			'.signInSuccess',
			() => {
				it('sends error message to unauthorized users', (done) => {
					request(app)
						.get('/user/signinsuccess')
						.then(res => {
							expect(res.body.error).to.equal('Insufficient permission');
							done();
						})
						.catch(err => done(err));
				});

				xit(
					'sends token to authorized user',
					done => {
						request(app)
							.get('/user/signinsuccess')
							.set('cookie', 'connect.sid=s%3AsRmj1zUFf5y5gJlu9W9tPlV1C_RZ7wIu.baxq6nQfOIA9hj%2FgapFE%2FJY429dumna6OjrDL1S2HqA')
							.then(res => {
								expect(res.body.token).to.exist;
								done();
							})
							.catch(err => done(err));
					}
				);
			}
		);
		
		describe('.signOutUser', () => {
			it('sends back a response', (done) => {
			request(app)
				.post('/pins/add')
				.set('authorization', userOneToken)
				.then(res => {
				expect(res.stats).to.not.equal(404);
				done();
				})
				.catch(err => done(err));
			});
		});

		describe('.fetchUser', () => {
			it('sends a response', (done) => {
			request(app)
				.get(`/user/${userOne._id}`)
				.then(res => {
				expect(res.status).to.not.equal(404);
				done();
				})
				.catch(err => done(err));
			});

			it('sends data about a requested user', (done) => {
			request(app)
				.get(`/user/${userOne._id}`)
				.then(res => {
				expect(res.body).to.have.property('username');
				expect(res.body).to.have.property('twitterId');
				expect(res.body).to.have.property('twitterScreenName');
				expect(res.body).to.have.property('twitterProfileImg');
				expect(res.body).to.have.property('pins');
				expect(res.body).to.have.property('createdOn');
				done();
				})
				.catch(err => done(err));
			});

			it('deep populates the returned user object', (done) => {
			request(app)
				.get(`/user/${userOne._id}`)
				.then(res => {
				expect(res.body.pins[0]).to.have.property('addedBy');
				expect(res.body.pins[0].addedBy).to.have.property('username');
				expect(res.body.pins[0]).to.have.property('likedBy');
				expect(res.body.pins[0].likedBy[0]).to.have.property('username');
				done();
				})
				.catch(err => done(err));
			});
		});
	}	
);