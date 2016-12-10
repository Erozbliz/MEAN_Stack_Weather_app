var mongoose = require('mongoose');

//Empeche duplication pseudo (alternative : plutot faire un controlle avant l'insertion)
//pseudo     : { type : String , unique : true, required : true, dropDups: true },

// Create the UserFavSchema.
var UserFavSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  other: {
    type: String,
  },
  fav: {
    type: String,
  }
});

// Export the model.
module.exports = mongoose.model('userfav', UserFavSchema);
