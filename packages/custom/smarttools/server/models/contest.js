'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ContestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  prizeDescription: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  adminId: {
    type: String
  }
});

mongoose.model('Contest', ContestSchema);
