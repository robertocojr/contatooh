var mongoose = require('mongoose');

module.exports = function(uri){
  mongoose.connect(uri);

  mongoose.connection.on('connected', function(){
    console.log('Mongoose! Conectado em ' + uri);
  });
  mongoose.connection.on('disconnected', function(){
    console.log('Mongoose! Desconectado em ' + uri);
  });
  mongoose.connection.on('error', function(erro){
    console.log('Mongoose! Erro na conexão: ' + erro);
  });

  process.on('SIGINT', function(){
    mongoose.log('Mongoose! Desconectado pelo término da aplicação');

    process.exit(0);
  });
}
