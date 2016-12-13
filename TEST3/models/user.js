const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	fav:{
		type: String,
		required: true
	}
});

const User = module.exports = mongoose.model('User', userSchema);

// Get Users
module.exports.getUsers = (callback, limit,err) => {
	User.find(callback).limit(limit);
}

// Get User
module.exports.getUserById = (id, callback) => {
	User.findById(id, callback); //true
	/* User.findById(id, function(err, brother, res) {

    });*/
    //User.findById( {_id : id }, function(err, callback){
    //console.log(callback.name);  
    // Will show your array of Menu Categories
    // No further queries required
    /*User.findOne({ _id: id }, function ( err, user) {
    	err.send(user);
    });*/

    /*User.findById(id, function(error, user) {
      //assert.ifError(error);
      //assert.ok(doc);
      //console.log(JSON.stringify(doc));
      console.log(id);
      console.log('done');
     // process.exit(0);
    });*/

  /*  User.findOne({ '_id': '5844e7996326c0fb6cda1159' },  function (err, user, next) {
	  if (err) return handleError(err);
	  if(user) {
	  	console.log('%s %s', user.name, user.fav);
	  }else{
	  	console.log("Pb");
	  }
	  //next();
	
	});*/







}

// Add User
module.exports.addUser = (user, callback) => {
	console.log('addUser');
	User.create(user, callback);
}

// Update User
module.exports.updateUser = (id, user, options, callback) => {
	console.log('updateUser');
	var query = {_id: id};
	var update = {
		name: user.name,
		fav: user.fav,
	}
	User.findOneAndUpdate(query, update, options, callback);
}

// Delete User
module.exports.removeUser = (id, callback) => {
	console.log('removeUser');
	var query = {_id: id};
	User.remove(query, callback);
}
