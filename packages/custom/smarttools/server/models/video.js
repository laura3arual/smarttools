'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VideoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  contestId: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  description: {
    type: String
  },
  state: {
    type: String
  }
});

mongoose.model('Video', VideoSchema);
