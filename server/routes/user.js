const express = require("express");
const user_router = express.Router(); 


const { get_user, add_user, update_user_details, update_watchlist, update_favorites, update_ratings } = require("../controllers/user_controller"); 

user_router.post("/add", add_user); 
user_router.get("/:username", get_user); 
user_router.put("/:username/edit", update_user_details); 

//user_router.get("/:username/watchlist/movies", get_watchlist); 
user_router.post("/:username/watchlist", update_watchlist);

//user_router.get("/:username/favorites/movies", get_favorites); 
user_router.post("/:username/favorites", update_favorites);

//user_router.get("/:username/ratings/movies", get_ratings); 
user_router.post("/:username/ratings", update_ratings);

module.exports = user_router; 