var express = require('express');
//var home = require('../app/routes/home');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
	var app = express();
	app.use(bodyParser.urlencoded({extends: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	// Condig. de Porta
	app.set('port', 3000);

	// Config. conteúdo públco
	app.use(express.static('../public'));

	//Config. gestão templates
	app.set('view engine', 'ejs');
	app.set('views','./app/views');

	//Adicionando rota para index.ejs
	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes')
	.into(app);

	// Adiciona method-override
	app.use(express.static('./public'));

	return app;
}
