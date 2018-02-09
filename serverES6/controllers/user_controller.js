import  passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import User from '../models/user';

const twitterLogin = new TwitterStrategy(
	{
		consumerKey: process.env.CONSUMER_KEY,
		consumerSecret: process.env.CONSUMER_SECRET,
		callbackURL : 'http://127.0.0.1:3000/auth/twitter/callback'
	},
	(token, tokenSecret, profile, done) => {
		User.findOrCreate(
			{
				twitterId: profile.Id
			},
			{
				username: profile.displayName,
				twitterId: profile.id,
				twitterScreenName: `@${profile._json.screen_name}`,
				twitterProfileImg: profile._json.profile_image_url
			}
		)
			.then(user => done(null, user.result))
			.catch(err => done(err));
	}
);


passport.use(twitterLogin);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			// console.log(user);
			done(null, user);
		})
		.catch(err => done(err));
		
});