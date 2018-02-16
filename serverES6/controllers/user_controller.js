import User from '../models/user';
import tokenForUser from '../services/token';

export const signInSuccess = (req, res) =>  {
	if (req.user) {
		const token = tokenForUser(req.user);
		res.send({ token , user: req.user });
	}
	else {
		res.json({ error: 'Insufficient permission' });
	}
};

export const signOutUser = (req, res) => {
	req.logout();
	res.json({signedOut: true});
};

export const fetchUser = (req, res) => {
	const { userId } = req.params;

	User
		.findById(userId)
		.populate(
			{
				path: 'pins',
				options: { sort: { addedOn: -1 }},
				populate: { path: 'addedBy' },
			}
		)
		.populate(
			{
				path: 'pins',
				options: { sort: { addedOn: -1 }},
				populate: { path: 'likedBy' },
			}
		)
		.then(user => res.send(user))
		.catch(
			err => {
				console.log(err);
				res.json({ error: 'User could not be retrieved' });
			}
		);
};