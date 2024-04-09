const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Flix");

const userSchema = mongoose.Schema({
  username : {
    type: String,
    unique: true,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  password: String
});

userSchema.plugin(plm);

module.exports = mongoose.model('users', userSchema);
