const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Flix");

const movieSchema = mongoose.Schema({
  thumbnail_v: {
    type: String,
    required: true,
  },
  thumbnail_h: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  movie: {
    type: String,
    required: true,
  },
  slide: {
    type: Boolean,
    default: false,
  },
  special: {
    type: Boolean,
    default: false,
  },
  latest: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false,
  },
  movieTrue: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("movies", movieSchema);
