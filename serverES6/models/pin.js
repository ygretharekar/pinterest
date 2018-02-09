import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PinSchema = new Schema({
  url: String,
  description: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  addedOn: {
    type: Date,
    default: Date.now(),
  }
});

const Pin = mongoose.model('pin', PinSchema);

export default Pin;