/* eslint-disable */
import mongoose from "mongoose";


before(
	done => {
		mongoose.connect(process.env.MONGODB_TEST_URI);

		mongoose
			.connection
			.once(
				'open', 
				() => {
					console.log('====================================');
					console.log('test database connection established');
					console.log('====================================');
					done();
				}
			)
			.on(
				'error',
				err => {
					console.error(err);
					done();
				}
			);
	}
);

beforeEach(
	done => {
		const { users, pins } = mongoose.connection.collections;

		Promise
			.all(
				[
					users.drop(),
					pins.drop()
				]
			)
			.then(() => done())
			.catch(() => done());
	}
);