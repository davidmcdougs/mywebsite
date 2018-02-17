// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Create an instance of the express app.
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Specify the port.
var port = process.env.PORT || 3000;

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.use(express.static("views"));
app.listen(port);



