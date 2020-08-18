const express = require("express");
const user_router = express.Router(); 



user_router.get("/", (req, res) => {
  res.send("we are on /api/user"); 
});


module.exports = user_router; 