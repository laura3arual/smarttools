'use strict';
var multer = require('multer');

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

  //Contest CRUD
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

  //Video CRUD
  app.route('/api/contests/:contestId/video')
    .get(videoController.all)
    .post(videoController.create);
  app.route('/api/contests/:contestId/video/:videoId')
    .post(videoController.create)
    .put(videoController.update)
    .get(videoController.show)
    .delete(videoController.destroy);

  app.param('videoId', videoController.video);

  //public link to videos by contest
  app.route('/api/public/contests/:contestId').
    get(videoController.convertedVideos);

  //Upload a Video
  var uploadVideo = multer({ //multer settings
    storage: multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
        cb(null, './uploads/')
      },
      filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, req.params.videoId)
      }
    })
  }).single('file');

  app.route('/api/upload/video/:videoId').post(function(req, res) {
    uploadVideo(req,res,function(err){
      if(err){
        res.json({error_code:1,err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null});
    })
  });
};
