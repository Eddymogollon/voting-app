const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const pollSchema = new Schema({
  title: String,
  options: [{ 
    option: String, 
    votes: {
      type: Number, default: 0}, 
      _id: false 
    }],
  ownerId: ObjectId,
  usersVoted: {
    type: [String],
    default: []
  }
});


mongoose.model('polls', pollSchema);


const Poll = mongoose.model('polls');