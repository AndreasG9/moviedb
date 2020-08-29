const express = require("express");
const user_router = express.Router(); 


const { get_user, add_user, update_user_details, update_watchlist } = require("../controllers/user_controller"); 

user_router.post("/add", add_user); 
user_router.get("/:username", get_user); 
user_router.put("/:username/edit", update_user_details); 

//user_router.get("/:username/watchlist/movies", get_watchlist); 
user_router.post("/:username/watchlist", update_watchlist);


//user_router.put(":/username/favorites", update_favorites);



module.exports = user_router; 