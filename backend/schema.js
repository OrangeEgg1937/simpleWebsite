// Initialize Mongoose
const mongoose = require('mongoose');

// Define the Mongoose schema for storing data in MongoDB
const UserSchema = mongoose.Schema({
    userid: Number,
    username: String,
    password: String,
    isAdmin: Boolean,
})

const User = mongoose.model('User', UserSchema);