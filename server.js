var http = require('http');
var express = require('./config/express');
var app = express();

require('./config/passport')();
require('./config/database')('mongodb://localhost/contatooh');

const port = process.env.PORT || app.get('port')

http.createServer(app).listen(port, function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});
