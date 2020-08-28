const mongoose = require('mongoose');

const Film = mongoose.Schema({
  id: Number,
  title: String,
  release_date: String, 
  poster_path: String, 
  rating: Number 
});

const List = mongoose.Schema({
  id: String,
  name: String, 
  description: String,
  items: [ Film ]
}); 

const UserSchema = mongoose.Schema({
  
  username: { type: String, required: true, unique: true },

  details: {
    location: String,
    bio: String, 
    four_favs: [ Film ] 
  },

  watchlist: [ Film ],
  favorites: [ Film ],
  ratings: [ Film ], 
  lists: [ List ]
});

const User = mongoose.model("User", UserSchema); 
module.exports = User; 