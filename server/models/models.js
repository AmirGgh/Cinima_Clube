const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
    username: String,
    email: String,
    city: String,
});
const usersLoginSchema = new Schema({
    username: String,
    password: String,
});
const moviesSchema = new Schema({
    username: String,
    ganres: [String],
    image: { String },
    premiered: Number,
    summary: String,
});
const subscriptionsSchema = new Schema({
    memberID: String,
    moviWatch: [String],
});


const user = mongoose.model('user', usersSchema)
const userLogin = mongoose.model('userLogin', usersLoginSchema)
const movie = mongoose.model('movie', moviesSchema)
const subscription = mongoose.model('subscription', subscriptionsSchema)
module.exports = { user, movie, subscription, userLogin }

