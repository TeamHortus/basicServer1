
//This code will give you a server 
//On the request, we have all tons of information about what is trying to access our server. 
//The response gives us all types of ways to respond back to the client. 

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');
var http = require('http');

var data = {};

app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'); //OPENSHIFT_NODEJS_IP = '127.0.0.1 and Heroku IP = '0.0.0.0'
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080); //var port = process.env.OPENSHIFT_NODEJS_PORT || 8080


//data.key = value;

app.use(morgan('dev'))
//app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//data.led1 = 200;
//data.led2 = 300;
//data.led3 = 150;

//Any get request to slash run this function 
app.get('/', function (req, res) {
  res.send('Hi There, Team Hortus!')
})

app.get('/data', function (req, res) {
  res.json(data);
})

app.post('/data', function (req, res) {
	data.led1 = req.body.led1;
	data.led2 = req.body.led2;
	data.led3 = req.body.led3;
	data.fadeUpTime = req.body.fadeUpTime;
	data.fadeUpDuration = req.body.fadeUpDuration;
	data.fadeDownTime = req.body.fadeDownTime;
	data.fadeDownDuration = req.body.fadeDownDuration;
  res.json(data);
})

app.put('/data', function(req, res) {
	if(req.body.led1){
		data.led1 = req.body.led1;
	} else{
		data.led1 = data.led1;
	}
	if(req.body.led2){
		data.led2 = req.body.led2;
	} else{
		data.led2 = data.led2;
	}
	if(req.body.led3){
		data.led3 = req.body.led3;
	} else{
		data.led3 = data.led3;
	}
	if(req.body.fadeUpTime){
		data.fadeUpTime = req.body.fadeUpTime;
	} else{
		data.fadeUpTime = data.fadeUpTime;
	}
	if(req.body.fadeUpDuration){
		data.fadeUpDuration = req.body.fadeUpDuration;
	} else{
		data.fadeUpDuration = data.fadeUpDuration;
	}
	if(req.body.fadeDownTime){
		data.fadeDownTime = req.body.fadeDownTime;
	} else{
		data.fadeDownTime = data.fadeDownTime;
	}
	if(req.body.fadeDownDuration){
		data.fadeDownDuration = req.body.fadeDownDuration;
	} else{
		data.fadeDownDuration = data.fadeDownDuration;
	}
  // data.led1 = req.body.led1;
   //data.led2 = req.body.led2;
   //data.led3 = req.body.led3;
   res.json(data)

});

/*app.listen(port, function () {
  console.log('Example app listening on port 3000!')
}) */

var server = http.createServer(app);

server.listen(app.get('port'), app.get('ip_address'), function () {
    console.log('Server ' + app.get('ip_address') + ' as Express server listening on port ' + app.get('port'));
});

