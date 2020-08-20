const express = require("express");
const user_router = express.Router(); 


const { get_user, add_user, update_user } = require("../controllers/user_controller"); 

user_router.get("/:username", get_user); 
user_router.post("/add", add_user); 
user_router.put("/:username/edit", update_user); 


module.exports = user_router; 