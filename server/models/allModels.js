const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: String,
    genres: [String],
    image: String,
    premiered: Date,
    summary: String,
  },
  { versionKey: false }
);
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  }
);
const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
  }
);
const subscriptionSchema = new mongoose.Schema(
  {
    memberID: String,
    movieWatched: [String],
  }
);

const Movie = mongoose.model('movie', movieSchema);
const Member = mongoose.model('member', memberSchema);
const User = mongoose.model('user', userSchema);
const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = { Movie, Member, User, Subscription }
