var Resource = require('resourcejs');
module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.movie).rest();

  // Return middleware.
  return function(req, res, next) {

	//var movie = new Movie();      // create a new instance of the Bear model
    //movie.title = req.body.title;  // set the bears name (comes from the request)


    next();
  };
};
