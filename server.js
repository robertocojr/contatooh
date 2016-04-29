var http = require('http');
var express = require('./config/express');
var app = express();

require('./config/passport')();
require('./config/database')('mongodb://contatooh:pwcontatooh@ds063134.mlab.com:63134/rcandidodb');
// require('./config/database')('mongodb://localhost/contatooh');

const port = app.get('port')

http.createServer(app).listen(port, function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});
