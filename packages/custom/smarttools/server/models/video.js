'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
 
var VideoSchema = new Schema({
  name: {
    type: String,
    required: true
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
  },
  uploadDate: {
    type: Date
  }
});

mongoose.model('Video', VideoSchema);
