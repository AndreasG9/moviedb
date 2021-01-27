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


module.exports.update_favorites = async (req, res) => {

  if(req.body.favorite === true){
    // add film to favorites 
    
    await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { favorites: req.body.film }}, 
      { new: true, useFindAndModify: false })
      .then(res.send({success: true, message: "film added to favorites"}))
      .catch(err => res.status(400).send({success: false, message: "could not ADD to favorites"})); 
  }

  else{
    // remove film from favorites

    await User.findOneAndUpdate(
      { username: req.params.username },
      { $pull: { favorites: {id: req.body.film.id} }}, 
      { new: true, useFindAndModify: false })
      .then(res.send({success: true, message: "film removed from favorites"}))
      .catch(err => res.status(400).send({success: false, message: "could not REMOVE from favorites"})); 
  }
}

module.exports.update_ratings = async(req, res) => {
  // push or set rating to film in ratings

  const user = await User.findOne({username: req.params.username});
  let found = user.ratings.find(film => film.id === req.body.film.id); 

  if(found){
    // rated, replace current film rating (or remove film if remove rating)

    if(req.body.film.rating === 0){
      // remove rated film all together 

      await User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { ratings: {id: req.body.film.id} }}, 
        { new: true, useFindAndModify: false })
        .then(res.send({success: true, message: "film removed from ratings"}))
        .catch(err => res.status(400).send({success: false, message: "could not REMOVE from ratings"})); 
    }

    else{
      // update rating 

      await User.findOneAndUpdate({username: req.params.username, 'ratings.id': req.body.film.id}, 
        { $set: { 'ratings.$.rating': req.body.film.rating } },
        { new: true, useFindAndModify: false }) 
        .then(res.send({success: true, message: "film rated"}))
        .catch(err => res.status(400).send({success: false, message: "could not RATE film"}));  
    }
  }

  else{
    // not rated, add film + rating 
    await User.updateOne({username: req.params.username}, 
      { $push : { ratings: req.body.film } }, 
      { new: true, useFindAndModify: false } )
    .then(res.send({success: true, message: "film rated"}))
    .catch(err => res.status(400).send({success: false, message: "could not RATE film"}));  
  }
}

module.exports.update_lists = async(req, res) => {
  // NEW or EDIT! 

  const user = await User.findOne({username: req.params.username});
  let found = user.lists.find(list => list._id === req.body.id); 

  if(found){
    // update exisiting list (name, desc, and/or items)
    console.log("edit list");

  }
  else{
    // new list 
    console.log("new list");
    await User.updateOne({username: req.params.username}, 
      { $push : { lists: req.body } }, 
      { new: true, useFindAndModify: false } )
    .then(res.send({success: true, message: "list created"}))
    .catch(err => res.status(400).send({success: false, message: "could not create new list"}));  
  }
}

module.exports.delete_list = async(req, res) => {
  // delete a list

  const user = await User.findOne({username: req.params.username});
  let found = false; 

  user.lists.forEach( list => {
    // eslint-disable-next-line eqeqeq
    if(list._id == req.params.list) found = true; 
  })

  if(found){
    await User.updateOne({username: req.params.username}, 
      { $pull: {lists: { _id: req.params.list } } }, 
      { new: true, useFindAndModify: false } )
      .then(res.send({success: true, message: "list deleted"}))
      .catch(err => res.status(400).send({success: false, message: "failed to delete list"}));
  }
  
}

module.exports.temp = async(req, res) => {

  res.send("HELLO");
}
 //////////////////////////// dont forget to include rating if sent ******