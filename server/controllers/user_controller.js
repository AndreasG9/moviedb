const User = require("../models/User"); 


module.exports.get_user = async ( req, res ) => {
  // get user from db/collection (by username)
  // if dont find, client will make POST req. to add_user 

    const user = await User.findOne({username: req.params.username});

    if(!user){
      // not found, 
      return res.status(404).send({success: false, message: "username NOT found"}); 
    }

    res.send(user); // success 
}

module.exports.add_user = async (req, res) => {
  // react app will send username (required) over, and other data for the model (if present)
  // save to db/collection 

  const model = new User({
    // only username is required 
    username: req.body.username,
    session_id: req.body.session_id,
    location: req.body.location,
    bio: req.body.bio,
    four_favs: req.body.four_favs
  }); 

  try{
    // add to db 
    const user_data = await model.save();
    res.send({success: true, user: user_data}); // status 200 
  }
  catch(error){
    res.status(404).send({success: false, message: "could not ADD user"}); 
  }

}

module.exports.update_user = async(req, res) => {
  // update session_id, location, bio, or four_favs to an existing user in the collection 
    
  const update = {
    // ... 
    location: req.body.location,  
    bio: req.body.bio, 
    four_favs: req.body.four_favs
  }

  // update doc
  await User.findOneAndUpdate({username: req.params.username}, update, { new: true, useFindAndModify: false})
    .then(data => res.send({success: true, updated: data}))
    .catch(err => res.status(400).send({success: false, message: "could not UPDATE user"})); 
}
