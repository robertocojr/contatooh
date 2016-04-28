// Autenticação GitHub
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

var helmet = require('helmet')

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

	app.use(helmet());
	// app.disable('x-powered-by');
	app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}))
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	//Adicionando rota para index.ejs
	load('models', {cwd: 'app'})
	.then('controllers')
	.then('routes/auth.js')
	.then('routes')
	.into(app);

	// Adiciona method-override
	app.use(express.static('./public'));

	app.get('*', function(req, res){
		res.status(404).render('404');
	});

	return app;
}
