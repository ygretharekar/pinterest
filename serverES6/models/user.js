import mongoose from 'mongoose';
import findOrCreate from 'findorcreate-promise';

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: String,
  twitterId: String,
  twitterScreenName: String,
  twitterProfileImg: String,
  pins: [{
    type: Schema.Types.ObjectId,
    ref: 'pin',
  }],
  createdOn: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.plugin(findOrCreate);

const User = mongoose.model('user', UserSchema);

export default User;