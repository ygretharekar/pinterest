import express from 'express';

import Pin from '../models/pin';
import User from '../models/user';

export const fetchAllPins = (req, res) => {
  Pin
	.find({})
	.populate('addedBy')
	.populate('likedBy')
	.sort({addedOn: -1})
	.then(pins => res.send(pins))
	.catch(
		err => {
			console.error(err);
			res.json({error: 'Pins could not be retrieved'});			
		}
	)
}

export const fetchPinsOfUser = (req, res) => {
	const {user} = req;
	
	Pin
		.find({addedBy: user})
		.populate('addedBy')
		.populate('likedBy')
		.sort({addedOn: -1})
		.then(pins => res.send(pins))
		.catch(
			err => {
				console.error(err);
				res.json({error: 'Pins could not be retrieved'});
			}
		);
}

export const addPin = (req, res) =>  {
	const { url, description } = req.body;
	const { user } = req;


	User
		.findById(user._id)
		.then(
			user => {

				const pin = new Pin({ url, description, addedBy: user });
				user.pins.push(pin);

				Promise
					.all([pin.save(), user.save()])
					.then(results => res.json(results[0]))
					.catch(
						err => {
							console.log(err);
							res.json({ error: 'Pin could not be saved' });
					}
				);
			}
		)
		.catch(
			err => {
				console.log(err);
				res.json({ error: 'User could not be retrieved' })
			}
		);
};

export const deletePin = (req, res) =>  {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;

	Pin
		.findById(pinId)
		.populate('addedBy')
		.then(
			pin => {
				const { addedBy } = pin;

				if (user._id.toString() !== addedBy._id.toString()) 
					return res.json({ error: 'You cannot delete another user\'s pins' });

				pin
					.remove()
					.then(deletedPin => res.send(deletedPin))
					.catch(
						err => {
							console.log(err);
							res.json({ error: 'Pin could not be deleted' });
						}
					)
			}
		)
		.catch(
			err => {
				console.log(err);
				res.json({ error: 'Pin could not be retrieved' });
			}
		);
};

export const likePin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;


	Pin
		.findById(pinId)
		.populate('likedBy')
		.populate('addedBy')
		.then(
			pin => {
				const { likedBy } = pin;
				const index = pin.likedBy.findIndex(
					likedByUser => likedByUser._id.toString() === user._id.toString()
				);

				if (index !== -1) return res.json({ error: 'User already liked this pin' });

				pin.likedBy.push(user);

				pin
					.save()
					.then(savedPin => res.send(savedPin))
					.catch(
						err => {
							console.log(err);
							res.json({ error: 'Pin could not be updated' });
						}
					)
			}
		)
		.catch(
			err => {
				console.log(err);
				res.json({ error: 'Pin could not be retrieved' });
			}
		);
}

export const unlikePin = (req, res) => {
	const { url, description } = req.body;
	const { user } = req;
	const { pinId } = req.params;

	Pin
		.findById(pinId)
		.populate('likedBy')
		.populate('addedBy')
		.then(
			pin => {
				const { likedBy } = pin;
				const index = pin.likedBy.findIndex(
					likedByUser => likedByUser._id.toString() === user._id.toString()
				);

				if (index === -1) return res.json({ error: 'User must already have liked the pin' });

				pin.likedBy.splice(index, 1);
				pin
					.save()
					.then(savedPin => res.send(savedPin))
					.catch(
						err => {
							console.log(err);
							res.json({ error: 'Pin could not be updated' });
						}
					)
			}
		)
		.catch(
			err => {
				console.log(err);
				res.json({ error: 'Pin could not be retrieved' });
			}
		);
}
