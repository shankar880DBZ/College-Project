const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Flix");

const adminSchema = mongoose.Schema({
  username : {
    type: String,
    unique: true,
    required: true
  },
  password: String
});

adminSchema.plugin(plm);

module.exports = mongoose.model('admins', adminSchema);
