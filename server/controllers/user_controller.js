const User = require("../models/User"); 


module.exports.get_user = async ( req, res ) => {
  // get user from db/collection (by username)
  // if dont find, client will make POST req. to add_user 

    const user = await User.findOne({username: req.params.username});

    if(!user){
      // not found, 
      return res.status(404).send({success: false, message: "username NOT found"}); 
    }

    res.send(user); // success, send all user data (including watchlist, ratings, etc... ) 
}

module.exports.add_user = async (req, res) => {
  // react app will send username (required) over, and other data for the model (if present)
  // save to db/collection 

  const model = new User({
    // only username is required 
    username: req.body.username,
    details: req.body.details,
    watchlist: req.body.watchlist,
    ratings: req.body.ratings,
    favorites: req.body.favorites,
    lists: req.body.lists
  }); 

  try{
    // add to db 
    const user_data = await model.save();
    res.send(user_data); // status 200 
  }
  catch(error){
    res.status(404).send({success: false, message: "could not ADD user"}); 
  }

}

module.exports.update_user_details = async(req, res) => {
  // location, bio, and/or four_favs to an existing user in the collection 
    
  const update = {
    details : req.body
  }

  // update doc
  await User.findOneAndUpdate({username: req.params.username}, update, { new: true, useFindAndModify: false})
    .then(data => res.send(data))
    .catch(err => res.status(400).send({success: false, message: "could not UPDATE user"})); 
}

module.exports.update_watchlist = async (req, res) => {

  if(req.body.watchlist === true){
    // add film to watchlist 
    
    await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { watchlist: req.body.film }}, 
      { new: true, useFindAndModify: false })
      .then(res.send({success: true, message: "film added to watchlist"}))
      .catch(err => res.status(400).send({success: false, message: "could not ADD to watchlist"})); 
  }

  else{
    // remove film from watchlist 

    await User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { watchlist: {id: req.body.film.id} }}, 
      { new: true, useFindAndModify: false })
      .then(res.send({success: true, message: "film removed from watchlist"}))
      .catch(err => res.status(400).send({success: false, message: "could not REMOVE from watchlist"})); 
  }
}

module.exports.get_watchlist = async (req, res) => {
  // return a users watchlist 
}
 
 //////////////////////////// dont forget to include rating if sent ******

