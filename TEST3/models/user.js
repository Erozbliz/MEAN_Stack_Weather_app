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
