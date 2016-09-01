'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var SmartTools = new Module('smartTools');

var schedule = require('node-schedule');

var mongoose = require('mongoose');

var  Video = mongoose.model('Video');

var _ = require('lodash');

var nodemailer = require("nodemailer");

var ffmpeg = require('fluent-ffmpeg');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
SmartTools.register(function(app, users, system, database) {

  var userModel = database.connection.model('User');
  userModel.schema.add({ company: {type: String, required: true}}, '');

  SmartTools.controller = require('./server/controllers/smartTools')(SmartTools, app);

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  SmartTools.routes(app, users, system);

  SmartTools.angularDependencies(['mean.system', 'mean.users', 'ngFileUpload']);


  var queue = [];

  var updateVideoState = function(videoId){
    Video.findById(videoId, function (err, video) {
      if (err) return next(err);
      if (!video) return next(new Error('Failed to load video ' + id));
      video.state = 'Converted';
      video.save(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the video'
          });
        }
      });
    });
  }


  var convert = function(videos) {
    _.each(videos, function (video) {
      var videoId = video._id.toJSON();
      var contestId = video.contestId;
      var email = video.email;
      queue.push(videoId);
      ffmpeg('./uploads/' + videoId)
        .audioCodec('aac')
        .videoCodec('libx264')
        .size('320x200')
        .on('error', function (err) {
          console.log('An error occurred: ' + err.message);
        })
        .on('end', function (file) {
          console.log('New video file: ' + file);
          updateVideoState(videoId);
        })
        .save('./convertedVideos/' + videoId + '.mp4');


      //var transporter = nodemailer.createTransport('nick4kcin@gmail.com:Thetopoftheworld@smtp.gmail.com');

      var transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com", // hostname
        secure: false, // use SSL
        port: 25,
        auth: {
          user: 'smarttools1@yahoo.com',
          pass: '123qweZ!'
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      var mailOptions = {
        from: '"SmartTools 👥" <smarttools1@yahoo.com>', // sender address
        to: email, // list of receivers
        subject: 'Video publicado ✔', // Subject line
        text: 'Tu video ha sido publicado porfavor visìtanos en http://localhost:3000/smarttools/' + contestId, // plaintext body
        html: '<b>Tu video ha sido publicado porfavor visìtanos en <a>http://localhost:3000/smarttools/' + contestId + '</a></b>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          return;
        }
        console.log('Message sent');
        transporter.close();
      });

    });
  }
  var j = schedule.scheduleJob('* * * * *', function(){
    Video.find({state: 'InProcess'}).sort('-created').populate('user', 'name username').exec(function (err, videos) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the videos'
        });
      }
      if(videos.length)
        convert(_.filter(videos, function(video){
          return queue.indexOf(video._id.toJSON()) === -1;
        }));
    });
  });

  return SmartTools;
});
