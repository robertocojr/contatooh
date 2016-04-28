var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: '9cd63380ce1378419bd8',
    clientSecret: '20fab53907c2c81f134b7f01a06045fd80d3a117',
    callbackURL: 'http://rcandidocontatooh.herokuapp.com/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done){
    Usuario.findOrCreate(
      {"login" : profile.username},
      {"nome" : profile.username},
      function(erro, usuario){
        if(erro){
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );
  }));

  passport.serializeUser(function(usuario, done){
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done){
    Usuario.findById(id).exec()
    .then(function(usuario){
      done(null, usuario);
    });
  });

};
