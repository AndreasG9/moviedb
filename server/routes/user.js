const express = require("express");
const user_router = express.Router(); 

const { get_user, add_user, update_user_details, update_watchlist, update_favorites, update_ratings, update_lists, temp } = require("../controllers/user_controller"); 

user_router.post("/add", add_user); 
user_router.get("/:username/data", get_user); 

user_router.put("/:username/edit", update_user_details); 
user_router.post("/:username/watchlist", update_watchlist);
user_router.post("/:username/favorites", update_favorites);
user_router.post("/:username/ratings", update_ratings);
user_router.post("/:username/lists", update_lists);

module.exports = user_router; 