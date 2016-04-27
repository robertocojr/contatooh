// Autenticação GitHub
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

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

	// Config. conteúdo público
	app.use(express.static('../public'));

	//Config. gestão templates
	app.set('view engine', 'ejs');
	app.set('views','./app/views');

	// Configuração GitHub
	app.use(cookieParser());
	app.use(session(
		{
			secret: 'homem avestruz',
			resave: true,
			saveUninitialized: true
		}
	));
	app.use(passport.initialize());
	app.use(passport.session());

	//Adicionando rota para index.ejs
	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

	// Adiciona method-override
	app.use(express.static('./public'));

	return app;
}
