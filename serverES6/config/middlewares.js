import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import fallback from 'express-history-api-fallback';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import routes from './routes';

dotenv.config();

export default app => {
	app.use(express.static(path.join(__dirname, '../../build')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	app.use(cors());

	mongoose.connect(process.env.MONGODB_TEST_URI);

	mongoose
		.connection
		.once(
			'open', 
			() => {
				console.log('====================================');
				console.log('test database connection established');
				console.log('====================================');
			}
		)
		.on(
			'error',
			err => {
				console.error(err);
			}
		);

	app.use(
		session(
			{
				cookie: { path: '/', httpOnly: true, maxAge: 36000000 },
				secret: process.env.SESSION_SECRET,
				resave: true,
				saveUninitialized: true
			}
		)
	);
	
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(fallback(path.join(__dirname + './build/index.html')));
	
	routes(app);
};