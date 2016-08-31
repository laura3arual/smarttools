"use strict";

var mongoose = require('mongoose'),
  Contest = mongoose.model('Contest'),
  _ = require('lodash');

module.exports = function(SmartTools, app, user) {

  return {
    /**
     * Find contest by id
     */
    contest: function (req, res, next, id) {
      Contest.findById(id, function (err, contest) {
        if (err) return next(err);
        if (!contest) return next(new Error('Failed to load contest ' + id));
        req.contest = contest;
        next();
      });
    },
    /**
     * Create an contest
     */
    create: function (req, res) {
      var contest = new Contest(req.body);
      contest.user = req.user;

      contest.save(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the contest'
          });
        }

        res.json(contest);
      });
    },
    /**
     * Update an contest
     */
    update: function (req, res) {
      var contest = req.contest;

      contest = _.extend(contest, req.body);


      contest.save(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot update the contest'
          });
        }

        res.json(contest);
      });
    },
    /**
     * Delete an contest
     */
    destroy: function (req, res) {
      var contest = req.contest;


      contest.remove(function (err) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot delete the contest'
          });
        }

        res.json(contest);
      });
    },
    /**
     * Show an contest
     */
    show: function (req, res) {
      res.json(req.contest);
    },
    /**
     * List of Contests
     */
    all: function (req, res) {
      Contest.find({adminId: req.query.adminId}).sort('-created').populate('user', 'name username').exec(function (err, contests) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot list the contests'
          });
        }
        res.json(contests);
      });
    }
  };
}
