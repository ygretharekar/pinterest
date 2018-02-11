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
				it('sends error message to unauthorised users', (done) => {
					request(app)
						.get('/user/signinsuccess')
						.then(res => {
							expect(res.body.error).to.equal('Insufficient permission');
							done();
						})
						.catch(err => done(err));
				});

				
			}
		);
	}
);