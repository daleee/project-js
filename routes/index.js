// Default Routes
// Project.JS
var passport = require('passport');

module.exports = function(app) {
  var prefix = app.get('apiPrefix');

  app.post(prefix + '/login', function(req, res, next) {
           passport.authenticate('local', { session: false }, function(err, user, info){
             if(err) {
               res.send(500, err);
               res.end();
             }
             if(!user) {
               res.send(500, info);
             }
             console.log(user);
           })(req, res, next);
  });

  /*
  app.get('/api/login', function(req, res) {
    if (req.session.user) {
      res.send(req.session.user);
    }
  }
  );*/

  app.get('/api/logout', function(req, res) {
    req.user = null;
    res.send();
    res.end();
  });

  return {
    users: require('./users')(app),
    roles: require('./roles')(app),
    projects: require('./projects')(app),
    utility: require('./utility')(app),
    project: require('./project')(app)
  };
};
