import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user';

dotenv.config();

const twitterLogin = new TwitterStrategy(
	{
		consumerKey: process.env.CONSUMER_KEY,
		consumerSecret: process.env.CONSUMER_SECRET,
		callbackURL: 'http://127.0.0.1:8100/auth/twitter/callback'
	}, 
	(token, tokenSecret, profile, done) => {
		User.findOrCreate(
			{
				twitterId: profile.id
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

const jwtLogin = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromHeader('authorization'),
		secretOrKey: process.env.SECRET
	},
	(jwt_payload, done) => {
		User
			.findById(
				jwt_payload.sub
			)
			.then(
				user => {
					if(user) done(null, user);
					else done(null, false);
				}
			)
			.catch(err => done(err, false));
	}
);

passport.use(jwtLogin); 
passport.use(twitterLogin);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
	User
		.findById(id)
		.then(user => {
			console.log(user);
			done(null, user);
		})
		.catch(err => done(err));
});
