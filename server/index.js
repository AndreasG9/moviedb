const express = require("express");
const mongoose = require("mongoose");
const app = express(); 
const PORT = process.env.PORT || 8000; 
require("dotenv/config"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  


// Routes 
const api_router = require("./routes"); 
app.use("/api", api_router); 


// Connect mongodb
mongoose.connect(process.env.MONGO_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true}, 
  () => console.log("connected to db"))
  .catch(error => console.log(error)); 


// todo production, no proxy 
app.listen(PORT); 
console.log("server listenting on port: " + PORT);