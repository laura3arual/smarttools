'use strict';


module.exports = function(Smarttools, app, auth, database, circles) {
  var smartTools = Smarttools.controller;

  app.get('/api/smarttools/example/anyone', function(req, res) {
    res.send('Anyone can access this');
  });

  app.get('/api/smarttools/example/render', function(req, res) {
    Smarttools.render('index', {
      package: 'smarttools'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  app.route('/api/contests')
    .get(smartTools.all)
    .post(smartTools.create);
  app.route('/api/contests/:contestId')
    .post(smartTools.create)
    .put(smartTools.update)
    .get(smartTools.show)
    .delete(smartTools.destroy);;

  app.param('contestId', smartTools.contest);

  var videoController = require('./../controllers/video')();

  app.route('/api/contests/:contestId/video')
    .get(videoController.all)
    .post(videoController.create);
  app.route('/api/contests/:contestId/video/:videoId')
    .post(videoController.create)
    .put(videoController.update)
    .get(videoController.show)
    .delete(videoController.destroy);

  app.param('videoId', videoController.video);
};
