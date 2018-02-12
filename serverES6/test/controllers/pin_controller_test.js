/* eslint-disable */
import User from '../models/user';
import Pin from '../models/pin';
import request from 'supertest-as-promised';
import {expect} from 'chai';
import tokenForUser from '../services/token';


describe(
	'pinController',
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
						addedBy: userOne
					});

					pinTwo = new Pin({
						url: 'http://pinTwo.png',
						description: 'pinTwo',
						addedBy: userTwo
					});

					userOne.pins = [pinOne];
					userTwo.pins = [pinTwo];
					pinOne.likedBy = [userTwo];

					Promise
						.all([userOne.save(), userTwo.save(), pinOne.save(), pinTwo.save()])
						.then(() => done())
						.catch(err => done(err));
			}
		);

		describe(
			'.fetchPinsAll',
			() => {
				it(
					'fetches list  of all pins',
					done => {
						request(app)
							.get('/pins/all')
							.then(res => {
							expect(res.body).to.be.an.Array;
							expect(res.body.length).to.equal(2);
							expect(res.body[0]).to.have.property('url');
							expect(res.body[0]).to.have.property('description');
							expect(res.body[0]).to.have.property('addedBy');
							expect(res.body[0]).to.have.property('addedOn');
							expect(res.body[0]).to.have.property('likedBy');
							done();
							})
							.catch(err => done(err));
					}
				);

				it(
					'sends them in an descending array sorted by date', 
					done => {
						const pinThree = new Pin({
							url: 'http://pinThree.png',
							description: 'pinThree',
							addedBy: userOne,
							addedOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
						});

						pinThree
							.save()
							.then(
								savedPin => {
									request(app)
										.get('/pins/all')
										.then(res => {
										expect(res.body[0].description).to.equal('pinThree');
										done();
										})
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);
			}
		);
		
		describe(
			'.addPin',
			() => {
				it(
					'blocks unauth\'d users', 
					done => {
						request(app)
							.post('/pins/add')
							.then(res => {
							expect(res.text).to.equal('Unauthorized');
							done();
							})
							.catch(err => done(err));
					}
				);

				it(
					'sends back a response', 
					done => {
						request(app)
							.post('/pins/add')
							.set('authorization', userOneToken)
							.then(res => {
							expect(res.status).to.not.equal(404);
							done();
							})
							.catch(err => done(err));
					}
				);

				it(
					'saves a pin', 
					done => {
						request(app)
							.post('/pins/add')
							.set('authorization', userOneToken)
							.send(
								{
									url: 'http://pinThree.png',
									description: 'pinThree',
								}
							)
							.then(
								() => {
									Pin
										.count()
										.then(
											count => {
												expect(count).to.equal(3);
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'adds a pin to a user\'s "pins" array', 
					done => {
						request(app)
							.post('/pins/add')
							.set('authorization', userOneToken)
							.send(
								{
									url: 'http://pinThree.png',
									description: 'pinThree',
								}
							)
							.then(
								() => {
									User
										.findById(userOne._id)
										.populate('pins')
										.then(
											user => {
												const index = user.pins.findIndex(
													pin => pin.description === 'pinThree'
												);
												expect(index).to.not.equal(-1);
												expect(user.pins.length).to.equal(2);
												expect(user.pins[index].addedBy.toString()).to.equal(
													userOne._id.toString()
												);
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'sends the saved pin as a response', 
					done => {
						request(app)
							.post('/pins/add')
							.set('authorization', userOneToken)
							.send(
								{
									url: 'http://pinThree.png',
									description: 'pinThree',
								}
							)
							.then(
								res => {
									expect(res.body.url).to.equal('http://pinThree.png');
									expect(res.body.description).to.equal('pinThree');
									done();
								}
							)
							.catch(err => done(err));
					}
				);
			}
		);

		describe(
			'.deletePin',
			() => {
				it(
					'blocks unauth\'d users', 
					done => {
						request(app)
							.delete(`/pins/delete/${pinOne._id}`)
							.then(
								res => {
									expect(res.text).to.equal('Unauthorized');
									done();
								}
							)
							.catch(err => done(err));
    				}
				);

				it(
					'sends back a response', 
					done => {
						request(app)
							.delete(`/pins/delete/${pinOne._id}`)
							.set('authorization', userOneToken)
							.then(
								res => {
									expect(res.status).to.not.equal(404);
									done();
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'deletes a pin', 
					done => {
						Pin
							.count()
							.then(
								count => {
									request(app)
										.delete(`/pins/delete/${pinOne._id}`)
										.set('authorization', userOneToken)
										.then(
											res => {
												Pin.count()
													.then(
														newCount => {
															expect(newCount).to.equal(count - 1);
															done();
														}
													)
													.catch(err => done(err));
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}			
				);

				it(
					'removes a pin from a user\'s "pins" array', 
					done => {
						request(app)
							.delete(`/pins/delete/${pinOne._id}`)
							.set('authorization', userOneToken)
							.then(
								res => {
									User
										.findById(userOne._id)
										.populate('pins')
											.then(
												user => {
													const index = user.pins.findIndex(
														pin => pin.description === 'pinThree'
													);
													expect(index).to.equal(-1);
													expect(user.pins.length).to.equal(0);
													done();
												}
											)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}			
				);

				it(
					'prevents users from deleting another user\'s pins', 
					done => {
						request(app)
							.delete(`/pins/delete/${pinTwo._id}`)
							.set('authorization', userOneToken)
							.then(
								res => {
									expect(res.body.error)
										.to
										.equal('You cannot delete another user\'s pins');
									done();
								}
							)
							.catch(err => done(err));
					}
				);
			}
		);

		describe(
			'.likePin',
			() => {
				it(
					'blocks unauth\'d users', 
					done => {
						request(app)
							.put(`/pins/like/${pinTwo._id}`)
							.then(
								res => {
									expect(res.text).to.equal('Unauthorized');
									done();
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'adds a user to a pin\'s "likedBy" array', 
					done => {
						request(app)
							.put(`/pins/like/${pinTwo._id}`)
							.set('authorization', userOneToken)
							.then(
								() => {
									Pin.findById(pinTwo._id)
										.populate('likedBy')
										.then(
											pin => {
												expect(pin.likedBy.length)
												.to
												.equal(1);

												expect(pin.likedBy[0].username)
													.to
													.equal('usernameOne');
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'prevents a user liking a pin more than once', 
					done => {
						request(app)
							.put(`/pins/like/${pinOne._id}`)
							.set('authorization', userTwoToken)
							.then(
								(res) => {
									Pin.findById(pinOne._id)
										.populate('likedBy')
										.then(
											pin => {
												expect(pin.likedBy.length)
													.to
													.equal(1);

												expect(res.body.error)
													.to
													.equal('User already liked this pin');

												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);

			}
		);

		describe(
			'.unlikePin',
			() => {
				it(
					'blocks unauth\'d users', 
					done => {
						request(app)
							.put(`/pins/unlike/${pinOne._id}`)
							.then(
								res => {
									expect(res.text).to.equal('Unauthorized');
									done();
								}
							)
							.catch(err => done(err));
						}
				);


				it(
					'removes a user from a pin\'s "likedBy" array', 
					done => {
						request(app)
							.put(`/pins/unlike/${pinOne._id}`)
							.set('authorization', userTwoToken)
							.then(
								() => {
									Pin.findById(pinOne._id)
										.populate('likedBy')
										.then(
											pin => {
												expect(pin.likedBy.length).to.equal(0);
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'sends an error message if the user has not previously liked the pin', 
					done => {
						request(app)
							.put(`/pins/unlike/${pinOne._id}`)
							.set('authorization', userOneToken)
							.then(
								(res) => {
									Pin.findById(pinOne._id)
										.populate('likedBy')
										.then(
											pin => {
												expect(pin.likedBy.length).to.equal(1);
												expect(res.body.error)
													.to
													.equal('User must already have liked the pin');
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);
			}
		);

		describe(
			'.fetchPinsSignedInUser',
			() => {
				it(
					'sends a response', 
					done => {
						request(app)
							.get('/pins/signedinuser')
							.set('authorization', userOneToken)
							.then(
								res => {
									expect(res.status).to.not.equal(404);
									done();
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'blocks unauth\'d users', 
					done => {
						request(app)
							.get('/pins/signedinuser')
							.then(
								res => {
									expect(res.text).to.equal('Unauthorized');
									done();
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'sends a list of a signed-in user\'s pins', 
					done => {
						request(app)
							.get('/pins/signedinuser')
							.set('authorization', userOneToken)
							.then(
								res => {
									expect(res.body).to.be.an.Array;
									expect(res.body.length).to.equal(1);
									expect(res.body[0]).to.have.property('url');
									expect(res.body[0]).to.have.property('description');
									expect(res.body[0]).to.have.property('addedBy');
									expect(res.body[0]).to.have.property('addedOn');
									expect(res.body[0]).to.have.property('likedBy');
									done();
								}
							)
							.catch(err => done(err));
					}
				);

				it(
					'sends them in an descending array sorted by date', 
					done => {
						const pinThree = new Pin(
							{
								url: 'http://pinThree.png',
								description: 'pinThree',
								addedBy: userOne,
								addedOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
							}
						);

						userOne.pins.push(pinThree);

						Promise
							.all([userOne.save(), pinThree.save()])
							.then(
								() => {
									request(app)
										.get('/pins/signedinuser')
										.set('authorization', userOneToken)
										.then(
											res => {
												expect(res.body.length).to.equal(2);
												expect(res.body[0].description).to.equal('pinThree');
												done();
											}
										)
										.catch(err => done(err));
								}
							)
							.catch(err => done(err));
					}
				);
			}
		);
	}

);