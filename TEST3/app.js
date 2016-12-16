const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


User =require('./models/user');


// Connect to Mongoose
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send(' /api/users');
});



//users
app.get('/api/users', (req, res) => {
	User.getUsers((err, users) => {
		if(err){
			throw err;
		}
		res.json(users);
	});
});

app.get('/api/users/:_id', (req, res, callback) => {
	User.getUserById(req.params._id, (err, user) => {
		if(err){
			console.log('error id inexistant');
	  		res.json("id inexistant");
		}else{
			res.json(user);
		}
	});
	//User.findById(req.params._id, callback);
});


app.post('/api/users', (req, res) => {
	var user = req.body;
	User.addUser(user, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.put('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	var userb = req.body;
	User.updateUser(id, userb, {}, (err, user) => {
		if(err){
			res.json("id inexistant ");
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			res.json("id inexistant ");
		}
		res.json(user);
	});
});


//Pour la session (pour la barre de navigation)
app.get('/api/isLogged/:_id', function(req, res, next){
	User.findOne({ '_id': req.params._id },  function (err, user, next) {
	  if (err){
	  	console.log('error');
	  	res.json("id inexistant");
	  } else if(user) {
	  	console.log('Utilisateur %s %s est connecté', user.name, user.fav);
	  	res.json(user);
	  }else{
	  	console.log("Pb");
	  }
	});
});
//pour test
/*
app.get('/hello', function(req, res, next){
	User.findOne({ '_id': '5844e7996326c0fb6cda1159r' },  function (err, user, next) {
	  if (err){
	  	console.log('error');
	  	res.json("id inexistant ");
	  } else if(user) {
	  	console.log('%s %s', user.name, user.fav);
	  	res.json(user);
	  }else{
	  	console.log("Pb");
	  }
	});
});
*/

app.listen(3000);
console.log('Running on port 3000...');
