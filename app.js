const express = require('express')
const app = express()
const path = require('path')
const PORT = 5000
app.set("view engine", 'ejs')
app.use("/styles",express.static(__dirname + "/styles"))

app.get("/", (req, res) => {
	res.render(__dirname + "/pages/index")
})

app.get('/404', function(req, res, next){
	next();
  });
  
  app.get('/403', function(req, res, next){
	var err = new Error('not allowed!');
	err.status = 403;
	next(err);
  });
  
  app.get('/500', function(req, res, next){
	next(new Error('keyboard cat!'));
  });

  app.use(function(req, res, next){
	res.status(404);
  
	res.format({
	  html: function () {
		res.render(__dirname + "/pages/error", { status: "404" })
	  },
	  json: function () {
		res.json({ error: 'Not found' })
	  },
	  default: function () {
		res.type('txt').send('Not found')
	  }
	})
  });

  app.use(function(err, req, res, next){
	// we may use properties of the error object
	// here and next(err) appropriately, or if
	// we possibly recovered from the error, simply next().
	res.status(err.status || 500);
	res.render(__dirname + `/pages/error`, { status: err.status || 500 });
  });
app.listen(PORT, () => {
	console.log(`process started on port ${PORT}!`)
})