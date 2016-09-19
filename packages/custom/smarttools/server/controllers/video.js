"use strict";

var mongoose = require('mongoose'),
  Video = mongoose.model('Video'),
  _ = require('lodash');

module.exports = function(VideoController, app, user) {

  return {
    /**
     * Find video by id
     */
    video: function (req, res, next, id) {
      Video.findById(id, function (err, video) {
        if (err) return next(err);
        if (!video) return next(new Error('Failed to load video ' + id));
        req.video = video;
        next();
      });
    },
    /**
     * Create an video
     */
    create: function (req, res) {
      console.log(req.body);
      var video = new Video(req.body);

      video.save(function (err) {
        if (err) {
          return res.status(500).json({ 
            error: 'Cannot save the video'
          });
        }

        res.json(video);
      });
    },
    /**
     * Update an video
     */
    update: function (req, res) {
      var video = req.video;

      video = _.extend(video, req.body);


      video.save(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the video'
          });
        }

        res.json(video);
      });
    },
    /**
     * Delete an video
     */
    destroy: function (req, res) {
      var video = req.video;


      video.remove(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the video'
          });
        }

        res.json(video);
      });
    },
    /**
     * Show an video
     */
    show: function (req, res) {
      res.json(req.video);
    },
    /**
     * List of Videos
     */
    all: function (req, res) {
      Video.find({contestId: req.params.contestId}).sort('-created').populate('user', 'name username').exec(function (err, videos) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the videos'
          });
        }
        res.json(videos);
      });
    },
    /**
     * List of Videos
     */
    convertedVideos: function (req, res) {
      Video.find({contestId: req.params.contestId, state: 'Converted'}).sort('-created').populate('user', 'name username').exec(function (err, videos) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the videos'
          });
        }
        res.json(videos);
      });
    }
  };
}
