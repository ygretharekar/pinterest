import express from 'express';
import path from 'path';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import fallback from 'express-history-api-fallback';
import dotenv from 'dotenv';

import routes from './routes';

dotenv.config();

export default app => {
	app.use(express.static('build'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static(path.join(__dirname, '../build')));
	
	app.use(session({
		cookie: { path: '/', httpOnly: true, maxAge: 36000000 },
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true
	}));

	routes(app);

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(fallback(__dirname + '../build/index.html'));

};