'use strict';

// CONFIG
const SWAGGER    = require('./config/swagger');
const INJECTOR   = require('swagger-injector');
const HTTP_PORT  = process.env.PORT || (SWAGGER.host.split(':')[1] ? SWAGGER.host.split(':')[1] : 3000);

// NODE MODULES
const KOA       = require('koa');
const ROUTER    = require('fleek-router');
const CORS      = require('koa-cors');
const PARSER    = require('koa-bodyparser');
const MONGOOSE  = require('mongoose');

// INIT
const APP = KOA();

// DB
MONGOOSE.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1/fleek');
MONGOOSE.connection.on('error', () => {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// HTTP SERVICE
APP.env = process.env.ENV_VARIABLE;

/**
APP.use( function *(next) {
  console.log(this.request);
  yield next;
});
**/

APP.use( PARSER() );
APP.use( CORS() );

// SWAGGER INJECTOR
APP.use(INJECTOR.koa({swagger: './config/swagger.json'}));

// MODELS
const MODELS = require('./lib/models');
APP.use ( MODELS );

// KOA RESPONSE
const RESPOND = require('./lib/respond');
APP.use ( RESPOND );

// INJECTABLE MIDDLEWARE
const MIDDLEWARE = require('./middleware/');

// CONTROLLERS
const CONTROLLERS = require('./lib/controllers')();

// HTTP FLEEK ROUTER
ROUTER( APP, {
  swagger: SWAGGER,
  middleware: MIDDLEWARE,
  controllers: CONTROLLERS,
  validate : {
    catch : function * (err) {
      yield this.respond(this, false, 400, err);
    }
  }
});

APP.listen( HTTP_PORT );

console.log('HTTP Service listening on port: ' + HTTP_PORT);
