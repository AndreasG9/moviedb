const mongoose = require('mongoose');
// using tmdb api for majority of data, but using own api for a user's: session_id, username, location, bio, and four fav films (ids for tmdb);

const UserSchema = mongoose.Schema({
  // move to details!
  username: { type: String, required: true, unique: true },
  location: { type: String },
  bio: { type: String, max: 500 },
  four_favs: [
    {
      movie_title: String,
      movie_id: String
    }
  ]

  // TODO favorites, watchlist, lists (data for each list included)
});

const User = mongoose.model("User", UserSchema); 
module.exports = User; 