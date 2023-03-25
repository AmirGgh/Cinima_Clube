const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: String,
    genres: [],
    image: String,
    premiered: String,
    summary: String,
    subsWatches: [{}],
  },
  { versionKey: false }
);
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { versionKey: false }
);
const memberSchema = new mongoose.Schema(
  {
    idUser: String,
    firstName: String,
    lastName: String,
    email: String,
    city: String,
  },
  { versionKey: false }
);
const subscriptionSchema = new mongoose.Schema(
  {
    memberID: String,
    movieWatched: [String],
    dateWatched: [String],
  },
  { versionKey: false }
);

const Movie = mongoose.model('movie', movieSchema);
const Member = mongoose.model('member', memberSchema);
const User = mongoose.model('user', userSchema);
const Subscription = mongoose.model('subscription', subscriptionSchema);

module.exports = { Movie, Member, User, Subscription }
