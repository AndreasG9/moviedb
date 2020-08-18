const mongoose = require('mongoose');

// using tmdb api to majority of data, but using own api for a user's: session_id, username, location, bio, and four fav films (ids for tmdb);

const UserSchema = mongoose.Schema({
  // add more later? 

  username: {
    type: String,
    required: true,
    unique: true
  },

  session_id: {
    type: String,
    unique: true
  },

  location: { type: String },

  bio: { 
    type: String,
    max: 500
  },

  four_favs: [
    {
      movie_title: String,
      movie_id: String
    }
  ]
});

// middleware findone (with unique username)
// create if logged in throgh tmdb but doesnt exist here yet



const User = mongoose.model("User", UserSchema); 
module.exports = User; 