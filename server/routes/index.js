const express = require("express");
const api_router = express.Router();
const user_router = require("./user");

api_router.use("/user", user_router); 

module.exports = api_router; 