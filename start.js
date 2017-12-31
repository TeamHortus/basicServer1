var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');
var http = require('http');
var getData = require('./routes/getData');
var recipes = require('./routes/recipes');

var mongoose = require('mongoose');
var processEnv = process.env.IP || '0.0.0.0';
var processPort = process.env.PORT || 8080;

var data = {};

//configure DB
mongoose.Promise = global.Promise; //to avoid conflict between mongo db promises

var clientMongoDB =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	"mongodb://root:root@ds157702.mlab.com:57702/teamhortusdb"; // declared our mongo db url


mongoose.connect(clientMongoDB, function (err, res) {
	if (err) {
		console.log('Error at connecting DB ' + err);
	} else {
		console.log('DB Connection Successful to ' + clientMongoDB);
	}
});

app.set('ip_address', process.env.IP || '0.0.0.0'); //OPENSHIFT_NODEJS_IP = '127.0.0.1 and Heroku IP = '0.0.0.0'
app.set('port', process.env.PORT || 8080); //var port = process.env.OPENSHIFT_NODEJS_PORT || 8080

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//Any get request to slash run this function 
app.get('/', function (req, res) {
	res.send('Hi There, Team Hortus!');
})

app.get('/data', getData.list);

app.post('/data', getData.add);

//all recipes
app.get('/recipes', recipes.list);
app.get('/recipes/:id', recipes.list);

app.post('/recipes/add', recipes.add);

app.post('/recipes/update', recipes.update);
app.post('/recipes/delete', recipes.delete);

app.get('/data', function (req, res) {
	res.json(data);
})

var server = http.createServer(app);

server.listen(app.get('port'), app.get('ip_address'), function () {
	console.log('Server ' + app.get('ip_address') + ' as Express server listening on port ' + app.get('port'));
});

