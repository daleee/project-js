var express = require('express')
  , passport = require("passport")
  , MongoStore = require('connect-mongo')(express);

module.exports = function(app)
{
  ///////////////////////////////////////////////////////////////////
  ///////////// ONLY PERFORM EDITS BELOW THIS POINT /////////////////
  ///////////////////////////////////////////////////////////////////

  // port: the port the application should be served on
  app.set('port', 8080);
  // databaseName: name of the MongoDB database to use
  app.set('databaseName', 'test');
  // apiPrefix: URL prefix for API routes
  app.set('apiPrefix', '/api');

  ///////////////////////////////////////////////////////////////////
  ///////////// DO NOT ALTER BELOW THIS POINT ///////////////////////
  ///////////////////////////////////////////////////////////////////

  // use short logging
  app.use(express.logger('short'));
  // enable express cookie parsing
  app.use(express.cookieParser());
  // enable express body parsing
  app.use(express.bodyParser());
  // use MongoStore if in production mode
  if (app.get('env') === 'production') {
    app.use(express.session({ secret: 'lolcats',
                            store: new MongoStore({
                              db: app.get('databaseName')
                            })
    }));
  }
  // use MemoryStore if in development mode
  else {
    app.use(express.session({ secret: 'lolcats',
                            store: express.session.MemoryStore({
                              reapInterval: 60000 * 10
                            })
    }));
  }
  // initialize passport
  app.use(passport.initialize());
  // initialize passport session
  app.use(passport.session());
  // serve client
  app.use(express.static(__dirname + '/../client/app'));
}
